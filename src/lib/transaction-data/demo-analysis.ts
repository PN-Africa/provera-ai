import type { Transaction } from "@/components/transactions/transaction-table";
import type { CsvRecord } from "@/lib/transaction-data/types";

function formatDate(dateTime: string): string {
  const date = new Date(dateTime);

  return `${new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(date)}, ${new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(date)} UTC`;
}

/**
 * Demonstration-only rules.
 * This is not an AI model or a production fraud detector.
 */
export function analyzeRecords(records: CsvRecord[]): Transaction[] {
  const customerCounts = new Map<string, number>();

  records.forEach((record) => {
    if (record.customer_id) {
      customerCounts.set(
        record.customer_id,
        (customerCounts.get(record.customer_id) ?? 0) + 1,
      );
    }
  });

  return records.map((record) => {
    const repeatedCustomer =
      Boolean(record.customer_id) &&
      (customerCounts.get(record.customer_id) ?? 0) >= 3;

    let risk: Transaction["risk"] = "Low risk";
    let indicator = "No indicator triggered";

    if (record.amount >= 200000) {
      risk = "High risk";
      indicator = "High amount";
    } else if (repeatedCustomer) {
      risk = "Medium risk";
      indicator = "Repeated customer activity";
    }

    return {
      id: record.transaction_id,
      amount: `${record.currency} ${record.amount.toLocaleString("en-NG")}`,
      risk,
      date: formatDate(record.date_time),
      indicator,
    };
  });
}
