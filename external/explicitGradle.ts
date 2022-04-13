import { ModRequest } from "../types.ts";
// Handles explicit `gradle.properties` files (i.e. from `custom` key)

export async function resolveVersionInformationExplicitGradle(
  request: ModRequest,
): Promise<string | undefined> {
  if (
    request.custom.notify_gradle_properties_url &&
    request.custom.notify_gradle_properties_key
  ) {
    const req = await fetch(request.custom.notify_gradle_properties_url);

    if (req.status == 200) {
      const properties = await req.text();
      const pattern = new RegExp(
        `^\\s*${request.custom.notify_gradle_properties_key}\\s*=\\s*([a-zA-Z0-9.+-]*)`,
      );
      const match = pattern.exec(properties);

      if (match != null && match.length >= 1) {
        return match[0];
      }
    }
  }

  return undefined;
}
