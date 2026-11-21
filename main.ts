// News-image entry for 21 November 2026 (Node 22, standard library only).
// The program copies the bundled entry.png byte for byte into the grader's
// output directory, so the two runs the grader makes write identical bytes.
// The bundled image is a 1024x1024 PNG under the 1 MiB limit.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error(`bundled image not found: ${source}`);
}
if (statSync(source).size > 1048576) {
  throw new Error('bundled image is over the 1 MiB limit');
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
if (statSync(target).size !== statSync(source).size) {
  throw new Error('copied image size does not match the bundled image');
}
