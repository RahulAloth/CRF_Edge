# ⚡ CRF‑Edge Processing Pipeline 

This pipeline is designed for **high‑accuracy**, **batch‑mode**, **hardware‑locked** CRF processing — ideal for CROs where determinism, reproducibility, and explainability are mandatory.

---

## 1. Detectron2 Faster R‑CNN  
**Task:** Detect `section_header` and `sdtm_box` bounding boxes  
**Why:** Highest accuracy for small CRF elements

Output:
- Bounding boxes for section headers  
- Bounding boxes for SDTM annotation regions  

---

## 2. Crop SDTM Boxes → OCR  
**Task:** Extract variable names from detected SDTM boxes  
**Tools:** Tesseract / Donut OCR  
**Why:** CROs require precise variable extraction

Output:
- Raw text for each SDTM annotation box  

---

## 3. Color‑Based Domain Mapping  
**Task:** Map each SDTM annotation to its CDISC domain  
**Method:** Use color of the SDTM box (e.g., AE, DM, VS, LB)  
**Why:** CRFs use color‑coded SDTM annotations

Output:
- Domain label for each SDTM variable  

---

## 4. Donut / LayoutLM Semantic Extraction  
**Task:** Extract contextual meaning from CRF pages  
**Why:** Required for metadata generation and BC mapping

Output:
- Field labels  
- Section semantics  
- Contextual relationships  

---

## 5. Build Metadata JSON  
**Task:** Combine all extracted information into a structured JSON  
**Why:** CROs need machine‑readable metadata for downstream SDTM/BC pipelines

Output:
- `crf_metadata.json` containing:
  - Section headers  
  - SDTM variables  
  - Domains  
  - Coordinates  
  - Semantic context  

---

# ✔ Why CROs Want This Pipeline

- **Deterministic** — same input → same output  
- **Explainable** — bounding boxes + OCR + semantic layers  
- **Reproducible** — stable across batches and devices  
- **High accuracy** — Detectron2 + Donut + OCR  
- **Local processing** — no PHI leaves the device  
- **Hardware‑locked** — encrypted TensorRT engines tied to Jetson J40  

This architecture is ideal for CRO deployment, regulatory workflows, and large‑scale CRF processing.


-------

# 📘 Understand R‑CNN in the Context of Detectron2

Detectron2 is Facebook AI Research’s (FAIR) next‑generation library for object detection and segmentation.  
It implements the entire **R‑CNN family** of models, which form the backbone of modern document‑layout and CRF‑annotation detection systems.

This note explains **what R‑CNN is**, how it evolved, and how Detectron2 uses it internally.

---

## 🧠 1. What Is R‑CNN?

**R‑CNN (Region‑Based Convolutional Neural Network)** is a deep‑learning architecture introduced by Ross Girshick (FAIR) for **object detection**.  
Instead of scanning the entire image pixel‑by‑pixel, R‑CNN first proposes *regions of interest* and then classifies them.

R‑CNN introduced two key ideas:

1. **Region Proposals**  
   Use Selective Search to generate ~2,000 candidate bounding boxes.

2. **CNN Feature Extraction**  
   Each region is cropped, resized, and passed through a CNN to extract features.

3. **Classification + Bounding Box Regression**  
   - SVM classifier → object category  
   - Regressor → refine bounding box coordinates  

This architecture became the foundation for all modern detectors.

---

## 🧬 2. Evolution of R‑CNN → Detectron2 Models

Detectron2 implements the *entire* R‑CNN family:

### **R‑CNN (2013)**  
- Region proposals (Selective Search)  
- CNN per region  
- Accurate but slow  

### **Fast R‑CNN (2015)**  
- Shared CNN backbone  
- ROI Pooling  
- Much faster  

### **Faster R‑CNN (2015)**  
- Replaces Selective Search with **Region Proposal Network (RPN)**  
- End‑to‑end trainable  
- This is the model you use for CRF annotation detection  

### **Mask R‑CNN (2017)**  
- Adds segmentation masks  
- Used for pixel‑level annotation  

Detectron2 provides optimized implementations of all of these.

---

## ⚙️ 3. How Detectron2 Implements R‑CNN

Detectron2 uses a modular architecture:


# 📘 Understanding R‑CNN in the Context of Detectron2

Detectron2 is Facebook AI Research’s (FAIR) next‑generation library for object detection and segmentation.  
It implements the entire **R‑CNN family** of models, which form the backbone of modern document‑layout and CRF‑annotation detection systems.

This note explains **what R‑CNN is**, how it evolved, and how Detectron2 uses it internally.

---

## 🧠 1. What Is R‑CNN?

**R‑CNN (Region‑Based Convolutional Neural Network)** is a deep‑learning architecture introduced by Ross Girshick (FAIR) for **object detection**.  
Instead of scanning the entire image pixel‑by‑pixel, R‑CNN first proposes *regions of interest* and then classifies them.

R‑CNN introduced two key ideas:

1. **Region Proposals**  
   Use Selective Search to generate ~2,000 candidate bounding boxes.

2. **CNN Feature Extraction**  
   Each region is cropped, resized, and passed through a CNN to extract features.

3. **Classification + Bounding Box Regression**  
   - SVM classifier → object category  
   - Regressor → refine bounding box coordinates  

This architecture became the foundation for all modern detectors.

---

## 🧬 2. Evolution of R‑CNN → Detectron2 Models

Detectron2 implements the *entire* R‑CNN family:

### **R‑CNN (2013)**  
- Region proposals (Selective Search)  
- CNN per region  
- Accurate but slow  

### **Fast R‑CNN (2015)**  
- Shared CNN backbone  
- ROI Pooling  
- Much faster  

### **Faster R‑CNN (2015)**  
- Replaces Selective Search with **Region Proposal Network (RPN)**  
- End‑to‑end trainable  
- This is the model you use for CRF annotation detection  

### **Mask R‑CNN (2017)**  
- Adds segmentation masks  
- Used for pixel‑level annotation  

Detectron2 provides optimized implementations of all of these.

---

## ⚙️ 3. How Detectron2 Implements R‑CNN

Detectron2 uses a modular architecture:
```Code
Backbone (ResNet, Swin, etc.)
↓
Feature Pyramid Network (FPN)
↓
Region Proposal Network (RPN)
↓
ROIAlign
↓
ROI Heads (classification + bbox regression)
```

### Key Components

- **Backbone**  
  Extracts multi‑scale features (e.g., ResNet‑50).

- **FPN**  
  Improves detection of small objects (critical for CRF SDTM boxes).

- **RPN**  
  Generates region proposals directly from feature maps.

- **ROIAlign**  
  Precisely extracts features for each proposed region.

- **ROI Heads**  
  - Classifies region  
  - Refines bounding box  
  - (Optional) predicts masks  

This architecture is ideal for **document layout analysis**, **CRF annotation detection**, and **small object detection**.

---

## 🎯 4. Why R‑CNN (Faster R‑CNN) Is Ideal for CRF Annotation Detection

Your CRF dataset contains:

- `section_header`  
- `sdtm_box`  

These are **small, high‑precision bounding boxes**.  
Faster R‑CNN is the best model for this because:

- It handles **small objects** extremely well  
- It is **more accurate** than YOLO for document layouts  
- It is **deterministic**, which CROs require  
- It integrates perfectly with Detectron2’s training pipeline  
- It exports cleanly to ONNX → TensorRT for Jetson J40  

---

## 🔗 5. Public References

- Detectron2 GitHub  
  https://github.com/facebookresearch/detectron2

- Original R‑CNN Paper (Girshick et al.)  
  https://arxiv.org/abs/1311.2524

- Faster R‑CNN Paper  
  https://arxiv.org/abs/1506.01497

- Mask R‑CNN Paper  
  https://arxiv.org/abs/1703.06870

---

## 📌 6. Summary

R‑CNN is the foundation of Detectron2’s object detection models.  
For your CRF‑Edge pipeline:

- **Faster R‑CNN** is the correct choice  
- It gives **maximum accuracy**  
- It is ideal for **batch processing**  
- It is perfect for **CRO‑grade reproducibility**  
- It integrates cleanly with **TensorRT** on Jetson J40  

This is why Detectron2 is the right engine for your commercial CRF product.

