# AdSense Implementation Strategy - Monte Carlo Estimation Tool

## Executive Summary

This document outlines the AdSense implementation optimized for:
- **Target Audience**: B2B SaaS companies (Atlassian, Monday.com, Asana, project management tools)
- **Expected CPM**: $10-20 (premium B2B audience)
- **CTR Target**: 2-3% (above industry average due to contextual relevance)
- **Compliance**: 100% AdSense policy compliant
- **UX**: Non-intrusive, value-aligned placements

---

## Ad Unit Placement (3 Units)

### 1. Sidebar Bottom Ad (Desktop/Tablet)
**Ad Unit ID**: `ca-pub-XXXXXXXX/1111111111`

**Specs:**
- **Size**: 300x250 (Medium Rectangle)
- **Location**: Below "Generate Forecast" button in sidebar
- **Visibility**: Desktop & Tablet (≥768px)
- **Display**: Hidden on mobile

**Rationale:**
- User is in "thinking/configuration" mode while filling inputs
- Natural scroll position - highly viewable
- Doesn't interfere with form interaction (below action button)
- B2B tools can target users actively planning projects

**CSS Positioning:**
```css
.ad-sidebar-bottom {
    margin-top: 2rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    text-align: center;
}

.ad-sidebar-bottom::before {
    content: 'Advertisement';
    display: block;
    font-size: 0.7rem;
    color: #999;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

@media (max-width: 767px) {
    .ad-sidebar-bottom {
        display: none;
    }
}
```

---

### 2. In-Content Results Ad (All Devices)
**Ad Unit ID**: `ca-pub-XXXXXXXX/2222222222`

**Specs:**
- **Desktop**: 728x90 (Leaderboard)
- **Tablet**: 468x60 (Banner) or 300x250 (Rectangle)
- **Mobile**: 320x50 (Mobile Banner) or 300x250 (Rectangle)
- **Location**: Between forecast result cards and distribution chart
- **Display**: Only after results are generated

**Rationale:**
- **HIGHEST CTR POTENTIAL** - User just received their answer, in reading/analysis mode
- Natural content break - fits logically between data and visualization
- High engagement zone - user is actively studying results
- Contextual targeting works perfectly (they're doing project planning)

**HTML Structure:**
```html
<!-- Only renders when results are shown -->
<div class="ad-results-section">
    <!-- Responsive ad container -->
    <ins class="adsbygoogle ad-results"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXX"
         data-ad-slot="2222222222"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
</div>
```

**CSS:**
```css
.ad-results-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e1e4e8;
}

.ad-results-section::before {
    content: 'Advertisement';
    display: block;
    font-size: 0.7rem;
    color: #999;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
}

.ad-results {
    min-height: 90px; /* Prevent layout shift */
}
```

---

### 3. Anchor Ad (Mobile Only)
**Ad Unit ID**: `ca-pub-XXXXXXXX/3333333333`

**Specs:**
- **Size**: 320x50 or 320x100 (Anchor/Overlay)
- **Location**: Bottom of viewport, sticky
- **Visibility**: Mobile only (<768px)
- **Behavior**: Dismissible (AdSense auto-provides close button)

**Rationale:**
- AdSense best practice for mobile monetization
- High viewability without disrupting content
- Stays visible as user scrolls (maximum impressions)
- Dismissible = AdSense compliant, user-friendly
- Compensates for lack of sidebar ad on mobile

**Implementation:**
```html
<!-- Auto anchor ads - Google manages positioning -->
<script>
    (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-XXXXXXXX",
        enable_page_level_ads: true,
        overlays: {bottom: true}
    });
</script>
```

---

## Responsive Ad Strategy by Device

### Desktop (≥1024px)
```
+------------------+------------------------+
| Sidebar          | Main Content          |
| - Input Forms    | - Results             |
| - Ad Unit #1 → | - Ad Unit #2 →      |
|   (300x250)      |   (728x90)            |
+------------------+------------------------+
```
**Active Ads**: 2 (Sidebar + Results)
**Expected CTR**: 2.5-3%

### Tablet (768px - 1023px)
```
+------------------+------------------------+
| Sidebar          | Main Content          |
| - Input Forms    | - Results             |
| - Ad Unit #1 → | - Ad Unit #2 →      |
|   (300x250)      |   (468x60 or 300x250) |
+------------------+------------------------+
```
**Active Ads**: 2 (Sidebar + Results)
**Expected CTR**: 2-2.5%

### Mobile (<768px)
```
+----------------------------------------+
| Header                                 |
+----------------------------------------+
| Sidebar Section (stacked)             |
| - Input Forms                         |
+----------------------------------------+
| Results Section                        |
| - Forecast Cards                      |
| - Ad Unit #2 → (300x250 or 320x50) |
| - Distribution Chart                  |
+----------------------------------------+
| Ad Unit #3 → (Anchor 320x50 sticky)  |
+----------------------------------------+
```
**Active Ads**: 2 (Results + Anchor)
**Expected CTR**: 1.5-2%

---

## AdSense Policy Compliance Checklist

- [x] Maximum 3 ads per page
- [x] All ads labeled "Advertisement"
- [x] Ads don't obstruct primary content
- [x] No ads above the fold on initial load (results ad only shows after generation)
- [x] Anchor ad is dismissible
- [x] Sufficient spacing between ads (minimum 1 viewport apart)
- [x] No misleading ad placement
- [x] Responsive - works on all devices
- [x] Doesn't interfere with navigation
- [x] Privacy policy page required (to be created)

---

## Targeting Strategy for Premium CPMs

### Auto Ads Placement Targeting
Enable these categories in AdSense:
- **Business & Industrial** → Software → Project Management
- **Business & Industrial** → Software → Collaboration Tools
- **Jobs & Education** → Professional Certification
- **Computers & Electronics** → Software → Productivity Software

### Contextual Keywords (for page)
Ensure these appear in `<head>` metadata and content:
- project management
- agile planning
- scrum estimation
- monte carlo simulation
- project forecasting
- sprint planning
- team collaboration
- Jira alternative
- Asana alternative
- Monday.com alternative

### Expected Advertisers
- **Primary**: Atlassian (Jira), Monday.com, Asana, ClickUp, Notion, Smartsheet
- **Secondary**: Project management training, PMI certifications, Scrum courses
- **Tertiary**: Generic SaaS tools, productivity software

---

## Expected Performance Metrics

### Conservative Estimate (Months 1-3)
| Metric | Value |
|--------|-------|
| Daily Users | 100 |
| Page Views | 150 (1.5 pages/user) |
| Ad Impressions | 300 (2 ads/page) |
| CTR | 1.5% |
| Clicks/Day | 4.5 |
| CPM | $8 |
| Daily Revenue | $2.40 |
| **Monthly Revenue** | **$72** |

### Growth Estimate (Months 4-6)
| Metric | Value |
|--------|-------|
| Daily Users | 500 |
| Page Views | 750 |
| Ad Impressions | 1,500 |
| CTR | 2% |
| Clicks/Day | 30 |
| CPM | $12 |
| Daily Revenue | $18 |
| **Monthly Revenue** | **$540** |

### Optimistic (ProductHunt launch success)
| Metric | Value |
|--------|-------|
| Daily Users | 2,000 |
| Page Views | 3,000 |
| Ad Impressions | 6,000 |
| CTR | 2.5% |
| Clicks/Day | 150 |
| CPM | $15 |
| Daily Revenue | $90 |
| **Monthly Revenue** | **$2,700** |

---

## Implementation Checklist

### Pre-Requisites
- [ ] Privacy Policy page created and linked
- [ ] AdSense account approved
- [ ] Site live and accessible at montecarloestimation.com
- [ ] Google Analytics 4 configured

### Phase 1: Basic Setup
- [ ] Add AdSense verification code to `<head>`
- [ ] Create 3 ad units in AdSense dashboard
- [ ] Copy ad unit codes

### Phase 2: Integration
- [ ] Add ad container divs to HTML
- [ ] Implement responsive CSS
- [ ] Add ad initialization JavaScript
- [ ] Test on all devices (desktop, tablet, mobile)

### Phase 3: Optimization
- [ ] Enable Auto Ads (experiments)
- [ ] Configure ad placement targeting
- [ ] Set up GA4 events for ad viewability
- [ ] A/B test ad sizes (300x250 vs 336x280 in sidebar)

### Phase 4: Monitoring
- [ ] Monitor AdSense policy compliance
- [ ] Track CTR by placement
- [ ] Analyze revenue by device
- [ ] Optimize underperforming placements

---

## Ad Load Performance

### Current Page Metrics
- Page size: ~50KB (HTML + CSS + JS)
- Load time: <1 second

### With Ads
- AdSense async script: ~30KB (cached after first load)
- Ad creative loading: ~50-100KB per ad
- **Total added**: ~180KB
- **Expected load time**: <2 seconds (still excellent)

### Performance Safeguards
```javascript
// Lazy load ads until page is interactive
if (document.readyState === 'complete') {
    loadAds();
} else {
    window.addEventListener('load', loadAds);
}

function loadAds() {
    // Initialize AdSense
    (adsbygoogle = window.adsbygoogle || []).push({});
}
```

---

## A/B Testing Strategy

### Test 1: Sidebar Ad Size
- **Control**: 300x250 Medium Rectangle
- **Variant**: 336x280 Large Rectangle
- **Hypothesis**: Larger ad may have better CTR
- **Duration**: 2 weeks
- **Success Metric**: CTR increase >10%

### Test 2: Results Ad Timing
- **Control**: Show immediately after results
- **Variant**: Show after 5-second delay (user has processed results)
- **Hypothesis**: Delayed ad may have better engagement
- **Duration**: 2 weeks
- **Success Metric**: CTR increase >5%

### Test 3: Mobile Anchor Height
- **Control**: 320x50
- **Variant**: 320x100
- **Hypothesis**: Taller ad more noticeable without being intrusive
- **Duration**: 2 weeks
- **Success Metric**: CTR increase >15%

---

## Privacy & Compliance

### Required Privacy Policy Sections
1. **Cookies**: Explain AdSense uses cookies for personalized ads
2. **Third-party vendors**: Google uses cookies to serve ads based on prior visits
3. **Opt-out**: Link to Google's ad settings (http://www.google.com/settings/ads)
4. **Data collection**: What data AdSense collects (IP, browser, etc.)
5. **GDPR compliance**: Cookie consent for EU users (if applicable)

### Cookie Consent (GDPR)
```html
<!-- Simple cookie notice for EU users -->
<div id="cookie-notice" style="display:none">
    This site uses cookies to personalize ads and analyze traffic.
    <a href="/privacy">Learn more</a>
    <button onclick="acceptCookies()">Accept</button>
</div>
```

---

## Next Steps

1. **Create Privacy Policy page** (required for AdSense approval)
2. **Apply for AdSense** at https://www.google.com/adsense
3. **Wait for approval** (typically 1-2 weeks)
4. **Implement ad units** as per this document
5. **Monitor and optimize** using AdSense reports + GA4

---

## Contact & Support

- **AdSense Support**: https://support.google.com/adsense
- **Policy Center**: https://support.google.com/adsense/answer/48182
- **Ad Review Center**: Monitor ads that appear on your site
