import Link from "next/link";
import type { Transaction } from "@/lib/api/upload";

type AttentionTableProps = {
  transactions: Transaction[];
  portal?: "client" | "admin";
};

export default function AttentionTable({
  transactions,
  portal = "client",
}: AttentionTableProps) {
  const flaggedTransactions = transactions
    .filter((transaction) => transaction.flagged)
    .sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
    )
    .slice(0, 4);

  const transactionPath =
    portal === "admin"
      ? "/admin/workspace/transaction-data"
      : "/workspace/transaction-data";

  const flaggedPath =
    portal === "admin"
      ? "/admin/workspace/flagged-transactions"
      : "/workspace/flagged-transactions";

  function formatDate(dateString: string) {
    return (
      new Date(dateString).toISOString().replace("T", ", ").slice(0, 17) +
      " UTC"
    );
  }

  return (
    <div className="mt-6">
      <h2 className="font-manrope text-[28px] font-semibold leading-[36px] text-[#EDEFFF]">
        Needs your attention
      </h2>

      <div className="mt-5 overflow-hidden rounded-xl border border-[#343644] bg-[#202026]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="h-[56px] bg-[#2A2A32]">
                <th className="px-5 text-left font-sans text-[12px] font-medium leading-[18px] text-[#B7B9CB]">
                  Transaction
                </th>
                <th className="px-5 text-left font-sans text-[12px] font-medium leading-[18px] text-[#B7B9CB]">
                  Amount
                </th>
                <th className="px-5 text-left font-sans text-[12px] font-medium leading-[18px] text-[#B7B9CB]">
                  Risk level
                </th>
                <th className="px-5 text-left font-sans text-[12px] font-medium leading-[18px] text-[#B7B9CB]">
                  Date / time · UTC
                </th>
                <th className="px-5 text-left font-sans text-[12px] font-medium leading-[18px] text-[#B7B9CB]">
                  Detection indicator
                </th>
              </tr>
            </thead>

            <tbody>
              {flaggedTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center font-sans text-sm text-[#B7B9CB]"
                  >
                    No flagged transactions in the loaded results.
                  </td>
                </tr>
              ) : (
                flaggedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="h-[74px] border-t border-[#1C1D27]"
                  >
                    <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                      <Link
                        href={`${transactionPath}/${transaction.id}`}
                        className="hover:underline"
                      >
                        {transaction.transactionId}
                      </Link>
                    </td>

                    <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                      {transaction.currency}{" "}
                      {Number(transaction.amount).toLocaleString()}
                    </td>

                    <td className="px-5">
                      <span
                        className={
                          transaction.riskLevel === "HIGH"
                            ? "font-sans text-[14px] leading-[20px] text-[#FF9B9F]"
                            : transaction.riskLevel === "MEDIUM"
                              ? "font-sans text-[14px] leading-[20px] text-[#E9C45F]"
                              : "font-sans text-[14px] leading-[20px] text-[#7FD7BD]"
                        }
                      >
                        {transaction.riskLevel === "HIGH"
                          ? "High risk"
                          : transaction.riskLevel === "MEDIUM"
                            ? "Medium risk"
                            : "Low risk"}
                      </span>
                    </td>

                    <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                      {formatDate(transaction.occurredAt)}

                      {/* {formatDate(transaction.date)} */}
                    </td>

                    <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                      —
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {flaggedTransactions.length > 0 && (
        <Link
          href={flaggedPath}
          className="mt-6 flex h-[44px] w-[195px] items-center justify-center rounded-lg border border-[#343644] bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
        >
          View all flagged
        </Link>
      )}
    </div>
  );
}
