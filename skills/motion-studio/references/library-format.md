# Library format

The library lives at `~/MotionStudio/library` (override with `$MOTION_STUDIO_LIBRARY`), created by
`scripts/cli.mjs init`. It is independent of this plugin's own install path.

```
~/MotionStudio/library/
  index.json                        # denormalized summary of every reference, rebuilt (never hand-edited)
  categories.json                   # extensible category list
  compatibility.json                # category-pair compatibility matrix
  references/
    <id>/
      frame.md                      # the reference's design spec, in HyperFrames' own frame.md format
      motion-profile.json           # motion-specific metadata (see motion-profile-schema.md)
      source.<ext>                  # copy of the original uploaded/pasted asset
      preview.<ext>                 # a still image for gallery thumbnails (= source for images; an
                                     # extracted representative frame for video/GIF)
      frames/                       # (video/GIF references only) the sampled frames used for analysis
```

`<id>` is `ref-NNN` zero-padded to 3 digits, assigned by scanning existing directories under
`references/` and incrementing (e.g. first reference is `ref-001`).

## Starter references

The plugin ships 11 pre-analyzed starter references at `../seed-library/references/` (11 IDs,
`ref-001`-`ref-011`, spanning ui-animation, saas, finance, data-visualization, timeline, and
infographics) — static content bundled in the plugin package, not user data. `scripts/cli.mjs
init` copies them into `references/` **only the first time**, when the live library has zero
references; it never overwrites or re-seeds a library that already has content, including one the
user has since edited or emptied by hand. Treat them exactly like any other library reference
once seeded — they aren't special-cased anywhere past `init`.

## `index.json`

Rebuilt from every `references/*/motion-profile.json` by `scripts/cli.mjs rebuild-index` — never
edited by hand, never treated as the source of truth (the per-reference files are).

```json
{
  "version": 1,
  "updatedAt": "2026-08-02T10:00:00.000Z",
  "references": [
    {
      "id": "ref-001",
      "name": "Premium SaaS Data Dashboard",
      "category": "saas",
      "tags": ["dashboard", "dark-ui", "finance", "glassmorphism"],
      "preview": "references/ref-001/preview.png",
      "styleSummary": "Snappy + smooth. Fast ease-out primary motion, subtle spring settle, slow camera push. Neutral palette with a single accent.",
      "bestUseCases": ["statistics", "business", "finance", "technology", "saas"],
      "designSpecFile": "references/ref-001/frame.md",
      "motionProfileFile": "references/ref-001/motion-profile.json",
      "createdAt": "2026-08-02T09:58:00.000Z"
    }
  ]
}
```

## `categories.json`

Seeded by `init` with a starter list (`cinematic`, `documentary`, `vox-style`, `data-visualization`,
`kinetic-typography`, `ai-interface`, `saas`, `apple-inspired`, `minimal`, `glassmorphism`, `hud`,
`finance`, `technology`, `timeline`, `maps`, `infographics`, `ui-animation`, `product-demo`,
`social-media`, `news`, `educational`, `historical`, `corporate`). It is a flat, extensible list —
append `{ "id": "<kebab-case>", "label": "<Human Label>" }` when a reference genuinely doesn't fit
an existing category; don't create a near-duplicate of one that already exists.

## `compatibility.json`

```json
{
  "high": [["cinematic", "data-visualization"], ["cinematic", "kinetic-typography"], ["saas", "data-visualization"]],
  "low": [["glassmorphism", "historical"], ["hud", "pastel-soft"]]
}
```

Category-id pairs (unordered — check both orders when looking up a pair). Any pair not listed is
medium/neutral compatibility. Used when AI-assigning styles across adjacent script beats (see
`script-to-storyboard.md`). Extend it the same way as categories: append a pair, don't restructure.
