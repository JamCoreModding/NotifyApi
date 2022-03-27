import { Mod, ModVersionInformation } from "../types.ts";
// Handles the deprecated Notify JSON file

export async function resolveVersionInformationJson(
  mod: Mod,
  minecraftVersions: string[] | "*",
): Promise<ModVersionInformation | undefined> {
  return {};
}
