# Specs Directory

This directory contains specifications for features and enhancements following our lightweight spec-driven development approach.

## Structure

```
specs/
├── README.md                    # This file
├── TEMPLATE-feature.md          # Template for new features
├── TEMPLATE-enhancement.md      # Template for improvements
├── active/                      # Work in progress
│   └── [feature-name].md       # Current specs being worked on
└── archive/                     # Completed work
    └── [feature-name].md       # Implemented specs (reference)
```

## Workflow

### 1. Starting New Work

**For a new feature:**
```bash
cp specs/TEMPLATE-feature.md specs/active/my-feature.md
# Edit the spec, fill in Problem, Solution, User Impact, Success Criteria
```

**For an enhancement:**
```bash
cp specs/TEMPLATE-enhancement.md specs/active/my-enhancement.md
# Edit the spec, fill in Current Behavior, Proposed Change, Rationale
```

**For a marketing initiative:**
```bash
cp specs/TEMPLATE-marketing.md specs/active/my-campaign.md
# Edit the spec, fill in Objective, Target Audience, Strategy, Metrics
```

### 2. Working Through Phases

**SPEC Phase**: Define what and why
- Fill in problem, solution, and success criteria
- AI may ask clarifying questions
- Get approval before proceeding

**PLAN Phase**: Define how
- AI adds Technical Approach section
- Identifies affected code sections
- Lists implementation steps
- Documents key decisions

**IMPLEMENT Phase**: Execute
- AI implements according to plan
- Tests against success criteria
- Updates spec status to "Implemented"

### 3. Completing Work

When implementation is done:
```bash
# Update spec status to "Implemented" with date
# Move spec to archive
mv specs/active/my-feature.md specs/archive/my-feature.md
```

## When to Use Specs

**Use specs for:**
- New features (e.g., PDF export, data persistence)
- Significant enhancements (e.g., algorithm changes)
- UI/UX changes affecting workflows
- Monetization features
- Analytics implementation

**Skip specs for:**
- Typo fixes
- Obvious bug fixes
- CSS tweaks
- Documentation updates

## Examples

See `specs/archive/ga4-event-tracking.md` for a completed spec example.

## Philosophy

Specs are lightweight and practical, not bureaucratic. They should:
- Take 1-2 minutes to draft
- Clearly articulate the "what" and "why"
- Provide just enough structure for AI to implement correctly
- Serve as documentation after implementation

Keep it simple. If a spec is taking more than 5 minutes to write, it's too complex.
