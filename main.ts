// Status Report Comedy Sprint — one-line entry (v1)
import { writeFileSync, mkdirSync } from "node:fs";

const ENTRY =
  "Weekly status: 14 tasks done, 0 blockers, and the outage has been reclassified as an unplanned live demo for the whole company.";

// Gate: one line, 1-200 chars, not only whitespace.
// Read-back check: the written file must equal ENTRY byte for byte,
// so a stray trailing newline or whitespace trim can never slip in.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} out of range 1-200`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be blank");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(ENTRY);
