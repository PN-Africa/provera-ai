import type { Transaction } from "@/components/transactions/transaction-table";
import type { ValidationError } from "@/components/transaction-data/validation-errors";

export type PageState =
  | "upload"
  | "validation-error"
  | "valid"
  | "analyzing"
  | "complete";

export type CsvRecord = {
  transaction_id: string;
  amount: number;
  currency: string;
  date_time: string;
  transaction_type: string;
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
