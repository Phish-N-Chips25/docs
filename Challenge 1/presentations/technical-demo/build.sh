#!/bin/bash

# Phish'n'Chips Technical Demo - Build Script
# Concatenates slides and generates all presentation formats

set -e  # Exit on error

echo "🎯 Building Phish'n'Chips Technical Demo Presentation..."
echo ""

# Step 1: Concatenate slides
if [ -f "concat-slides.sh" ]; then
    echo "📝 Step 1: Concatenating slides..."
    ./concat-slides.sh
    echo ""
else
    echo "⚠️  Warning: concat-slides.sh not found, skipping concatenation"
    echo ""
fi

# Check if presentation.md exists in output (either generated or manual)
if [ ! -f "output/presentation.md" ]; then
    echo "❌ Error: output/presentation.md not found!"
    echo "Make sure slides/ directory exists or run concat-slides.sh first."
    exit 1
fi

# Step 2: Generate outputs
echo "🎨 Step 2: Generating presentation outputs..."
echo ""

# Check if marp is available (try npx first, then global)
if command -v npx &> /dev/null && [ -f "package.json" ]; then
    MARP="npx -y @marp-team/marp-cli"
elif command -v marp &> /dev/null; then
    MARP="marp"
else
    echo "❌ Error: Marp CLI is not available!"
    echo ""
    echo "Install it with:"
    echo "  npm install        # For local install (recommended)"
    echo "  OR"
    echo "  npm install -g @marp-team/marp-cli  # For global install"
    exit 1
fi

# Build all formats
echo "📄 Generating PDF..."
$MARP output/presentation.md --pdf --allow-local-files --no-stdin -o output/presentation.pdf

echo "📊 Generating PowerPoint..."
$MARP output/presentation.md --pptx --allow-local-files --no-stdin -o output/presentation.pptx

echo "🌐 Generating HTML..."
$MARP output/presentation.md --html --no-stdin -o output/presentation.html

echo ""
echo "✅ Done! Generated files in output/ directory:"
echo "   - output/presentation.pdf"
echo "   - output/presentation.pptx"
echo "   - output/presentation.html"
echo ""
echo "To open a file:"
echo "  open output/presentation.pdf"
echo "  open output/presentation.pptx"
echo "  open output/presentation.html"
