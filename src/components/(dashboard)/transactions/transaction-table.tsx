"use client";

import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const totalPages = Math.ceil(transactions.length / pageSize);

  const page = Math.min(currentPage, Math.max(1, totalPages));

  const startIndex = (page - 1) * pageSize;

  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <div className="mt-6 overflow-hidden rounded-[10px] border border-[#343644] bg-[#202026]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="h-[58px] bg-[#2A2A32]">
              <th className="px-5 text-left text-[12px] font-normal text-[#B7B9CB]">
                Transaction
              </th>
              <th className="px-5 text-left text-[12px] font-normal text-[#B7B9CB]">
                Amount
              </th>
              <th className="px-5 text-left text-[12px] font-normal text-[#B7B9CB]">
                Risk level
              </th>
              <th className="px-5 text-left text-[12px] font-normal text-[#B7B9CB]">
                Date / time · UTC
              </th>
              <th className="px-5 text-left text-[12px] font-normal text-[#B7B9CB]">
                Detection indicator
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedTransactions.map((transaction) => {
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
                      className="text-[14px] text-[#EDEFFF] underline-offset-4 hover:underline"
                    >
                      {transaction.id}
                    </Link>
                  </td>

                  <td className="px-5 text-[14px] text-[#EDEFFF]">
                    {transaction.amount}
                  </td>

                  <td className="px-5">
                    <RiskBadge level={transaction.risk} />
                  </td>

                  <td className="px-5 text-[14px] text-[#EDEFFF]">
                    {transaction.date}
                  </td>

                  <td className="px-5 text-[14px] text-[#EDEFFF]">
                    {transaction.indicator}
                  </td>
                </tr>
              );
            })}

            {paginatedTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-sm text-[#B7B9CB]"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#343644] px-5 py-4">
          <p className="text-xs text-[#B7B9CB]">
            Showing {startIndex + 1}–
            {Math.min(startIndex + pageSize, transactions.length)} of{" "}
            {transactions.length} transactions
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(page - 1)}
              disabled={page === 1}
              className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-2 text-xs text-[#B7B9CB]">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage(page + 1)}
              disabled={page === totalPages}
              className="rounded-md border border-[#343644] px-3 py-2 text-xs text-[#EDEFFF] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
