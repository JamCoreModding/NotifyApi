import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { populateRouter } from "./routing.ts";

const app = new Application();
const router = new Router();

await import("https://deno.land/x/dotenv@v3.2.0/load.ts");
await populateRouter(router, "./routes");

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
