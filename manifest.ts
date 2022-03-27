// Uses code derived/adapted from lucacasonato/fresh, which is licensed under the MIT License
import {
  join,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.128.0/path/mod.ts";
import { walk } from "https://deno.land/std@0.128.0/fs/walk.ts";

const directory = resolve("./");
const routes = [];
try {
  const routesDir = join(directory, "./routes");
  const routesUrl = toFileUrl(routesDir);
  for await (const _ of Deno.readDir(routesDir)) {
    // do nothing
  }
  const routesFolder = walk(routesDir, {
    includeDirs: false,
    includeFiles: true,
    exts: ["ts"],
  });

  for await (const entry of routesFolder) {
    if (entry.isFile) {
      const file = toFileUrl(entry.path).href.substring(
        routesUrl.href.length,
      );
      routes.push(file);
    }
  }
} catch (err) {
  if (err instanceof Deno.errors.NotFound) {
    // Do nothing.
  } else {
    throw err;
  }
}
routes.sort();

const output =
  `// DO NOT EDIT. This file is generated automatically by \`deno task manifest\`.
// This file SHOULD be checked into source version control.
${
    routes.map((file, i) => `import * as $${i} from "./routes${file}";`).join(
      "\n",
    )
  }

export const manifest = {
routes: {
  ${
    routes.map((file, i) => `${JSON.stringify(`./routes${file}`)}: $${i},`)
      .join("\n    ")
  }
},
baseUrl: import.meta.url,
};
`;

const manifestPath = join(directory, "./routes.gen.ts");
await Deno.writeTextFile(manifestPath, output);
const proc = Deno.run({
  cmd: [Deno.execPath(), "fmt", manifestPath],
  stdin: "null",
  stdout: "null",
  stderr: "null",
});
await proc.status();
proc.close();

console.log(
  `%cThe manifest has been generated for ${routes.length} routes.`,
  "color: blue; font-weight: bold",
);
