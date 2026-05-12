# register_crf.py
from detectron2.data.datasets import register_coco_instances

def register_crf():
    register_coco_instances(
        "crf_train",
        {},
        "crf_dataset/train.json",
        "crf_dataset/train"
    )

    register_coco_instances(
        "crf_val",
        {},
        "crf_dataset/val.json",
        "crf_dataset/val"
    )
