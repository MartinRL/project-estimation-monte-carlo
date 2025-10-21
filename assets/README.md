# Assets Folder

This folder contains branding and marketing assets for Monte Carlo Estimation.

## Logo Files

### Available Sizes

All logos are the same 3-bar histogram design in different sizes:

- **`logo.svg`** (200x200px) - Original source file
- **`logo-512.svg`** (512x512px) - ✅ **USE THIS for most directory submissions**
- **`logo-1024.svg`** (1024x1024px) - High-resolution version for premium quality

**Design:** 3-bar histogram representing probability distribution

**Color palette:**
- Green bar: `#28a745`
- Yellow bar: `#ffc107`
- Red bar: `#dc3545`

**Export requirements for directories:**

| Platform | Recommended File | Required Format | Notes |
|----------|-----------------|----------------|-------|
| **G2** | `logo-512.svg` | SVG or PNG | SVG preferred, 512x512px |
| **Capterra** | `logo-512.svg` (convert to PNG) | PNG | Transparent bg, 512x512px |
| **ProductHunt** | `logo-512.svg` (convert to PNG) | PNG | Min 240x240px, square |
| **AlternativeTo** | `logo-512.svg` | SVG or PNG | SVG preferred |
| **Slant** | `logo-512.svg` (convert to PNG) | PNG | Auto-resized by platform |

### Converting SVG to PNG

**Online tools:**
- https://cloudconvert.com/svg-to-png (free, high quality)
- https://svgtopng.com/ (fast, simple)
- Figma or Canva (upload SVG, export PNG at desired size)

**Command line (if ImageMagick installed):**
```bash
# Convert 512px version to PNG (most common need)
magick convert -background none logo-512.svg logo-512.png

# Convert 1024px version to PNG (high-res)
magick convert -background none logo-1024.svg logo-1024.png
```

**Quick Start:** For G2 submission, just upload `logo-512.svg` directly (SVG preferred).

## Favicon

Favicon is stored in **root directory** as `favicon.svg` (32x32px version of the same histogram)

## Screenshots (Coming Soon)

When creating screenshots for directory submissions, save them here:

**Required screenshots:**
1. `screenshot-main-interface.png` - Input form with sample data
2. `screenshot-results.png` - Forecast cards + histogram
3. `screenshot-risk-modeling.png` - Risk section with examples
4. `screenshot-three-point-mode.png` - Alternative estimation mode
5. `screenshot-mobile.png` - Mobile responsive view

**Specs:**
- Format: PNG
- Size: 1920x1080px (16:9 ratio) or actual browser size
- Quality: High (no compression artifacts)
- Show realistic data (not placeholder text)

## Open Graph / Social Media Images (Future)

If you create OG images for link sharing:
- `og-image.png` - 1200x630px (Facebook/LinkedIn)
- `twitter-card.png` - 1200x600px (Twitter)

Currently referenced in `index.html` but files don't exist yet.

## Demo Video (Future)

If you record a demo video:
- Save source files here
- Upload to YouTube/Vimeo for embedding
- Link from directory submissions

---

**Note:** This folder is for source assets. Generated/compressed versions for production should be exported as needed. The SVG files are vector and can be scaled to any size without quality loss.
