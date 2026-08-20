---
version: alpha
name: Neon Process Tree — Frame
description: >
  A black stage with an electric-blue headline over a vertical connector line splitting into
  labeled, icon-bearing step boxes — a numbered process rendered as a glowing circuit diagram.
unit: the frame — 1920x1080

colors:
  bg: "#050810"
  primary: "#5ec8ff"
  primary-dim: "rgba(94,200,255,0.15)"
  text: "#ffffff"

radii:
  step-box: "14px"

typography:
  headline: { fontFamily: "Inter", weight: 800, cqw: 2.8, upper: true, tracking: "0.02em", color: "text" }
  step-label: { fontFamily: "Inter", weight: 600, px: 20, upper: true, tracking: "0.04em", color: "primary" }

spacing:
  step-gap: "4cqw"
  connector-width: "2px"

components:
  step-box:
    backgroundColor: "transparent"
    border: "2px solid {colors.primary}"
    rounded: "{radii.step-box}"
    glow: "0 0 30px rgba(94,200,255,0.4)"
    description: "Rounded rectangle outline holding a small icon + 'Step 0N:' label."
  connector-line:
    strokeColor: "{colors.primary}"
    description: "Vertical trunk line splitting into as many branches as there are steps."
---

# Neon Process Tree — Frame

## Overview

A near-black canvas with a single electric-blue neon accent. A bold uppercase headline sits above
a simple circuit-like structure: one trunk line drops from the headline and splits into evenly
spaced branches, each ending in an outlined step box with a small icon and a "Step 0N:" label. The
glow, not fill, carries the energy — boxes stay transparent inside their glowing outline.

## Composition Rules

**Do** — keep step boxes evenly spaced and identically sized; let the connector visibly draw the
hierarchy (trunk → branches → boxes); keep icons simple/iconographic, not detailed illustrations.

**Don't** — fill the step boxes solid; use more than one accent color; run more than ~4 steps
before it needs a second row.

## When To Use

Any "here's the process" beat — a numbered strategy, a workflow, a how-it-works explainer — where
the connecting structure itself should read as an authoritative, engineered system.
