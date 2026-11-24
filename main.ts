// Funniest Time Machine Warning Label — make.fun entry.
// Writes a single one-line warning label (<=120 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The label is kept as a plain constant and validated at runtime: one line, non-blank,
// 1-120 UTF-8 characters, exactly as the sealed gate scorer requires.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "WARNING: Do not meet yourself. If you do, do not shake hands — one of you is the spare, and neither knows which.";

function main(): void {
  const chars = [...LABEL];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`label is ${chars.length} chars, must be 1-120`);
  }
  if (LABEL.trim().length === 0 || LABEL.includes("\n")) {
    throw new Error("label must be a single non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LABEL, "utf8");
  console.log(`wrote entry.txt (${chars.length} chars)`);
}

main();
