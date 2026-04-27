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
