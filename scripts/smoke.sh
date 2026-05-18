#!/usr/bin/env bash
set -euo pipefail
BACKEND_URL="${BACKEND_URL:-http://127.0.0.1:4242}"

echo "Checking ForgeOS backend health..."
curl -fsS "$BACKEND_URL/api/health" | grep -q '"ok":true'

echo "Checking messages endpoint..."
curl -fsS "$BACKEND_URL/api/messages" | grep -q '"ok":true'

echo "Checking projects endpoint..."
curl -fsS "$BACKEND_URL/api/projects" | grep -q '"ok":true'

echo "Checking tools endpoint..."
curl -fsS "$BACKEND_URL/api/tools" | grep -q '"ok":true'

echo "Checking Ollama endpoint through ForgeOS..."
curl -fsS "$BACKEND_URL/api/local-models" | grep -q '"models"'

echo "ForgeOS smoke checks passed."
