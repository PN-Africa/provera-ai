export type WorkspaceUser = {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "Analyst" | "Viewer";
  status: "Active" | "Inactive";
  lastActive: string | null;
  owner?: boolean;
};
