import { Mod, ModVersionInformation } from "../types.ts";
// Handles implicit `gradle.properties` files (i.e. from `sources` key)

export async function resolveVersionInformationImplicitGradle(
  mod: Mod,
  minecraftVersions: string[] | "*",
): Promise<ModVersionInformation | undefined> {
  return {};
}
