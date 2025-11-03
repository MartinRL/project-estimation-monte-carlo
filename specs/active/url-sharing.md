# URL-Based Forecast Sharing

## Status: In Development

## Objective
Allow users to share their forecast configuration via URL parameters - receiver opens the link and sees the same forecast setup, ready to generate or modify.

## Technical Approach: Plain Text Query Parameters

### Why Plain Text Over Base64 JSON
- **Shorter URLs**: 100-600 chars vs 400-800 with Base64
- **Human readable**: Easy to debug and modify
- **No dependencies**: No encoding libraries needed
- **Progressive**: Can omit default values
- **Well under limits**: Max ~600 chars vs 2000 char practical limit

## URL Parameter Specification

### Compact Parameter Names
| Parameter | Description | Example |
|-----------|-------------|---------|
| `m` | Mode: 'e' (estimate) or 'd' (data) | `m=e` |
| `scl` | Story count low (min) | `scl=20` |
| `sch` | Story count high (max) | `sch=40` |
| `srl` | Split rate low | `srl=1.2` |
| `srh` | Split rate high | `srh=1.5` |
| `fp` | Focus percentage | `fp=80` |
| **Three-Point Mode** | | |
| `tl` | Throughput low (pessimistic) | `tl=2` |
| `th` | Throughput high (optimistic) | `th=8` |
| `tm` | Throughput most likely | `tm=5` |
| **Historical Mode** | | |
| `hd` | Historical data (comma-separated) | `hd=3,5,4,6,7` |
| **Risks** | | |
| `r{n}p` | Risk n probability (%) | `r0p=20` |
| `r{n}i` | Risk n impact min | `r0i=5` |
| `r{n}a` | Risk n impact max | `r0a=10` |
| `r{n}d` | Risk n description (optional) | `r0d=Integration` |

### Example URLs

**Simple Three-Point Estimate:**
```
https://montecarloestimation.com/?m=e&scl=20&sch=40&tl=2&th=8&tm=5
```
(68 characters total)

**With Risks:**
```
https://montecarloestimation.com/?m=e&scl=30&sch=50&srl=1.2&srh=1.8&fp=75&tl=3&th=10&tm=6&r0p=20&r0i=5&r0a=10&r1p=30&r1i=10&r1a=20
```
(143 characters total)

**Historical Data:**
```
https://montecarloestimation.com/?m=d&scl=40&sch=60&hd=3,5,4,6,3,7,5,4,6,5&fp=85
```
(82 characters total)

## UX Design Specifications

### Share Button Design
- **Icon**: Use standard share symbol (SVG or Unicode ⤴️ U+2934)
- **Text**: "Share" with icon
- **Location**: To the right of "Generate Forecast" button (inline)
- **Color**: Secondary action style (#6c757d default, #5a6268 hover)
- **Visibility**: Hidden initially, shown after forecast generation
- **Size**: Same height as Generate button, ~100px width

### Visual Feedback Flow
1. **Initial State**: Button hidden
2. **After Forecast**: Button appears with "⤴️ Share" text
3. **On Click**:
   - Copy URL to clipboard
   - Button text changes to "✓ Copied!"
   - Background color shifts to success green (#28a745)
   - Disabled state for 2 seconds
4. **Reset**: Returns to "⤴️ Share" after 2 seconds

### Fallback for Older Browsers
If clipboard API unavailable:
- Show modal with URL pre-selected
- Instructions: "Copy this link to share your forecast configuration"
- Manual copy button as backup

## Implementation Tasks

### 1. ✅ Create URL Serialization Function
**Location**: After line 1391 (after trackEvent function)
```javascript
function serializeToURL() {
  const params = new URLSearchParams();

  // Mode
  params.set('m', mode === 'estimate' ? 'e' : 'd');

  // Common parameters (skip defaults)
  const scl = parseInt(document.getElementById('storyCountLow').value);
  const sch = parseInt(document.getElementById('storyCountHigh').value);
  if (scl !== 20) params.set('scl', scl);
  if (sch !== 40) params.set('sch', sch);

  // ... continue for all parameters

  return window.location.origin + '/?' + params.toString();
}
```

### 2. ✅ Create URL Deserialization Function
**Location**: After serializeToURL function
```javascript
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);

  if (!params.has('m')) return false; // No config in URL

  // Set mode
  const modeParam = params.get('m');
  mode = modeParam === 'e' ? 'estimate' : 'data';
  updateModeUI();

  // Load common parameters with defaults
  document.getElementById('storyCountLow').value = params.get('scl') || '20';
  document.getElementById('storyCountHigh').value = params.get('sch') || '40';

  // ... continue for all parameters

  return true; // Successfully loaded
}
```

### 3. ✅ Add Share Button HTML
**Location**: After Generate Forecast button (line ~1353)
```html
<button type="button"
        id="shareButton"
        class="share-btn"
        style="display: none;"
        onclick="shareConfiguration()">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
  <span id="shareButtonText">Share</span>
</button>
```

### 4. ✅ Add CSS Styling
**Location**: In <style> section after button styles (~line 500)
```css
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
}

.share-btn:hover:not(:disabled) {
  background: #5a6268;
}

.share-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.share-btn.copied {
  background: #28a745;
}

.button-row {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
```

### 5. ✅ Implement Copy to Clipboard
**Location**: After URL functions
```javascript
async function shareConfiguration() {
  const url = serializeToURL();

  try {
    await navigator.clipboard.writeText(url);

    // Visual feedback
    const button = document.getElementById('shareButton');
    const buttonText = document.getElementById('shareButtonText');
    const originalText = buttonText.textContent;

    button.classList.add('copied');
    buttonText.textContent = 'Copied!';
    button.disabled = true;

    setTimeout(() => {
      button.classList.remove('copied');
      buttonText.textContent = originalText;
      button.disabled = false;
    }, 2000);

    trackEvent('share_forecast', {
      'event_category': 'engagement',
      'url_length': url.length
    });
  } catch (err) {
    // Fallback for older browsers
    showShareModal(url);
  }
}
```

### 6. ✅ Modify Page Load
**Location**: Replace window.addEventListener at line 2301
```javascript
window.addEventListener('load', function() {
  // Try to load configuration from URL
  if (loadFromURL()) {
    trackEvent('load_from_url', {
      'event_category': 'engagement',
      'event_label': 'success'
    });
  }

  // Existing ad observer code...
});
```

### 7. ✅ Show Share Button After Forecast
**Location**: In displayResults() function after line 2155
```javascript
// Show share button after results are displayed
document.getElementById('shareButton').style.display = 'inline-flex';
```

### 8. ✅ Handle Mode UI Updates
**Location**: New function after setMode
```javascript
function updateModeUI() {
  // Update toggle buttons to reflect current mode
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = mode === 'estimate'
    ? document.querySelector('.toggle-btn:first-child')
    : document.querySelector('.toggle-btn:last-child');
  activeBtn.classList.add('active');

  // Show/hide sections
  document.getElementById('dataSection').style.display =
    mode === 'data' ? 'block' : 'none';
  document.getElementById('estimateSection').style.display =
    mode === 'estimate' ? 'block' : 'none';
}
```

### 9. ✅ Smart Defaults Implementation
Skip default values from URL to keep it short:
- Story count: 20-40
- Split rate: 1.0-1.5
- Focus: 80%
- Risks: none

### 10. ✅ Comprehensive Testing
- [ ] Basic three-point estimate share/load
- [ ] Historical data mode share/load
- [ ] Configuration with 1 risk
- [ ] Configuration with 5 risks
- [ ] Malformed URL handling
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] URL length validation (<2000 chars)
- [ ] Analytics event verification
- [ ] Clipboard API fallback test

## Analytics Events

### share_forecast
Fired when user clicks share button
```javascript
{
  'event_category': 'engagement',
  'event_action': 'share_forecast',
  'url_length': 145,
  'mode': 'estimate',
  'has_risks': true,
  'risk_count': 2
}
```

### load_from_url
Fired when page loads with URL parameters
```javascript
{
  'event_category': 'engagement',
  'event_action': 'load_from_url',
  'event_label': 'success' // or 'failed'
}
```

## Edge Cases to Handle

1. **URL Too Long** (>2000 chars)
   - Truncate risk descriptions
   - Show warning if still too long

2. **Invalid Parameters**
   - Gracefully ignore invalid values
   - Use defaults for missing required params

3. **Version Mismatch**
   - Future: Add version parameter
   - Handle old URL formats gracefully

## Success Metrics

- ✅ Average URL length < 200 characters
- ✅ Share button click rate > 5% of forecasts
- ✅ Load success rate > 95%
- ✅ Zero JavaScript errors in production
- ✅ Page load time impact < 50ms

## Future Enhancements

1. **URL Shortening Service**
   - Integrate bit.ly or custom shortener
   - Store full config server-side

2. **QR Code Generation**
   - For sharing in presentations
   - Use QRCode.js library

3. **Social Sharing**
   - Pre-formatted messages for Slack/Teams
   - Twitter card metadata

4. **Save/Load Scenarios**
   - Named configurations
   - Browser localStorage
   - Export/import JSON files