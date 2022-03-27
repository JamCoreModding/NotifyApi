import { Mod, RouterEntry } from "../../types.ts";
import { getVersionInformation } from "../../lib/resolver/versionResolver.ts";

// Returns the preffered version of the given array of Mod objects
export const handler: RouterEntry<"/version/latest"> = {
  path: "/version/latest",
  POST: async (
    ctx,
  ) => {
    const info = await getVersionInformation(
      await (ctx.request.body({ type: "json" }).value),
      "*",
    );

    if (info) {
      ctx.response.body = info;
      ctx.response.status = 200;
    } else {
      ctx.response.status = 404;
    }
  },
};
