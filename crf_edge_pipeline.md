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

