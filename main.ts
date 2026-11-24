import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const entry =
  "Weekly status: 14 tasks done, 0 blockers, and the outage has been reclassified as an unplanned live demo for the whole company.";

// Validation — mirrors the sealed gate: 1-200 chars, not only
// white space, exactly one line, no trailing newline.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${entry.length}`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = outDir + "/entry.txt";
writeFileSync(outPath, entry);

// Read-back check: file on disk must be byte-identical to the entry.
const back = readFileSync(outPath, "utf8");
if (back !== entry) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${entry.length} chars, sha256 ${sha}, read-back OK`);
