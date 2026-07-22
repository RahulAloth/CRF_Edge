#pragma once

#include <string>
#include <vector>
#include <memory>
#include <filesystem>
#include <opencv2/opencv.hpp>
#include <NvInfer.h>
#include <nlohmann/json.hpp>

#include "crf_config.hpp"

class CRFInference {
public:
    explicit CRFInference(const std::string& configPath);

    int run();

private:
    int loadConfiguration();
    int loadEngine();

    int postprocess(cv::Mat& img,
                     const std::vector<float>& outputBlob,
                     const nvinfer1::Dims& outputDims);

    void saveResults(cv::Mat& img,
                     const std::vector<cv::Rect>& boxes,
                     const std::vector<float>& conf,
                     const std::vector<int>& classIds,
                     const std::vector<int>& indices);

private:
    // ConfigManager cfg;

    std::string enginePath;
    std::string imagePath;
    std::string outputBase;
    std::string tensor_input_name;
    std::string tensor_output_name;

    float confThreshold;
    float nmsThreshold;
    int inputWidth;
    int inputHeight;

    std::unique_ptr<nvinfer1::IRuntime> runtime;
    std::unique_ptr<nvinfer1::ICudaEngine> engine;
    std::unique_ptr<nvinfer1::IExecutionContext> context;

    std::string verbose;
};
