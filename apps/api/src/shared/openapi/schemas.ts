import { z } from "@hono/zod-openapi";

import type {
  ParamsSchema,
  Validator,
  ZodSchema,
} from "@/shared/openapi/types";
import { NOT_FOUND_MESSAGE } from "@/shared/http/status-phrases";

/**
 * Creates a standardized error response schema for OpenAPI documentation.
 * Generates an error schema based on validation failures from the provided schema.
 *
 * @param schema - The Zod schema to generate error examples from
 * @returns A Zod object schema representing the error response structure
 */
export function createErrorSchema<T extends ZodSchema>(schema: T) {
  const { error } = schema.safeParse(
    schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {},
  );
  return z.object({
    success: z.boolean().openapi({
      example: false,
    }),
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            path: z.array(z.union([z.string(), z.number()])),
            message: z.string().optional(),
          }),
        ),
        name: z.string(),
      })
      .openapi({
        example: error,
      }),
  });
}

/**
 * Creates a simple message object schema for API responses.
 * Commonly used for success messages, confirmations, or simple text responses.
 *
 * @param exampleMessage - The example message to show in OpenAPI docs (default: "Hello World")
 * @returns A Zod object schema with a message field
 */
export function createMessageObjectSchema(
  exampleMessage: string = "Hello World",
) {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message: exampleMessage,
      },
    });
}

/**
 * Creates a dynamic parameter schema for path parameters with various ID formats.
 * Supports multiple ID validation types (UUID, nanoid, CUID, CUID2, ULID).
 *
 * @param options - Configuration object with parameter name and validator type
 * @param options.name - The parameter name (default: "id")
 * @param options.validator - The validation type to use (default: "uuid")
 * @returns A Zod object schema for the specified parameter type
 */
export function getParamsSchema({
  name = "id",
  validator = "uuid",
}: ParamsSchema) {
  const examples: Record<Validator, string> = {
    uuid: "4651e634-a530-4484-9b09-9616a28f35e3",
    nanoid: "V1StGXR8_Z5jdHi6B-myT",
    cuid: "cjld2cjxh0000qzrmn831i7rn",
    cuid2: "tz4a98xxat96iws9zmbrgj3a",
    ulid: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
  };

  return z.object({
    [name]: z
      .string()
      [validator]()
      .openapi({
        param: {
          name,
          in: "path",
          required: true,
        },
        required: [name],
        example: examples[validator],
      }),
  });
}

/**
 * Schema for numeric ID path parameters.
 * Used for routes that expect a numeric identifier (e.g., /users/42).
 */
export const IdParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
      required: true,
    },
    required: ["id"],
    example: 42,
  }),
});

/**
 * Schema for UUID-based ID path parameters.
 * Used for routes that expect a UUID identifier (e.g., /users/4651e634-a530-4484-9b09-9616a28f35e3).
 */
export const IdUUIDParamsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
        required: true,
      },
      required: ["id"],
      example: "4651e634-a530-4484-9b09-9616a28f35e3",
    }),
});

// Regular expression to validate slug format: alphanumeric, underscores, and dashes
const slugReg = /^[\w-]+$/;
const SLUG_ERROR_MESSAGE =
  "Slug can only contain letters, numbers, dashes, and underscores";

/**
 * Schema for URL-friendly slug path parameters.
 * Used for routes that expect a slug identifier (e.g., /articles/my-cool-article).
 * Validates that the slug contains only letters, numbers, dashes, and underscores.
 */
export const SlugParamsSchema = z.object({
  slug: z
    .string()
    .regex(slugReg, SLUG_ERROR_MESSAGE)
    .openapi({
      param: {
        name: "slug",
        in: "path",
        required: true,
      },
      required: ["slug"],
      example: "my-cool-article",
    }),
});

/**
 * Schema for 404 not found error.
 * Used for routes that look for an specific resource which not exists our database.
 */
export const notFoundSchema = createMessageObjectSchema(NOT_FOUND_MESSAGE);
