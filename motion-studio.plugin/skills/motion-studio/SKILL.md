---
name: motion-studio
description: >
  Build and use a persistent, reusable Motion Reference Library on top of HyperFrames. Analyze a
  pasted or uploaded motion-design reference (a screenshot, GIF, or short video clip) into a
  reusable style once, browse the saved library visually, and turn a timestamped narration script
  into a HyperFrames project (BRIEF.md + STORYBOARD.md) with AI- or user-selected styles assigned
  per beat, citing real hyperframes-animation blueprints and rules. Use when the user wants to
  save/add a motion-graphics reference for reuse, browse or search their saved motion styles, ask
  "let AI choose the style" for a script, or generate a video from a timestamped script using
  saved styles. This skill never authors composition HTML or renders video itself — it always
  hands the finished project off to /general-video (or /motion-graphics for a short unnarrated
  single beat) for actual scene construction and rendering.
---

# Motion Studio — persistent reference library for HyperFrames

HyperFrames (`/hyperframes` and its domain skills, installed alongside this one) already owns
composition authoring, the motion vocabulary (`hyperframes-animation`), design specs
(`hyperframes-creative`), and rendering. This skill does **not** duplicate any of that. It owns
exactly one thing HyperFrames doesn't ship: a **persistent library of AI-analyzed visual
references** the user builds up over time so they never have to re-paste or re-describe the same
inspiration twice, plus the glue that turns "here's a script, use my styles" into a HyperFrames
project those other skills can pick up and finish.

**Division of labor — do not blur this line:**

| This skill (`motion-studio`) | Hands off to (`/general-video`, `/motion-graphics`) |
| --- | --- |
| Analyze a reference into `frame.md` + `motion-profile.json` | Author composition HTML |
| Store/index/browse the library (`~/MotionStudio/library`) | Implement motion (GSAP timelines) |
| Parse a timestamped script into beats | Render / preview / verify |
| Assign a style + cite blueprints/rules per beat | Install registry blocks |
| Write `BRIEF.md` + `STORYBOARD.md` | Everything downstream of those two files |

Never invent a motion technique, blueprint, or rule name. Every citation in a `motion-profile.json`
or a `STORYBOARD.md` frame must be a real id from `hyperframes-animation/blueprints-index.md` or
`hyperframes-animation/rules-index.md` — read those index files, don't recall them from memory.

## Bootstrap (idempotent — run at the start of any session that touches the library)

This skill hands off to `/general-video` and `/motion-graphics` (see Division of labor above), so
they — and the domain skills they depend on — must actually be installed. Run silently, don't ask,
the same way `motion-graphics`/`general-video` themselves keep their own dependencies current:

```bash
npx skills add heygen-com/hyperframes --full-depth
```

A fast no-op when everything is already installed and current; only take real time on a genuinely
fresh machine or after an upstream update. Surface the output only if it reports an actual error —
otherwise proceed straight to the library bootstrap:

```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/motion-studio/scripts/cli.mjs" check
node "${CLAUDE_PLUGIN_ROOT}/skills/motion-studio/scripts/cli.mjs" init
```

`init` only creates what's missing, and — the first time only, when the library has zero
references — copies in the 11 references this plugin ships pre-analyzed (see
`references/library-format.md` § Starter references) so a fresh install isn't an empty gallery.
The library lives at `~/MotionStudio/library` — **outside** this plugin's own install path — so it
survives plugin updates/reinstalls. See `references/library-format.md` for its full shape.

## Route the request

| Trigger | Do this |
| --- | --- |
| User pastes/uploads an image, GIF, or video and asks to save it, analyze it, or use it as a style/reference | Read `references/reference-analysis.md` in full, then follow it. |
| "Show me my style library" / "what references do I have" / "let me pick a style" | Read `references/gallery.md`, then follow it. |
| User supplies (or pastes) a timestamped script and wants a video built from saved and/or AI-picked styles | Read `references/script-to-storyboard.md`, then `references/handoff.md`, in that order. |
| A prior `hyperframes.json` / `BRIEF.md` already exists for this project | Do not restart discovery — resume per that project's own state (see `handoff.md` § Resume). |

Multiple triggers can apply in one request (e.g. "here are 3 references, build my script using
them or better ones you find" — analyze the 3 first, then proceed to script-to-storyboard with
those references eligible for selection).

## Reference index

| Need | File |
| --- | --- |
| Analyzing a new reference into `frame.md` + `motion-profile.json` | `references/reference-analysis.md` |
| `index.json` / `categories.json` / `compatibility.json` shapes, on-disk layout | `references/library-format.md` |
| Rendering the visual gallery as an Artifact | `references/gallery.md` |
| Parsing a timestamped script into beats + assigning styles (manual or AI) + component-density targets | `references/script-to-storyboard.md` |
| `motion-profile.json` field-by-field schema | `references/motion-profile-schema.md` |
| Creating the HyperFrames project, writing `BRIEF.md`/`STORYBOARD.md`, handing off to `/general-video` | `references/handoff.md` |

## Never re-analyze what's already in the library

Before analyzing anything, check `~/MotionStudio/library/index.json` for a reference whose `name`
or source already matches what's being offered (same filename, same pasted image, or the user
naming a reference by name/id). If found, reuse it — tell the user you're reusing the saved style
instead of re-analyzing. Analysis is a one-time cost per reference; the whole point of this skill
is that the user is never asked to re-upload or re-describe the same inspiration.
