# Analyzing a reference into the library

Goal: turn one pasted/uploaded image, GIF, or video into a permanent, reusable library entry —
`frame.md` + `motion-profile.json` — analyzed **once**. Don't simply describe what the reference
looks like; extract the underlying design and motion *principles* so the profile is reusable on
completely different content later (style transfer, not literal duplication).

## 0. Check for a duplicate first

Look at `~/MotionStudio/library/index.json`. If a reference with the same name, or a visually
identical source (same pasted image, same filename), already exists, reuse it — report which
reference you're reusing and stop. Do not re-analyze.

## 1. Assign an id and stage the source

```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/motion-studio/scripts/cli.mjs" check   # confirms library/ffmpeg are ready
```

Pick the next `ref-NNN` (scan `~/MotionStudio/library/references/` for the highest existing number,
zero-padded to 3 digits). Create `~/MotionStudio/library/references/<id>/` and copy the original
asset in as `source.<ext>`.

## 2. Get frames to look at

- **Image** (png/jpg/webp/svg): `preview.<ext>` = a copy of `source.<ext>`. Use the `Read` tool
  directly on it — that's the whole analysis input.
- **GIF or video**: extract sampled frames first — you cannot view a video file directly.

  ```bash
  node "${CLAUDE_PLUGIN_ROOT}/skills/motion-studio/scripts/cli.mjs" extract-frames \
    "<source-path>" "<id-dir>/frames" 6
  ```

  This writes `frame-01.jpg` … `frame-06.jpg` evenly spaced across the clip's duration and prints
  each path. `Read` all of them, in order. Use `frame-01.jpg` (or the most representative middle
  frame) as `preview.<ext>`. With 6 ordered frames you can observe actual entrance/settle/exit
  motion, not just guess at it from a single still — use that to fill in `motion.*` honestly.

## 3. Analyze deeply, not descriptively

For each of the following, extract the underlying principle, not just a visual description:

- **Composition** — layout, spatial hierarchy, alignment, negative space, foreground/midground/
  background, depth, framing/cropping.
- **Typography** — font character (geometric/humanist/serif/mono), weight hierarchy, size ramp,
  tracking, placement, and — for GIF/video — how text enters/emphasizes.
- **Color** — background, primary, accent(s), gradients, contrast, saturation. Name real values
  where legible; otherwise the closest honest approximation.
- **Motion** (GIF/video only, from the sampled frames — don't invent motion for a static image
  beyond what a static composition implies, e.g. "camera" is `none` for a plain screenshot):
  position/scale/rotation/opacity change, blur, masking, staggering between elements, camera
  behavior, apparent easing character (linear / ease-out / spring-overshoot / elastic).
- **Timing** — rough entrance/hold/exit durations and rhythm, estimated from frame spacing.
- **Density** — how many distinct visual elements are on screen at once (rough count) and how
  tightly packed they are.

## 4. Cite real motion vocabulary — never invent names

Read `../hyperframes-animation/blueprints-index.md` and `../hyperframes-animation/rules-index.md`
(read the actual files — don't rely on memory of prior reads) and pick the blueprint(s)/rule(s)
whose described shape/mechanism most closely matches what you observed. It's fine, and expected,
for the match to be approximate — record it as the *nearest* real vocabulary, not a perfect one.
A reference with no clear GIF/video motion to observe (a plain screenshot) can still cite rules for
its *implied* entrance style based on its composition (e.g. a bold hero number implies
`counting-dynamic-scale`).

## 5. Write `frame.md`

Model the shape on HyperFrames' own preset format (`../hyperframes-creative/frame-presets/*/FRAME.md`
— skim one for the shape, don't copy its content). YAML frontmatter is normative — real hex
colors, real font names, actual spacing/radius values, a handful of `components:` entries for the
reference's recurring visual units (cards, chips, bars, whatever it actually has). The body is
proportionate, not a full flagship design system: an `## Overview` paragraph, a short
`## Composition Rules` (Do / Don't), and a `## When To Use` paragraph pulling from
`bestUseCases`. A few dozen lines total is normal — this is a lightweight reusable spec, not a
hand-crafted brand book.

## 6. Write `motion-profile.json`

Per `motion-profile-schema.md`. Fill every field honestly; leave `citedBlueprints`/`citedRules`
grounded in step 4.

## 7. Rebuild the index and confirm

```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/motion-studio/scripts/cli.mjs" rebuild-index
```

Report back in one or two lines: the assigned id, name, category, and a one-line style summary.
Offer to show the gallery (`gallery.md`) if the user is adding references without an immediate
script in mind.
