---
version: alpha
name: Glossy Metric Widget (Trend + Badge) — Frame
description: >
  A glossy green widget pairing a hero figure and a drawn trend line, docked to a second lighter
  panel carrying a percentage badge.
unit: the frame — 1920x1080

colors:
  bg-top: "#6fe86f"
  bg-bottom: "#1f8a3f"
  panel-lime: "#a8f24a"
  primary: "#ffffff"
  panel-text: "#0a1a0a"
  line: "rgba(255,255,255,0.85)"

radii:
  widget: "48px"
  badge-pill: "999px"

typography:
  figure: { fontFamily: "Inter", weight: 800, cqw: 3.6, color: "primary" }
  caption: { fontFamily: "Inter", weight: 500, px: 20, color: "primary" }
  percentage: { fontFamily: "Inter", weight: 800, cqw: 2.4, color: "panel-text" }

spacing:
  pad: "6cqw"

components:
  glossy-widget:
    backgroundColor: "linear-gradient(160deg, {colors.bg-top}, {colors.bg-bottom})"
    rounded: "{radii.widget}"
    description: "Hero glossy panel: figure + trend line + caption."
  trend-line:
    strokeColor: "{colors.line}"
    description: "A single wavy translucent line tracing the trend across the widget's middle band."
  percent-badge:
    backgroundColor: "{colors.panel-lime}"
    textColor: "{colors.panel-text}"
    rounded: "{radii.badge-pill}"
    description: "A bright lime companion panel carrying a bold percentage figure and a small pill label."
---

# Glossy Metric Widget (Trend + Badge) — Frame

## Overview

The same glossy single-hue widget language as the bars variant, but paired with a second, lighter
panel of the same hue family that isolates a percentage change as its own callout. The pairing
reads as "here's the number, and here's how it's trending" without ever leaving the green family.

## Composition Rules

**Do** — keep both panels in the same hue family (dark glossy hero + a lighter flat companion);
let the trend line stay a single translucent stroke, not a filled area; keep the percentage badge
small relative to the hero figure.

**Don't** — introduce a color outside the green family for the badge; make the trend line the
same visual weight as the hero figure; combine more than one trend line on the same panel.

## When To Use

A growth/trend beat — "and it's still climbing" — where a single figure needs a companion proof
point (a percentage, a delta) without turning into a full chart.
