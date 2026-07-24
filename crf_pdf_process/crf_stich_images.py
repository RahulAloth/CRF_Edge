from pathlib import Path
from PIL import Image

def images_to_pdf(images_dir: str, output_pdf: str):
    """
    Combine all JPG images in a directory into a single PDF.

    Args:
        images_dir (str): Directory containing JPG images.
        output_pdf (str): Output PDF file path.

    Returns:
        str: Path to the generated PDF.
    """
    images_dir = Path(images_dir)
    jpg_files = sorted(images_dir.glob("*.jpg"))

    if not jpg_files:
        raise ValueError("No JPG files found in the directory.")

    # Open first image
    first_image = Image.open(jpg_files[0]).convert("RGB")

    # Open remaining images
    image_list = [Image.open(img).convert("RGB") for img in jpg_files[1:]]

    # Save into a single PDF
    first_image.save(output_pdf, save_all=True, append_images=image_list)

    return output_pdf


if __name__ == '__main__':
    input_dir = "/home/nyra/crf_images"
    output_pdf = "/home/nyra/crf_output/combined.pdf"

    Path("/home/nyra/crf_output").mkdir(parents=True, exist_ok=True)

    images_to_pdf(input_dir, output_pdf)
