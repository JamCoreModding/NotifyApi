import { ModRequest } from "../types.ts";
// Handles CurseForge

const BASE_URL = "https://api.curseforge.com/v1";
const MINECRAFT_GAME_ID = 432;
const API_KEY = Deno.env.get("CURSEFORGE_API_KEY");

export async function resolveVersionInformationCurseForge(
  req: ModRequest,
): Promise<string | undefined> {
  if (!API_KEY) return;

  if (
    !(
      !(req.contacts.homepage &&
        req.contacts.homepage.includes("curseforge")) ||
      !(req.contacts.curseforge &&
        req.contacts.curseforge.includes("curseforge"))
    )
  ) {
    return;
  }

  const cfUrl = (req.contacts.homepage ?? req.contacts.curseforge).split("/");

  if (cfUrl.length < 5) {
    return;
  }

  const id = await getModIdFromSlug(cfUrl[5]);

  if (!id) {
    return;
  }

  const params = new URLSearchParams({
    gameVersion: req.minecraft == "*" ? "" : req.minecraft,
  });

  const res = await fetch(
    BASE_URL + `/mods/${id.toString()}/files?${params.toString()}`, //TODO: WRONG URL!!
    {
      headers: { "x-api-key": API_KEY },
    },
  );

  if (res.status == 200) {
    const json = await res.json();

    if (!json.data || json.data.length == 0) return;

    for (const file of json.data) {
      console.log(file);
      if (
        req.minecraft == "*" ||
        file.gameVersions.includes(req.minecraft)
      ) {
        return file.fileName;
      }
    }
  }
}

async function getModIdFromSlug(slug: string): Promise<number | undefined> {
  const params = new URLSearchParams({
    gameId: MINECRAFT_GAME_ID.toString(),
    slug: slug,
  });

  const res = await fetch(
    `${BASE_URL}/mods/search?${params.toString()}`,
    {
      headers: { "x-api-key": API_KEY! },
    },
  );

  if (res.status == 200) {
    return (await res.json()).data[0].id;
  }
}

console.log(
  await resolveVersionInformationCurseForge({
    id: "fabric-api",
    minecraft: "1.18.1",
    contacts: {
      homepage: "https://www.curseforge.com/minecraft/mc-mods/fabric-api",
    },
    custom: {},
  }),
);
