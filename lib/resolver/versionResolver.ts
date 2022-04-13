import { ModRequest } from "../../types.ts";
import { ResolverCache } from "./cache.ts";
import * as VersionResolvers from "../../external/external.ts";

// Order of operations for trying to fetch a latest version
const operations = [
  VersionResolvers.resolveVersionInformationJson,
  VersionResolvers.resolveVersionInformationExplicitGradle,
  VersionResolvers.resolveVersionInformationCurseForge,
  VersionResolvers.resolveVersionInformationModrinth,
  VersionResolvers.resolveVersionInformationImplicitGradle,
  VersionResolvers.resolveVersionInformationGitHub,
];

const cache = new ResolverCache();

// Returns the version information of a given mod
export async function getLatestVersion(
  mod: ModRequest,
): Promise<string | undefined> {
  // Check for cached result
  const cachedValue = cache.get(mod);
  if (cachedValue) {
    return cachedValue;
  }

  for (const resolve of operations) {
    const result = await resolve(mod);

    if (result) {
      cache.put(mod, result);
      return result;
    }
  }
}
