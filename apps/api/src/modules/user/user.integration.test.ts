import userRouter from "@/modules/user/user.router";
import { users } from "@/modules/user/user.schema";

import db from "@/shared/db";
import { ZOD_ERROR_MESSAGES } from "@/shared/lib/constants";
import { NOT_FOUND_MESSAGE } from "@/shared/http/status-phrases";
import {
  NO_CONTENT_CODE,
  NOT_FOUND_CODE,
  OK_CODE,
  UNPROCESSABLE_ENTITY_CODE,
} from "@/shared/http/status-codes";

import { getTypedClient } from "@/test/utils";

const client = getTypedClient(userRouter);

describe("User", () => {
  beforeAll(async () => {
    await db.insert(users).values([
      {
        username: "John Doe",
        email: "johndoe@mtt.com",
      },
      {
        username: "Jane Doe",
        email: "janedoe@mtt.com",
      },
      {
        username: "Tom Doe",
        email: "tomdoe@mtt.com",
      },
    ]);
  });

  afterAll(async () => {
    await db.delete(users);
  });

  describe("GET /users", () => {
    it("returns an array of existing users", async () => {
      const response = await client.users.$get();

      expect(response.status).toBe(OK_CODE);

      if (response.status === OK_CODE) {
        const json = await response.json();

        expectTypeOf(json).toBeArray();
        expect(json.length).toBe(3);
      }
    });
  });

  describe("GET /users/{id}", () => {
    it("returns the requested user", async () => {
      const response = await client.users[":id"].$get({
        param: {
          id: 3,
        },
      });

      expect(response.status).toBe(200);

      if (response.status === 200) {
        const json = await response.json();

        expect(json.username).toBe("Tom Doe");
      }
    });

    it("returns 422 is the given ID is not valid", async () => {
      const response = await client.users[":id"].$get({
        param: {
          // @ts-expect-error Testing a failing case
          id: "wat",
        },
      });

      expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE);

      if (response.status === UNPROCESSABLE_ENTITY_CODE) {
        const json = await response.json();
        expect(json.error.issues[0]?.path[0]).toBe("id");
        expect(json.error.issues[0]?.message).toBe(
          ZOD_ERROR_MESSAGES.EXPECTED_NUMBER,
        );
      }
    });

    it("returns 404 if requested user does not exists", async () => {
      const response = await client.users[":id"].$get({
        param: {
          id: 4,
        },
      });

      expect(response.status).toBe(NOT_FOUND_CODE);

      if (response.status === NOT_FOUND_CODE) {
        const json = await response.json();

        expect(json.message).toBe(NOT_FOUND_MESSAGE);
      }
    });
  });

  describe("POST /users", () => {
    it("creates a new user", async () => {
      const response = await client.users.$post({
        json: {
          username: "Bob Doe",
          email: "bobdoe@mtt.com",
        },
      });

      expect(response.status).toBe(OK_CODE);

      if (response.status == OK_CODE) {
        const json = await response.json();

        expect(json.id).toBe(4);
        expect(json.email).toBe("bobdoe@mtt.com");
      }
    });

    it("returns 422 is the given body is not valid", async () => {
      const response = await client.users.$post({
        json: { username: "Bob Doe", email: "bademail" },
      });

      expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE);

      if (response.status === UNPROCESSABLE_ENTITY_CODE) {
        const json = await response.json();
        expect(json.error.issues[0]?.path[0]).toBe("email");
      }
    });
  });

  describe("PATCH /users/{id}", () => {
    it("updates an existing user", async () => {
      const response = await client.users[":id"].$patch({
        param: {
          id: 1,
        },
        json: {
          username: "John Updated",
          email: "johnupdated@mtt.com",
        },
      });

      expect(response.status).toBe(OK_CODE);

      if (response.status === OK_CODE) {
        const json = await response.json();

        expect(json.id).toBe(1);
        expect(json.username).toBe("John Updated");
        expect(json.email).toBe("johnupdated@mtt.com");
      }
    });

    it("returns 422 if the given ID is not valid", async () => {
      const response = await client.users[":id"].$patch({
        param: {
          // @ts-expect-error Testing a failing case
          id: "wat",
        },
        json: {
          username: "Test",
          email: "test@mtt.com",
        },
      });

      expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE);

      if (response.status === UNPROCESSABLE_ENTITY_CODE) {
        const json = await response.json();
        expect(json.error.issues[0]?.path[0]).toBe("id");
        expect(json.error.issues[0]?.message).toBe(
          ZOD_ERROR_MESSAGES.EXPECTED_NUMBER,
        );
      }
    });

    it("returns 422 if the given body is not valid", async () => {
      const response = await client.users[":id"].$patch({
        param: {
          id: 1,
        },
        json: { username: "Test", email: "bademail" },
      });

      expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE);

      if (response.status === UNPROCESSABLE_ENTITY_CODE) {
        const json = await response.json();
        expect(json.error.issues[0]?.path[0]).toBe("email");
      }
    });

    it("returns 404 if user does not exist", async () => {
      const response = await client.users[":id"].$patch({
        param: {
          id: 999,
        },
        json: {
          username: "Test",
          email: "test@mtt.com",
        },
      });

      expect(response.status).toBe(NOT_FOUND_CODE);

      if (response.status === NOT_FOUND_CODE) {
        const json = await response.json();

        expect(json.message).toBe(NOT_FOUND_MESSAGE);
      }
    });
  });

  describe("DELETE /users/{id}", () => {
    it("deletes an existing user", async () => {
      const response = await client.users[":id"].$delete({
        param: {
          id: 4,
        },
      });

      expect(response.status).toBe(NO_CONTENT_CODE);
    });

    it("returns 422 if the given ID is not valid", async () => {
      const response = await client.users[":id"].$delete({
        param: {
          // @ts-expect-error Testing a failing case
          id: "wat",
        },
      });

      expect(response.status).toBe(UNPROCESSABLE_ENTITY_CODE);

      if (response.status === UNPROCESSABLE_ENTITY_CODE) {
        const json = await response.json();
        expect(json.error.issues[0]?.path[0]).toBe("id");
        expect(json.error.issues[0]?.message).toBe(
          ZOD_ERROR_MESSAGES.EXPECTED_NUMBER,
        );
      }
    });

    it("returns 404 if user does not exist", async () => {
      const response = await client.users[":id"].$delete({
        param: {
          id: 999,
        },
      });

      expect(response.status).toBe(NOT_FOUND_CODE);

      if (response.status === NOT_FOUND_CODE) {
        const json = await response.json();

        expect(json.message).toBe(NOT_FOUND_MESSAGE);
      }
    });
  });
});
