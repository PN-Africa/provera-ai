"use client";

import { useRouter } from "next/navigation";
import { DeactivateUser } from "./deactivate-user";
import type { WorkspaceUser } from "./user-types";

export function DeactivateUserPage({ user }: { user: WorkspaceUser }) {
  const router = useRouter();

  return (
    <DeactivateUser
      user={user}
      onConfirm={(updatedUser) => {
        // TODO: Save updatedUser through the backend API first.
        router.push("/admin/changes-saved");
      }}
      onCancel={() => router.push(`/admin/manage-user/${user.id}`)}
    />
  );
}
