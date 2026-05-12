import json
import random
import os
import shutil
from pathlib import Path

def load_coco_json(json_path):
    with open(json_path, "r") as f:
        return json.load(f)

def split_images(images, train_ratio=0.9):
    random.shuffle(images)
    split_idx = int(len(images) * train_ratio)
    return images[:split_idx], images[split_idx:]

def filter_annotations(annotations, image_ids):
    return [a for a in annotations if a["image_id"] in image_ids]

def copy_images(image_list, src_dir, dst_dir):
    os.makedirs(dst_dir, exist_ok=True)
    for img in image_list:
        src = os.path.join(src_dir, img["file_name"])
        dst = os.path.join(dst_dir, img["file_name"])
        shutil.copy(src, dst)

def save_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

def main():
    # -----------------------------
    # CONFIG
    # -----------------------------
    INPUT_JSON = "/home/rahul/crf-dataset/CRF/annotations/instances_default.json"
    IMAGES_DIR = "/home/rahul/crf-dataset/CRF/images/default"  # folder containing all CRF images
    OUTPUT_DIR = "/home/rahul/crf-dataset/processed_dataset"
    TRAIN_RATIO = 0.90
    random.seed(42)

    # -----------------------------
    # LOAD COCO JSON
    # -----------------------------
    data = load_coco_json(INPUT_JSON)
    images = data["images"]
    annotations = data["annotations"]
    categories = data["categories"]

    print(f"Loaded {len(images)} images and {len(annotations)} annotations")

    # -----------------------------
    # SPLIT IMAGES
    # -----------------------------
    train_images, val_images = split_images(images, TRAIN_RATIO)
    train_ids = {img["id"] for img in train_images}
    val_ids = {img["id"] for img in val_images}

    train_annotations = filter_annotations(annotations, train_ids)
    val_annotations = filter_annotations(annotations, val_ids)

    print(f"Train: {len(train_images)} images, {len(train_annotations)} annotations")
    print(f"Val:   {len(val_images)} images, {len(val_annotations)} annotations")

    # -----------------------------
    # CREATE OUTPUT STRUCTURE
    # -----------------------------
    train_dir = Path(OUTPUT_DIR) / "crf_train"
    val_dir = Path(OUTPUT_DIR) / "crf_val"

    (train_dir / "images").mkdir(parents=True, exist_ok=True)
    (val_dir / "images").mkdir(parents=True, exist_ok=True)

    # -----------------------------
    # COPY IMAGES
    # -----------------------------
    print("Copying training images...")
    copy_images(train_images, IMAGES_DIR, train_dir / "images")

    print("Copying validation images...")
    copy_images(val_images, IMAGES_DIR, val_dir / "images")

    # -----------------------------
    # SAVE JSON FILES
    # -----------------------------
    train_json = {
        "images": train_images,
        "annotations": train_annotations,
        "categories": categories
    }

    val_json = {
        "images": val_images,
        "annotations": val_annotations,
        "categories": categories
    }

    save_json(train_json, train_dir / "train.json")
    save_json(val_json, val_dir / "val.json")

    print("\nDataset successfully processed!")
    print(f"Output folder: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
