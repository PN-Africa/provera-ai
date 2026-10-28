import type { ValidationError } from "@/components/(dashboard)/transaction-data/validation-errors";
import type {
  CsvRecord,
  CsvValidationResult,
} from "@/lib/transaction-data/types";

const REQUIRED_COLUMNS = [
  "transaction_id",
  "amount",
  "currency",
  "date_time",
  "transaction_type",
] as const;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"' && insideQuotes && text[i + 1] === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && text[i + 1] === "\n") {
        i++;
      }

      row.push(cell.trim());

      if (row.some((value) => value !== "")) {
        rows.push(row);
      }

      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());

    if (row.some((value) => value !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

export function validateCsv(text: string): CsvValidationResult {
  const rows = parseCsv(text);

  if (rows.length === 0) {
    return {
      records: [],
      errors: [
        {
          row: "CSV file",
          message: "The file is empty.",
        },
      ],
      totalRecords: 0,
    };
  }

  const headers = rows[0].map((header) =>
    header
      .replace(/^\uFEFF/, "")
      .trim()
      .toLowerCase(),
  );

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !headers.includes(column),
  );

  if (missingColumns.length > 0) {
    return {
      records: [],
      errors: [
        {
          row: "CSV header",
          message: `Missing required columns: ${missingColumns.join(", ")}.`,
        },
      ],
      totalRecords: rows.length - 1,
    };
  }

  const dataRows = rows.slice(1);
  const errors: ValidationError[] = [];
  const records: CsvRecord[] = [];
  const seenIds = new Set<string>();

  if (dataRows.length > 500) {
    errors.push({
      row: "CSV file",
      message: "The file exceeds the maximum of 500 records.",
    });
  }

  dataRows.forEach((values, index) => {
    const rowLabel = `Row ${index + 2}`;

    const getValue = (column: string) => {
      const columnIndex = headers.indexOf(column);

      return columnIndex === -1 ? "" : (values[columnIndex] ?? "").trim();
    };

    const id = getValue("transaction_id");
    const rawAmount = getValue("amount");
    const amount = Number(rawAmount);
    const currency = getValue("currency");
    const dateTime = getValue("date_time");
    const transactionType = getValue("transaction_type");

    let invalid = false;

    if (!id) {
      errors.push({
        row: rowLabel,
        message: "Transaction ID is required.",
      });

      invalid = true;
    } else if (seenIds.has(id)) {
      errors.push({
        row: rowLabel,
        message: "Transaction ID is duplicated.",
      });

      invalid = true;
    }

    if (id) {
      seenIds.add(id);
    }

    if (!rawAmount || !Number.isFinite(amount) || amount <= 0) {
      errors.push({
        row: rowLabel,
        message: "Amount must be positive.",
      });

      invalid = true;
    }

    if (!currency) {
      errors.push({
        row: rowLabel,
        message: "Currency is required.",
      });

      invalid = true;
    }

    const hasTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(dateTime);

    if (!dateTime || !hasTimezone || Number.isNaN(Date.parse(dateTime))) {
      errors.push({
        row: rowLabel,
        message:
          "Use an ISO timestamp with timezone, e.g. 2026-10-10T09:00:00Z.",
      });

      invalid = true;
    }

    if (!transactionType) {
      errors.push({
        row: rowLabel,
        message: "Transaction type is required.",
      });

      invalid = true;
    }

    if (values.length !== headers.length) {
      errors.push({
        row: rowLabel,
        message: "The number of values does not match the CSV columns.",
      });

      invalid = true;
    }

    if (!invalid) {
      records.push({
        transaction_id: id,
        amount,
        currency,
        date_time: dateTime,
        transaction_type: transactionType,
        customer_id: getValue("customer_id"),
        location: getValue("location"),
        payment_method: getValue("payment_method"),
      });
    }
  });

  return {
    records,
    errors,
    totalRecords: dataRows.length,
  };
}
