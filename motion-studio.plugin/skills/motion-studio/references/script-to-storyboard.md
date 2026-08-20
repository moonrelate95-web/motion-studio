# Script to beats, and style assignment

Turns a timestamped script into a beat list with a style (library reference) and a component
density target assigned to each beat. The beat list is what `handoff.md` writes into
`STORYBOARD.md` — this file only covers parsing and assignment, not the file format.

## 1. Parse timestamps

Accept common variants: `[00:00 - 00:05]`, `[0:00-0:05]`, `(0:00–0:05)`, `0:00 - 0:05`, and a
single timestamp per line (`[00:05]`) meaning "starts here, ends at the next timestamp (or +4s for
the last line if no explicit end)". Convert `MM:SS` (or `H:MM:SS`) to seconds. One beat per
timestamped line/block; the line's text (minus the timestamp) is that beat's `narration`.

If the script has no timestamps at all, ask the user for rough timing (or offer to estimate ~3
words/second and derive timestamps) rather than guessing silently — duration accuracy matters
downstream (STORYBOARD.md's `duration` drives real frame timing).

## 2. Derive each beat's shape

For each beat, from its narration text alone (don't invent content the script doesn't support),
determine:

- **Main concept** — the one thing this beat communicates.
- **Visual metaphor** — the concrete thing that should be on screen (a number, a comparison, a
  process, a place, a quote, a UI, a diagram) — not "text about X."
- **Suggested motion-graphics category** — a loose mapping to help style search/AI-select in step 4:
  a number/metric → `stat`/`data-visualization`; a comparison → `charts`; a sequence of steps →
  `timeline`; a claim/quote/punchy line → `kinetic-typography`; a place → `maps`; a product/app
  screen → `ui-animation`/`product-demo`; anything narrative/atmospheric with no data → `cinematic`.

## 3. Target component density (6-20)

Every beat's scene should carry a deliberate number of visual components — not a single slide, not
an arbitrary pile. Derive a target range from the beat's own duration and complexity, then narrow
it against the assigned reference's `targetComponentDensity` (from its `motion-profile.json`):

```
base      = 6 + round(durationSeconds * 1.2)
complexity_bonus = +4 if the beat is data-heavy (multiple numbers/comparisons), +2 if it names 3+ distinct entities, else 0
beat_target = clamp(base + complexity_bonus, 6, 20)
final_target = overlap of [beat_target - 2, beat_target + 2] and the reference's targetComponentDensity, else beat_target
```

This is guidance for the eventual scene builder (`/general-video`), not a rigid part-count to hit
mechanically — write it into `STORYBOARD.md` as a target range, phrased the same way
`hyperframes-creative/house-style.md` already phrases density guidance, so it composes with their
own rules instead of conflicting: content elements *and* the 2-5 ambient background decoratives
they always expect count toward the same total.

A longer beat's higher density must arrive **staggered across its full duration**, not as one
larger pile that lands in the first second and then holds — a 4s beat is one entrance; a 10s beat
is an entrance plus at least one more thing visibly arriving or changing later in the window. See
`handoff.md` § 3.6: this is what keeps a longer beat from reading as static once the count-count
(number of beats) is fixed and no longer being quietly reduced to compensate (§ 3.5).

## 4. Assign a style per beat

**Manual** — the user names references by id or name from a prior `gallery.md` browse. Use exactly
what they picked.

**AI auto-select** ("let AI choose") — for each beat, score every library reference in
`index.json`:

- `+3` if the reference's `category` matches the beat's suggested category (step 2)
- `+2` per overlapping tag between the reference's `tags` and words in the beat's narration
- `+2` if the beat's suggested category appears in the reference's `bestUseCases`
- `+2` if `compatibility.json` marks the reference's category as **high** compatibility with the
  *previous* beat's chosen category; `-2` if marked **low**; `0` (neutral) otherwise or for beat 1
- `+1` small continuity bonus for reusing the immediately-previous beat's exact reference, so the
  piece doesn't switch visual language every single beat when nothing demands it

Pick the highest-scoring reference. If the library is empty or nothing scores above a low
threshold, say so and either fall back to `hyperframes-creative` house-style/palette defaults for
that beat (do not block on the library) or ask the user to add a reference first — their call.

Record *why* only if the user asks for an explanation — otherwise just assign and move on, per the
product's own "explain only when asked" principle.

## 5. Transitions between beats

When adjacent beats use different reference categories, set that beat's `transition_in` to
something more deliberate than a bare cut (`crossfade` is the safe default; a wipe/morph is fine
when the content motivates it) — HyperFrames' own `transition_in` field in `STORYBOARD.md` handles
this, see `hyperframes-core/references/storyboard-format.md`. Same reference as the previous beat →
`cut` is fine.

## Output of this step

A list of beats, each with: `startSeconds`, `endSeconds`, `narration`, `concept`, `visualMetaphor`,
`category`, `assignedReferenceId` (or `null` if none), `targetDensity: [min, max]`,
`transitionIn`. Hand this list to `handoff.md` to materialize as `BRIEF.md` + `STORYBOARD.md`.
