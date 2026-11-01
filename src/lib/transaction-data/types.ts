import type { Transaction } from "@/components/(dashboard)/transactions/transaction-table";
import type { ValidationError } from "@/components/(dashboard)/transaction-data/validation-errors";

export type PageState =
  | "upload"
  | "validation-error"
  | "valid"
  | "analyzing"
  | "complete";

export type CsvRecord = {
  transactionId: string;
  amount: number;
  currency: string;
  timestamp: string;
  type: string;
  customer_id: string;
  location: string;
  payment_method: string;
};

export type CsvValidationResult = {
  records: CsvRecord[];
  errors: ValidationError[];
  totalRecords: number;
};

export type AnalyzedTransaction = Transaction;
