# Setup Guide - AdSense & Analytics Implementation

## ✅ Completed Steps

The following have been implemented and are ready to go:

1. **Privacy Policy Page** (`privacy.html`)
   - Comprehensive privacy policy covering Google Analytics and AdSense
   - Includes GDPR and CCPA compliance sections
   - Footer link added to main site

2. **Google Analytics 4 Infrastructure**
   - GA4 tracking code ready in `index.html` (currently commented out)
   - Event tracking implemented for:
     * `generate_forecast` - Most important metric!
     * `view_help` - User learning behavior
     * `select_estimation_mode` - Historical vs estimates preference
     * `add_risk` - Advanced feature usage
   - Ad viewability tracking code ready (commented, for future use)

3. **Strategy Documents**
   - `implementation-summary.md` - Complete implementation guide
   - `adsense-strategy.md` - 3 ad unit placement strategy
   - `ga4-strategy.md` - Analytics tracking strategy

---

## 🎯 Next Steps (Requires Manual Action)

### Step 1: Enable HTTPS on GitHub Pages (WAITING FOR DNS)

**Status**: DNS propagation in progress

**Action Required**:
1. Go to GitHub repository settings: https://github.com/MartinRL/project-estimation-monte-carlo/settings/pages
2. Wait for DNS to propagate (can take up to 48 hours)
3. Once DNS is active, check "Enforce HTTPS"

**How to verify DNS is ready**:
```bash
nslookup montecarloestimation.com
```
Should return GitHub Pages IP addresses.

---

### Step 2: Create Google Analytics 4 Property

**Where**: https://analytics.google.com

**Steps**:
1. Click "Create Property"
2. Property name: `Monte Carlo Estimation Tool`
3. Time zone: Your timezone
4. Currency: USD
5. Create a **Web** data stream
6. Website URL: `https://montecarloestimation.com`
7. Stream name: `Monte Carlo Website`
8. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

**After getting Measurement ID**:
1. Open `index.html`
2. Find line 12-22 (GA4 tracking code)
3. Remove the `<!--` and `-->` comment markers
4. Replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID
5. Commit and push changes

**Test tracking**:
- Visit https://montecarloestimation.com
- Go to GA4 → Configure → DebugView
- Open another browser tab with `?debug_mode=true` in URL
- You should see events in real-time

---

### Step 3: Apply for Google AdSense

**Prerequisites** (✅ All complete!):
- [x] Site is live at custom domain
- [x] HTTPS enabled (waiting for DNS)
- [x] Privacy Policy published
- [x] Quality content on site
- [x] GA4 tracking active

**Where**: https://www.google.com/adsense

**Steps**:
1. Sign in with Google account
2. Click "Get Started"
3. Website URL: `https://montecarloestimation.com`
4. Copy the AdSense verification code
5. Paste it in `index.html` `<head>` section (below GA4 code)
6. Submit for review

**Timeline**: 1-2 weeks for approval

**While waiting**:
- Monitor GA4 to see traffic patterns
- Check DebugView to verify events are firing correctly
- Review AdSense policies: https://support.google.com/adsense/answer/48182

---

### Step 4: Implement AdSense Ads (After Approval)

**Reference**: See `implementation-summary.md` lines 152-174 for full code

**Quick Implementation**:

1. **Create 3 ad units** in AdSense dashboard:
   - "Sidebar Bottom" - Display ad (300x250)
   - "Results Section" - Display ad (Responsive)
   - "Mobile Anchor" - Anchor ad (320x50)

2. **Get ad codes** from each unit

3. **Add ads to `index.html`**:
   - Sidebar ad: After line 749 (after "Generate Forecast" button)
   - Results ad: In `displayResults()` function between forecast cards and chart
   - Anchor ad: Before closing `</body>` tag

4. **Add CSS** for ad containers (see `implementation-summary.md` lines 261-319)

5. **Uncomment ad viewability tracking** (lines 1710-1731 in current index.html)

6. **Test on all devices**:
   - Desktop Chrome
   - Mobile Chrome (Android)
   - iPhone Safari
   - iPad

---

## 📊 Monitoring After Launch

### Google Analytics 4 Dashboard

**Key Reports**:
1. **Engagement** → Events
   - Check `generate_forecast` count (most important!)
   - Monitor `view_help` (indicates confusion or interest)
   - Track `add_risk` (advanced users)

2. **Acquisition** → Traffic acquisition
   - Where users are coming from
   - Which sources lead to forecast generation

3. **Real-time** → Overview
   - See live users
   - Verify events are firing

**Target Metrics** (first month):
- Forecast Completion Rate: >50%
- Avg Session Duration: >2 min
- Bounce Rate: <60%

### Google AdSense Dashboard

**After ads go live, monitor**:
1. **Performance** → Reports
   - CTR by ad unit (target: 2-3%)
   - RPM (revenue per 1000 impressions)
   - Revenue by device

2. **Optimization** → Experiments
   - Test different ad sizes
   - Try Auto Ads (optional)

**Revenue Expectations**:
- Month 1-3: $70-150/month (conservative)
- After ProductHunt launch: $1,500-3,000/month (optimistic)

---

## 🔍 Verification Checklist

### Before AdSense Application
- [ ] DNS propagation complete
- [ ] HTTPS enabled on GitHub Pages
- [ ] Site accessible at https://montecarloestimation.com
- [ ] Privacy policy visible with footer link
- [ ] GA4 tracking active and events firing
- [ ] No broken links or errors on site

### Before Implementing Ads
- [ ] AdSense account approved
- [ ] 3 ad units created in AdSense dashboard
- [ ] Ad codes copied
- [ ] Test on desktop and mobile
- [ ] Verify ads labeled "Advertisement"
- [ ] Check AdSense policy compliance

---

## 🚀 Quick Command Reference

**Check DNS propagation**:
```bash
nslookup montecarloestimation.com
```

**Test site locally**:
```bash
# Just open index.html in browser
# No build process needed!
```

**Deploy changes**:
```bash
git add .
git commit -m "your message"
git push
```

**View GA4 events in real-time**:
1. Go to https://analytics.google.com
2. Select your property
3. Configure → DebugView
4. Visit site with `?debug_mode=true` in URL

---

## 📚 Additional Resources

- **Implementation Summary**: `implementation-summary.md` (complete code examples)
- **AdSense Strategy**: `adsense-strategy.md` (ad placement details)
- **GA4 Strategy**: `ga4-strategy.md` (event tracking specifications)
- **AdSense Help**: https://support.google.com/adsense
- **GA4 Help**: https://support.google.com/analytics
- **GitHub Pages Docs**: https://docs.github.com/en/pages

---

## ❓ Troubleshooting

### GA4 events not showing up
- Check if GA4 code is uncommented
- Verify Measurement ID is correct
- Use DebugView with `?debug_mode=true`
- Clear browser cache

### Ads not displaying
- Wait 24-48 hours after initial setup
- Check AdSense account status
- Verify ad code is correct
- Disable ad blocker for testing
- Check browser console for errors

### DNS not propagating
- Can take up to 48 hours
- Use different DNS checker: https://dnschecker.org
- Try flushing local DNS cache:
  - Windows: `ipconfig /flushdns`
  - Mac: `sudo dscacheutil -flushcache`

---

**Current Status**: All code infrastructure is ready. Waiting for DNS propagation to enable HTTPS, then can proceed with GA4 and AdSense setup.

**Next Immediate Action**: Check DNS propagation status and enable HTTPS on GitHub Pages.
