import Link from "next/link";
import { RiskBadge } from "./risk-badge";

export type Transaction = {
  id: string;
  amount: string;
  risk: "High risk" | "Medium risk" | "Low risk";
  date: string;
  indicator: string;
};

interface TransactionTableProps {
  transactions: Transaction[];
  portal?: "client" | "admin";
}

export function TransactionTable({
  transactions,
  portal = "client",
}: TransactionTableProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-[10px] border border-[#343644] bg-[#202026]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="h-[58px] bg-[#2A2A32]">
              <th className="px-5 text-left font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
                Transaction
              </th>

              <th className="px-5 text-left font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
                Amount
              </th>

              <th className="px-5 text-left font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
                Risk level
              </th>

              <th className="px-5 text-left font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
                Date / time · UTC
              </th>

              <th className="px-5 text-left font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
                Detection indicator
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const detailsPath =
                portal === "admin"
                  ? `/admin/workspace/transactions/${encodeURIComponent(transaction.id)}`
                  : `/workspace/transactions/${encodeURIComponent(transaction.id)}`;

              return (
                <tr
                  key={transaction.id}
                  className="h-[76px] border-t border-[#1C1D27]"
                >
                  <td className="px-5">
                    <Link
                      href={detailsPath}
                      className="font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF] underline-offset-4 hover:underline"
                    >
                      {transaction.id}
                    </Link>
                  </td>

                  <td className="px-5 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
                    {transaction.amount}
                  </td>

                  <td className="px-5">
                    <RiskBadge level={transaction.risk} />
                  </td>

                  <td className="px-5 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
                    {transaction.date}
                  </td>

                  <td className="px-5 font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
                    {transaction.indicator}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
