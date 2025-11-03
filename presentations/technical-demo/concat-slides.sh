#!/bin/bash

# Phish'n'Chips Technical Demo - Slide Concatenation Script
# Combines individual slide files into a single presentation.md

set -e  # Exit on error

SLIDES_DIR="slides"
OUTPUT_DIR="output"
OUTPUT_FILE="${OUTPUT_DIR}/presentation.md"

echo "📝 Concatenating slides into ${OUTPUT_FILE}..."

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if slides directory exists
if [ ! -d "$SLIDES_DIR" ]; then
    echo "❌ Error: ${SLIDES_DIR}/ directory not found!"
    echo "Make sure you're in the correct directory."
    exit 1
fi

# Remove old presentation.md if it exists
rm -f "$OUTPUT_FILE"

# Find all .md files in slides/ and sort them numerically
slide_files=$(find "$SLIDES_DIR" -name "*.md" -type f | sort)

# Check if any slides were found
if [ -z "$slide_files" ]; then
    echo "❌ Error: No .md files found in ${SLIDES_DIR}/"
    exit 1
fi

# Concatenate all slides
first_file=true
config_processed=false

for slide in $slide_files; do
    filename=$(basename "$slide")

    # Special handling for config file (00-config.md)
    if [[ "$filename" == "00-config.md" ]]; then
        # Config file: copy as-is (includes frontmatter, no separator needed)
        cat "$slide" > "$OUTPUT_FILE"
        config_processed=true
        echo "  ✓ Added: $slide (config)"
        continue
    fi

    # Regular slide files
    if [ "$config_processed" = false ] && [ "$first_file" = true ]; then
        # No config file, first regular slide gets no separator
        cat "$slide" > "$OUTPUT_FILE"
        first_file=false
    else
        # Add separator before slide content
        echo "" >> "$OUTPUT_FILE"
        echo "---" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        cat "$slide" >> "$OUTPUT_FILE"
    fi
    echo "  ✓ Added: $slide"
done

echo ""
echo "✅ Done! Created ${OUTPUT_FILE} from $(echo "$slide_files" | wc -w | tr -d ' ') slide files"
echo ""
echo "Next steps:"
echo "  npm run build      # Generate presentation outputs"
echo "  npm run preview    # Preview in browser"
