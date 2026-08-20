---
version: alpha
name: Neon Step Ladder — Frame
description: >
  A diagonal glowing violet ladder rising from lower-left, one numbered rung called out with a
  large glow-lit number and a label beside it.
unit: the frame — 1920x1080

colors:
  bg: "#0a0512"
  primary: "#9b5cff"
  text: "#ffffff"
  rung-dim: "rgba(155,92,255,0.25)"

radii:
  rung: "8px"

typography:
  step-number: { fontFamily: "Inter", weight: 800, cqw: 4.5, color: "primary" }
  step-label: { fontFamily: "Inter", weight: 600, cqw: 1.6, color: "text" }

spacing:
  rung-pitch: "9cqh"
  ladder-angle: "32deg"

components:
  ladder-rung:
    backgroundColor: "{colors.rung-dim}"
    rounded: "{radii.rung}"
    description: "Parallelogram/trapezoid rung on the diagonal ladder, dim unless it's the called-out step."
  active-rung:
    glow: "0 0 50px rgba(155,92,255,0.6)"
    description: "The one rung carrying the current step number + label, lit and glowing."
---

# Neon Step Ladder — Frame

## Overview

A diagonal ladder of glowing violet rungs climbs from the lower-left corner toward the upper-right,
reading as ascending progress. One rung is called out at a time with a large glowing number and a
label set beside it in plain white — the ladder's diagonal energy carries the sense of "climbing
toward something," while the callout keeps each individual step legible.

## Composition Rules

**Do** — keep the ladder's diagonal consistent and let it run off-frame at both ends (implying
more steps than shown); make the active rung's number the largest text on screen.

**Don't** — straighten the ladder into a vertical/horizontal list — the diagonal is the point;
light more than one rung at a time; use a second accent color.

## When To Use

A numbered-list or step-by-step beat that wants motion and momentum rather than a static
checklist — social proof stacking up, a countdown, or sequential steps building toward a payoff.
