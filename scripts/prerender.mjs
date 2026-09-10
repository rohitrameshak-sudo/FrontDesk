import { readFile, writeFile } from "node:fs/promises";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { page } from "../.prerender/entry-server.js";

// Produce the actual React page at build time; hydration preserves its interactions.
const markup = await new Promise((resolve, reject) => {
  const output = new PassThrough();
  let html = "";
  output.on("data", chunk => { html += chunk.toString(); });
  output.on("end", () => resolve(html));
  output.on("error", reject);
  const stream = renderToPipeableStream(page, {
    onAllReady() { stream.pipe(output); },
    onError(error) { reject(error); },
  });
});
const file = new URL("../dist/index.html", import.meta.url);
const template = await readFile(file, "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("Missing prerender root");
await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
console.log("Prerendered the complete FrontDesk landing page.");
