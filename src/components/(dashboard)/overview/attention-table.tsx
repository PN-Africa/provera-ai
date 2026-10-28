import Link from "next/link";

const transactions = [
  {
    id: "PV-1048",
    amount: "NGN 950000",
    risk: "High risk",
    riskType: "high",
    date: "30 Sep, 14:00 UTC",
    indicator: "High amount + deviation",
  },
  {
    id: "PV-1064",
    amount: "NGN 950000",
    risk: "High risk",
    riskType: "high",
    date: "01 Oct, 14:00 UTC",
    indicator: "High amount + deviation",
  },
  {
    id: "PV-1068",
    amount: "NGN 45000",
    risk: "Medium risk",
    riskType: "medium",
    date: "01 Oct, 15:03 UTC",
    indicator: "Transaction frequency",
  },
  {
    id: "PV-1069",
    amount: "NGN 45000",
    risk: "Medium risk",
    riskType: "medium",
    date: "01 Oct, 15:04 UTC",
    indicator: "Transaction frequency",
  },
];

type AttentionTableProps = {
  portal?: "client" | "admin";
};

export function AttentionTable({ portal = "client" }: AttentionTableProps) {
  return (
    <div className="mt-6">
      <h2 className="font-manrope text-[28px] font-semibold leading-[36px] text-[#EDEFFF]">
        Needs your attention
      </h2>

      {/* Table */}
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
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="h-[74px] border-t border-[#1C1D27]"
                >
                  <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                    {transaction.id}
                  </td>

                  <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                    {transaction.amount}
                  </td>

                  <td className="px-5">
                    <span
                      className={
                        transaction.riskType === "high"
                          ? "font-sans text-[14px] leading-[20px] text-[#FF9B9F]"
                          : "font-sans text-[14px] leading-[20px] text-[#E9C45F]"
                      }
                    >
                      {transaction.risk}
                    </span>
                  </td>

                  <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                    {transaction.date}
                  </td>

                  <td className="px-5 font-sans text-[14px] leading-[20px] text-[#EDEFFF]">
                    {transaction.indicator}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View all flagged */}
      <Link
        href={
          portal === "admin"
            ? "/admin/workspace/flagged-transactions"
            : "/workspace/flagged-transactions"
        }
        className="mt-6 flex h-[44px] w-[195px] items-center justify-center rounded-lg border border-[#343644] bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
      >
        View all flagged
      </Link>
    </div>
  );
}
