import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["project/ui_kits/website/main.jsx"],
  outfile: "project/ui_kits/website/dist/app.js",
  bundle: true,
  minify: !watch,
  sourcemap: true,
  target: ["es2019"],
  logLevel: "info",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("Watching project/ui_kits/website for changes...");
} else {
  await esbuild.build(options);
}
