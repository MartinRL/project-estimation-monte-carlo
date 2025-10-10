# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file web application for project estimation using Monte Carlo simulations. The tool provides probabilistic forecasting for project completion dates based on historical throughput data or three-point estimates.

## Architecture

**Single-Page Application**: The entire application is contained in `index.html` - HTML structure, CSS styling, and JavaScript logic all in one file.

**Core Components**:
- **Estimation Modes**: Two approaches for throughput modeling
  - Historical Data mode: Uses actual past weekly throughput samples
  - Three-Point Estimate mode: Uses triangular distribution (pessimistic/most likely/optimistic)
- **Monte Carlo Engine**: Runs 500 simulation trials to generate probability distributions
- **Risk Modeling**: Optional risk factors with probability and impact ranges that affect total story count
- **Visualization**: Custom histogram chart implementation showing frequency distribution

**Key Algorithms**:
- `runTrial()` (line 668): Executes single simulation iteration
  - Randomizes story count within range
  - Applies split factor (scope creep)
  - Evaluates each risk probabilistically
  - Simulates weekly throughput until completion
- `generateTriangular()` (line 703): Implements triangular distribution for three-point estimates
- `createHistogram()` (line 791): Buckets results into 25 bins for visualization

**Data Flow**:
1. User configures parameters (throughput, scope, capacity, risks)
2. Click "Generate Forecast" triggers `runSimulation()`
3. 500 trials run synchronously (with UI blocking)
4. Results sorted and percentiles calculated (50th, 85th, 95th)
5. Display updates with forecast cards and histogram

## Development

**No Build Process**: This is a static HTML file. Open `index.html` directly in a browser to run.

**Testing**: Open the file in a browser and interact with the UI. No automated tests exist.

**Modification Tips**:
- Simulation count (500) is hardcoded in `runSimulation()` at line 657
- Maximum weeks cap (200) prevents infinite loops at line 683
- Risk limit (5 max) enforced in `addRisk()` at line 540
- Chart uses 25 histogram buckets (line 792)

## Deployment

Static hosting only - no server-side logic. Deploy to any static host (GitHub Pages, Netlify, S3, etc.).
