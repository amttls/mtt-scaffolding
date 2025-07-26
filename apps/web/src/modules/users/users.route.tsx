import {
  getGetUsersQueryKey,
  useCreateUser,
  useGetUsers,
} from "@repo/api-client/generated/users/users";

import { useQueryClient } from "@tanstack/react-query";

import { createRoute } from "@tanstack/react-router";

import type { RootRoute } from "@tanstack/react-router";

function UsersPage() {
  const { data, isLoading, error, refetch } = useGetUsers();
  const createUserMutation = useCreateUser();

  const queryClient = useQueryClient();

  const users = data?.data;

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        data: {
          username: `user_${Date.now()}`,
          email: `user${Date.now()}@example.com`,
        },
      });
      // Refetch users after creating
      queryClient.invalidateQueries({ queryKey: getGetUsersQueryKey() });
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600">
          Error loading users:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleCreateUser}
          disabled={createUserMutation.isPending}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {createUserMutation.isPending ? "Creating..." : "Add User"}
        </button>
      </div>

      {users && users.length > 0 ? (
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 shadow-sm">
              <div className="font-semibold">{user.username}</div>
              <div className="text-gray-600">{user.email}</div>
              <div className="text-sm text-gray-400">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          No users found. Click &quot;Add User&quot; to create one!
        </div>
      )}

      {createUserMutation.error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to create user:{" "}
          {createUserMutation.error instanceof Error
            ? createUserMutation.error.message
            : "Unknown error"}
        </div>
      )}
    </div>
  );
}

export default (parentRoute: RootRoute) =>
  createRoute({
    path: "/users",
    component: UsersPage,
    getParentRoute: () => parentRoute,
  });
