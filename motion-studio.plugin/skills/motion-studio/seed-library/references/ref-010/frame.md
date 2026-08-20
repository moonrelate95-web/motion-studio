---
version: alpha
name: Editor Timeline Cursor-Demo — Frame
description: >
  A dark video-editor UI mockup — colored clip tracks on a timeline, a flagged playhead, and a
  visible cursor clicking a folder to add a new clip.
unit: the frame — 1920x1080

colors:
  bg: "#1a1a1a"
  track-teal: "#2dd4bf"
  track-magenta: "#ec4899"
  playhead: "#3b82f6"
  text: "#ffffff"

radii:
  clip: "6px"

typography:
  clip-label: { fontFamily: "Inter", weight: 700, px: 14, color: "text" }
  folder-label: { fontFamily: "Inter", weight: 600, px: 16, color: "text" }

spacing:
  track-height: "5cqh"
  clip-gap: "2px"

components:
  clip-segment:
    rounded: "{radii.clip}"
    description: "A colored rectangle on a track, sized to its duration, labeled inside."
  playhead-marker:
    backgroundColor: "{colors.playhead}"
    description: "A thin vertical line with a flag-shaped top marking the current timeline position."
  cursor-actor:
    description: "A visible arrow cursor that moves to and clicks UI elements — the demo's driver."
---

# Editor Timeline Cursor-Demo — Frame

## Overview

A believable, slightly stylized video-editor interface: several tracks stacked with color-coded
clip segments (teal-green for one kind of content, magenta for another), a blue flagged playhead
marking the current position, and — critically — a visible cursor that performs the actual demo by
moving to and clicking a UI element (here, a folder), which is what causes the timeline to change.

## Composition Rules

**Do** — color-code tracks consistently (one hue per content type); keep clip labels legible at
their given size; let the cursor's click be the thing that visibly causes a change, not a
coincidence.

**Don't** — animate the timeline changing without a cursor action motivating it; use more than two
or three track hues; make the cursor invisible or instantaneous — the click itself is the beat.

## When To Use

Any "here's how the tool works" beat driven by a simulated user action — clicking, dragging,
selecting — where showing the interaction itself (not just the before/after) is the point.
