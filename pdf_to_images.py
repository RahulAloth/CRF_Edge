# CRF Edge — Privacy‑Preserving CRF → Metadata Pipeline (Jetson/Orin)

# A modular, open‑framework pipeline for converting CRF PDFs into structured CRF Metadata JSON.
# All AI intelligence (layout models, OCR/Donut, BC/DSpec mapping, SDTM logic) runs **fully on‑device**
# using encrypted, hardware‑locked engines deployed on NVIDIA Jetson / Orin edge devices.
# Auther : Rahul Aloth Rajan.
# crf_edge/extract/pdf_to_images.py

import os
from pathlib import Path
from pdf2image import convert_from_path

def pdf_to_images(pdf_path: str, output_dir: str, dpi: int = 300):
    """
    Convert a multi-page CRF PDF into per-page PNG images.

    Args:
        pdf_path (str): Path to input PDF.
        output_dir (str): Directory to store PNG images.
        dpi (int): Resolution for conversion (300 recommended for OCR/layout).

    Returns:
        List[str]: Paths to generated PNG files.
    """
    pdf_path = Path(pdf_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    pages = convert_from_path(str(pdf_path), dpi=dpi)

    image_paths = []
    for i, page in enumerate(pages):
        img_path = output_dir / f"{pdf_path.stem}_page_{i+1:03d}.png"
        page.save(img_path, "PNG")
        image_paths.append(str(img_path))

    return image_paths

if __name__ == '__main__':
    pdf_path = "./CRF/crf_cardiovascular.pdf"
    pdf_to_images(pdf_path, "./Images", dpi=300)

