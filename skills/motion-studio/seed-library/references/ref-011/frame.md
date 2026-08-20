---
version: alpha
name: Card Fan From Folder — Frame
description: >
  A deep-green stage where an open folder releases a small fan of labeled footage cards, front
  card foregrounded and titled.
unit: the frame — 1920x1080

colors:
  bg: "#0d2b1a"
  folder: "#2f6f4a"
  card-blue: "#2f6fed"
  card-magenta: "#d6377b"
  card-green: "#0d2b1a"
  text: "#ffffff"
  glow: "rgba(47,111,74,0.5)"

radii:
  card: "16px"
  folder: "10px"

typography:
  card-title: { fontFamily: "Inter", weight: 700, px: 20, color: "text" }
  card-subtext: { fontFamily: "Inter", weight: 400, px: 14, color: "rgba(255,255,255,0.7)" }

spacing:
  fan-spread: "8deg"
  card-overlap: "-6cqw"

components:
  footage-card:
    rounded: "{radii.card}"
    description: "A titled card with a small mark/logo, one of several fanned above the folder; each a distinct hue."
  source-folder:
    backgroundColor: "{colors.folder}"
    rounded: "{radii.folder}"
    description: "An open folder icon anchoring the fan at the bottom of the frame."
---

# Card Fan From Folder — Frame

## Overview

A deep green, glow-lit stage where a folder at the bottom "releases" a small hand of cards fanned
above it, each a distinct hue, each carrying its own title and a small mark. The front-most card is
foregrounded, centered, and fully readable; the others peek from behind at a slight rotation,
implying more material than is shown.

## Composition Rules

**Do** — anchor the fan visually to the folder (cards should look like they came from it); keep
each card a distinct, deliberate hue; keep the front card's content fully legible while back cards
stay mostly chrome.

**Don't** — fan more than 3-4 cards (it stops reading as a fan and starts reading as clutter); let
back cards' text compete with the front card's.

## When To Use

A "here's your material, organized" beat — footage/assets being pulled from a source, options
being laid out, or a reveal of several related items from one origin point.
