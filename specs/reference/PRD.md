# Product Requirements Document: AdSense & Analytics Monetization

## Executive Summary

**Project**: Monetize montecarloestimation.com with Google AdSense and Analytics 4
**Goal**: Generate passive revenue from B2B project management audience
**Strategy**: Auto Ads with comprehensive analytics tracking
**Target Revenue**: $70-150/month (months 1-3), $300-600/month (months 4-6), $1,500-3,000/month (post-launch)

---

## Current Status

### ✅ Completed

**Infrastructure:**
- ✅ HTTPS enabled at https://montecarloestimation.com
- ✅ DNS propagated to GitHub Pages IPs (185.199.x.x)
- ✅ Privacy Policy published at /privacy.html
- ✅ Privacy Policy linked in footer
- ✅ Static site deployed via GitHub Pages

**Google Analytics 4:**
- ✅ GA4 property created
- ✅ Measurement ID obtained: G-10018M21B0
- ✅ GA4 tracking code deployed (index.html lines 5-12)
- ✅ Custom events implemented:
  - `generate_forecast` - Tool usage tracking
  - `view_help` - Help system engagement
  - `select_estimation_mode` - Method preference
  - `add_risk` - Advanced feature usage
- ✅ Events verified in GA4 DebugView

**Google AdSense:**
- ✅ AdSense account created
- ✅ Site approved by Google
- ✅ Publisher ID: ca-pub-5055720376895150
- ✅ Verification code deployed (index.html lines 13-14)
- ✅ Auto Ads selected (no manual placement)

### 🔄 In Progress

**AdSense Activation:**
- ⏳ Auto Ads need to be enabled in dashboard
- ⏳ Ads may be ramping up (24-48 hour period)
- ⏳ Waiting for first ad impressions

### ⏸️ Pending (Future)

**Optimization:**
- ⏸️ Monitor AdSense performance
- ⏸️ Review advertiser categories
- ⏸️ Block low-quality advertisers if needed
- ⏸️ A/B testing ad density
- ⏸️ Create custom GA4 dashboards

---

## Task List

### Phase 1: AdSense Activation (Current Priority)

**👱🏻‍♂️ Task 1.1: Enable Auto Ads**
```
Owner: Human
Time: 5 minutes
Priority: HIGH

Steps:
1. Go to https://www.google.com/adsense
2. Navigate to Ads → Overview
3. Click "Get started" under Auto ads
4. Select site: montecarloestimation.com
5. Toggle Auto ads ON
6. Choose ad formats (recommend: all enabled)
7. Click "Apply to site"

Success Criteria:
- Auto ads toggle shows "ON"
- Site listed as active in Auto ads section
```

**👱🏻‍♂️ Task 1.2: Verify Ads Are Loading**
```
Owner: Human
Time: 10 minutes (after 20-minute wait)
Priority: HIGH

Steps:
1. Wait 20 minutes after enabling Auto Ads
2. Open https://montecarloestimation.com in incognito window
3. Disable ad blocker if present
4. Press F12 → Console tab
5. Type: typeof adsbygoogle
6. Should return "object" (not "undefined")
7. Look for ads appearing on page

Success Criteria:
- AdSense script loads successfully
- Ads begin appearing on site (may be limited initially)
- No errors in browser console
```

**👱🏻‍♂️ Task 1.3: Test on Multiple Devices**
```
Owner: Human
Time: 15 minutes
Priority: MEDIUM

Steps:
1. Test on desktop Chrome
2. Test on mobile Chrome (Android)
3. Test on iPhone Safari
4. Test on iPad
5. Verify ads don't disrupt user experience
6. Check that ads are labeled "Advertisement"

Success Criteria:
- Ads visible on all devices
- No layout issues
- User experience intact
```

---

### Phase 2: Monitoring & Troubleshooting

**👱🏻‍♂️ Task 2.1: Monitor AdSense Dashboard (Daily - First Week)**
```
Owner: Human
Time: 5 minutes/day
Priority: HIGH
Start: After ads go live

Checklist:
- Go to AdSense Dashboard → Performance → Overview
- Check today's estimated earnings
- Review impressions count
- Look for policy violations
- Check account status

Success Criteria:
- Earnings > $0
- No policy warnings
- Impressions increasing daily
```

**👱🏻‍♂️ Task 2.2: Monitor GA4 Events (Daily - First Week)**
```
Owner: Human
Time: 5 minutes/day
Priority: MEDIUM
Start: Ongoing

Checklist:
- Go to https://analytics.google.com
- Navigate to Engagement → Events
- Check generate_forecast count (most important)
- Review view_help count
- Monitor Real-time → Overview for live users

Success Criteria:
- generate_forecast events recorded
- Events correlate with site usage
- No tracking errors
```

**👱🏻‍♂️ Task 2.3: Review First Week Performance**
```
Owner: Human
Time: 30 minutes
Priority: MEDIUM
Start: 7 days after ads go live

Analysis:
- AdSense Performance:
  - Total earnings
  - CTR by ad type
  - RPM (revenue per 1000 impressions)
  - Revenue by device
- GA4 Metrics:
  - Total users
  - Forecast completion rate
  - Bounce rate
  - Avg session duration
- Identify issues or optimization opportunities

Deliverable:
- Document findings
- List optimization ideas
```

---

### Phase 3: Optimization (Week 2+)

**👱🏻‍♂️ Task 3.1: Review Advertiser Categories**
```
Owner: Human
Time: 15 minutes
Priority: LOW
Start: After 2 weeks of data

Steps:
1. AdSense → Blocking controls → All sites
2. Review advertiser categories
3. Block low-quality or irrelevant advertisers
4. Ensure B2B/Software/Productivity ads are allowed
5. Monitor impact on revenue

Success Criteria:
- Higher quality ads displayed
- CPM increases or stays stable
- User experience improves
```

**👱🏻‍♂️ Task 3.2: Adjust Auto Ads Settings**
```
Owner: Human
Time: 10 minutes
Priority: LOW
Start: After 1 month of data

Steps:
1. AdSense → Ads → Overview
2. Click on montecarloestimation.com
3. Adjust ad density slider if needed
4. Enable/disable specific ad formats based on performance
5. Save and monitor for 1 week

Success Criteria:
- Revenue increases or stays stable
- User experience maintained or improved
```

**🤖 Task 3.3: Implement Advanced GA4 Tracking**
```
Owner: AI
Time: 30 minutes
Priority: LOW
Start: As requested by human

Implementation:
- Add ad viewability tracking (Intersection Observer)
- Add device-specific tracking
- Add error tracking for simulations
- Create custom dimensions for:
  - estimation_method (data/estimate)
  - risk_count (0-5)
  - forecast_weeks

Code Location: index.html (JavaScript section)

Success Criteria:
- New events visible in GA4
- Custom dimensions populated
- Data actionable for optimization
```

**👱🏻‍♂️ Task 3.4: Create GA4 Custom Reports**
```
Owner: Human
Time: 45 minutes
Priority: LOW
Start: After 1 month of data

Reports to Create:
1. Monetization Dashboard:
   - Daily revenue trend
   - Traffic vs revenue correlation
   - Device breakdown
   - Top performing pages

2. User Engagement Dashboard:
   - Forecast completion funnel
   - Help engagement rate
   - Risk usage rate
   - Return user behavior

3. Weekly Summary:
   - New users
   - Total forecasts generated
   - Top traffic sources
   - Key metrics vs targets

Success Criteria:
- Dashboards created in GA4
- Insights actionable
- Weekly review takes <10 minutes
```

---

### Phase 4: Advanced Features (Future)

**🤖 Task 4.1: Implement Premium Tier**
```
Owner: AI
Time: 4-8 hours
Priority: FUTURE
Start: When requested

Features:
- PDF export of forecast results
- Historical data storage
- Team collaboration
- Advanced risk modeling
- API access

Implementation:
- Add paywall UI
- Integrate Stripe for payments
- Add user authentication
- Implement premium features
- Add GA4 e-commerce tracking

Revenue Target: $500-2,000/month additional
```

**🤖 Task 4.2: A/B Testing Framework**
```
Owner: AI
Time: 2-4 hours
Priority: FUTURE
Start: When traffic > 1,000 users/day

Tests to Run:
- Ad density variations
- Help system prominence
- Results presentation format
- CTA placement for premium tier

Implementation:
- Integrate Google Optimize or custom A/B framework
- Define test metrics in GA4
- Run tests for minimum 2 weeks
- Document results

Success Criteria:
- Statistically significant results
- Actionable insights
- Revenue or engagement improvement
```

---

## Technical Reference

### Code Locations

**GA4 Tracking Script:**
```
File: index.html
Lines: 5-12
```

**AdSense Verification Script:**
```
File: index.html
Lines: 13-14
```

**Custom Event Tracking:**
```
File: index.html
Lines: 996-1000 (trackEvent helper)
Lines: 1482-1486 (view_help event)
Lines: 1516-1520 (select_estimation_mode event)
Lines: 1536-1540 (add_risk event)
Lines: 1688-1693 (generate_forecast event)
```

**Privacy Policy:**
```
File: privacy.html
Link: https://montecarloestimation.com/privacy.html
Footer: index.html line 1919
```

### Configuration

**GA4 Measurement ID:** G-10018M21B0
**AdSense Publisher ID:** ca-pub-5055720376895150
**Site URL:** https://montecarloestimation.com
**GitHub Repository:** https://github.com/MartinRL/project-estimation-monte-carlo

### Key Events (GA4)

| Event Name | Category | Purpose | Priority |
|------------|----------|---------|----------|
| `generate_forecast` | engagement | Track tool usage | HIGH |
| `view_help` | engagement | Track help engagement | MEDIUM |
| `select_estimation_mode` | configuration | Track method preference | LOW |
| `add_risk` | configuration | Track advanced feature | LOW |

---

## Success Metrics & KPIs

### Traffic Metrics

| Metric | Target | Excellent | Current |
|--------|--------|-----------|---------|
| Bounce Rate | <60% | <40% | TBD |
| Avg Session Duration | >2 min | >4 min | TBD |
| Forecast Completion Rate | >50% | >70% | TBD |
| Help Engagement Rate | >30% | >50% | TBD |
| Week-1 Retention | >15% | >25% | TBD |

### Revenue Metrics

| Period | Conservative | Target | Optimistic |
|--------|-------------|--------|------------|
| Month 1 | $50 | $100 | $200 |
| Month 3 | $150 | $300 | $600 |
| Month 6 | $300 | $750 | $1,500 |
| Month 12 | $500 | $1,500 | $3,000 |

**Assumptions:**
- B2B SaaS advertisers (Atlassian, Monday, Asana)
- Premium CPMs: $10-20+
- CTR: 2-3% (above 1.5% industry average)
- Auto Ads optimization over time

### Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| AdSense Approval | ✅ Approved | ✅ Complete |
| Auto Ads Enabled | Enabled | ⏳ Pending |
| Ads Displaying | Yes | ⏳ Pending |
| First Revenue | >$0 | ⏳ Pending |
| GA4 Events Firing | Yes | ✅ Complete |
| Policy Compliance | 100% | ✅ Complete |

---

## Monitoring & Maintenance

### Daily Checks (First 2 Weeks)

**👱🏻‍♂️ AdSense Dashboard (2 minutes)**
- Performance → Overview → Today's earnings
- Check for policy violations
- Review estimated earnings trend

**👱🏻‍♂️ GA4 Real-time (2 minutes)**
- Real-time → Overview → Current users
- Engagement → Events → generate_forecast count
- No errors or anomalies

### Weekly Review (Ongoing)

**👱🏻‍♂️ AdSense Performance (15 minutes)**
- Total earnings (vs previous week)
- CTR by ad format
- RPM trends
- Revenue by device
- Top performing pages

**👱🏻‍♂️ GA4 Engagement (15 minutes)**
- Total users (vs previous week)
- Forecast completion rate
- Help engagement rate
- Traffic sources
- Device breakdown
- Bounce rate

### Monthly Analysis (Ongoing)

**👱🏻‍♂️ Comprehensive Review (60 minutes)**
- Revenue vs target
- Traffic trends
- User behavior patterns
- Optimization opportunities
- Budget for paid marketing (if warranted)

---

## Troubleshooting Guide

### Issue: Ads Not Showing

**Diagnosis Steps (👱🏻‍♂️):**
1. Check Auto Ads toggle in AdSense (should be ON)
2. Check browser console for errors (F12)
3. Verify `typeof adsbygoogle` returns "object"
4. Disable ad blocker
5. Test in incognito window
6. Check account status for policy violations

**Solutions:**
- Wait 24-48 hours after enabling (ramp-up period)
- Clear browser cache
- Test from different location/device
- Contact AdSense support if >48 hours

### Issue: Low Revenue

**Diagnosis Steps (👱🏻‍♂️):**
1. Check traffic volume (low traffic = low revenue)
2. Review CTR in AdSense dashboard (target: 2-3%)
3. Check ad density settings
4. Review advertiser categories
5. Verify traffic quality (geography, sources)

**Solutions:**
- Increase traffic through SEO, marketing
- Adjust Auto Ads density slider
- Block low-quality advertisers
- Enable all ad formats
- Consider manual ad placement for key positions

### Issue: GA4 Events Not Firing

**Diagnosis Steps (👱🏻‍♂️):**
1. Open site with `?debug_mode=true` in URL
2. Go to GA4 → Configure → DebugView
3. Trigger actions (generate forecast, view help)
4. Check if events appear in DebugView
5. Check browser console for gtag errors

**Solutions (🤖):**
- Verify gtag is defined: `typeof gtag !== 'undefined'`
- Check event names match exactly
- Ensure GA4 script loads before event tracking
- Test in multiple browsers
- Review GA4 implementation code

### Issue: Policy Violation

**Diagnosis Steps (👱🏻‍♂️):**
1. Check AdSense → Account → Policy center
2. Read violation details carefully
3. Review AdSense policies: https://support.google.com/adsense/answer/48182

**Common Issues:**
- Ads too close to clickable elements (fix: adjust spacing)
- Misleading ad placement (fix: add "Advertisement" labels)
- Insufficient content (fix: add more valuable content)
- Invalid clicks (fix: don't click own ads)

**Solutions:**
- Fix issues immediately
- Request review in AdSense dashboard
- Document changes made
- Wait for re-review (typically 2-3 days)

---

## Resources & Links

### Dashboards

- **AdSense**: https://www.google.com/adsense
- **GA4**: https://analytics.google.com
- **GitHub Repository**: https://github.com/MartinRL/project-estimation-monte-carlo
- **Live Site**: https://montecarloestimation.com
- **Privacy Policy**: https://montecarloestimation.com/privacy.html

### Documentation

- **AdSense Help**: https://support.google.com/adsense
- **AdSense Policies**: https://support.google.com/adsense/answer/48182
- **GA4 Help**: https://support.google.com/analytics
- **GA4 Events Reference**: https://developers.google.com/analytics/devguides/collection/ga4/events
- **GA4 DebugView**: https://support.google.com/analytics/answer/7201382
- **GitHub Pages Docs**: https://docs.github.com/en/pages

### Tools

- **DNS Checker**: https://dnschecker.org
- **GA4 DebugView**: Add `?debug_mode=true` to URL
- **Browser Console**: Press F12 → Console tab
- **AdSense Verification**: View page source, search for "adsbygoogle"

---

## Next Actions (Prioritized)

### Immediate (This Week)

**👱🏻‍♂️ Priority 1: Enable Auto Ads** (Task 1.1)
- ⏱️ Time: 5 minutes
- 🎯 Outcome: Ads begin displaying on site
- ⚠️ Blocker: Cannot generate revenue without this

**👱🏻‍♂️ Priority 2: Verify Ads Load** (Task 1.2)
- ⏱️ Time: 10 minutes (after 20-minute wait)
- 🎯 Outcome: Confirm technical implementation works
- 📊 Success: `typeof adsbygoogle === "object"`

**👱🏻‍♂️ Priority 3: Test on Devices** (Task 1.3)
- ⏱️ Time: 15 minutes
- 🎯 Outcome: Ensure cross-device compatibility
- ✅ Checklist: Desktop, mobile, tablet

### Short-term (Next 2 Weeks)

**👱🏻‍♂️ Priority 4: Daily Monitoring** (Tasks 2.1, 2.2)
- ⏱️ Time: 5 minutes/day
- 🎯 Outcome: Catch issues early, understand baseline performance
- 📈 Metrics: Earnings, impressions, events

**👱🏻‍♂️ Priority 5: First Week Review** (Task 2.3)
- ⏱️ Time: 30 minutes
- 🎯 Outcome: Understand initial performance, identify quick wins
- 📊 Deliverable: Performance summary document

### Medium-term (Months 2-3)

**👱🏻‍♂️ Priority 6: Optimize Advertisers** (Task 3.1)
- ⏱️ Time: 15 minutes
- 🎯 Outcome: Improve ad quality and CPM
- 💰 Impact: 10-20% revenue increase

**👱🏻‍♂️ Priority 7: Create Dashboards** (Task 3.4)
- ⏱️ Time: 45 minutes
- 🎯 Outcome: Faster weekly reviews, better insights
- 📊 Deliverable: 3 custom GA4 dashboards

### Long-term (Months 4-6)

**🤖 Priority 8: Advanced Tracking** (Task 3.3)
- ⏱️ Time: 30 minutes
- 🎯 Outcome: Deeper insights, better optimization
- 🔧 Implementation: Ad viewability, custom dimensions

**👱🏻‍♂️ Priority 9: A/B Testing** (Task 4.2)
- ⏱️ Time: Ongoing
- 🎯 Outcome: Data-driven improvements
- 📈 Impact: 5-15% revenue increase

**🤖 Priority 10: Premium Tier** (Task 4.1)
- ⏱️ Time: 4-8 hours
- 🎯 Outcome: Additional revenue stream
- 💰 Target: $500-2,000/month

---

## Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2025-10-12 | 1.0 | AI | Initial PRD creation, merged SETUP-GUIDE, implementation-summary, and ga4-strategy |

---

## Approval & Sign-off

**Document Owner:** Human
**Technical Implementation:** AI (Claude Code)
**Status:** Draft - Pending auto ads enablement

---

## Appendix A: Complete Event Tracking Reference

### Core Events (Implemented)

```javascript
// Generate forecast - Most important event
gtag('event', 'generate_forecast', {
    'event_category': 'engagement',
    'event_label': mode, // 'estimate' or 'data'
    'value': 1
});

// View help modal
gtag('event', 'view_help', {
    'event_category': 'engagement',
    'help_topic': topic // e.g., 'throughput', 'risks'
});

// Select estimation mode
gtag('event', 'select_estimation_mode', {
    'event_category': 'configuration',
    'method': mode // 'historical' or 'three_point'
});

// Add risk
gtag('event', 'add_risk', {
    'event_category': 'configuration',
    'risk_count': risks.length
});
```

### Future Events (Not Yet Implemented)

```javascript
// Ad viewability tracking
gtag('event', 'ad_viewable', {
    'event_category': 'ad_performance',
    'ad_unit': adUnit, // 'sidebar', 'results', 'anchor'
    'viewport_percentage': intersectionRatio,
    'non_interaction': true
});

// Premium CTA view
gtag('event', 'view_premium_cta', {
    'event_category': 'conversion',
    'cta_location': 'upgrade_modal'
});

// Error tracking
gtag('event', 'simulation_error', {
    'event_category': 'errors',
    'error_type': errorType
});
```

---

## Appendix B: Revenue Calculation Examples

### Example 1: Conservative Month 1
```
Daily Users: 100
Avg Sessions per User: 1.2
Ad Impressions per Session: 2
Daily Impressions: 100 × 1.2 × 2 = 240
Monthly Impressions: 240 × 30 = 7,200
CPM: $10
Monthly Revenue: (7,200 / 1,000) × $10 = $72
```

### Example 2: Target Month 6
```
Daily Users: 500
Avg Sessions per User: 1.5
Ad Impressions per Session: 3
Daily Impressions: 500 × 1.5 × 3 = 2,250
Monthly Impressions: 2,250 × 30 = 67,500
CPM: $15
Monthly Revenue: (67,500 / 1,000) × $15 = $1,012
```

### Example 3: Optimistic Post-Launch
```
Daily Users: 2,000
Avg Sessions per User: 1.8
Ad Impressions per Session: 3.5
Daily Impressions: 2,000 × 1.8 × 3.5 = 12,600
Monthly Impressions: 12,600 × 30 = 378,000
CPM: $18
Monthly Revenue: (378,000 / 1,000) × $18 = $6,804
```

---

**End of Document**
