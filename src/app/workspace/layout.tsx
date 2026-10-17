// import { Sidebar } from "@/components/workspace-layout/sidebar";
// import { TransactionProvider } from "@/components/transactions/transaction-context";
// import { WorkspaceHeader } from "@/components/workspace-layout/workspace-header";

// export default function WorkspaceLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-black text-[#EDEFFF]">
//       <WorkspaceHeader />

//       <Sidebar />
//       <TransactionProvider>
//         <main className="min-h-screen pt-[76px] lg:ml-[240px]">{children}</main>
//       </TransactionProvider>
//     </div>
//   );
// }

import { Sidebar } from "@/components/workspace-layout/sidebar";
import { TransactionProvider } from "@/components/transactions/transaction-context";
import { WorkspaceHeader } from "@/components/workspace-layout/workspace-header";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-black text-[#EDEFFF]">
        <WorkspaceHeader />
        <Sidebar />

        <main className="min-h-screen pt-[76px] lg:ml-[240px]">{children}</main>
      </div>
    </TransactionProvider>
  );
}
