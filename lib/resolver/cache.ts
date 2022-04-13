import { CachedLatestVersion, Mod } from "../../types.ts";

export class ResolverCache {
  #cache: Map<string, CachedLatestVersion>;

  constructor() {
    this.#cache = new Map();
  }

  public get(mod: Mod, checkTime = true): string | undefined {
    if (this.#cache.has(mod.id)) {
      const cachedInfo = this.#cache.get(mod.id)!;

      if (checkTime) {
        const time = new Date().getMilliseconds();

        // Recache every 10 minutes
        if (time - cachedInfo.cacheTime > (10 * 60 * 1000)) {
          return undefined;
        }
      }

      return cachedInfo.value;
    } else {
      return undefined;
    }
  }

  public put(mod: Mod, info: string) {
    this.#cache.set(mod.id, {
      cacheTime: new Date().getMilliseconds(),
      value: info,
    });
  }
}
