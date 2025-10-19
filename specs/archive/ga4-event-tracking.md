# Feature Spec: Google Analytics 4 Event Tracking

**Status**: Implemented
**Created**: 2025-10-10
**Author**: AI
**Implemented**: 2025-10-10

---

## Problem Statement

We need to understand how users interact with the Monte Carlo estimation tool to optimize the user experience and improve conversion rates for future monetization. Without analytics, we can't answer questions like:
- How many users actually generate forecasts vs just browse?
- Which help topics are most viewed (indicating confusion)?
- Do users prefer historical data or three-point estimates?
- Are advanced features (risk modeling) being used?

## Proposed Solution

Implement Google Analytics 4 (GA4) event tracking to capture key user interactions:
- Forecast generation (most important conversion event)
- Help modal views (learning behavior)
- Estimation mode selection (user preference)
- Risk additions (advanced feature usage)

## User Impact

- **Who benefits**: Product owner and future development
- **Primary benefit**: Data-driven decision making for UX improvements
- **Use cases**:
  1. Identify which help topics need better inline guidance
  2. Optimize default values based on mode preference
  3. Prioritize features based on actual usage patterns
  4. Measure impact of future changes

## Success Criteria

- [x] GA4 tracking code loads without errors
- [x] `generate_forecast` event fires when user clicks "Generate Forecast"
- [x] `view_help` event fires when user opens help modals
- [x] `select_estimation_mode` event fires when toggling modes
- [x] `add_risk` event fires when adding risk factors
- [x] Events visible in GA4 DebugView
- [x] No performance degradation (tracking is asynchronous)

## Technical Approach

### Affected Code Sections
- `index.html` lines 19-27: GA4 initialization script
- `index.html` lines 1008-1014: `trackEvent()` helper function
- `index.html` line 1497: `view_help` event in `showHelp()`
- `index.html` line 1531: `select_estimation_mode` event in `setMode()`
- `index.html` line 1551: `add_risk` event in `addRisk()`
- `index.html` line 1702: `generate_forecast` event in `runSimulation()`

### Implementation Steps
1. Add GA4 gtag.js script to `<head>` section
2. Initialize with Measurement ID: G-10018M21B0
3. Create `trackEvent()` helper that safely checks if gtag exists
4. Add event tracking to key user interactions:
   - Generate forecast (with mode parameter)
   - View help (with topic parameter)
   - Select estimation mode (with method parameter)
   - Add risk (with count parameter)
5. Test in GA4 DebugView with `?debug_mode=true` URL parameter
6. Verify events appear in real-time reports

### Key Decisions
- **Decision 1**: Use gtag.js directly instead of Google Tag Manager
  - Rationale: Simpler for single-page app, no external dependencies
- **Decision 2**: Track mode/topic as event parameters not separate events
  - Rationale: Easier to analyze in GA4, better data structure
- **Decision 3**: Make tracking fail-safe with `typeof gtag !== 'undefined'` check
  - Rationale: App works even if GA4 script fails to load (ad blockers, etc.)

## Out of Scope

What we're NOT doing in this iteration:
- Enhanced e-commerce tracking (no purchases yet)
- Custom dimensions for forecast ranges
- Ad viewability tracking (for future AdSense optimization)
- User identification / cross-session tracking
- Error event tracking

---

## Notes

This implementation followed the strategy outlined in `ga4-strategy.md`. The events were designed to answer specific business questions while maintaining user privacy (no PII collected).

See PRD.md for complete analytics strategy and future enhancements.
