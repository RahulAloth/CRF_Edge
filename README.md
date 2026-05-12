# CRF_Edge
CRF Edge NLP Pipeline

This repository provides the **open framework** for a privacy‑preserving, edge‑AI‑based
CRF → CRF Metadata JSON pipeline.

- Runs on **NVIDIA Jetson / Orin** and similar edge devices
- No CRF data leaves the device (no cloud)
- Public:
  - CLI
  - JSON schema
  - Integration API
- Private (device‑only):
  - Encrypted AI models (layout, NLP)
  - BC + DSpec mapping engine
  - SDTM generation logic
  - Hardware‑locked runtime

> To actually run the full pipeline, you need a licensed edge device image
> that contains the encrypted engine and model artifacts.
# Edge‑Locked CRF Parsing Pipeline – Architecture Overview

You can open‑source the **framework** on GitHub while keeping the **intelligence** locked to your **edge hardware** (Jetson/Orin/etc.).  
This document outlines a GitHub‑friendly structure and code patterns to do that.

---

## Repository structure

```text
crf-edge-pipeline/
├─ README.md
├─ LICENSE
├─ setup.py / pyproject.toml
├─ crf_edge/
│  ├─ __init__.py
│  ├─ cli.py                 # Public CLI entrypoint
│  ├─ config.py              # Public config handling
│  ├─ schema/
│  │  ├─ crf_metadata_schema.json  # Public JSON schema
│  ├─ parsers/
│  │  ├─ pdf_parser.py       # Wrapper around pdfplumber/layoutparser
│  │  ├─ ocr_wrapper.py      # Wrapper around Tesseract
│  ├─ api/
│  │  ├─ crf_api.py          # Public Python API
│  └─ core/
│     ├─ __init__.py
│     ├─ hardware_check.py   # Hardware ID check (public)
│     └─ engine_stub.py      # Stub that calls encrypted engine (not in repo)
└─ examples/
   ├─ example_crf.pdf
   └─ example_usage.ipynb

```
- The real AI engine (TensorRT models, encrypted binaries, BC/DSpec libraries) is not in the repo.
- It is deployed only on your device image (e.g., Jetson SD card / Docker image).
  
## Using an Edge Device Architecture :
``` Code
crf-edge/
├─ README.md
├─ pyproject.toml
├─ crf_edge/
│  ├─ cli.py
│  ├─ hardware/
│  │  ├─ lock.py
│  ├─ models/
│  │  ├─ detectron.engine      # TensorRT (NOT in GitHub)
│  │  ├─ layoutlm.onnx         # ONNX (NOT in GitHub)
│  │  ├─ donut.onnx            # ONNX (NOT in GitHub)
│  ├─ extract/
│  │  ├─ layout_detector.py
│  │  ├─ semantic_extractor.py
│  │  ├─ donut_parser.py
│  ├─ metadata/
│  │  ├─ builder.py
│  │  ├─ schema.json
│  ├─ engine/
│  │  ├─ bc_mapper.bin         # encrypted
│  │  ├─ dspec_mapper.bin      # encrypted
│  │  ├─ sdtm_engine.bin       # encrypted
│  └─ utils/
│     ├─ logger.py
└─ examples/
   ├─ sample_crf.pdf
   └─ sample_output.json
`````
## Citing Detectron2

We are using Detectron2 in this research project

```BibTeX
@misc{wu2019detectron2,
  author =       {Yuxin Wu and Alexander Kirillov and Francisco Massa and
                  Wan-Yen Lo and Ross Girshick},
  title =        {Detectron2},
  howpublished = {\url{https://github.com/facebookresearch/detectron2}},
  year =         {2019}
}
```

## File's and its explanations:

### annotation_engine_ohne_arrow.py
This file is a Python module that implements a CDISC Option-A annotation engine for CRF (Case Report Form) documents. It uses the ReportLab library to draw colored labels, bounding boxes, and domain legends on PDF canvases, with a focus on modern annotation styles that omit arrows. The module includes configurable color palettes, global toggles for enabling/disabling annotations, and both low-level drawing primitives and high-level helper functions for annotating fields, domains, and legends in clinical trial forms.


### annotation_engine.py
This file is a Python module that implements a CDISC Option-A annotation engine for CRF (Case Report Form) documents. It uses the ReportLab library to draw colored labels, arrows connecting labels to fields, bounding boxes, and domain legends on PDF canvases. The module includes configurable color palettes, global toggles for enabling/disabling annotations, and both low-level drawing primitives (including arrow rendering) and high-level helper functions for annotating fields, domains, and legends in clinical trial forms. Unlike the "ohne_arrow" variant, this version includes arrows pointing from labels to annotated fields.

### crf_with_annotation.py
This file is a PDF generation script that creates a multi-page annotated Clinical Report Form (CRF) for oncology studies. It:

Imports annotation engine: Uses either the annotation_engine.py (with arrows) or annotation_engine_ohne_arrow.py (without arrows) to add CDISC-compliant annotations to PDF fields.

Loads CRF data: Dynamically imports dummy clinical trial data from dummy_data.pyc, supporting multiple cancer types (lung, colon, skin, cardiovascular).

Provides drawing helpers: Functions for creating basic form elements:

box() - input fields
checkbox() - selection boxes with labels
label() - text labels
header() - page headers with title and protocol info
frame() - page borders
Defines page generation functions: Constructs individual CRF pages such as:

Page 1: Patient identification and demographics (study ID, subject ID, DOB, sex, ethnicity, race, height, weight, BMI, consent date)
Page 2: Medical history with condition records
Page 3: Oncology diagnosis summary with tumor site, histology, TNM classification
Uses domain tags: Labels sections with CDISC domain codes (DM, MH, TU) for easy identification.

Annotates SDTM variables: Links form fields to corresponding SDTM variable names (STUDYID, SUBJID, BRTHDTC, etc.) with color-coded annotations.
## dummy_crf_generator.py
This file is a 20-page Clinical Report Form (CRF) generator for clinical trials without CDISC annotations. It creates a comprehensive PDF form with dummy data. Key characteristics:

No annotations: Unlike crf_with_annotation.py, this file generates plain CRF pages without SDTM variable annotations, arrows, or color-coded labels.

Configurable data source: Loads dummy clinical trial data from dummy_data.pyc with support for multiple study types:

Lung cancer
Colon cancer
Skin cancer
Cardiovascular (currently selected)
Drawing primitives: Provides helper functions for PDF components:

box() - input fields
checkbox() - selectable options
label() - text labels
header() - page headers with protocol info
frame() - page borders
20-page structure: Generates a complete CRF covering:

Pages 1-5: Patient demographics, medical history, diagnosis, baseline vitals, lab tests
Pages 6-10: Disease assessment, treatment data, response evaluation, safety monitoring, AE reporting
Pages 11-15: Medication logs, concomitant meds, procedures, imaging results, additional assessments
Pages 16-20: Follow-up data, resource utilization, quality of life, survival tracking, and investigator signatures
Main execution: The generate_oncology_crf_20pages() function orchestrates PDF creation, calling all 20 page functions sequentially and saving the output to CRF folder as a timestamped PDF file.

##pdf_to_images.py
This file converts multi-page CRF PDFs into individual PNG images for further processing. Specifically:

Function pdf_to_images(): Takes a PDF file and converts each page to a separate PNG image at a specified DPI (300 by default for OCR/layout analysis).

Parameters:

pdf_path: Input PDF file location
output_dir: Directory where PNG files will be saved
dpi: Resolution for conversion (300 recommended for optical character recognition and layout analysis)
Output: Returns a list of file paths to all generated PNG images, with naming convention {pdf_name}_page_{page_number}.png

Workflow:

Uses the pdf2image library to convert PDF pages
Automatically creates output directory if it doesn't exist
Saves each page as an individual PNG file
Use case: This is the first step in the CRF Edge pipeline — converting PDFs into images for downstream processing by layout models, OCR engines (Donut), and metadata extraction on edge devices (NVIDIA Jetson/Orin).

Example execution: When run directly, it converts ./CRF/crf_cardiovascular.pdf into PNG images stored in Images.


run_inference.ipynb
This Jupyter notebook is designed for inference and model deployment using a trained YOLOv8 object detection model. Here's a detailed breakdown:

Structure & Purpose
The notebook demonstrates how to:

Load a pre-trained YOLOv8 model
Run inference on CRF images
Export the model to various deployment formats
Optimize for edge deployment on NVIDIA Jetson devices
Cell-by-Cell Breakdown
Cell 1: Sample Inference (2nd Image)

Loads the trained YOLOv8 model from runs/detect/train-8/weights/best.pt
Selects the 2nd validation image alphabetically from /content/crf-dataset-fresh/crf_val/images/
Runs inference with imgsz=1024 and conf=0.5 threshold
Displays the predicted image with bounding boxes overlaid
Prints detection details (class, confidence, bounding box coordinates)
Cell 2: Sample Inference (3rd Image)

Similar to Cell 1 but uses the 3rd image alphabetically
Includes error handling if fewer than 3 images exist
Uses different prediction run name to avoid overwriting previous results
Cell 3: Export to ONNX

Exports the trained model to ONNX format for cross-platform compatibility
Useful for deployment in various frameworks (TensorFlow, PyTorch, etc.)
Displays exported file size
Cell 4: Commentary on TensorRT

Explains why TensorRT is important for NVIDIA Jetson edge deployment
Mentions performance benefits: faster inference and reduced memory footprint
Cell 5: Export to TensorRT

Converts model to TensorRT .engine format optimized for Jetson devices
Uses FP16 (half-precision) for reduced model size
Verifies the export and prints file size
Cell 6: Markdown Note

Placeholder for verifying TensorRT inference
Cell 7: Empty

Awaiting implementation for TensorRT inference verification
Key Features
Multi-format export support: ONNX, TensorRT, TensorFlow Lite, OpenVINO, CoreML
Jetson optimization: Specifically tailored for NVIDIA Jetson edge deployment
Visualization: Displays predicted images with detected objects
Detailed metrics: Shows confidence scores and exact bounding box coordinates
Production-ready: Handles file existence checks and error reporting

Split_the_training_data.py
This file splits a COCO-format dataset into training and validation subsets. Here's what it does:

Main Purpose
Reorganizes CRF image dataset and annotations into structured train/validation splits for model training.

Workflow
Load COCO JSON

Reads a COCO-format annotation file containing images, annotations, and categories
Expected location: instances_default.json
Split Dataset

Shuffles all images with a fixed seed (42) for reproducibility
Splits into 90% training and 10% validation by default
Creates corresponding annotation subsets for each split
Create Output Structure

Copy Images

Copies training images from source to crf_train/images/
Copies validation images to crf_val/images/
Save Annotation JSONs

Generates train.json with training images, annotations, and categories
Generates val.json with validation images, annotations, and categories
Configuration
Input: Single COCO JSON with all images + source image directory
Output: Separate train/val folders with split annotation files
Train/Val Ratio: 90/10 (configurable)
Output Path: processed_dataset
Helper Functions
load_coco_json() - Parse COCO annotation file
split_images() - Random train/val split
filter_annotations() - Filter annotations by image IDs
copy_images() - Copy image files to destination
save_json() - Write JSON with formatting
This script prepares the dataset for YOLOv8 training by organizing data into the required directory structure.

test_data_dummy.py
This file contains dummy clinical trial data for multiple CRF types used for testing and generating sample PDFs. Here's what it contains:

Purpose
Provides pre-populated test data sets for different medical conditions to generate realistic CRF documents without live patient data.

Data Sets Included
Five complete CRF parameter dictionaries:

CRF_PARAMS_LUNG_CANCER - Non-small cell lung cancer trial data
CRF_PARAMS_COLON_CANCER - Colorectal cancer trial data
CRF_PARAMS_SKIN_CANCER - Melanoma/skin cancer trial data
CRF_PARAMS_CARDIOVASCULAR - Cardiovascular disease trial data
CRF_PARAMS_GLAUCOMA - Glaucoma/ophthalmology trial data
Data Categories per CRF
Each dictionary contains comprehensive patient information:

Demographics: Study ID, site number, subject ID, DOB, sex, ethnicity, race
Vital measurements: Height, weight, BMI, consent date
Diagnosis details: Primary site, histology, TNM staging, biomarkers
Lesion data: Target/non-target lesions with measurements and locations
Baseline imaging: CT, PET-CT, MRI findings
ECOG scores: Performance status across multiple visits
Vital signs: Blood pressure, heart rate, temperature
Concomitant medications: Drug name, indication, start date, status
Medical history: Conditions, onset dates, ongoing status, notes
Treatment regimen: Study arm, drug combination, cycle length, treatment dates
Adverse events: AE descriptions, dates, severity, relationship
Laboratory results: Hematology and chemistry values
Imaging assessments: Multiple imaging modality reports
RECIST response: Baseline through final imaging assessments
Survival data: Last alive date, progression status, investigator info
Usage
This file is imported by dummy_crf_generator.py and crf_with_annotation.py to populate test CRF PDFs. Users can switch between different CRF types by changing the selected CRF_PARAMS dictionary.

This Jupyter notebook tests and benchmarks a TensorRT-optimized YOLOv8 model for inference performance. Here's a detailed breakdown:

Notebook Purpose
Validates the exported TensorRT engine (.engine file) and measures inference speed across multiple CRF validation images for Jetson edge deployment.

Cell-by-Cell Implementation
Cell 1: TensorRT Model Inference on Single Image

Loads the TensorRT model from /content/runs/detect/train-8/weights/best.engine
Selects a specific validation image (crf_image_15.png)
Runs inference with:
Image size: 1024x1024
Confidence threshold: 0.5
FP16 precision (half=True) for faster processing
Displays the predicted image with bounding boxes
Prints detection details: class names, confidence scores, and box coordinates
Cell 2: Test Output (Markdown)

Shows test results with attached image output
Cell 3: Section Header (Markdown)

Documents the purpose: "Calculate Average Inference Time"
Cell 4: Average Inference Time Calculation

Loads TensorRT model once (for efficiency)
Iterates through all validation images in the dataset
For each image:
Runs inference without saving results (to measure pure speed)
Extracts inference time in milliseconds from results[0].speed['inference']
Prints per-image inference time
Calculates and prints overall average inference time across all images
Suppresses verbose output to keep terminal clean
Cell 5: Generate Inference Summary CSV

Creates a pandas DataFrame with:
Image names
Per-image inference times
Overall average inference time (repeated for each row)
Saves to /content/tensorrt_inference_summary.csv
Displays first few rows of the summary
Cell 6: Results Image (Markdown)

Shows output image attachment
Cell 7: Calculate Standard Deviation

Computes standard deviation of inference times
Useful for understanding performance variability
Cell 8: Download CSV Report

Uses Google Colab files.download() to download the inference summary CSV
Verifies file existence before downloading
Cell 9: Download TensorRT Engine

Exports the trained TensorRT engine file (best.engine)
Allows downloading the optimized model for local deployment
Key Metrics Captured
Per-image inference time (ms)
Average inference time across full validation set
Standard deviation of inference times
Model path and configuration used
Workflow Summary

```
Load TensorRT Model → Test on Sample Image 
  → Calculate Avg Speed on All Images 
  → Generate CSV Report 
  → Calculate Variance 
  → Download Results
````
Use Case
This notebook prepares the TensorRT model for deployment on NVIDIA Jetson devices by:

Verifying model functionality
Benchmarking real inference performance
Creating performance reports
Exporting optimized model for edge devices

### train_crf.ipynb
eviewing the notebook structure and content now.

Retrieved notebook summary and details
I found the notebook has code and markdown sections; pulling the full content to describe it accurately.

Reviewed train_crf.ipynb and described notebook content
Detailed Description of train_crf.ipynb
This notebook is a Colab-style training pipeline for converting a COCO-format dataset into YOLO format, training a YOLOv8 object detection model, and then displaying training results.

Main goals
Install the YOLO/Ultralytics package
Authenticate with Hugging Face
Download a custom dataset from Hugging Face
Inspect dataset contents
Convert COCO annotations to YOLO label files
Create a YOLO data.yaml
Train a YOLOv8 model
Display training plots and validation outputs
Cell-by-cell breakdown
1. Install dependencies
!pip install ultralytics
Ensures the ultralytics package is available for YOLOv8 training.
2. Hugging Face login
Uses from huggingface_hub import login
Calls login() to authenticate the notebook with Hugging Face.
3. Download dataset
Uses snapshot_download(repo_id="RahulAloth/crf-dataset", repo_type="dataset")
Retrieves the Hugging Face dataset to the local cache and prints the path.
4. Inspect cached dataset directory
Hard-coded path:
/root/.cache/huggingface/hub/datasets--RahulAloth--crf-dataset/snapshots/88a277ee28938e92515994029535cb9821f02475
Lists root dataset contents with shell ls -F.
5. Inspect train/val splits
Lists contents recursively for:
crf_train/
crf_val/
Helps confirm dataset structure and files.
6. Read train.json
Opens crf_train/train.json
Prints:
success status
number of entries
first sample or annotation structure
Used to understand the COCO annotation schema.
7. Convert COCO to YOLO format
Defines convert_coco_to_yolo(split).
Reads COCO JSON for crf_train and crf_val.
Builds image metadata from images and category mapping from categories.
Converts each COCO bbox to YOLO normalized bounding boxes.
Writes .txt label files to:
crf_train/labels/
crf_val/labels/
Maps categories:
COCO category 1 (section_header) → YOLO class 0
COCO category 2 (sdtm_box) → YOLO class 1
Verifies conversion by listing first label files and printing a sample label file content.
8. Prepare training and run YOLOv8
Re-downloads the dataset into /content/crf-dataset-fresh
Copies it from the Hugging Face cache to that reliable path
Sets training paths:
train_dir_for_yaml = /content/crf-dataset-fresh/crf_train
val_dir_for_yaml = /content/crf-dataset-fresh/crf_val
Writes data.yaml with:
train: ...
val: ...
names:
0: header
1: field
Trains a YOLO model:
YOLO("yolov8n.pt")
epochs=50
imgsz=1024
batch=4
workers=2
device=0
9. Visualize training results
Imports Image, display from IPython.display
Looks in /content/runs/detect/train-8
Attempts to display:
results.png
F1_curve.png
P_curve.png
R_curve.png
confusion_matrix.png
val_batch0_pred.jpg
Prints messages if these files are missing
10. Markdown output
Includes markdown cells showing:
“Visualizing Training Results”
“Training Results”
Attached images for training results and confusion matrix
Important notes
The notebook is not executed currently.
It assumes a Colab-like environment with /content and possibly GPU support.
Some dataset paths are hard-coded to a specific Hugging Face cache snapshot ID.
The conversion step is essential: it converts COCO annotation format to YOLO label files.
The training step depends on ultralytics and a local yolov8n.pt weights file.
If you want, I can also summarize the dataset structure or explain how to adapt this notebook to a different dataset.

## How to create a .pyc file from test_data_dummy.py
Option 1: Standard compile with Python
Run this in the repository root:
python -m py_compile test_data_dummy.py

his creates a compiled file under __pycache__/, for example:

__pycache__/test_data_dummy.cpython-3xx.pyc
