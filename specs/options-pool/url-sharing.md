# URL-Based Forecast Sharing

## Idea

Allow users to share their forecast configuration via URL parameters - receiver opens the link and sees the same forecast setup, ready to generate or modify.

## Notes

- Encode all parameters in URL query string:
  - Throughput data (historical or three-point)
  - Story count range
  - Capacity percentage
  - Split factor
  - Risks (if any)
- Maybe use URL compression or base64 encoding to keep URLs manageable
- Could be useful for:
  - Sharing forecasts with stakeholders
  - Documenting estimation assumptions
  - Collaborating on estimation scenarios
- Should probably NOT include results in URL (would be too long)
- User clicks "Generate Forecast" after opening shared link
