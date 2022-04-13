import { RouterEntry } from "../../types.ts";
import { getLatestVersion } from "../../lib/resolver/versionResolver.ts";

// Returns the preffered version of the given array of Mod objects
export const handler: RouterEntry<"/version/latest"> = {
  path: "/version/latest",
  POST: async (
    ctx,
  ) => {
    const body = await (ctx.request.body({ type: "json" }).value);
    const info = await getLatestVersion(body);

    if (info) {
      ctx.response.body = info;
      ctx.response.status = 200;
    } else {
      ctx.response.status = 404;
    }
  },
};
