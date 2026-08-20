# `motion-profile.json` schema

Sidecar to `frame.md` for every library reference. `frame.md` is the reference's **brand/visual**
spec (colors, typography, spacing, components — HyperFrames' own format; motion is explicitly out
of scope there). `motion-profile.json` is the reference's **motion and applicability** spec — the
half of a "Motion Style Profile" that frame.md structurally can't hold.

```json
{
  "id": "ref-004",
  "name": "Premium SaaS Data Visualization",
  "category": "data-visualization",
  "tags": ["dashboard", "count-up", "dark-ui", "finance"],
  "sourceType": "image",
  "sourceFile": "source.png",
  "previewFile": "preview.png",
  "designSpecFile": "frame.md",

  "semanticDescription": "A dark dashboard card showing a single hero metric with a sparkline chart beneath it and a percentage-change chip.",
  "styleSummary": "Premium SaaS Data Visualization: snappy + smooth. Fast ease-out primary motion, subtle spring settle, slow camera push. Minimal sans-serif type, medium-high density, neutral-plus-accent color.",

  "composition": {
    "layout": "single centered card, generous negative space around it",
    "hierarchy": "hero number > sparkline > label row",
    "depth": "flat foreground card over a near-black background, no midground",
    "framing": "tight crop on the card, camera holds mostly static with a slow push"
  },
  "typography": {
    "characteristics": "geometric sans, tabular numerals on the hero figure",
    "weightHierarchy": "800 hero number / 600 labels / 400 captions",
    "animation": "hero number count-up, labels fade+rise"
  },
  "color": {
    "background": "#0b0b12",
    "primary": "#f5f5f7",
    "accent": "#4ee1a0",
    "notes": "single accent hue carries the positive-trend signal; no secondary accent"
  },

  "motion": {
    "primaryMotion": "fast ease-out count-up on the hero number",
    "secondaryMotion": "subtle spring settle on the card scale-in",
    "camera": "slow push-in, ~4% scale over the full shot",
    "overshoot": "minimal (~4%)",
    "stagger": "tight, ~2-3 frames between sparkline points",
    "citedBlueprints": ["dataviz-countup", "titlecard-reveal"],
    "citedRules": ["counting-dynamic-scale", "stat-bars-and-fills", "ambient-glow-bloom", "spring-pop-entrance"]
  },
  "timing": {
    "entrance": "0.4-0.6s",
    "hold": "2-3s",
    "exit": "0.3s",
    "rhythm": "brisk, confident, not rushed"
  },

  "visualDensity": "medium-high",
  "targetComponentDensity": [10, 16],
  "bestUseCases": ["statistics", "business", "finance", "technology", "saas"],
  "compatibleCategories": ["cinematic", "kinetic-typography", "saas"],
  "incompatibleCategories": ["historical", "retro-pixel-art"],

  "createdAt": "2026-08-02T09:58:00.000Z"
}
```

## Field notes

- **`motion.citedBlueprints` / `motion.citedRules`** — must be real ids from
  `hyperframes-animation/blueprints-index.md` / `rules-index.md`. Pick the closest match to the
  reference's *observed* motion character, not the first plausible name. 1-3 blueprints and 2-5
  rules is a normal range; don't force a full list if fewer genuinely fit.
- **`targetComponentDensity`** — a `[min, max]` frame count range (6-20 overall) this reference's
  density implies for a scene built in its style; see `script-to-storyboard.md` for how it combines
  with a beat's own duration/complexity to produce the final per-beat target.
- **`visualDensity`** — one of `low` / `medium` / `medium-high` / `high` / `very-high`, matching the
  vocabulary `general-video` and `hyperframes-creative` already use.
- **`sourceType`** — `image` / `gif` / `video`. Drives whether `reference-analysis.md`'s
  frame-extraction step runs.
- For a `gif`/`video` source, motion fields come from **observed** motion across the sampled
  frames, not inferred from a single still — extract frames first (see `reference-analysis.md`).
- Never fabricate exact hex colors, blueprint ids, or rule ids. If genuinely uncertain, write the
  closest honest approximation and say so in `semanticDescription` rather than inventing precision.
