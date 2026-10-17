import type { Transaction } from "./transaction-table";

export const transactions: Transaction[] = [
  {
    id: "PV-1048",
    amount: "NGN 950000",
    risk: "High risk",
    date: "30 Sep, 14:00 UTC",
    indicator: "High amount + deviation",
  },
  {
    id: "PV-1064",
    amount: "NGN 950000",
    risk: "High risk",
    date: "01 Oct, 14:00 UTC",
    indicator: "High amount + deviation",
  },
  {
    id: "PV-1068",
    amount: "NGN 45000",
    risk: "Medium risk",
    date: "01 Oct, 15:03 UTC",
    indicator: "Transaction frequency",
  },
  {
    id: "PV-1069",
    amount: "NGN 45000",
    risk: "Medium risk",
    date: "01 Oct, 15:04 UTC",
    indicator: "Transaction frequency",
  },
  {
    id: "PV-1063",
    amount: "NGN 76726",
    risk: "Low risk",
    date: "01 Oct, 13:40 UTC",
    indicator: "No indicator triggered",
  },
  {
    id: "PV-1062",
    amount: "NGN 69553",
    risk: "Low risk",
    date: "01 Oct, 13:20 UTC",
    indicator: "No indicator triggered",
  },
];
