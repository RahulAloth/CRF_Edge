#!/bin/bash

echo "Starting backend..."
python3 -m uvicorn main:app --reload --port 8000
wait

