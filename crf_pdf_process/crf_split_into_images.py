import fitz  # PyMuPDF
from pathlib import Path

def pdf_to_images(pdf_path: str, output_dir: str, dpi: int = 200):
    """
    Convert a multi-page PDF into per-page JPEG images using MuPDF (PyMuPDF).
    Much faster than pdf2image/poppler on Jetson.

    Args:
        pdf_path (str): Path to input PDF.
        output_dir (str): Directory to store JPEG images.
        dpi (int): Resolution for conversion (150–200 recommended for YOLO).

    Returns:
        List[str]: Paths to generated JPEG files.
    """
    pdf_path = Path(pdf_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf_path)
    image_paths = []

    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=dpi)  # fast rasterization
        img_path = output_dir / f"{pdf_path.stem}_page_{i+1:03d}.jpg"
        pix.save(str(img_path))         # JPEG = much faster on Jetson
        image_paths.append(str(img_path))

    return image_paths


if __name__ == '__main__':
    pdf_path = "/home/nyra/crf_input/MC2-01-C2_aCRF.pdf"
    pdf_to_images(pdf_path, "/home/nyra/crf_images", dpi=200)
