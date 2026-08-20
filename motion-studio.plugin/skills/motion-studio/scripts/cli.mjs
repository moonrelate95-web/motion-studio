#!/usr/bin/env node
// Motion Studio helper CLI. Handles the parts of the reference-library
// workflow that need real code execution (frame extraction, index
// bookkeeping) rather than Claude's own reasoning/vision.
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, cpSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SEED_REFERENCES_DIR = path.join(SCRIPT_DIR, "..", "seed-library", "references");

const LIBRARY_DIR = process.env.MOTION_STUDIO_LIBRARY || path.join(homedir(), "MotionStudio", "library");
const REFERENCES_DIR = path.join(LIBRARY_DIR, "references");
const INDEX_FILE = path.join(LIBRARY_DIR, "index.json");
const CATEGORIES_FILE = path.join(LIBRARY_DIR, "categories.json");
const COMPATIBILITY_FILE = path.join(LIBRARY_DIR, "compatibility.json");

const DEFAULT_CATEGORIES = [
  "Cinematic", "Documentary", "Vox-style", "Data Visualization", "Kinetic Typography",
  "AI Interface", "SaaS", "Apple-inspired", "Minimal", "Glassmorphism", "HUD", "Finance",
  "Technology", "Timeline", "Maps", "Infographics", "UI Animation", "Product Demo",
  "Social Media", "News", "Educational", "Historical", "Corporate",
].map((label) => ({ id: slugify(label), label }));

const DEFAULT_COMPATIBILITY = {
  high: [
    ["cinematic", "data-visualization"],
    ["cinematic", "kinetic-typography"],
    ["saas", "data-visualization"],
    ["saas", "ui-animation"],
    ["minimal", "kinetic-typography"],
    ["apple-inspired", "product-demo"],
    ["apple-inspired", "minimal"],
    ["finance", "data-visualization"],
    ["technology", "ai-interface"],
    ["infographics", "data-visualization"],
    ["timeline", "infographics"],
  ],
  low: [
    ["glassmorphism", "historical"],
    ["hud", "pastel-soft"],
    ["documentary", "hud"],
    ["minimal", "hud"],
  ],
};

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function writeJsonIfMissing(file, data) {
  if (!existsSync(file)) {
    writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
    return true;
  }
  return false;
}

/** Copies the plugin's bundled starter references into the (empty) live library. Never
 * overwrites an existing reference directory — only runs when REFERENCES_DIR has none yet. */
function seedLibraryIfEmpty() {
  const hasAnyReference = existsSync(REFERENCES_DIR) && readdirSync(REFERENCES_DIR).length > 0;
  if (hasAnyReference) return { seeded: false, count: 0 };
  if (!existsSync(SEED_REFERENCES_DIR)) return { seeded: false, count: 0 };

  const seedIds = readdirSync(SEED_REFERENCES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
  for (const id of seedIds) {
    cpSync(path.join(SEED_REFERENCES_DIR, id), path.join(REFERENCES_DIR, id), { recursive: true });
  }
  return { seeded: true, count: seedIds.length };
}

function cmdInit() {
  ensureDir(REFERENCES_DIR);
  const createdCategories = writeJsonIfMissing(CATEGORIES_FILE, { categories: DEFAULT_CATEGORIES });
  const createdCompat = writeJsonIfMissing(COMPATIBILITY_FILE, DEFAULT_COMPATIBILITY);
  const createdIndex = writeJsonIfMissing(INDEX_FILE, { version: 1, updatedAt: new Date().toISOString(), references: [] });
  const seedResult = seedLibraryIfEmpty();
  console.log(`library_dir=${LIBRARY_DIR}`);
  console.log(`references_dir=${REFERENCES_DIR}`);
  console.log(`categories_created=${createdCategories}`);
  console.log(`compatibility_created=${createdCompat}`);
  console.log(`index_created=${createdIndex}`);
  console.log(`seeded_starter_references=${seedResult.seeded}`);
  console.log(`seeded_count=${seedResult.count}`);
  if (seedResult.seeded) rebuildIndex();
}

async function cmdCheck() {
  console.log(`node_version=${process.version}`);
  console.log(`library_dir=${LIBRARY_DIR}`);
  console.log(`library_exists=${existsSync(LIBRARY_DIR)}`);
  let ffmpegOk = false;
  let ffmpegPath = "";
  try {
    const mod = await import("ffmpeg-static");
    ffmpegPath = mod.default;
    ffmpegOk = !!ffmpegPath && existsSync(ffmpegPath);
  } catch {
    ffmpegOk = false;
  }
  console.log(`ffmpeg_static_ok=${ffmpegOk}`);
  console.log(`ffmpeg_static_path=${ffmpegPath}`);
}

async function cmdExtractFrames(args) {
  const [videoPath, outDir, countArg] = args;
  if (!videoPath || !outDir) {
    console.error("usage: extract-frames <videoPath> <outDir> [count=6]");
    process.exit(1);
  }
  const count = Math.max(1, parseInt(countArg || "6", 10));
  ensureDir(outDir);
  const ffmpegMod = await import("ffmpeg-static");
  const ffmpegPath = ffmpegMod.default;
  if (!ffmpegPath) {
    console.error("ffmpeg-static binary not resolvable; run `npm install` in this scripts/ dir first.");
    process.exit(1);
  }
  const { stdout } = await execFileAsync(ffmpegPath, [
    "-i", videoPath,
    "-hide_banner", "-loglevel", "error",
    "-y",
  ]).catch((e) => ({ stdout: "", stderr: e.stderr }));

  // Probe duration via ffmpeg stderr (ffmpeg prints info to stderr even on a no-op call).
  let durationSeconds = 0;
  try {
    await execFileAsync(ffmpegPath, ["-i", videoPath, "-hide_banner"]);
  } catch (e) {
    const match = /Duration:\s*(\d+):(\d+):(\d+\.\d+)/.exec(e.stderr || "");
    if (match) {
      durationSeconds = parseInt(match[1], 10) * 3600 + parseInt(match[2], 10) * 60 + parseFloat(match[3]);
    }
  }
  if (!durationSeconds || Number.isNaN(durationSeconds)) durationSeconds = 5;

  const framePaths = [];
  for (let i = 0; i < count; i++) {
    const t = (durationSeconds * (i + 0.5)) / count;
    const outFile = path.join(outDir, `frame-${String(i + 1).padStart(2, "0")}.jpg`);
    await execFileAsync(ffmpegPath, [
      "-ss", t.toFixed(2),
      "-i", videoPath,
      "-frames:v", "1",
      "-q:v", "2",
      "-y",
      outFile,
    ]);
    framePaths.push(outFile);
  }
  console.log(`duration_seconds=${durationSeconds.toFixed(2)}`);
  framePaths.forEach((p) => console.log(`frame=${p}`));
}

function rebuildIndex() {
  ensureDir(REFERENCES_DIR);
  const entries = existsSync(REFERENCES_DIR) ? readdirSync(REFERENCES_DIR, { withFileTypes: true }) : [];
  const references = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const profilePath = path.join(REFERENCES_DIR, entry.name, "motion-profile.json");
    if (!existsSync(profilePath)) continue;
    try {
      const profile = JSON.parse(readFileSync(profilePath, "utf8"));
      references.push({
        id: profile.id || entry.name,
        name: profile.name,
        category: profile.category,
        tags: profile.tags || [],
        preview: profile.previewFile ? `references/${entry.name}/${profile.previewFile}` : null,
        styleSummary: profile.styleSummary,
        bestUseCases: profile.bestUseCases || [],
        designSpecFile: `references/${entry.name}/${profile.designSpecFile || "frame.md"}`,
        motionProfileFile: `references/${entry.name}/motion-profile.json`,
        createdAt: profile.createdAt,
      });
    } catch (e) {
      console.error(`skipping ${entry.name}: ${e.message}`);
    }
  }
  references.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  writeFileSync(
    INDEX_FILE,
    JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), references }, null, 2) + "\n",
    "utf8"
  );
  return references.length;
}

function cmdRebuildIndex() {
  const count = rebuildIndex();
  console.log(`indexed=${count}`);
  console.log(`index_file=${INDEX_FILE}`);
}

const [, , command, ...rest] = process.argv;

switch (command) {
  case "init":
    cmdInit();
    break;
  case "check":
    await cmdCheck();
    break;
  case "extract-frames":
    await cmdExtractFrames(rest);
    break;
  case "rebuild-index":
    cmdRebuildIndex();
    break;
  default:
    console.error("usage: cli.mjs <init|check|extract-frames|rebuild-index> [...args]");
    process.exit(1);
}
