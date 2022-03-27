import {
  RouteParams,
  RouterContext,
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

export type SimpleRouterContext<T extends string> = RouterContext<
  T,
  RouteParams<T>,
  // deno-lint-ignore no-explicit-any
  Record<string, any>
>;

export type RouterEntry<T extends string> = {
  path: T;
  GET?: (ctx: SimpleRouterContext<T>) => void;
  POST?: (ctx: SimpleRouterContext<T>) => void;
  PUT?: (ctx: SimpleRouterContext<T>) => void;
  DELETE?: (ctx: SimpleRouterContext<T>) => void;
};
