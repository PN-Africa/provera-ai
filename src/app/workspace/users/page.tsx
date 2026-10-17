import { AccessForm } from "@/components/users/access-form";
import { UsersHeader } from "@/components/users/users-header";
import { WorkspaceMembers } from "@/components/users/workspace-members";

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-black px-10 py-10 text-[#EDEFFF]">
      <UsersHeader />

      <WorkspaceMembers />

      <AccessForm />
    </div>
  );
}
