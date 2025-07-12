import type { z } from "@hono/zod-openapi";

export type ZodSchema =
  // @ts-expect-error z.ZodUnion expects an argument.
  z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject> | z.ZodType<any, any, any>;

export type Validator = "uuid" | "nanoid" | "cuid" | "cuid2" | "ulid";

export interface ParamsSchema {
  name?: string;
  validator?: Validator | undefined;
}
