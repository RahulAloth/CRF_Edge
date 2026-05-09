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
