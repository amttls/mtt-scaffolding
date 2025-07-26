import { createRoute, z } from "@hono/zod-openapi";

import {
  insertUserSchema,
  patchUserSchema,
  selectUsersSchema,
} from "@/modules/user/user.schema";

import { jsonContent, jsonContentRequired } from "@/shared/openapi/helpers";
import {
  NO_CONTENT_CODE,
  NOT_FOUND_CODE,
  OK_CODE,
  UNPROCESSABLE_ENTITY_CODE,
} from "@/shared/http/status-codes";
import {
  createErrorSchema,
  IdParamsSchema,
  notFoundSchema,
} from "@/shared/openapi/schemas";

const tags = ["Users"];

export const list = createRoute({
  tags,
  method: "get",
  path: "/users",
  operationId: "getUsers",
  responses: {
    [OK_CODE]: jsonContent(z.array(selectUsersSchema), "The list of users"),
  },
});

export const findOne = createRoute({
  tags,
  method: "get",
  path: "/users/{id}",
  operationId: "getUser",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [OK_CODE]: jsonContent(selectUsersSchema, "The requested user"),
    [NOT_FOUND_CODE]: jsonContent(notFoundSchema, "User not found"),
    [UNPROCESSABLE_ENTITY_CODE]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid ID error",
    ),
  },
});

export const create = createRoute({
  tags,
  method: "post",
  path: "/users",
  operationId: "createUser",
  request: {
    body: jsonContentRequired(insertUserSchema, "The user to create"),
  },
  responses: {
    [OK_CODE]: jsonContent(selectUsersSchema, "The created user"),
    [UNPROCESSABLE_ENTITY_CODE]: jsonContent(
      createErrorSchema(insertUserSchema),
      "The validation error(s)",
    ),
  },
});

export const patch = createRoute({
  tags,
  method: "patch",
  path: "/users/{id}",
  operationId: "updateUser",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchUserSchema, "The user to update"),
  },
  responses: {
    [OK_CODE]: jsonContent(selectUsersSchema, "The updated user"),
    [NOT_FOUND_CODE]: jsonContent(notFoundSchema, "User not found"),
    [UNPROCESSABLE_ENTITY_CODE]: jsonContent(
      createErrorSchema(patchUserSchema).or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  tags,
  method: "delete",
  path: "/users/{id}",
  operationId: "deleteUser",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [NO_CONTENT_CODE]: { description: "User removed" },
    [NOT_FOUND_CODE]: jsonContent(notFoundSchema, "User not found"),
    [UNPROCESSABLE_ENTITY_CODE]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid ID error",
    ),
  },
});

export type UserListRoute = typeof list;
export type FindOneUserRoute = typeof findOne;
export type CreateUserRoute = typeof create;
export type UpdateUserRoute = typeof patch;
export type RemoveUserRoute = typeof remove;
