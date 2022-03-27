import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { cyan } from "https://deno.land/std@0.128.0/fmt/colors.ts";
import { manifest } from "./routes.gen.ts";

export const handlerTypes = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
];

export function populateRouter(
  router: Router,
): void {
  for (const routeObject in manifest.routes) {
    if (Object.prototype.hasOwnProperty.call(manifest.routes, routeObject)) {
      //@ts-ignore: TypeScript is having a hissy fit, everything is fine :)
      const element = manifest.routes[routeObject];

      if (typeof element.handler !== "undefined") {
        for (const handlerType of handlerTypes) {
          if (typeof element.handler[handlerType] !== "undefined") {
            switch (handlerType) {
              case "GET":
                router.get(element.handler.path, element.handler[handlerType]);
                break;
              case "POST":
                router.post(element.handler.path, element.handler[handlerType]);
                break;
              case "PUT":
                router.put(element.handler.path, element.handler[handlerType]);
                break;
              case "DELETE":
                router.delete(
                  element.handler.path,
                  element.handler[handlerType],
                );
                break;
            }

            console.log(
              `Registered ${cyan(handlerType)} route with path ${
                cyan(element.handler.path)
              }`,
            );
          }
        }
      }
    }
  }
}
