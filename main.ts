// The GPS swears it was a shortcut.
//
// One line, in the GPS's own voice: caught red-handed, smug and
// defensive, blaming the map. The joke is assembled from fixed parts
// so the program is deterministic: same bytes every run, no clock,
// no randomness, no network, no external files.
//
// The laugh: the GPS doesn't apologise for the wrong road — it
// reframes the dead end as the map's plan, and the punchline lands
// on a concrete image nobody expects: the bride thanking the GPS.
import * as fs from "node:fs";
import * as path from "node:path";

// Fixed parts of the excuse. Nothing here varies between runs.
const DENIAL = "That cul-de-sac wasn't a mistake,";
const BLAME = "it was the map's wedding venue,";
const PUNCH = "and the bride has already sent me a thank-you card.";

const EXCUSE = `${DENIAL} ${BLAME} ${PUNCH}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, and not only white space.
const codePoints = [...EXCUSE].length;
if (codePoints < 1 || codePoints > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`excuse is ${codePoints} code points, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), EXCUSE, "utf8");

console.log(EXCUSE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(EXCUSE, "utf8")} bytes)`);
