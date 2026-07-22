# CRF_Edge — Privacy‑Preserving Edge AI Pipeline for CRF → Metadata Extraction

CRF_Edge is a modular, privacy‑preserving pipeline that converts Clinical Report Forms (CRFs) into structured **CRF Metadata JSON** on **edge devices** such as NVIDIA Jetson / Orin.  
The **framework is open‑source**, while the **intelligence (AI models, mapping engines, SDTM logic)** remains **encrypted and device‑locked**.

---
## Confidentiality  
Some parts of this code are kept private to protect my proof‑of‑concept. The [integration layer](https://github.com/RahulAloth/crf_edge_deployment) automatically connects the components into the embedded SoC.


## ✨ Key Features

- **Fully offline** — no CRF data leaves the device  
- **Edge‑optimized** for NVIDIA Jetson / Orin  
- **YOLOv8‑based layout detection** (no Detectron2)  
- **Donut‑style OCR** (private, encrypted model)  
- **Open components**: CLI, schema, PDF tools, dataset utilities, training notebooks  
- **Private components** (device‑only):
  - Encrypted TensorRT models  
  - BC + DSpec mapping engine  
  - SDTM generation logic  
  - Hardware‑locked runtime  

**End‑to‑end pipeline:**  
PDF → Images → YOLO Layout Detection → OCR → Metadata Builder → JSON

---
## Detection Inference Engine Architecture
<img width="1057" height="1280" alt="architecture" src="https://github.com/user-attachments/assets/1ae279bc-f3fe-4d68-8b96-6c1a3c0a3ced" />

## 📁 Repository Structure

```
CRF_Edge/
├── annotation_engine.py
├── annotation_engine_ohne_arrow.py
├── cli.py
├── CRF/
│   └── init.py
├── crf_edge_pipeline.md
├── crf_with_annotation.py
├── crf.yaml
├── dummy_crf_generator.py
├── Images/
│   └── init.py
├── LICENSE
├── main.py
├── pdf_to_images.py
├── README.md
├── register_crf.py
├── run_inference.ipynb
├── schema.json
├── secure_data/
│   └── dummy_data.pyc
├── split_the_training_data.py
├── test_data_dummy.py
├── test_inference.ipynb
├── train_crf.ipynb
└── train_crf.py
```

---

## 🧩 Component Overview

### **1. PDF Annotation Engines**
- **annotation_engine.py**  
  CDISC Option‑A annotations **with arrows**, bounding boxes, and SDTM labels.

- **annotation_engine_ohne_arrow.py**  
  Same engine **without arrows** (clean modern style).

---

### **2. CRF Generators**
- **crf_with_annotation.py**  
  Generates multi‑page CRFs **with SDTM annotations** using dummy clinical data.

- **dummy_crf_generator.py**  
  Generates **20‑page CRFs without annotations** for dataset creation and testing.

---

### **3. PDF → Image Conversion**
- **pdf_to_images.py**  
  Converts CRF PDFs into **300 DPI PNG images** for YOLO layout detection and OCR.

---

### **4. Dataset Preparation**
- **split_the_training_data.py**  
  Splits a COCO dataset into **train/val** folders with proper JSONs.

- **test_data_dummy.py**  
  Contains dummy clinical datasets (lung, colon, skin, cardiovascular, glaucoma).

---

### **5. YOLOv8 Training & Inference**

#### **train_crf.ipynb**
Complete YOLOv8 training pipeline:
- Hugging Face dataset download  
- COCO → YOLO conversion  
- Training (YOLOv8n/s/m)  
- Visualization  

#### **run_inference.ipynb**
Runs inference on CRF images using YOLOv8 and exports:
- ONNX  
- TensorRT FP16 engine  

#### **test_inference.ipynb**
Benchmarks TensorRT engine:
- Per‑image inference time  
- Average latency  
- Standard deviation  
- CSV export  

---

### **6. Runtime & CLI**
- **cli.py** — Public CLI entrypoint  
- **main.py** — Pipeline launcher  
- **register_crf.py** — Registers CRF PDFs into the processing pipeline  

---

### **7. Schemas & Config**
- **schema.json** — Public JSON schema for CRF Metadata output  
- **crf.yaml** — YOLO dataset configuration  

---

### **8. Secure / Private Components**
- **secure_data/dummy_data.pyc**  
  Example of compiled/encrypted data.

> In production, this folder contains **encrypted TensorRT models**,  
> **BC/DSpec mapping engines**, and **SDTM logic**, locked to Jetson hardware.

---

## 🚀 End‑to‑End Pipeline Overview

1. **Generate CRF PDF**  
   Using `dummy_crf_generator.py` or `crf_with_annotation.py`.

2. **Convert PDF → Images**  
   Using `pdf_to_images.py`.

3. **Run YOLOv8 Layout Detection**  
   Using `run_inference.ipynb` or `test_inference.ipynb`.

4. **Run OCR (Donut)**  
   (Private — runs on device‑only encrypted model)

5. **Metadata Builder**  
   Uses `schema.json` to produce CRF Metadata JSON.

6. **Output**  
   Fully structured JSON ready for SDTM mapping.

---

## 🛠️ Compiling .pyc Files

To compile `test_data_dummy.py` into `.pyc`:

```bash
python -m py_compile test_data_dummy.py
```
Output appears under:

```bash
__pycache__/test_data_dummy.cpython-3xx.pyc
```

📄 License

This project is licensed under the MIT License.
See the LICENSE file for details.

📬 Contact

For collaboration or enterprise deployment inquiries, please reach out.
