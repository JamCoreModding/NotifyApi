import { Mod, ModVersionInformation } from "../types.ts";
// Handles Modrinth

export async function resolveVersionInformationModrinth(
  mod: Mod,
  minecraftVersions: string | "*",
): Promise<ModVersionInformation | undefined> {
  return {};
}
