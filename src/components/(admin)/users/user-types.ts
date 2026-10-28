export type WorkspaceUser = {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "Analyst" | "Viewer";
  status: "Active" | "Inactive";
  lastActive: string;
  owner?: boolean;
};

export const initialUsers: WorkspaceUser[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Administrator",
    status: "Active",
    lastActive: "Today, 09:45",
    owner: true,
  },
  {
    id: "2",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    role: "Analyst",
    status: "Active",
    lastActive: "Today, 09:21",
  },
  {
    id: "3",
    name: "Sam Taylor",
    email: "sam.taylor@example.com",
    role: "Viewer",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "4",
    name: "Casey James",
    email: "casey.james@example.com",
    role: "Analyst",
    status: "Inactive",
    lastActive: "18 Oct",
  },
];
