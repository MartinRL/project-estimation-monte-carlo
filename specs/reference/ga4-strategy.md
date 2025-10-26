# Google Analytics 4 Implementation Strategy

## Overview

Track user behavior, ad performance, and conversion metrics across all devices to optimize monetization and user experience.

---

## GA4 Setup

### Property Configuration
```
Property Name: Monte Carlo Estimation Tool
Website URL: montecarloestimation.com
Industry: Software & Technology
Time Zone: [Your timezone]
Currency: USD
```

### Data Streams
- **Web**: montecarloestimation.com
- **Measurement ID**: G-XXXXXXXXXX

---

## Event Tracking Strategy

### 1. Core User Actions

**page_view** (Auto-tracked)
- Fires on every page load
- No custom code needed

**session_start** (Auto-tracked)
- Fires when user arrives
- Use to calculate session duration

**first_visit** (Auto-tracked)
- New vs returning users
- Critical for growth tracking

---

### 2. Tool Usage Events

```javascript
// Track forecast generation
function trackForecastGenerated() {
    gtag('event', 'generate_forecast', {
        'event_category': 'engagement',
        'event_label': mode, // 'data' or 'estimate'
        'value': 1
    });
}

// Track estimation method selection
function trackEstimationMode(mode) {
    gtag('event', 'select_estimation_mode', {
        'event_category': 'configuration',
        'method': mode, // 'historical' or 'three_point'
    });
}

// Track risk additions
function trackRiskAdded() {
    gtag('event', 'add_risk', {
        'event_category': 'configuration',
        'risk_count': risks.length,
    });
}

// Track help modal views
function trackHelpView(topic) {
    gtag('event', 'view_help', {
        'event_category': 'engagement',
        'help_topic': topic,
    });
}
```

---

### 3. Conversion Events (Monetization)

```javascript
// Track ad impressions (estimated)
function trackAdImpression(adUnit) {
    gtag('event', 'ad_impression', {
        'event_category': 'monetization',
        'ad_placement': adUnit, // 'sidebar', 'results', 'anchor'
        'non_interaction': true
    });
}

// Track ad clicks (if detectable)
function trackAdClick(adUnit) {
    gtag('event', 'ad_click', {
        'event_category': 'monetization',
        'ad_placement': adUnit,
        'value': 1 // Used to calculate conversion rate
    });
}

// Track Premium CTA views (future feature)
function trackPremiumCTA() {
    gtag('event', 'view_premium_cta', {
        'event_category': 'conversion',
        'cta_location': 'upgrade_modal'
    });
}

// Track Premium upgrade clicks (future)
function trackPremiumClick() {
    gtag('event', 'click_premium_upgrade', {
        'event_category': 'conversion',
        'value': 9 // Subscription price
    });
}
```

---

### 4. Error Tracking

```javascript
// Track validation errors
function trackValidationError(field) {
    gtag('event', 'validation_error', {
        'event_category': 'errors',
        'error_field': field,
    });
}

// Track simulation failures
function trackSimulationError(errorType) {
    gtag('event', 'simulation_error', {
        'event_category': 'errors',
        'error_type': errorType,
    });
}
```

---

## Enhanced Measurements (Enable in GA4)

- [x] **Scrolls**: Track how far users scroll (important for ad viewability)
- [x] **Outbound Clicks**: Track clicks on external links
- [x] **Site Search**: N/A (no search on site)
- [x] **Video Engagement**: N/A (no videos)
- [x] **File Downloads**: Track PDF/CSV exports (future feature)

---

## Custom Dimensions & Metrics

### User-Scoped Dimensions
| Dimension | Description | Use Case |
|-----------|-------------|----------|
| `user_type` | new/returning | Segment behavior by user type |
| `device_category` | desktop/mobile/tablet | Ad performance by device |
| `ad_blocker` | yes/no | Track ad blocker prevalence |

### Event-Scoped Dimensions
| Dimension | Description | Use Case |
|-----------|-------------|----------|
| `estimation_method` | data/estimate | Which method is more popular? |
| `risk_count` | 0-5 | Does adding risks affect completion rate? |
| `forecast_weeks` | Number of weeks forecasted | Typical project length |

### Custom Metrics
| Metric | Description | Calculation |
|--------|-------------|-------------|
| `simulations_per_session` | How many forecasts per visit | count(generate_forecast) / count(session_start) |
| `ad_viewability_rate` | % of ads viewed | count(ad_impression) / count(page_view) |
| `help_engagement_rate` | % who view help | count(view_help) / count(session_start) |

---

## Key Reports to Monitor

### 1. Acquisition Report
**Question**: Where are users coming from?

**Metrics to Watch**:
- Users by Source/Medium (Google, Reddit, ProductHunt, Direct)
- Conversion rate by source (which sources lead to highest engagement?)
- New vs returning users

**Action**: Double down on high-performing channels

---

### 2. Engagement Report
**Question**: How are users interacting with the tool?

**Key Events**:
- `generate_forecast` (most important - actual tool usage)
- `view_help` (indicates confusion or interest in learning)
- `add_risk` (advanced users)
- `select_estimation_mode` (preference for data vs estimates)

**Funnel**:
1. Page view
2. Configure inputs (interact with sidebar)
3. Generate forecast
4. View results

**Goal**: >50% of visitors generate at least one forecast

---

### 3. Retention Report
**Question**: Do users come back?

**Cohort Analysis**:
- Day 1, 7, 30 retention rates
- Behavior of returning users vs one-time visitors

**Target**: 20% week-1 retention (users who return within 7 days)

---

### 4. Monetization Report (Custom)
**Question**: How well are ads performing?

**Metrics**:
- Ad impressions per session (target: 2-3)
- Estimated CTR by placement
- Revenue by device category (from AdSense data, imported)
- Users with ad blockers (% who don't see any ad impressions)

**Cross-reference with AdSense**: GA4 shows behavior, AdSense shows revenue

---

### 5. User Journey Report
**Question**: What path do users take?

**Path Exploration**:
1. Starting point: `page_view`
2. Common paths:
   - Immediate forecast generation (experienced users?)
   - Help viewing → configuration → forecast (learning users)
   - Bounces (need to reduce)

**Optimization**: Reduce friction in high-drop-off paths

---

## Device-Specific Tracking

### Desktop Tracking
```javascript
// Desktop-specific events
if (window.innerWidth >= 1024) {
    gtag('event', 'desktop_view', {
        'event_category': 'device',
        'viewport_width': window.innerWidth
    });
}
```

### Mobile Tracking
```javascript
// Mobile-specific events
if (window.innerWidth < 768) {
    gtag('event', 'mobile_view', {
        'event_category': 'device',
        'viewport_width': window.innerWidth
    });

    // Track mobile anchor ad visibility
    window.addEventListener('scroll', function() {
        if (isAnchorAdVisible()) {
            gtag('event', 'anchor_ad_visible', {
                'event_category': 'monetization',
                'non_interaction': true
            });
        }
    });
}
```

### Tablet Tracking
```javascript
// Tablet-specific
if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    gtag('event', 'tablet_view', {
        'event_category': 'device',
        'viewport_width': window.innerWidth
    });
}
```

---

## Ad Performance Tracking

### Track Ad Viewability
```javascript
// Intersection Observer to track when ads enter viewport
const adObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const adUnit = entry.target.dataset.adUnit;
            gtag('event', 'ad_viewable', {
                'event_category': 'ad_performance',
                'ad_unit': adUnit,
                'viewport_percentage': Math.round(entry.intersectionRatio * 100),
                'non_interaction': true
            });
        }
    });
}, {
    threshold: [0.5] // Ad must be 50% visible
});

// Observe all ad containers
document.querySelectorAll('.ad-container').forEach(ad => {
    adObserver.observe(ad);
});
```

### Track Time to Ad View
```javascript
let pageLoadTime = Date.now();

// When ad becomes viewable
function onAdViewable(adUnit) {
    const timeToView = Date.now() - pageLoadTime;
    gtag('event', 'ad_time_to_view', {
        'event_category': 'ad_performance',
        'ad_unit': adUnit,
        'time_seconds': Math.round(timeToView / 1000),
        'non_interaction': true
    });
}
```

---

## E-commerce Tracking (Future Premium Tier)

```javascript
// Track when user views pricing
gtag('event', 'view_item', {
    'currency': 'USD',
    'value': 9.00,
    'items': [{
        'item_id': 'premium_monthly',
        'item_name': 'Premium Monthly Subscription',
        'item_category': 'Subscription',
        'price': 9.00,
        'quantity': 1
    }]
});

// Track when user starts checkout
gtag('event', 'begin_checkout', {
    'currency': 'USD',
    'value': 9.00,
    'items': [{
        'item_id': 'premium_monthly',
        'item_name': 'Premium Monthly Subscription',
        'price': 9.00
    }]
});

// Track successful purchase
gtag('event', 'purchase', {
    'transaction_id': 'TXN-' + Date.now(),
    'currency': 'USD',
    'value': 9.00,
    'items': [{
        'item_id': 'premium_monthly',
        'item_name': 'Premium Monthly Subscription',
        'price': 9.00,
        'quantity': 1
    }]
});
```

---

## Privacy & Consent

### GDPR Compliance
```javascript
// Check if user needs consent (EU visitors)
function needsConsent() {
    // Detect EU based on timezone or use a geolocation service
    return false; // Placeholder
}

// Update consent mode
function updateConsentMode(analytics, ads) {
    gtag('consent', 'update', {
        'analytics_storage': analytics ? 'granted' : 'denied',
        'ad_storage': ads ? 'granted' : 'denied'
    });
}

// Initialize with default (before user consent)
gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'wait_for_update': 500
});

// After user accepts cookies
function onAcceptCookies() {
    updateConsentMode(true, true);
}
```

---

## Integration with AdSense

### Import AdSense Data to GA4
1. Link AdSense account in GA4 Admin
2. Enable AdSense linking
3. View AdSense metrics in GA4 reports

**Available Metrics**:
- AdSense revenue
- Impressions
- Clicks
- RPM (Revenue per 1000 impressions)

**Custom Report**:
- Dimension: Page
- Metrics: Page views, AdSense revenue, AdSense RPM
- Filter: Pages with >100 views

---

## Dashboards & Alerts

### Daily Monitoring Dashboard
- **Traffic**: Sessions, Users, Page views (current day vs previous day)
- **Engagement**: Forecast generations, Help views
- **Monetization**: Ad impressions (estimated), Ad viewability rate
- **Errors**: Validation errors, Simulation failures

### Weekly Analysis Dashboard
- **Growth**: New users, Returning users, Retention rate
- **Behavior**: Top help topics, Average simulations per user
- **Performance**: Page load times, Bounce rate
- **Device Split**: Desktop vs Mobile vs Tablet traffic

### Alerts
1. **Traffic drop**: Users <50% of 7-day average
2. **Error spike**: Simulation errors >5% of forecasts
3. **Revenue opportunity**: High traffic from new source

---

## A/B Testing with GA4

### Test Setup via Google Optimize (or manual)
**Test 1: Ad Placement**
- Control: 3 ad units as per strategy
- Variant: 2 ad units (remove sidebar ad)
- Metric: Total ad revenue, User engagement

**Test 2: Help System**
- Control: Info icons everywhere
- Variant: Prominent "How it works" button
- Metric: Help view rate, Forecast completion rate

---

## Implementation Checklist

- [ ] Create GA4 property
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] Add GA4 script to `<head>` of index.html
- [ ] Implement custom events for tool actions
- [ ] Add ad viewability tracking
- [ ] Set up custom dimensions
- [ ] Create custom reports/dashboards
- [ ] Link AdSense account
- [ ] Test all events in GA4 DebugView
- [ ] Set up alerts

---

## Success Metrics (KPIs)

| Metric | Target | Excellent |
|--------|--------|-----------|
| Bounce Rate | <60% | <40% |
| Avg Session Duration | >2 min | >4 min |
| Pages per Session | >1.5 | >2.5 |
| Forecast Completion Rate | >50% | >70% |
| Help Engagement Rate | >30% | >50% |
| Week-1 Retention | >15% | >25% |
| Ad Viewability | >70% | >85% |

---

## Next Steps

1. **Set up GA4 property** at https://analytics.google.com
2. **Add tracking code** to index.html
3. **Implement custom events** as documented above
4. **Test in DebugView** (GA4 → Configure → DebugView)
5. **Create dashboards** after 7 days of data collection
6. **Link AdSense** once approved
7. **Monitor and optimize** based on data

---

## Resources

- **GA4 Setup Guide**: https://support.google.com/analytics/answer/9304153
- **Event Reference**: https://developers.google.com/analytics/devguides/collection/ga4/events
- **DebugView**: https://support.google.com/analytics/answer/7201382
- **Custom Reports**: https://support.google.com/analytics/answer/11396033
