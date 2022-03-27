import { RouterEntry } from "../types.ts";

export const handler: RouterEntry<"/"> = {
  path: "/",
  GET: (
    ctx,
  ) => {
    ctx.response.body = "Hello world!";
  },
};
