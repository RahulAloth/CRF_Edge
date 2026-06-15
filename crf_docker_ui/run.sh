#!/bin/bash
npm run dev
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

wait

