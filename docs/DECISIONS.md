# Decisions

Short numbered notes on choices made, and why. Newest at the bottom.

1. **Retire `adev-callout` in favour of `adev-alert` with a `warning` kind** (2026-10-17).
   - Reason: duplicate API, and the theme is unpublished, so there is no compatibility cost.
   - Consequence: `warning` exists only in `adev-alert` (as a tag, not as a `WARNING:` paragraph), because angular.dev has no warning kind.
