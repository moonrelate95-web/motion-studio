---
version: alpha
name: Upload Toast Card — Frame
description: >
  A small dark notification card floating on a violet ambient glow — a file icon, filename and
  size, and a progress bar mid-upload.
unit: the frame — 1920x1080

colors:
  bg: "#16121f"
  card-bg: "#1d1830"
  primary: "#8b5cf6"
  text: "#ffffff"
  text-muted: "rgba(255,255,255,0.5)"

radii:
  card: "20px"
  icon: "12px"
  bar: "999px"

typography:
  filename: { fontFamily: "Inter", weight: 600, px: 22, color: "text" }
  meta: { fontFamily: "Inter", weight: 400, px: 16, color: "text-muted" }
  tag: { fontFamily: "Inter", weight: 700, px: 12, upper: true, color: "text-muted" }

spacing:
  pad: "2cqw"

components:
  toast-card:
    backgroundColor: "{colors.card-bg}"
    rounded: "{radii.card}"
    glow: "0 40px 100px rgba(139,92,246,0.35)"
    description: "Small floating card, softly glowing beneath it, close (x) affordance top-right."
  progress-bar:
    backgroundColor: "rgba(255,255,255,0.12)"
    fill: "{colors.primary}"
    rounded: "{radii.bar}"
    description: "Thin rounded track with a filling bar + percentage readout."
---

# Upload Toast Card — Frame

## Overview

A compact, dark card that reads as a real product notification — file-type icon and tag chip on
the left, filename and size on the right, a progress bar with a live percentage beneath. A violet
glow blooms beneath the card, the only accent color in an otherwise monochrome dark surface.

## Composition Rules

**Do** — keep the card small and toast-like, not full-bleed; let the progress bar and its
percentage stay perfectly in sync; use the glow sparingly, only under this one element.

**Don't** — add a second accent color; make the card so large it stops reading as a notification;
leave the progress bar static while the percentage changes (or vice versa).

## When To Use

A beat about something being processed, generated, uploaded, or in progress — a believable "the
system is working" moment rather than an abstract loading spinner alone.
