# Motion Studio

A Claude Code plugin that gives you a **persistent, AI-analyzed motion-graphics reference
library**, built on top of [HyperFrames](https://hyperframes.heygen.com) (HeyGen's open-source
HTML-to-video framework and its agent skills). Paste or upload a reference once — a screenshot, a
GIF, a short clip — and it's analyzed and saved permanently. Paste a timestamped script, and Motion
Studio assigns a saved (or AI-picked) style to every beat and hands off a ready-to-build
HyperFrames project. The plugin ships with **11 pre-analyzed starter references** (ui-animation,
saas, finance, data-visualization, timeline, infographics) so the library isn't empty on first
install — they're copied into your own `~/MotionStudio/library` the first time you use the skill,
then behave exactly like anything you add yourself.

## What this is, and isn't

Motion Studio does **not** reimplement video rendering, motion, or a component library — HyperFrames
already does all of that, extremely well (`/general-video`, `/motion-graphics`,
`hyperframes-animation`'s 22 scene blueprints and 60+ motion rules, `hyperframes-creative`'s design
specs, `hyperframes-registry`'s reusable blocks). Motion Studio owns exactly one thing that
ecosystem doesn't ship: the reference library, so you never have to re-upload or re-describe the
same inspiration in every new project.

```
Reference (image/GIF/clip)
        │  analyze once (Claude vision)
        ▼
frame.md + motion-profile.json          ──┐
        │  stored forever in            │  ~/MotionStudio/library
        ▼  ~/MotionStudio/library       ──┘
Visual gallery (browse/search/select)
        │
Timestamped script  ──►  beats  ──►  style assigned per beat (manual or AI)
        │
BRIEF.md + STORYBOARD.md  (citing real hyperframes-animation blueprints/rules)
        │
        ▼
   /general-video  (or /motion-graphics)  →  composition HTML → render → MP4
```

## Install

This repo is both the plugin source and a local marketplace (`.claude-plugin/marketplace.json`),
the same pattern used by the `golpo` plugin already on this machine. From an interactive Claude
Code session:

```
/plugin marketplace add "C:\Users\Chris\Desktop\CLAUDE\video-editing"
/plugin install motion-studio
```

**Prerequisite — HyperFrames itself.** Motion Studio hands off actual video building to the
HyperFrames skill ecosystem. You don't need to install it yourself — the `motion-studio` skill
runs `npx skills add heygen-com/hyperframes --full-depth` as its own first bootstrap step (a fast
no-op once it's already current), the same way HyperFrames' own workflows keep their dependencies
fresh. It needs Node and network access the first time; after that it's instant. (Already
installed in this repo under `.agents/skills/`.)

**Prerequisite — Node.js.** The library's helper CLI (frame extraction from video/GIF references,
index bookkeeping) needs Node; its one dependency installs itself on first use.

## Use it

Just talk to Claude naturally — the `motion-studio` skill triggers on the intent, not on a slash
command:

- **"Save this as a reference style"** (with a pasted/uploaded image, GIF, or clip) — analyzes it
  once into `~/MotionStudio/library/references/<id>/` and never asks for it again.
- **"Show me my style library"** — publishes a real visual gallery (thumbnails, tags, search,
  select) as a Claude Artifact.
- **Paste a timestamped script and say "build this using my styles"** (or "let AI choose") —
  parses it into beats, assigns a style to each (yours, or AI-picked from the library with
  category-compatibility checks), and writes a `BRIEF.md` + `STORYBOARD.md` HyperFrames project
  citing real `hyperframes-animation` blueprint/rule ids — then hands off to `/general-video` to
  actually build and render it.

## Layout

```
.claude-plugin/          plugin.json + marketplace.json
skills/motion-studio/
  SKILL.md                orchestration entry point
  references/             reference-analysis, library-format, gallery, script-to-storyboard,
                           motion-profile-schema, handoff — read on demand, not all at once
  seed-library/            11 pre-analyzed starter references (frame.md + motion-profile.json each),
                           copied into ~/MotionStudio/library on first `cli.mjs init`, only if empty
  scripts/
    cli.mjs                check / init (incl. one-time seeding) / extract-frames / rebuild-index
    package.json            (ffmpeg-static, for sampling frames from video/GIF references)
videos/                   HyperFrames projects created by the handoff step (gitignored in spirit —
                           these are per-video working directories, not plugin source)
```

The reference library itself lives **outside** this repo, at `~/MotionStudio/library` — it's
user data that has to survive plugin updates/reinstalls, not plugin source.

## Demo project

`videos/pipeline-explainer/` is a real, working end-to-end run: a 5-beat timestamped script taken
all the way through the pipeline — AI style assignment per beat from the seeded library,
`BRIEF.md`/`STORYBOARD.md`, 5 hand-built scenes citing real `hyperframes-animation` blueprint/rule
ids, `motion-doctrine`-compliant `cut-the-curve` seams (verified with the real `seam-gate.mjs`, 4/4
passing), a clean `hyperframes check` (0 lint/layout/motion errors, 24/24 WCAG AA contrast checks),
and a rendered `renders/video.mp4` (1920x1080, 30fps, 25.0s, H.264). Re-run any step from
`videos/pipeline-explainer/` to see it for yourself; `npx hyperframes preview` opens it in Studio.
