import { ModRequest } from "../types.ts";
// Handles the deprecated Notify JSON file

export async function resolveVersionInformationJson(
  request: ModRequest,
): Promise<string | undefined> {
  if (request.custom.notify_version_url) {
    const req = await fetch(request.custom.notify_version_url);

    if (req.status == 200) {
      const json = await req.json();

      if (json[request.id]) {
        if (json[request.id][request.minecraft]) {
          return json[request.id][request.minecraft];
        } else if (json[request.id]["*"]) {
          return json[request.id]["*"];
        }
      }
    }
  }

  return undefined;
}
