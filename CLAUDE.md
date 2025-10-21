# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file web application for project estimation using Monte Carlo simulations. The tool provides probabilistic forecasting for project completion dates based on historical throughput data or three-point estimates.

**Live Site**: https://montecarloestimation.com
**Tech Stack**: Pure HTML/CSS/JavaScript - no build tools, no frameworks
**Hosting**: GitHub Pages with custom domain
**Monetization**: Google AdSense + Google Analytics 4

## Architecture

**Single-Page Application**: The entire application is contained in `index.html` - HTML structure, CSS styling, and JavaScript logic all in one file.

**Core Components**:
- **Estimation Modes**: Two approaches for throughput modeling
  - Historical Data mode: Uses actual past weekly throughput samples
  - Three-Point Estimate mode: Uses triangular distribution (pessimistic/most likely/optimistic)
- **Monte Carlo Engine**: Runs 500 simulation trials to generate probability distributions
- **Risk Modeling**: Optional risk factors with probability and impact ranges that affect total story count
- **Visualization**: Custom histogram chart implementation showing frequency distribution
- **Help System**: Modal-based contextual help with extensive documentation embedded in `helpContent` object
- **Analytics**: GA4 event tracking for user behavior (forecast generation, help views, mode selection, risk usage)

**Key Algorithms** (search for function names, line numbers may shift):
- `runTrial()`: Executes single simulation iteration
  - Randomizes story count within range
  - Applies split factor (scope creep)
  - Evaluates each risk probabilistically
  - Simulates weekly throughput until completion
- `generateTriangular()`: Implements triangular distribution for three-point estimates
- `createHistogram()`: Buckets results into 25 bins for visualization
- `trackEvent()`: Helper function that safely calls gtag for GA4 tracking

**Data Flow**:
1. User configures parameters (throughput, scope, capacity, risks)
2. Click "Generate Forecast" triggers `runSimulation()`
3. 500 trials run synchronously (with UI blocking)
4. Results sorted and percentiles calculated (50th, 85th, 95th)
5. Display updates with forecast cards and histogram
6. GA4 event fired to track engagement

**Key Configuration Values**:
- Simulation count: 500 (hardcoded in `runSimulation()`)
- Maximum weeks cap: 200 (prevents infinite loops)
- Risk limit: 5 max (enforced in `addRisk()`)
- Chart histogram buckets: 25
- GA4 Measurement ID: G-10018M21B0
- AdSense Publisher ID: ca-pub-5055720376895150

## Development

**No Build Process**: This is a static HTML file. Open `index.html` directly in a browser to run.

**Local Testing**:
```bash
# Just open the file - no server needed
start index.html  # Windows
open index.html   # Mac
```

**Testing Checklist**:
- Test both Historical Data and Three-Point Estimate modes
- Add/remove risks and verify they affect forecasts
- Open help modals (click "i" icons) to verify content displays
- Check browser console for JavaScript errors
- Test on mobile (responsive design)

**No Automated Tests**: All testing is manual via browser interaction.

## Deployment

**Platform**: GitHub Pages
**Domain**: montecarloestimation.com (managed via Porkbun DNS)
**HTTPS**: Enabled and enforced

**Deploy Changes**:
```bash
git add .
git commit -m "description of changes"
git push origin main
```

Changes go live automatically within 1-2 minutes via GitHub Pages.

**Important Files**:
- `index.html` - Main application
- `privacy.html` - Privacy policy (required for AdSense)
- `robots.txt` - SEO configuration
- `sitemap.xml` - SEO sitemap
- `CNAME` - Custom domain configuration

## Documentation Structure

This repo contains several documentation files:

- **CLAUDE.md** (this file) - Architecture and development guide for AI
- **PRD.md** - Complete product requirements for AdSense/Analytics monetization
- **SETUP-GUIDE.md** - Step-by-step setup for HTTPS, GA4, and AdSense
- **adsense-strategy.md** - Ad placement strategy (now using Auto Ads)
- **ga4-strategy.md** - Analytics event tracking specifications
- **implementation-summary.md** - Code examples and implementation details

When working on monetization features, refer to PRD.md first.

## Spec-Driven Workflow

This project follows a lightweight spec-driven development approach for non-trivial changes.

### When to Use Specs

**USE a spec for:**
- New features (e.g., adding risk modeling, export to PDF)
- Significant enhancements (e.g., changing simulation algorithm)
- UI/UX changes affecting user workflows
- Monetization features (ads, premium tiers)
- Analytics implementation

**SKIP specs for:**
- Typo fixes and copy changes
- Obvious bug fixes
- CSS styling tweaks
- Documentation updates
- Dependency updates

### 3-Phase Process

**Phase 1: SPEC (1-2 minutes)**
1. Copy appropriate template from `specs/` to `specs/active/[feature-name].md`
2. Fill in: Problem, Solution, User Impact, Success Criteria
3. AI asks clarifying questions if needed
4. User approves spec

**Phase 2: PLAN (2-3 minutes)**
1. AI adds Technical Approach section to spec
2. Identifies affected code (functions, line ranges)
3. Lists implementation steps
4. Notes key decisions and tradeoffs
5. User reviews and approves

**Phase 3: IMPLEMENT (execution)**
1. AI implements according to approved plan
2. Tests against success criteria
3. Updates spec status to "Implemented"
4. Moves spec to `specs/archive/`

### Spec Templates

- **TEMPLATE-feature.md** - For new capabilities
- **TEMPLATE-enhancement.md** - For improvements to existing features
- **TEMPLATE-marketing.md** - For marketing/GTM initiatives (SEO, content, campaigns)

### Example Usage

```
User: "Add ability to export forecast results as PDF"
AI: "Let me create a spec for this feature."
→ Creates specs/active/pdf-export.md using TEMPLATE-feature.md
→ Fills in Problem, Solution, User Impact
→ Asks: "Should the PDF include the histogram chart?"
User: "Yes, and the risk breakdown too"
AI: "Great, updating spec and adding technical approach..."
→ Proposes using jsPDF library, implementation steps
User: "Approved"
AI: "Implementing now..."
→ Codes the feature, tests, moves spec to archive
```

## Memory System

**CRITICAL - READ FIRST**: Before suggesting ANY tasks, changes, or work:

1. **Always read `archive/completed-tasks.md` FIRST** - Contains all completed work with dates, commits, and implementation details
2. **Check what's already done** - Never suggest tasks that are marked complete in the archive
3. **Understand current state** - Know what phase we're in and what's actually pending
4. **Suggest only NEW work** - Focus exclusively on what's NOT done yet

**Archive Structure**:
- `archive/completed-tasks.md` - Master list of all completed tasks
  - Includes: completion dates, commit hashes, file changes, line numbers, metrics, current status
  - Updated after major milestones (phase completions, deployments, platform setups)
  - Format: Date headers, checkboxes for completion status, "What's NOT Done Yet" section

**If Archive is Unclear or Missing**:
- Ask user to confirm current status before proceeding
- Don't assume work hasn't been done
- Update archive after completing significant work

**User expects you to have memory** - The archive IS your memory. Use it.

## Key Principles

- **Check archive FIRST**: Read `archive/completed-tasks.md` before every suggestion - prevents duplicate effort
- **Keep it simple**: No build tools, no frameworks, single HTML file
- **Be autonomous**: Never ask the user to do something you can do yourself
- **KISS**: Don't jump to complex conclusions - simplest solution wins
- **No placeholders**: Write complete, working code - no TODOs unless discussing architecture
- **Spec before code**: For non-trivial changes, write the spec first
- The product name is: "Probabilistic Project Forecasting with Monte Carlo Simulations"