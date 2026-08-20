---
version: alpha
name: Release Changelog Card — Frame
description: >
  A dark ember-gradient announcement card — a pill release badge, a bold headline, and a row of
  glowing rounded-square icon tiles introducing what's new.
unit: the frame — 1920x1080

colors:
  bg-top: "#3a0a0a"
  bg-bottom: "#160404"
  primary: "#ff6b35"
  text: "#ffffff"
  text-muted: "rgba(255,255,255,0.6)"
  tile-glow: "rgba(255,107,53,0.5)"

radii:
  tile: "20px"
  pill: "999px"

typography:
  badge: { fontFamily: "Inter", weight: 700, px: 14, tracking: "0.04em", color: "text" }
  headline: { fontFamily: "Inter", weight: 800, cqw: 3.0, color: "text" }

spacing:
  tile-gap: "1.6cqw"
  pad-y-top: "6cqw"

components:
  release-pill:
    backgroundColor: "rgba(255,255,255,0.1)"
    rounded: "{radii.pill}"
    description: "Small centered 'Release vX.XX' badge above the headline."
  icon-tile:
    backgroundColor: "linear-gradient(160deg, #ff6b35aa, #3a0a0a)"
    rounded: "{radii.tile}"
    glow: "0 0 40px {colors.tile-glow}"
    description: "Row of equal-size rounded-square tiles, one icon each, warm glow."
---

# Release Changelog Card — Frame

## Overview

A warm, dark ember gradient (deep red to near-black) carries a single announcement: a small pill
badge naming the release, a bold white headline naming the feature, and a horizontal row of
glowing icon tiles that stand in for what the feature actually does. The orange glow is the only
accent — no second color competes with it.

## Composition Rules

**Do** — center the badge and headline; keep the icon row perfectly even (same size, same gap);
let the tile glow do the "new and exciting" signaling instead of extra chrome.

**Don't** — mix in a cool accent color; crowd more than ~5 tiles into the row; let the headline
run past two lines.

## When To Use

A product-update / "here's what's new" beat, a feature-announcement hook, or any changelog-style
card naming a capability via a small icon set rather than a screenshot.
