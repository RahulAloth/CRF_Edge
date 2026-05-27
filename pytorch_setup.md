# NVIDIA Jetson Orin - PyTorch & Ultralytics Environment Setup Guide

This document serves as a standard operating procedure (SOP) and post-incident report detailing how the local virtual environment (`crf_env`) on the **NVIDIA Jetson Orin** (running JetPack 6 / L4T 36.5.0) was recovered and configured to support CUDA-accelerated object detection via the `ultralytics` framework.

---

## 📋 System Baseline Environment
* **Host OS:** Ubuntu 22.04 LTS (ARM64 / aarch64)
* **Hardware Architecture:** NVIDIA Jetson Orin Series
* **JetPack Version:** JetPack 6.x / L4T Core `36.5.0`
* **Virtual Environment Tool:** `venv` (Python 3.10)
* **Target Application Framework:** Ultralytics YOLO (`inference.py`)

---

## 🛠 Troubleshooting & Resolution Steps

### Issue 1: Missing PyTorch inside Virtual Environment
**Symptom:** Running the python script threw `ModuleNotFoundError: No module named 'torch'`.
**Resolution:** Standard x86 wheels via pip do not carry Jetson ARM64 CUDA binaries. The environment was synced to use NVIDIA's Jetson AI Lab index url to fetch the ARM64 wheel directly.

```bash
# 1. Activate your target environment
source /home/nyra/crf_integration/crf_env/bin/activate

# 2. Upgrade core python package handlers
pip install --upgrade pip setuptools wheel

# 3. Pull CUDA-accelerated binaries optimized for JetPack 6 (cu126 index)
pip install torch --index-url [https://pypi.jetson-ai-lab.io/jp6/cu126](https://pypi.jetson-ai-lab.io/jp6/cu126)
