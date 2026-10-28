import { Sidebar } from "@/components/workspace-layout/sidebar";
import { TransactionProvider } from "@/components/(dashboard)/transactions/transaction-context";
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

        <main className="min-h-screen pt-[100px] lg:ml-[240px] px-5 sm:px-8 lg:px-10 ">
          {children}
        </main>
      </div>
    </TransactionProvider>
  );
}
