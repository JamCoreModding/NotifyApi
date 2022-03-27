import { Mod, ModVersionInformation } from "../types.ts";
// Handles explicit `gradle.properties` files (i.e. from `custom` key)

export async function resolveVersionInformationExplicitGradle(
  mod: Mod,
  minecraftVersions: string[] | "*",
): Promise<ModVersionInformation | undefined> {
  return {};
}
