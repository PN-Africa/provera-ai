import type { ReactNode } from "react";
import { TransactionProvider } from "@/components/(dashboard)/transactions/transaction-context";

// Only these legacy pages read transactions; keeping the provider here stops
// every admin page from calling the analyst-only /transactions route
export default function AdminWorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TransactionProvider>{children}</TransactionProvider>;
}
