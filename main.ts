import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const line =
  "I pushed to main. Good news: the deploy worked. Bad news: the deploy worked.";

// The brief requires one line of 1-159 characters, not only whitespace.
if (line.length < 1 || line.length > 159) {
  throw new Error(`entry line must be 1-159 characters, got ${line.length}`);
}
if (line.trim().length === 0 || line.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, line + "\n", "utf8");
chmodSync(entryPath, 0o644);
