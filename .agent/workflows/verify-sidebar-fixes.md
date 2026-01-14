---
description: Verify Sidebar Stream H Fixes
---

# Verify Sidebar Stream H Fixes

1. **Check Accordion Headers**
   - Open the Sidebar.
   - Verify "Basic Options" and "Advanced Styling" headers have a visible border.
   - Verify the background is transparent (not faintly colored).
   - Hover over the headers and check for a gray background change.
   - Verify the Chevron icon has the correct text color.

2. **Check Font Selects**
   - Locate "Primary Font" and "Display Font" dropdowns.
   - Verify they have a visible border and rounded corners matching the design system.
   - Click to open and verify the dropdown content also has borders and is properly positioned (z-index).
   - Hover over items in the dropdown and check for highlight color.

3. **Check Color Swatches**
   - Locate "Primary Color" section.
   - Verify swatches are arranged in a neat grid (not overflowing or misaligned).
   - Verify the custom color picker (rainbow wheel) is visible and clickable.
   - Check that clicking a color updates the UI.

4. **Check Style Preset Buttons**
   - Locate "Style Preset" section.
   - Verify buttons are arranged in a 2-column grid (2x2).
   - Verify buttons have a fixed height/width and look consistent.
   - Check that the selected preset has a distinct border/background.
   - Verify text and icons are centered.

5. **Check Initial Load Toast**
   - Refresh the page.
   - Verify that NO toast message appears immediately (e.g. "Applied Modern Flat").
   - Change a style preset and verify a toast DOES appear then.
