import { Mod, ModVersionInformation } from "../types.ts";
// Handles tags/releases on GitHub

export async function resolveVersionInformationGitHub(
  mod: Mod,
  minecraftVersions: string[] | "*",
): Promise<ModVersionInformation | undefined> {
  return {};
}
