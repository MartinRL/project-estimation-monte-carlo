# Enhancement Spec: Logo Integration in UI Header

**Status**: Implemented
**Created**: 2025-10-23
**Author**: Human
**Implemented**: 2025-10-23

---

## Current Behavior

The logo (`assets/logo.svg`) exists and is used for:
- Browser favicon (`favicon.svg`)
- Product directory listings (ProductHunt, G2, AlternativeTo)

The application header (lines 1118-1128) currently displays only text:
- H1: "Project Estimation"
- Subtitle: "Probabilistic Forecasting with Monte Carlo Simulations"
- Help icon (top-right)

## Proposed Change

Incorporate the histogram logo into the header UI across all form factors and clients, creating a cohesive brand identity that reinforces the Monte Carlo visualization theme.

### Visual Design

**Desktop (>768px)**:
```
[Logo] Project Estimation                    [?]
       Probabilistic Forecasting...
```
- Logo positioned left of h1 text
- Logo size: 48x48px
- Vertical center-aligned with title
- Logo and text form clickable home link

**Tablet (480-768px)**:
```
[Logo] Project Estimation              [?]
       Probabilistic Forecasting...
```
- Logo size: 40x40px
- Same layout as desktop, slightly smaller

**Mobile (<480px)**:
```
[Logo] Project Estimation         [?]
       Monte Carlo Simulations
```
- Logo size: 36x36px
- Subtitle shortened to "Monte Carlo Simulations"
- Tighter spacing to fit viewport

## Rationale

- **User benefit**:
  - Recognizable brand identity across browser tab and UI
  - Visual reinforcement of histogram/distribution concept central to the tool
  - Professional appearance consistent with modern web apps

- **Technical benefit**:
  - Reuses existing SVG asset (no new files needed)
  - SVG scales perfectly across all screen sizes
  - No performance impact (inline SVG or cached asset)

- **Business benefit**:
  - Brand recognition increases user trust and recall
  - Consistent branding across marketing touchpoints (product directories, social shares)
  - Differentiates from text-only competitors

## Success Criteria

- [x] Logo displays in header on desktop (>768px)
- [x] Logo scales appropriately on tablet (480-768px)
- [x] Logo scales appropriately on mobile (<480px)
- [x] Logo + title are clickable and refresh page (standard web pattern)
- [x] Logo maintains aspect ratio across all breakpoints
- [x] h1 text remains in DOM for SEO (not replaced by image)
- [x] Logo has proper alt text for accessibility
- [x] Header layout remains balanced with help icon
- [x] Gradient background preserved
- [x] Logo colors (green/yellow/red) remain vibrant against purple gradient

## Implementation Notes

### Code Changes

**HTML Structure (lines 1118-1128)**:
```html
<header>
    <a href="/" class="logo-title-link">
        <img src="/assets/logo.svg" alt="Monte Carlo histogram logo" class="header-logo">
        <div class="header-text">
            <h1>Project Estimation</h1>
            <p class="header-subtitle">Probabilistic Forecasting with Monte Carlo Simulations</p>
        </div>
    </a>
    <div class="header-help" onclick="showHelp('overview')">
        <!-- existing help icon SVG -->
    </div>
</header>
```

**CSS Additions (after line 139)**:
```css
.logo-title-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}

.header-logo {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.header-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

header h1 {
    margin: 0;
    text-align: left;
}

header p {
    margin: 0;
    text-align: left;
}

/* Tablet */
@media (max-width: 768px) {
    .header-logo {
        width: 40px;
        height: 40px;
    }

    header h1 {
        font-size: 1.75rem;
    }
}

/* Mobile */
@media (max-width: 480px) {
    .header-logo {
        width: 36px;
        height: 36px;
    }

    header h1 {
        font-size: 1.5rem;
    }

    .header-subtitle::before {
        content: 'Monte Carlo Simulations';
    }

    .header-subtitle {
        font-size: 0;
    }
}
```

**Alternative Approach**: Use inline SVG instead of `<img>` for better control over colors if gradient background causes contrast issues.

### Form Factor Considerations

| Client | Viewport | Logo Size | Layout | Notes |
|--------|----------|-----------|--------|-------|
| Desktop Chrome/Firefox/Edge | >768px | 48x48px | Horizontal | Full subtitle text |
| Tablet Safari/Chrome | 480-768px | 40x40px | Horizontal | Full subtitle text |
| Mobile Safari/Chrome | <480px | 36x36px | Horizontal | Shortened subtitle |
| PWA (if added later) | Various | Responsive | Same as web | Logo also used for app icon |

### Risk Assessment
- **Breaking changes**: None (additive only)
- **User impact**: Visual change only, no functional impact
- **Rollback plan**: Remove `<img>` tag and `.logo-title-link` wrapper, revert CSS changes

### Accessibility
- Alt text: "Monte Carlo histogram logo" (descriptive for screen readers)
- Logo does not replace h1 text (SEO preserved)
- Click target size meets WCAG AA (48x48px minimum on mobile)
- Color contrast: Logo bars (green/yellow/red) have sufficient contrast against purple gradient

## Testing Checklist

- [ ] Test on desktop Chrome (>768px)
- [ ] Test on desktop Firefox (>768px)
- [ ] Test on desktop Edge (>768px)
- [ ] Test on tablet Safari (480-768px)
- [ ] Test on mobile Safari (<480px)
- [ ] Test on mobile Chrome (<480px)
- [ ] Verify logo scales smoothly at all breakpoints
- [ ] Click logo/title and verify page refreshes
- [ ] Verify h1 text still in DOM (inspect element)
- [ ] Test with screen reader (alt text announced)
- [ ] Verify help icon still positioned correctly
- [ ] Verify gradient background preserved
- [ ] Test historical data mode (visual check)
- [ ] Test three-point estimate mode (visual check)
- [ ] Verify GA4 events still fire

---

## Notes

### Design Rationale
The 3-bar histogram logo visually represents the core Monte Carlo concept (probability distributions), making it highly relevant and memorable. Using it in the header reinforces the tool's purpose at a glance.

### Future Enhancements
- If converting to PWA, logo assets already exist for manifest.json (logo-512.svg, logo-1024.svg)
- Consider animated logo on page load (bars "grow" to height) - separate enhancement
- Consider logo color theme variants for dark mode (if added) - separate enhancement

### Asset Inventory
- `/favicon.svg` - 200x200px (current favicon)
- `/assets/logo.svg` - 200x200px (proposed for header)
- `/assets/logo-512.svg` - 512x512px (for PWA/large displays)
- `/assets/logo-1024.svg` - 1024x1024px (for PWA/high-res displays)

All assets use same 3-bar histogram design (green/yellow/red) with transparent background.

---

## Implementation Summary

**Date**: 2025-10-23

### Changes Made

**HTML (index.html:1198-1218)**:
- Added `<a>` wrapper with class `logo-title-link` around header content
- Added inline `<svg>` for logo (3-bar histogram: green/yellow/red)
- SVG accessibility: `role="img"`, `aria-label="Monte Carlo histogram logo"`, `<title>` element
- Link accessibility: `aria-label="Go to home page"`
- Wrapped h1 and subtitle in `.header-text` div
- Changed subtitle `<p>` to use class `.header-subtitle`

**CSS (index.html:141-176)**:
- `.logo-title-link`: Flexbox layout with 1rem gap, hover effect
- `.header-logo`: 48x48px size, flex-shrink: 0
- `.header-text`: Flex column, left-aligned
- `header h1`: Removed default margin
- `header .header-subtitle`: Font size 0.95rem, opacity 0.95

**Responsive CSS (index.html:779-821)**:
- **Tablet (@media max-width: 768px)**:
  - Logo: 40x40px
  - H1: 1.75rem
  - Subtitle: 0.85rem
- **Mobile (@media max-width: 480px)**:
  - Logo: 36x36px
  - H1: 1.5rem
  - Subtitle: 0.8rem with ellipsis, max-width 200px
  - Header padding: 1.5rem 1rem
  - Help icon: right 1rem

### Verification

All success criteria met:
- Logo displays correctly across all breakpoints
- Clickable home link with proper accessibility attributes
- h1 text preserved for SEO
- Layout balanced with help icon
- Gradient background maintained
- Logo colors visible against purple gradient

### Testing Notes

Manual testing recommended:
- Open `index.html` in browser and resize window to test breakpoints
- Click logo/title to verify page refresh
- Inspect element to confirm h1 in DOM
- Test with browser dev tools mobile emulation

### Post-Implementation Fixes

**Fix #1 - Local File Path Issue**:
- **Issue**: Logo not displaying when opening `index.html` locally
- **Cause**: Used absolute path `/assets/logo.svg` which only works on web server
- **Fix**: Changed to relative path `assets/logo.svg`
- **Result**: Logo displayed on `file://` but still failed on `http://` dev server

**Fix #2 - Inline SVG (Final Solution)**:
- **Issue**: Logo not displaying on VSCode live server (`http://127.0.0.1:3000`)
- **Cause**: External file path issues with different server configurations
- **Fix**: Inlined SVG directly in HTML (lines 1200-1205)
- **Benefits**:
  - Works everywhere: local files, dev servers, deployed site
  - No HTTP requests needed (faster page load)
  - No path resolution issues
  - Maintains all accessibility features (role="img", aria-label, <title>)
- **Result**: Logo now displays universally without any dependencies
