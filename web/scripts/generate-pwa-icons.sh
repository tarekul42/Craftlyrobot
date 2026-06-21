#!/usr/bin/env bash
#
# Generate PWA icons from a source logo.
#
# Prerequisites: bun add -g pwa-asset-generator
#
# Usage: bun run scripts/generate-pwa-icons.sh
#
# This generates:
#   web/public/icon-192.png
#   web/public/icon-512.png
#   web/public/icon-maskable-512.png
#   web/public/apple-touch-icon.png
#   web/public/favicon.ico
#

set -e

SOURCE_IMAGE="web/public/logo.png"
OUTPUT_DIR="web/public"

if [ ! -f "$SOURCE_IMAGE" ]; then
  echo "Error: Source image not found at $SOURCE_IMAGE"
  echo "Place your logo (PNG, 512x512 or larger) at web/public/logo.png"
  exit 1
fi

echo "Generating PWA icons from $SOURCE_IMAGE..."

# Generate icons using pwa-asset-generator
bunx pwa-asset-generator \
  "$SOURCE_IMAGE" \
  "$OUTPUT_DIR" \
  --icon-only \
  --type png \
  --opaque false

echo ""
echo "Done! Icons generated in $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "  1. Verify the icons look correct"
echo "  2. Delete the source logo if not needed: rm $SOURCE_IMAGE"
echo "  3. The manifest.ts already references these icons"
