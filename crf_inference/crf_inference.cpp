#include <iostream>
#include <fstream>
#include <numeric>
#include <filesystem>
#include <cuda_runtime_api.h>

#include <opencv2/opencv.hpp>
#include <opencv2/dnn.hpp>
#include <nlohmann/json.hpp>

#include "crf_inference.hpp"
#include "crf_logger.hpp"
#include "crf_config.hpp"


CRFInference::CRFInference(const std::string& configPath)
{
    loadConfiguration();
    loadEngine();
}

int CRFInference::loadConfiguration()
{

    try {
        ConfigManager cfg;
        cfg.load("config.yaml");

        std::string verbose = cfg.getValue<std::string>("verbose");
        if (verbose == "trace") Logger::setLevel(LogLevel::TRACE);
        else if (verbose == "debug") Logger::setLevel(LogLevel::DEBUG);
        else if (verbose == "info") Logger::setLevel(LogLevel::INFO);
        else if (verbose == "warn") Logger::setLevel(LogLevel::WARN);
        else if (verbose == "error") Logger::setLevel(LogLevel::ERROR);
        else Logger::setLevel(LogLevel::NONE);

        enginePath = cfg.getValue<std::string>("engine_path");
        imagePath = cfg.getValue<std::string>("image_path");
        outputBase = cfg.getValue<std::string>("base_path");
        tensor_input_name = cfg.getValue<std::string>("input_name");
        tensor_output_name = cfg.getValue<std::string>("output_name");
        confThreshold = cfg.getValue<double>("confidence_threshold");
        nmsThreshold = cfg.getValue<double>("nms_threshold");
        inputWidth = cfg.getValue<int>("width");
        inputHeight = cfg.getValue<int>("height");


        LOG_INFO("Configuration loaded successfully.");
        LOG_DEBUG("Engine path: " + enginePath);
        LOG_DEBUG("Image path: " + imagePath);
        LOG_DEBUG("Output base path: " + outputBase);
        LOG_DEBUG("Confidence threshold: " + std::to_string(confThreshold));
        LOG_DEBUG("NMS threshold: " + std::to_string(nmsThreshold));
        LOG_DEBUG("Input width: " + std::to_string(inputWidth));
        LOG_DEBUG("Input height: " + std::to_string(inputHeight));
    }
    catch(const std::exception& e) {
        LOG_ERROR("Config error: " + std::string(e.what()));
        return 1;   // graceful exit
    }
    return 0;
}

// loadEngine() = open the .engine file → read it → create TensorRT runtime → 
// deserialize engine → create execution context.
int CRFInference::loadEngine()
{
    try{
        std::ifstream file(enginePath, std::ios::binary);
        if (!file.good())
        {
            LOG_ERROR("Could not open engine file: " + enginePath);
            throw std::runtime_error("Could not open engine file: " + enginePath);
        }

        file.seekg(0, std::ios::end);
        size_t size = static_cast<size_t>(file.tellg());
        file.seekg(0, std::ios::beg);

        std::vector<char> engineData(size);
        file.read(engineData.data(), size);
        file.close();

        nvinfer1::IRuntime* rawRuntime = nvinfer1::createInferRuntime(g_crfLogger::get());
        if (!rawRuntime)
        {
            LOG_ERROR("loadEngine: Failed to create TensorRT runtime");
            throw std::runtime_error("Failed to create TensorRT runtime");
        }
        runtime.reset(rawRuntime);  // runtime is std::unique_ptr<nvinfer1::IRuntime>

        // Deserialize engine
        nvinfer1::ICudaEngine* rawEngine =
            runtime->deserializeCudaEngine(engineData.data(), size);
        if (!rawEngine)
        {
            LOG_ERROR("Failed to deserialize TensorRT engine");
            throw std::runtime_error("Failed to deserialize TensorRT engine");
        }
        engine.reset(rawEngine);    // engine is std::unique_ptr<nvinfer1::ICudaEngine>

        // Create execution context
        nvinfer1::IExecutionContext* rawContext = engine->createExecutionContext();
        if (!rawContext)
        {
            LOG_ERROR("Failed to create TensorRT execution context");
            throw std::runtime_error("Failed to create TensorRT execution context");
        }
        context.reset(rawContext);  // context is std::unique_ptr<nvinfer1::IExecutionContext>
    }
    catch(const std::exception& e) {
        LOG_ERROR("loadEngine error: " + std::string(e.what()));
        return 1;   // graceful exit
    }
    return 0;
}

int CRFInference::run()
{
    try{
        cv::Mat img = cv::imread(imagePath);
        if (img.empty())
        {
            LOG_ERROR("CRFInference::run -> Failed to read image: " + imagePath);
            throw std::runtime_error("Image not found: " + imagePath);
        }

        cv::Mat resizedImg;
        cv::resize(img, resizedImg, cv::Size(inputWidth, inputHeight));

        cv::Mat floatImg;
        resizedImg.convertTo(floatImg, CV_32FC3, 1.0f / 255.0f);

        std::vector<float> inputBlob(inputWidth * inputHeight * 3);
        std::vector<cv::Mat> inputChannels(3);

        for (int i = 0; i < 3; ++i)
        {
            inputChannels[i] = cv::Mat(
                inputHeight, inputWidth, CV_32FC1,
                &inputBlob[i * inputWidth * inputHeight]);
        }

        cv::split(floatImg, inputChannels);

        const char* inputTensorName  = tensor_input_name.c_str();
        const char* outputTensorName = tensor_output_name.c_str();

        // --- TensorRT 10.x: get output tensor shape ---
        nvinfer1::Dims outputDims = engine->getTensorShape(outputTensorName);
        if (outputDims.nbDims <= 0){
            LOG_ERROR("CRFInference::run -> Invalid output tensor shape");
            throw std::runtime_error("Invalid output tensor shape");
        }

        int64_t outputSize = 1;
        for (int i = 0; i < outputDims.nbDims; ++i)
            outputSize *= outputDims.d[i];

        // --- Allocate device buffers ---
        void* deviceInput  = nullptr;
        void* deviceOutput = nullptr;

        if (cudaMalloc(&deviceInput, inputBlob.size() * sizeof(float)) != cudaSuccess){
            LOG_ERROR("CRFInference::run -> cudaMalloc failed for deviceInput");
            throw std::runtime_error("cudaMalloc failed for deviceInput");
        }
        if (cudaMalloc(&deviceOutput, outputSize * sizeof(float)) != cudaSuccess)
        {
            cudaFree(deviceInput);
            LOG_ERROR("CRFInference::run -> cudaMalloc failed for deviceOutput");
            throw std::runtime_error("cudaMalloc failed for deviceOutput");
        }

        if (cudaMemcpy(deviceInput, inputBlob.data(),
                    inputBlob.size() * sizeof(float),
                    cudaMemcpyHostToDevice) != cudaSuccess)
        {
            cudaFree(deviceInput);
            cudaFree(deviceOutput);
            LOG_ERROR("CRFInference::run -> cudaMemcpy H2D failed");
            throw std::runtime_error("cudaMemcpy H2D failed");
        }

        // --- Bind tensors (TensorRT 10.x) ---
        if (!context->setTensorAddress(inputTensorName, deviceInput))
        {
            cudaFree(deviceInput);
            cudaFree(deviceOutput);
            LOG_ERROR("CRFInference::run -> Failed to bind input tensor");
            throw std::runtime_error("Failed to bind input tensor");
        }

        if (!context->setTensorAddress(outputTensorName, deviceOutput))
        {
            cudaFree(deviceInput);
            cudaFree(deviceOutput);
            LOG_ERROR("CRFInference::run -> Failed to bind output tensor");
            throw std::runtime_error("Failed to bind output tensor");
        }

        // --- Execute inference (TensorRT 10.x) ---
        if (!context->enqueueV3(nullptr))
        {
            cudaFree(deviceInput);
            cudaFree(deviceOutput);
            LOG_ERROR("CRFInference::run -> enqueueV3 failed");
            throw std::runtime_error("enqueueV3 failed");
        }

        // --- Copy output back ---
        std::vector<float> outputBlob(static_cast<size_t>(outputSize));

        if (cudaMemcpy(outputBlob.data(), deviceOutput,
                    outputSize * sizeof(float),
                    cudaMemcpyDeviceToHost) != cudaSuccess)
        {
            cudaFree(deviceInput);
            cudaFree(deviceOutput);
            throw std::runtime_error("cudaMemcpy D2H failed");
        }

        cudaFree(deviceInput);
        cudaFree(deviceOutput);

        // --- Postprocess ---
        postprocess(img, outputBlob, outputDims);
    }
    catch(const std::exception& e) {
        LOG_ERROR("run error: " + std::string(e.what()));
        return 1;   // graceful exit
    }
    return 0;
}


int CRFInference::postprocess(cv::Mat& img,
                               const std::vector<float>& outputBlob,
                               const nvinfer1::Dims& outputDims)
{
    try{
   
        // Assuming output layout: [batch, rows, dims]
        if (outputDims.nbDims < 3)
        {
            LOG_ERROR("CRFInference::postprocess -> Unexpected outputDims rank");
            throw std::runtime_error("Unexpected outputDims rank");
        }

        int64_t rows = outputDims.d[1];
        int64_t dims = outputDims.d[2];

        std::vector<cv::Rect> boxes;
        std::vector<float> confidences;
        std::vector<int> classIds;
        if (inputWidth <= 0 || inputHeight <= 0)
        {
            LOG_ERROR("CRFInference::postprocess -> Invalid input dimensions");
            throw std::runtime_error("Invalid input dimensions");
        }

        float xFactor = static_cast<float>(img.cols) / static_cast<float>(inputWidth);
        float yFactor = static_cast<float>(img.rows) / static_cast<float>(inputHeight);

        const float* data = outputBlob.data();

        for (int64_t i = 0; i < dims; ++i)
        {
            float maxConf = 0.0f;
            int   classId = -1;

            // scores start at index 4
            for (int64_t j = 4; j < rows; ++j)
            {
                float score = data[j * dims + i];
                if (score > maxConf)
                {
                    maxConf = score;
                    classId = static_cast<int>(j - 4);
                }
            }

            if (maxConf >= confThreshold)
            {
                float x = data[0 * dims + i];
                float y = data[1 * dims + i];
                float w = data[2 * dims + i];
                float h = data[3 * dims + i];

                int left   = static_cast<int>((x - 0.5f * w) * xFactor);
                int top    = static_cast<int>((y - 0.5f * h) * yFactor);
                int width  = static_cast<int>(w * xFactor);
                int height = static_cast<int>(h * yFactor);

                boxes.emplace_back(left, top, width, height);
                confidences.push_back(maxConf);
                classIds.push_back(classId);
            }
        }

        std::vector<int> indices;
        cv::dnn::NMSBoxes(boxes, confidences, confThreshold, nmsThreshold, indices);

        saveResults(img, boxes, confidences, classIds, indices);
    }
    catch(const std::exception& e) {
        LOG_ERROR("postprocess error: " + std::string(e.what()));
        return 1;   // graceful exit
    }
    return 0;
}

void CRFInference::saveResults(cv::Mat& img,
                               const std::vector<cv::Rect>& boxes,
                               const std::vector<float>& conf,
                               const std::vector<int>& classIds,
                               const std::vector<int>& indices)
{
    std::filesystem::path imgPath(imagePath);
    std::string baseName = imgPath.stem().string();

    std::string jsonPath = outputBase + "/" + baseName + ".json";
    std::string outImage = outputBase + "/" + baseName + "_output.jpg";

    nlohmann::json jroot;
    jroot["image"]      = imagePath;
    jroot["detections"] = nlohmann::json::array();

    for (int idx : indices)
    {
        const cv::Rect& box = boxes[idx];

        nlohmann::json det;
        det["class_id"]   = classIds[idx];
        det["confidence"] = conf[idx];
        det["bbox"] = {
            {"x1", box.x},
            {"y1", box.y},
            {"x2", box.x + box.width},
            {"y2", box.y + box.height},
            {"width", box.width},
            {"height", box.height}
        };

        jroot["detections"].push_back(det);

        cv::rectangle(img, box, cv::Scalar(0, 255, 0), 2);
    }

    std::ofstream jf(jsonPath);
    jf << jroot.dump(4);
    jf.close();

    cv::imwrite(outImage, img);
}
