import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

export const handlerTypes = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
];

export async function populateRouter(
  router: Router,
  baseDirectory: string,
): Promise<void> {
  for await (const entry of Deno.readDir(baseDirectory)) {
    if (entry.isFile) {
      const file = await import(`${baseDirectory}/${entry.name}`);

      if (typeof file.handler !== "undefined") {
        for (const handlerType of handlerTypes) {
          if (typeof file.handler[handlerType] !== "undefined") {
            switch (handlerType) {
              case "GET":
                router.get(file.handler.path, file.handler[handlerType]);
                break;
              case "POST":
                router.post(file.handler.path, file.handler[handlerType]);
                break;
              case "PUT":
                router.put(file.handler.path, file.handler[handlerType]);
                break;
              case "DELETE":
                router.delete(file.handler.path, file.handler[handlerType]);
                break;
            }
          }
        }
      }
    } else if (entry.isDirectory) {
      await populateRouter(router, `${baseDirectory}/${entry.name}`);
    }
  }
}
