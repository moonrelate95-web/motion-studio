---
version: alpha
name: Fintech Balance Card — Frame
description: >
  A near-black dashboard card: a labeled balance figure with a status pill, and a stack of two
  softly offset gradient payment cards peeking from beneath it.
unit: the frame — 1920x1080

colors:
  bg: "#121212"
  card-bg: "#181818"
  primary: "#ffffff"
  text-muted: "rgba(255,255,255,0.55)"
  positive: "#22c55e"
  visa-front: "linear-gradient(135deg, #3b5bfd, #5b6bff)"
  visa-back: "linear-gradient(135deg, #7c8cff, #a7b0ff)"

radii:
  card-lg: "28px"
  card-payment: "16px"
  pill: "999px"

typography:
  label: { fontFamily: "Inter", weight: 500, px: 20, color: "text-muted" }
  balance: { fontFamily: "Inter", weight: 800, cqw: 5.5, color: "primary" }
  pill-text: { fontFamily: "Inter", weight: 700, px: 14, color: "positive" }

spacing:
  pad: "3.5cqw"
  card-offset: "10px"

components:
  status-pill:
    backgroundColor: "rgba(34,197,94,0.15)"
    textColor: "{colors.positive}"
    rounded: "{radii.pill}"
    description: "'Active' status chip, top-right of the card header."
  payment-card:
    rounded: "{radii.card-payment}"
    description: "Stacked payment-card chips, back card offset up-and-right of the front card, masked card number."
---

# Fintech Balance Card — Frame

## Overview

A restrained dark dashboard card built around one number. A small muted label and a green status
pill sit above a large white balance figure; beneath it, two payment cards fan slightly, front
card in saturated blue, the one behind it a lighter blue-violet — enough offset to read as a
stack, not a duplicate.

## Composition Rules

**Do** — keep the balance figure the single largest element on the card; use the green pill only
for a genuinely positive/active status; keep the payment-card stack's offset small and consistent.

**Don't** — add more than two stacked cards; introduce a second accent color beyond the status
green; let card copy compete with the balance figure's size.

## When To Use

Any beat that needs to land one confident financial number — an account balance, an earnings
figure, a funding total — with enough chrome to read as "real product," not a bare stat card.
