# ⚡ CRF‑Edge Processing Pipeline Architecture

```text
                   ┌──────────────────────────┐
                   │        CRF PDF           │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │   PDF → PNG Converter     │
                   │     (pdf_to_images.py)    │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │   YOLOv8 Layout Detector  │
                   │ (train_crf / inference)   │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │     OCR Engine (Donut)    │
                   │   (encrypted, device-only)│
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │  Semantic Extractor       │
                   │ (private, encrypted)      │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │   Metadata Builder        │
                   │     (schema.json)         │
                   └─────────────┬────────────┘
                                 │
                                 ▼
                   ┌──────────────────────────┐
                   │   CRF Metadata JSON       │
                   └──────────────────────────┘
```
# 1. YOLOv8 Layout Detection

## Purpose
Identify structural elements of the CRF page, specifically `section_header` and `sdtm_box` regions, using a fast, edge‑optimized object detection model.

## Responsibilities
- Perform object detection on each CRF page image.
- Produce deterministic bounding boxes for downstream OCR and semantic extraction.
- Run efficiently on NVIDIA Jetson hardware using TensorRT FP16 engines.

## Inputs
- PNG image generated from `pdf_to_images.py`
- YOLOv8 TensorRT engine (`best.engine`) — encrypted and device‑locked

## Processing Logic
- Load the TensorRT‑optimized YOLOv8 model.
- Run inference at 1024×1024 resolution.
- Filter detections by confidence threshold (default: 0.5).
- Normalize bounding box coordinates for downstream modules.

## Outputs
- Bounding boxes for:
  - `section_header`
  - `sdtm_box`
- Detection metadata (class, confidence, coordinates)

## Constraints / Notes
- Fully offline; no cloud inference.
- Deterministic output required for CRO compliance.
- Optimized for Jetson Orin/Nano/Xavier.

---

# 2. Crop SDTM Boxes → OCR

## Purpose
Extract textual content from detected SDTM annotation boxes.

## Responsibilities
- Crop each detected SDTM region.
- Run OCR using the Donut model (encrypted, device‑only).
- Produce raw text tokens for semantic interpretation.

## Inputs
- Bounding boxes from YOLOv8
- Original CRF page image
- Donut OCR engine (encrypted)

## Processing Logic
- Crop image regions using YOLOv8 coordinates.
- Preprocess crops (resize, normalize).
- Run Donut OCR to extract text.
- Return raw text + confidence scores.

## Outputs
- Raw OCR text for each SDTM box
- Tokenized OCR output (if required)

## Constraints / Notes
- Donut model is encrypted and cannot be exported.
- No cloud OCR allowed (PHI protection).
- OCR accuracy depends on crop quality.

---

# 3. Color‑Based Domain Mapping

## Purpose
Determine the CDISC domain (e.g., AE, DM, VS, LB) associated with each SDTM annotation based on its color.

## Responsibilities
- Read color values from SDTM box regions.
- Map RGB/HEX values to predefined CDISC domain codes.
- Provide domain labels for metadata generation.

## Inputs
- Cropped SDTM box images
- Color‑to‑domain mapping table

## Processing Logic
- Extract dominant color from each SDTM box.
- Match color to CDISC domain using threshold‑based comparison.
- Assign domain label to each variable.

## Outputs
- Domain label for each SDTM variable (e.g., `DM`, `AE`, `VS`)

## Constraints / Notes
- CRFs follow standardized color coding.
- Mapping table is configurable per sponsor.

---

# 4. Donut‑Based Semantic Extraction

## Purpose
Extract contextual meaning from CRF pages to understand relationships between fields, labels, and sections.

## Responsibilities
- Interpret OCR text in context.
- Identify field labels, section semantics, and relationships.
- Provide structured semantic entities for metadata builder.

## Inputs
- OCR text from SDTM boxes
- YOLOv8 bounding boxes
- Page‑level image context

## Processing Logic
- Use Donut encoder‑decoder architecture to interpret layout + text.
- Identify semantic roles (e.g., “Field Label”, “Section Header”).
- Link SDTM variables to their contextual meaning.

## Outputs
- Field label associations
- Section semantics
- Contextual relationships (e.g., variable → section)

## Constraints / Notes
- Semantic engine is encrypted and device‑locked.
- No external NLP services allowed.

---

# 5. Build Metadata JSON

## Purpose
Generate a structured, machine‑readable CRF Metadata JSON file compliant with CDISC/BC/DSpec requirements.

## Responsibilities
- Combine layout, OCR, and semantic data.
- Validate output against `schema.json`.
- Produce deterministic metadata for downstream SDTM pipelines.

## Inputs
- YOLOv8 detections
- OCR text
- Domain labels
- Semantic relationships

## Processing Logic
- Merge all extracted information into a unified metadata structure.
- Validate fields using JSON schema.
- Serialize to `crf_metadata.json`.

## Outputs
- `crf_metadata.json` containing:
  - Section headers  
  - SDTM variables  
  - Domains  
  - Coordinates  
  - Semantic context  

## Constraints / Notes
- Must be deterministic for regulatory workflows.
- JSON schema is public; engine logic is private.

---

# ✔ Why CROs Want This Pipeline

- **Deterministic** — same input → same output  
- **Explainable** — bounding boxes + OCR + semantic layers  
- **Reproducible** — stable across batches and devices  
- **High accuracy** — YOLOv8 + Donut + OCR  
- **Local processing** — no PHI leaves the device  
- **Hardware‑locked** — encrypted TensorRT engines tied to Jetson hardware  

This architecture is ideal for CRO deployment, regulatory workflows, and large‑scale CRF processing.

---

# 📘 Notes on Model Architecture (Updated for YOLOv8)

- Single‑stage detection → **faster** than R‑CNN  
- Excellent **small‑object performance** with 1024×1024 images  
- Native **ONNX + TensorRT export**  
- Optimized for **Jetson Orin / Nano / Xavier**  
- Deterministic batch‑mode inference  

### YOLOv8 Architecture Summary

```text
Image
 ↓
Backbone (CSPDarknet / C2f)
 ↓
Neck (FPN + PAN)
 ↓
Head (Anchor‑free detection)
 ↓
Bounding boxes + class scores
```