# 🧩 Project Pipeline

You are building a **full CDISC automation engine**:

1. **CRF PDF ingestion**
2. **Field detection + annotation extraction**
3. **CRF Metadata JSON generation**
4. **Mapping to BCs / SDTM**
5. **Code generation (SDTM, ADaM, checks)**
6. **Validation (rules, conformance)**
7. **Submission package generation**

---

# 🔥 Claude Workflow

Claude is strongest in **reasoning, mapping, transformation, and code generation**.

Below is the exact breakdown.

---

## ✅ 1. CRF → Annotation reasoning (semi‑automated)

Claude can:

- Interpret CRF pages  
- Understand field labels  
- Suggest annotations  
- Suggest SDTM variables  
- Suggest BCs  
- Suggest controlled terminology  
- Suggest mapping logic  

Claude is extremely good at **semantic interpretation**.

But Claude **cannot** detect bounding boxes or extract coordinates — that is your OCR/vision pipeline.

**Conclusion:**  
- Claude = *semantic brain*  
- Your system = *vision + extraction engine*

---

## ✅ 2. CRF Metadata JSON generation

Claude can:

- Convert extracted fields into structured JSON  
- Normalize field names  
- Infer datatypes  
- Infer units  
- Infer controlled terminology  
- Suggest BC mappings  

This is a **perfect use case** for Claude.

---

## ⭐ 3. BC Mapping + SDTM Mapping (Claude is extremely strong here)

This is where Claude shines.

Claude can:

- Map CRF fields → BCs  
- Map BCs → SDTM variables  
- Generate SDTM mapping specifications  
- Generate transformation logic  
- Generate derivations  
- Generate controlled terminology assignments  
- Generate value‑level metadata  

This is the **heart of CDISC 360**, and Claude is excellent at it.

---

## ⭐ 4. Code Generation (Claude is one of the best models for this)

Claude can generate:

- SDTM dataset creation code (Python, SAS, R)  
- ADaM derivation code  
- Edit checks  
- Validation rules  
- Define‑XML fragments  
- Dataset specifications  
- Transformation pipelines  

Claude is extremely strong at **long‑context code generation**, especially when you feed:

- CRF JSON  
- BC JSON  
- Mapping JSON  
- SDTM specs  

This is where Claude gives you **maximum value**.

---

## ⭐ 5. Validation logic generation

Claude can generate:

- Pinnacle 21‑style rules  
- Conformance checks  
- Value‑level checks  
- Cross‑dataset checks  
- Missingness rules  
- Temporal consistency rules  

This is a **huge time saver**.

---

## ⭐ 6. Submission package generation

Claude can generate:

- Define‑XML  
- Reviewer’s Guide text  
- Dataset descriptions  
- Metadata tables  
- Traceability documentation  

This is another area where Claude is extremely useful.

---

# ❌ Where Claude cannot help (your core innovation)

These parts **cannot** be done by Claude:

---

## ❌ 1. PDF → field extraction

Claude cannot:

- Detect bounding boxes  
- Extract coordinates  
- Parse tables  
- Identify checkboxes  
- Extract layout structure  

This requires:

- OCR  
- LayoutLM / Donut / PaddleOCR  
- Your custom extraction logic  

This is your **unique value**.

---

## ❌ 2. Annotation overlay generation

Claude cannot:

- Draw annotations  
- Generate aCRF PDFs  
- Place variable names on the PDF  

This is your **rendering engine**.

---

## ❌ 3. Full automation without guardrails

Claude needs:

- Your JSON schema  
- Your validation rules  
- Your mapping templates  
- Your CDISC library integration  

Claude is the **reasoning engine**, not the **orchestration engine**.

---

# 🎯 Final Answer (specific to YOUR project)

| Stage | Claude Value | Notes |
|-------|--------------|-------|
| CRF extraction | ❌ Low | Your OCR/vision pipeline does this |
| Annotation reasoning | ⭐ High | Claude can infer meaning + mappings |
| CRF JSON generation | ⭐ High | Claude can structure metadata |
| BC mapping | ⭐⭐⭐ Very High | Claude is excellent here |
| SDTM mapping | ⭐⭐⭐ Very High | Claude can automate 70–80% |
| Code generation | ⭐⭐⭐ Very High | Claude is one of the best models |
| Validation rules | ⭐⭐⭐ Very High | Claude can generate rules |
| Submission docs | ⭐⭐⭐ Very High | Claude can write all metadata text |


----- CRF-------------
# 📌 TODO — CDISC 360i: Direct BC + DSpec Generation Pipeline

## ✅ 1. Input: CRF JSON (from YOLO)
- [ ] Load YOLO‑generated CRF JSON  
- [ ] Extract field text, units, bounding boxes  
- [ ] Validate JSON structure  
- [ ] Remove empty or low‑confidence fields  

---

## 🔧 2. Normalize CRF Text (Required before BC/DSpec)
- [ ] Clean OCR noise (typos, broken tokens, casing)  
- [ ] Standardize units (mg/dL → mg/dL, %, etc.)  
- [ ] Expand abbreviations (Hb → Hemoglobin)  
- [ ] Remove garbage characters  
- [ ] Convert synonyms to canonical CDISC terms  
- [ ] Use MedicalBERT + ChromaDB to:
  - [ ] Retrieve closest COSMoS terms  
  - [ ] Replace noisy text with normalized text  

---

## 🧠 3. RAG Retrieval (MedicalBERT + ChromaDB)
For each normalized CRF field:
- [ ] Embed field text using MedicalBERT  
- [ ] Query ChromaDB for:
  - [ ] BC definitions  
  - [ ] SDTM variables  
  - [ ] Controlled Terminology  
  - [ ] DEC / Value‑Level Metadata  
- [ ] Collect top‑k relevant rows  
- [ ] Prepare RAG context block for LLM  

---

## 🤖 4. GenAI (Mistral) — Generate Two JSONs
For each CRF field, generate:

### **BC JSON**
- [ ] bc_name  
- [ ] bc_id  
- [ ] description  
- [ ] data_type  
- [ ] units  
- [ ] codelist / CT  
- [ ] SDTM mapping  
- [ ] Value‑level metadata  

### **DSpec JSON**
- [ ] Dataset name (domain)  
- [ ] Variable definitions  
- [ ] Origin (CRF / Derived / Assigned)  
- [ ] Codelists  
- [ ] BC linkage (bc_ref)  
- [ ] Implementation metadata  

---

## 📤 5. Output
- [ ] Save final output as:
  - `bc_json_<field>.json`
  - `dspec_json_<field>.json`
- [ ] Validate JSON schema  
- [ ] Store in `/output/cdisc360i/`  

---

## 🧪 6. Validation
- [ ] Check BC JSON against COSMoS definitions  
- [ ] Check DSpec JSON against SDTM IG rules  
- [ ] Ensure units match CT  
- [ ] Ensure variable roles match domain  
- [ ] Ensure BC ↔ DSpec linkage is correct  

---

## 🚀 7. Final Integration
- [ ] Combine all BC JSONs into a BC package  
- [ ] Combine all DSpec JSONs into a dataset specification  
- [ ] Prepare for CDISC 360i ingestion  
