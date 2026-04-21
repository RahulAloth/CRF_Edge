# crf_edge/cli.py
import argparse
from crf_edge.api.crf_api import run_crf_pipeline

def main():
    parser = argparse.ArgumentParser(
        description="CRF → CRF Metadata JSON (edge‑locked pipeline)"
    )
    parser.add_argument("input_pdf", help="Annotated CRF PDF")
    parser.add_argument("--output-json", required=True, help="Output CRF metadata JSON")
    args = parser.parse_args()

    run_crf_pipeline(args.input_pdf, args.output_json)

if __name__ == "__main__":
    main()
