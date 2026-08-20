---
version: alpha
name: Glossy Metric Widget (Bars) — Frame
description: >
  A glossy 3D rounded-rectangle widget in a single saturated green — a hero dollar figure over a
  small translucent bar chart, one caption line beneath.
unit: the frame — 1920x1080

colors:
  bg-top: "#58e06a"
  bg-bottom: "#1c7a34"
  primary: "#ffffff"
  bar-fill: "rgba(255,255,255,0.55)"
  caption: "rgba(255,255,255,0.8)"

radii:
  widget: "48px"
  bar: "6px"

typography:
  figure: { fontFamily: "Inter", weight: 800, cqw: 3.6, color: "primary" }
  caption: { fontFamily: "Inter", weight: 500, px: 20, color: "caption" }

spacing:
  pad: "6cqw"
  bar-gap: "1cqw"

components:
  glossy-widget:
    backgroundColor: "linear-gradient(160deg, {colors.bg-top}, {colors.bg-bottom})"
    rounded: "{radii.widget}"
    description: "Large single-color glossy rounded-rect surface; one soft highlight sweep, no border."
  mini-bar:
    backgroundColor: "{colors.bar-fill}"
    rounded: "{radii.bar}"
    description: "Small uneven-height translucent bars forming a compact bar chart beneath the figure."
---

# Glossy Metric Widget (Bars) — Frame

## Overview

One glossy, saturated color fills the entire widget — think app-icon, not dashboard card: soft
gradient, rounded corners, a single highlight sheen. A bold white figure sits at the top; a small
translucent bar chart sits beneath it as texture more than analysis; one caption line names the
metric.

## Composition Rules

**Do** — keep the whole widget one hue (light-to-dark gradient of the same color, not two
colors); let the bar chart stay small and secondary to the figure; keep the caption short and
quiet.

**Don't** — outline or shadow the widget with a competing color; make the bar chart the visual
focus; stack more than one figure on the same widget.

## When To Use

A quick single-metric hit — daily/weekly sales, a count, a total — presented as a confident,
app-icon-simple glossy tile rather than a data-dense dashboard panel.
