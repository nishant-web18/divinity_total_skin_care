/* Assembles a flat, self-contained site into dist/ for static hosting.

   The kit lives at project/ui_kits/website/ and reaches its CSS with ../../styles.css,
   which only resolves when project/ is the web root — and then the site answers on
   /ui_kits/website/, not /. A host serving the repo as-is gets a 404 at /. This copies
   the page, its bundle and its stylesheets into one directory with index.html at the
   top, and rewrites the two asset references to match. */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const SRC = "project/ui_kits/website";
const OUT = "dist";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const html = (await readFile(`${SRC}/index.html`, "utf8"))
  .replace('href="../../styles.css"', 'href="./styles.css"')
  .replace('href="../../assets/brand/favicon.svg"', 'href="./favicon.svg"')
  .replace('src="./dist/app.js"', 'src="./app.js"');
await writeFile(`${OUT}/index.html`, html);

await cp("project/assets/brand/favicon.svg", `${OUT}/favicon.svg`);

await cp(`${SRC}/dist/app.js`, `${OUT}/app.js`);
await cp(`${SRC}/dist/app.js.map`, `${OUT}/app.js.map`);
await cp("project/styles.css", `${OUT}/styles.css`);
await cp("project/tokens", `${OUT}/tokens`, { recursive: true });

console.log(`assembled ${OUT}/ — index.html, app.js, styles.css, tokens/`);
