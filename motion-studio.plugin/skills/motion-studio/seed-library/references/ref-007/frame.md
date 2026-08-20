---
version: alpha
name: Branching Idea Tree — Frame
description: >
  A minimal black canvas where one filled root node splits via two drawn connector lines into two
  outlined child nodes — the simplest possible "one thing becomes two things" diagram.
unit: the frame — 1920x1080

colors:
  bg: "#000000"
  root-fill: "#c9b8ff"
  root-text: "#0a0a0f"
  child-border: "rgba(255,255,255,0.5)"
  child-text: "#ffffff"
  glow: "rgba(107,63,160,0.35)"

radii:
  node: "12px"

typography:
  node-label: { fontFamily: "Inter", weight: 600, px: 22, color: "child-text" }

spacing:
  node-gap: "10cqw"
  vertical-drop: "8cqh"

components:
  root-node:
    backgroundColor: "{colors.root-fill}"
    textColor: "{colors.root-text}"
    rounded: "{radii.node}"
    description: "Single filled lavender node at the top, the only solid-fill node in the diagram."
  child-node:
    backgroundColor: "transparent"
    border: "1.5px solid {colors.child-border}"
    rounded: "{radii.node}"
    description: "Outlined nodes fed by a connector from the root."
  connector:
    strokeColor: "{colors.child-border}"
    description: "Smooth curved line from root to each child, drawn on arrival."
---

# Branching Idea Tree — Frame

## Overview

The simplest node diagram possible: one solid-filled root node up top, two curved lines dropping
away from it to two outlined child nodes below. A soft purple glow sits low in the frame, giving
the black canvas some warmth without adding a second graphic element. Nothing else is on screen.

## Composition Rules

**Do** — keep the root the only filled/solid node; let the connector curves do the storytelling
(root → children); leave real negative space — this diagram earns its point through restraint.

**Don't** — fill the child nodes; add a third sibling unless the content genuinely has three
branches; add labels, chrome, or icons beyond the node text itself.

## When To Use

Any "one thing splits into two considerations" beat — an idea branching into a topic and an angle,
a decision branching into two paths, a root cause branching into two effects.
