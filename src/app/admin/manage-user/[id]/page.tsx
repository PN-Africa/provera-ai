"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkspaceMembers, type WorkspaceMember } from "@/lib/api/users";
import { ManageUserPage } from "@/components/(admin)/users/manage-user-page";
import type { WorkspaceUser } from "@/components/(admin)/users/user-types";

function toWorkspaceUser(member: WorkspaceMember): WorkspaceUser {
  return {
    id: member.id,
    name: member.fullName,
    email: member.email,
    role: member.role === "ADMIN" ? "Administrator" : "Analyst",
    status: member.status === "ACTIVE" ? "Active" : "Inactive",
    lastActive: member.lastActive,
  };
}

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<WorkspaceUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadMember() {
      try {
        const response = await getWorkspaceMembers();
        const member = response.data.find((item) => item.id === id);

        if (!member) {
          throw new Error("Member not found.");
        }

        if (!cancelled) {
          setUser(toWorkspaceUser(member));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load this member.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadMember();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="p-6 text-sm text-[#A8ADB8]">Loading member…</p>;
  }

  if (error || !user) {
    return (
      <p className="p-6 text-sm text-red-400">{error || "Member not found."}</p>
    );
  }

  return <ManageUserPage user={user} />;
}
