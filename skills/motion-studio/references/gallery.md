# Rendering the library gallery

The library must never be presented as a text list — it needs real visual thumbnails, search, and
filter. Build it as a self-contained HTML file and publish it with the `Artifact` tool.

## Steps

1. Read `~/MotionStudio/library/index.json` and `categories.json`.
2. For each reference, base64-encode its preview image so the gallery is fully self-contained (the
   Artifact tool's CSP blocks external/file:// image references — everything must be inlined):

   ```bash
   # git-bash / Bash tool — base64 -w0 avoids line-wrapping
   base64 -w0 "<preview-path>"
   ```

   Build a `data:image/<ext>;base64,<...>` URI from the result for each reference's `<img>` `src`.
   For a large library (dozens of references), do this in a small loop rather than one call per
   image, and keep individual previews reasonably sized — resize is not required for v1 but avoid
   embedding multi-megabyte sources verbatim.
3. Write the gallery HTML to a scratch file: a card grid, one card per reference — thumbnail, name,
   category badge, tags, one-line style summary (from `index.json`'s `styleSummary`), and a
   "Select" button. Include a text search box (filters on name/tags/category, plain JS, no
   framework) and a category filter dropdown.
4. Wire each "Select" button to `sendPrompt('Use "<name>" (<id>) for ...')` so picking a card
   continues the conversation naturally, per the `visualize`/`Artifact` widget contract.
5. **Before the first `show_widget`/`Artifact` call in a session, load the `artifact-design` skill**
   to calibrate the visual treatment — this is a real product surface, not a throwaway list.
6. Publish with `Artifact` (title e.g. `motion_reference_library`, a stable favicon emoji, a one
   sentence description). Redeploy the same file path on later calls in the same session so
   additions to the library update the same gallery rather than minting a new URL each time.

## References with no preview file

A reference analyzed from a pasted chat image with no retrievable file path has `preview: null`
in `index.json` (its `motion-profile.json` explains why under `sourceNote`). Don't skip it or
break the layout — render its card with a generated CSS swatch instead of an `<img>`: a small
gradient block using the reference's own `color.background`/`color.accent` from
`motion-profile.json`, so the card still gives a visual sense of the style even without the
original screenshot. Label these cards subtly (e.g. a small "reconstructed" tag) so the user knows
it's not the original asset.

## Empty library

If `index.json.references` is empty, say so plainly and offer to analyze a reference instead of
publishing an empty gallery.
