import { eq } from "drizzle-orm";

import type {
  CreateUserRoute,
  FindOneUserRoute,
  RemoveUserRoute,
  UpdateUserRoute,
  UserListRoute,
} from "@/modules/user/user.routes";
import { users } from "@/modules/user/user.schema";

import db from "@/shared/db";
import {
  NO_CONTENT_CODE,
  NOT_FOUND_CODE,
  OK_CODE,
} from "@/shared/http/status-codes";
import { NOT_FOUND_MESSAGE } from "@/shared/http/status-phrases";
import type { AppRouteHandler } from "@/shared/lib/types";

export const list: AppRouteHandler<UserListRoute> = async (c) => {
  const users = await db.query.users.findMany();

  return c.json(users);
};

export const findOne: AppRouteHandler<FindOneUserRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const user = await db.query.users.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!user) {
    return c.json({ message: NOT_FOUND_MESSAGE }, NOT_FOUND_CODE);
  }

  return c.json(user, OK_CODE);
};

export const create: AppRouteHandler<CreateUserRoute> = async (c) => {
  const input = c.req.valid("json");
  const [user] = await db.insert(users).values(input).returning();

  return c.json(user, OK_CODE);
};

export const patch: AppRouteHandler<UpdateUserRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const input = c.req.valid("json");

  const [user] = await db
    .update(users)
    .set(input)
    .where(eq(users.id, id))
    .returning();

  if (!user) {
    return c.json({ message: NOT_FOUND_MESSAGE }, NOT_FOUND_CODE);
  }

  return c.json(user, OK_CODE);
};

export const remove: AppRouteHandler<RemoveUserRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const results = await db.delete(users).where(eq(users.id, id)).returning();

  if (results.length === 0) {
    return c.json({ message: NOT_FOUND_MESSAGE }, NOT_FOUND_CODE);
  }

  return c.body(null, NO_CONTENT_CODE);
};
