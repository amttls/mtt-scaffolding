import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import type { SchemaObject, ReferenceObject } from "openapi3-ts/oas30";

import type { ZodSchema } from "@/shared/openapi/types";

/**
 * Converts an array of Zod schemas into OpenAPI oneOf schema objects
 * @param schemas - Array of Zod schemas to convert
 * @returns Array of OpenAPI schema or reference objects for oneOf usage
 */
export function oneOf<T extends ZodSchema>(
  schemas: T[],
): (SchemaObject | ReferenceObject)[] {
  const registry = new OpenAPIRegistry();

  schemas.forEach((schema, index) => {
    registry.register(index.toString(), schema);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const components = generator.generateComponents();

  return components.components?.schemas
    ? Object.values(components.components!.schemas!)
    : [];
}

/**
 * Creates an OpenAPI content object for JSON responses with a Zod schema
 * @param schema - The Zod schema to use for validation
 * @param description - Description of the response content
 * @returns OpenAPI content object with application/json media type
 */
export function jsonContent<T extends ZodSchema>(
  schema: T,
  description: string,
) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
}

/**
 * Creates a required OpenAPI content object for JSON responses with a Zod schema
 * @param schema - The Zod schema to use for validation
 * @param description - Description of the response content
 * @returns OpenAPI content object marked as required with application/json media type
 */
export function jsonContentRequired<T extends ZodSchema>(
  schema: T,
  description: string,
) {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
}

/**
 * Creates an OpenAPI content object for JSON responses with multiple possible schemas (oneOf)
 * @param schemas - Array of Zod schemas representing possible response types
 * @param description - Description of the response content
 * @returns OpenAPI content object with oneOf schema for application/json media type
 */
export function jsonContentOneOf<T extends ZodSchema>(
  schemas: T[],
  description: string,
) {
  return {
    content: {
      "application/json": {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
}
