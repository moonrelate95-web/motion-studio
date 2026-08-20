# Handoff — creating the project and handing off to `/general-video`

This is the last step this skill performs. Everything after it — composition HTML, motion, render
— belongs to `/general-video` (or `/motion-graphics` for the single-short-unnarrated-beat case; see
`../hyperframes/SKILL.md` § 2's routing table for that distinction). Do not build compositions here.

Input: the beat list produced by `script-to-storyboard.md`.

## 1. Initialize the project

Pick a kebab-case project name from the script's subject (not a timestamp). Then, exactly as
`general-video/SKILL.md` § 2 specifies for a fresh project:

```bash
npx hyperframes init "videos/<project-name>" --non-interactive --example=blank --skill=general-video
```

Never `hyperframes init` in the workspace root. All following paths are relative to
`PROJECT_DIR = videos/<project-name>/`.

## 2. Establish the brand layer (`frame.md`)

`frame.md` is a **project-wide** brand spec (colors/type/spacing consistent across the whole
piece) — it is not swapped per scene. Pick the **primary** style: the highest-scoring reference
across all beats (most beats assigned to it, or the first beat's reference if scores are flat), and
copy its design spec in as the project's brand truth:

```bash
cp "$MOTION_STUDIO_LIBRARY/references/<primary-id>/frame.md" "videos/<project-name>/frame.md"
```

This is what makes "multi-style storytelling" work correctly in HyperFrames' own terms: one
consistent brand (this copied `frame.md`) carries the whole video, while **motion treatment**
varies per beat via each beat's own cited blueprint/rules and category (step 4 below) — never
naively swap the whole color/type system mid-video; that reads as broken, not intentional.

**Hard rule — one background, no exceptions.** `hyperframes-creative/references/house-style.md`
states this plainly: "Same background across all scenes." Read the copied `frame.md`'s
`colors.bg` token before building any scene, and use that *exact* value as every scene's `#root`
background — never let a scene fall back to its own source reference's background just because
that reference had a different one. A beat's assigned reference contributes its **accent** color,
typography character, and motion citations to that scene; it does not get to override the
project's base canvas. (This is the one thing worth a final grep before handoff to `/general-video`
or before calling a build done: `grep -h "background:" compositions/frames/*.html | grep root`
across every scene file should show the same value everywhere — one background token, repeated,
never a second one. Flag it in `BRIEF.md` → `## Notes` as an explicit constraint so the builder
doesn't reintroduce per-scene backgrounds from the cited references either.)

## 3. Write `BRIEF.md`

Per `../hyperframes-core/references/brief-format.md`, at the project root, **as the workflow's
first action after init** (already satisfied — you just ran it):

```markdown
---
workflow: general-video
flow: automation
storyboard: yes
message: "<the one thing this video must communicate, derived from the script>"
length: "<total script duration>s"
---

## Intent

<one short paragraph: what the video is, for whom, tone — derived from the script and, if the
user said so, their own words>

## Customizations

- Motion Studio reference library: brand spec copied from `<primary-id>` ("<primary-name>").
- Per-beat motion styles assigned by Motion Studio — see STORYBOARD.md frame `extra` keys
  (`style_ref`, `cited_blueprints`, `cited_rules`, `target_density`); honor these citations when
  building each scene rather than picking new ones from scratch.

## Notes

- Scene count is fixed at `<N>` (one per script beat) — do not merge, split, or drop frames
  regardless of individual beat length; a short beat gets denser motion, never a shared scene.
- Every frame must stay visibly active for its whole `duration`, not just its entrance — assign it
  a `motion-doctrine` sustained-motion route (staged reveals / camera with intent / sequenced UI
  life / animated sequences / cursor-led action) sized to that length; longer beats need more
  staged content arriving over time, never a bigger static hold.
- Component density target for each frame is a *range*, not a fixed count — see that frame's
  `target_density`; it already includes the project's usual 2-5 ambient background decoratives.
- One background for the whole film: `<hex from the copied frame.md's colors.bg>`. Every scene's
  `#root` uses this exact value — cited references contribute accent/motion only, never their own
  background.
```

Fill `destination`/`aspect`/`language`/`audience`/`angle` only if the user actually specified them
(brief-format.md: "store canonical normalized values" — don't invent ones that weren't given).

## 3.5. Scene count is fixed — never consolidate beats

**One beat from `script-to-storyboard.md` = one `## Frame` in `STORYBOARD.md` = one built scene.
Always. No exceptions for a beat that feels short or thin.** A script with 12 timestamped lines
gets a 12-frame `STORYBOARD.md`, never 5 or 6 "cleaned up" scenes. Collapsing several beats into
one scene is the single most common way this pipeline goes wrong: the video ends up with fewer,
longer scenes that were only ever designed to hold a few seconds of content each, so the extra
duration reads as static and empty — exactly the failure this rule exists to prevent.

Do not misread `general-video/SKILL.md`'s dispatch-economics note ("a film of up to ~6 short
scenes builds FASTER inline... fan out only when the plan exceeds that") as permission to reduce
scene count. That note is scoped **only** to whether the builder works through scenes inline in
this context versus dispatching parallel subagent workers — a build-strategy choice, never a
story-content decision. A 14-beat script still gets 14 scenes; it just means the builder works
through more of them per dispatched worker (general-video's own guidance: 2-3 scenes per worker,
all workers in one wave), not that some beats lose their own scene.

Say this explicitly in `BRIEF.md` → `## Notes` (added to the block in step 3): `Scene count is
fixed at <N> (one per script beat) — do not merge or drop frames regardless of individual beat
length.`

## 3.6. Fill each scene's full duration — no entrance-then-hold

A scene that finishes its entrance with several seconds still left on its `duration` and then just
sits there is `motion-doctrine`'s banned "idle wobble" failure mode by another name — it's the
other half of "static, little happening," and it happens even when scene count is correct. Every
frame's `scene` line (and the builder's eventual motion plan) must assign one of
`motion-doctrine/SKILL.md`'s sustained-motion routes — **staged reveals, camera with intent,
sequenced UI life, animated sequences, or cursor-led action** — sized to that beat's actual
`duration`, not just its entrance. Concretely: a 4s beat can be one entrance + a settle; an 8-10s
beat needs at least two more content beats arriving after the entrance (a second stat revealing, a
step advancing, a follow-up detail sliding in) so something is still visibly landing in the back
half of the scene. Longer beats get *more staged beats of content over time*, never a bigger
one-time pile that then goes still — motion-doctrine's own test applies per scene: pause at any
second and something meaningful must be mid-flight.

## 4. Write `STORYBOARD.md`

Per `../hyperframes-core/references/storyboard-format.md`. Frontmatter: `format` (aspect the user
wants, default `1920x1080`), `duration` (sum of beat durations), `message` (same as BRIEF.md),
`arc` (a short arc phrase derived from the beats' concepts, e.g. `Hook → Data → Payoff`).

One `## Frame N — <short title>` per beat, in order:

```markdown
## Frame 3 — The real cost

- status: outline
- duration: 5s
- transition_in: crossfade
- scene: A hero dollar figure counts up over a dark dashboard card, then a sparkline draws in beneath it.
- voiceover: "But the real cost isn't what most people think."
- style_ref: ref-004
- design_spec: /home/user/MotionStudio/library/references/ref-004/frame.md
- motion_profile: /home/user/MotionStudio/library/references/ref-004/motion-profile.json
- cited_blueprints: [dataviz-countup]
- cited_rules: [counting-dynamic-scale, stat-bars-and-fills, ambient-glow-bloom]
- target_density: 10-16

Data carries this beat's argument — the count-up IS the point, not decoration around it.
```

**Use absolute paths for `design_spec`/`motion_profile`, never relative ones.** The library lives
at a fixed location (`~/MotionStudio/library`, i.e. `$MOTION_STUDIO_LIBRARY`) independent of any
project's nesting depth — a relative path (`../../MotionStudio/...`) only happens to work when the
project is a fixed number of directories below the library's parent, which isn't guaranteed and
breaks the moment a project lives somewhere else. Resolve `$MOTION_STUDIO_LIBRARY` (from
`scripts/cli.mjs check`'s `library_dir` output) to an absolute path before writing these fields.

`status`/`duration`/`transition_in`/`scene`/`voiceover` are the format's own known keys.
`style_ref`, `design_spec`, `motion_profile`, `cited_blueprints`, `cited_rules`, `target_density`
are carried through verbatim as `extra` (the format's parser preserves any unknown key) — that's
how a scene builder downstream knows which library style and which real blueprint/rule ids to
build from without re-deriving them.

The free-form paragraph below the metadata (the frame's *narrative*) should say **why** this beat
looks the way it does — the same judgment a human director would leave for the builder — not just
restate the scene line.

## 5. Continue straight into `/general-video`

`BRIEF.md` + a fully-drafted `STORYBOARD.md` already exist, so `/general-video`'s own state table
(`SKILL.md` § 2) resumes correctly without asking brief questions or re-running discovery. Load
`/general-video`'s `SKILL.md` now and continue from its § 5 "Execute the composition" step 2
onward (the plan — step 1 — is already done here; treat this skill's beat list as that plan).
Reuse this skill's beat-level style/blueprint/rule citations; do not have the builder re-derive
them from scratch.

## Resume

If `videos/<project-name>/BRIEF.md` already exists when this skill is invoked again for the same
request, do not re-run steps 1-4 — hand off directly to `/general-video`, which will resume from
its own state table.
