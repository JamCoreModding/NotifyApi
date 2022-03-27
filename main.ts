import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { parse } from "https://deno.land/x/dot_env@0.2.0/mod.ts";
import { populateRouter } from "./routing.ts";

if (typeof Deno.env.get("DENO_DEPLOYMENT_ID") === "undefined") {
  try {
    const env = parse(await Deno.readTextFile(".env"));
    for (const key in env) {
      if (Object.prototype.hasOwnProperty.call(env, key)) {
        Deno.env.set(key, env[key]);
      }
    }
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.log("No .env file found");
    } else {
      throw e;
    }
  }
}

const app = new Application();
const router = new Router();

await populateRouter(router);

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
