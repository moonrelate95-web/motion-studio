---
version: alpha
name: Content Strategy Wheel — Frame
description: >
  A radial selector where the current pick is the only lit thing on the wheel — a segmented ring
  of numbered options around a single glowing highlighted segment, with a soft idea/lightbulb mark
  beneath it.
unit: the frame — 1920x1080

colors:
  bg: "#0a0510"
  primary: "#b855ff"
  primary-dim: "rgba(184,85,255,0.18)"
  text: "#ffffff"
  text-muted: "rgba(255,255,255,0.45)"
  glow: "rgba(184,85,255,0.55)"

radii:
  segment: "18px"
  pill: "999px"

typography:
  segment-number: { fontFamily: "Inter", weight: 800, cqw: 3.2, color: "text" }
  segment-label: { fontFamily: "Inter", weight: 700, cqw: 1.1, tracking: "0.06em", upper: true, color: "text" }
  segment-label-dim: { fontFamily: "Inter", weight: 600, cqw: 0.8, color: "text-muted" }

spacing:
  ring-radius: "38cqh"
  segment-gap: "1.2deg"

components:
  wheel-segment-active:
    backgroundColor: "{colors.primary}"
    glow: "0 0 60px {colors.glow}"
    rounded: "{radii.segment}"
    description: "The single lit trapezoid segment carrying the current pick; every other segment stays dim."
  wheel-segment-dim:
    backgroundColor: "{colors.primary-dim}"
    textColor: "{colors.text-muted}"
    description: "Unselected ring segments — numbered, low-opacity, no glow."
  idea-mark:
    description: "A small glowing lightbulb/spark mark centered below the wheel, breathing ambient glow."
---

# Content Strategy Wheel — Frame

## Overview

A dark, near-black stage with one violet-neon accent. The wheel itself is a ring of options
arranged around a hidden center; only the current pick lights up — bright fill, heavy glow,
oversized number + uppercase label — while every other segment sits at low opacity with no glow.
The read is instant: this is the one that's live right now.

## Composition Rules

**Do** — keep exactly one segment lit at a time; give the active segment real glow, not just a
brighter fill; keep dim segments legible but clearly secondary; leave generous dark space around
the ring so the glow has room to bloom.

**Don't** — light more than one segment at once; use a second accent hue; crowd the ring center
with unrelated content — the idea mark is the only thing allowed there.

## When To Use

A picker/reveal beat where the video is choosing one thing from a visible set of options —
listicle "here's option N," a strategy/framework step being called out from the full framework, or
a gamified "spin to reveal" hook.
