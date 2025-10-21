# Configurable Simulation Count

## Idea

Let users choose how many Monte Carlo simulation trials to run (currently hardcoded at 500). Options like 5,000 or 50,000 for more consistent/stable results.

## Notes

- Currently runs 500 trials (see `runSimulation()` in index.html)
- Higher counts = more accurate probability distribution
- Tradeoff: more trials = longer computation time
- Could add dropdown or slider in UI:
  - Quick (500 trials) - ~instant
  - Standard (5,000 trials) - ~1-2 seconds
  - High precision (50,000 trials) - ~10-20 seconds
- Need to test performance on mobile devices
- Consider showing progress indicator for high counts
- Maybe default to 500 but let power users increase it
