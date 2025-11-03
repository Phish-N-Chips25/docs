# Technical Demo Presentation

Modular presentation system for Phish'n'Chips project demo using [Marp](https://marp.app/).

## Quick Start

```bash
# First time setup
npm install

# Edit slides
vim slides/03-overview.md

# Build presentation
npm run build

# Open result
npm run open:pptx
```

## How It Works

**Modular Slides** → Each slide is a separate file in `slides/` directory
**Auto-Concatenation** → Files combine into `presentation.md` (numbered order)
**Multi-Format Output** → Generates PDF, PowerPoint, and HTML

```
slides/
├── 00-config.md          # Marp styling (not a slide)
├── 01-title.md           # Title slide
├── 02-team.md            # Team members
├── 03-overview.md        # Overview
└── ...                   # More slides (numbered)
     ↓
presentation.md           # Auto-generated
     ↓
output/
├── presentation.pdf
├── presentation.pptx
└── presentation.html
```

## Editing

### Edit a Slide

1. Open file: `slides/05-architecture-python.md`
2. Make changes
3. Run: `npm run build`

### Add a Slide

```bash
# Create new slide file (next number in sequence)
touch slides/13-new-slide.md

# Edit content
echo "## My New Slide\n\nContent here..." > slides/13-new-slide.md

# Build
npm run build
```

### Reorder Slides

Rename files with different numbers:

```bash
mv slides/10-demo.md slides/13-demo.md
npm run build
```

### Change Styling

Edit `slides/00-config.md` for CSS/theme changes.

## Commands

### NPM Scripts (Recommended)

| Command | Description |
|---------|-------------|
| `npm run build` | Build all formats (PDF/PPTX/HTML) |
| `npm run preview` | Open live preview in browser |
| `npm run open:pdf` | Open generated PDF |
| `npm run open:pptx` | Open generated PowerPoint |
| `npm run open:html` | Open generated HTML |
| `npm run clean` | Delete all generated files |

### Shell Script (Alternative)

```bash
./build.sh    # Does the same as 'npm run build'
```

Works with or without `npm install` - uses npx if npm is available, falls back to global marp.

## File Structure

```
presentations/technical-demo/
├── slides/               # Edit these files
│   ├── 00-config.md     # Configuration
│   ├── 01-title.md      # Slides (numbered for order)
│   └── ...
├── output/              # Generated files (gitignored)
├── presentation.md      # Auto-generated (gitignored)
├── concat-slides.sh     # Concatenation script
├── build.sh             # Build script
└── package.json         # NPM configuration
```

## Current Slides

1. **Title** - Project intro
2. **Team** - Team members
3. **Overview** - Both projects at a glance
4. **ENGCIA Architecture** - Java + Drools system overview
5. **ENGCIA Details** - Evidence collection & Drools engine
6. **PPROGIA Architecture** - Python + Prolog detection engine
7. **PPROGIA Details** - Knowledge base & reasoning
8. **PPROGIA Frontend** - Interactive UI (bonus feature)
9. **Demo** - Live demo instructions
10. **Learnings** - Key takeaways
11. **Conclusion** - Thank you & links

## Benefits

- **Easy editing** - Small files, no scrolling through 400+ lines
- **Team collaboration** - Edit different slides without conflicts
- **Flexible** - Add/remove/reorder slides easily
- **Clean git** - See exactly which slides changed
- **Multiple formats** - PDF for sharing, PPTX for editing, HTML for presenting

## Requirements

- **Node.js** - For npm (or use global marp)
- **Marp CLI** - Installed via `npm install`

## Troubleshooting

**"marp not found"**

```bash
npm install
```

**Changes not showing**

```bash
npm run clean
npm run build
```

**Permission denied on scripts**

```bash
chmod +x build.sh concat-slides.sh
```

## Links

- **Marp Documentation**: https://marp.app/
- **Project Repo**: https://github.com/Phish-N-Chips25/docs
