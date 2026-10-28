import { WorkspaceUser } from "./user-types";

type UsersTableProps = {
  users: WorkspaceUser[];
  onManage: (user: WorkspaceUser) => void;
};

export function UsersTable({ users, onManage }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
        <thead>
          <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
            {["Member", "Role", "Status", "Last active", "Action"].map(
              (heading) => (
                <th
                  key={heading}
                  className="border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-sm text-[#EDEFFF]">
              <td className="px-3 py-4">
                {user.name}
                {user.owner ? " · Owner" : ""}
              </td>
              <td className="px-3 py-4">{user.role}</td>
              <td className="px-3 py-4">{user.status}</td>
              <td className="px-3 py-4">{user.lastActive}</td>
              <td className="px-3 py-4">
                <button
                  type="button"
                  onClick={() => onManage(user)}
                  className="font-medium text-[#34E89A] hover:text-[#90EFC5]"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-3 py-10 text-center text-[#A8ADB8]">
                No members match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
