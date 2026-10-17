"use client";

import { ChangeEvent, RefObject } from "react";
import { ValidationErrors, ValidationError } from "./validation-errors";
import { ValidDataset } from "./valid-dataset";

type PageState =
  | "upload"
  | "validation-error"
  | "valid"
  | "analyzing"
  | "complete";

interface TransactionUploadCardProps {
  pageState: PageState;
  selectedFile: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChooseFile: () => void;
  onSyntheticSample: () => void;
  onDownloadTemplate: () => void;
  onAnalyze: () => void;
  validationErrors: ValidationError[];
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
}

export function TransactionUploadCard({
  pageState,
  selectedFile,
  fileInputRef,
  onFileChange,
  onChooseFile,
  onSyntheticSample,
  onDownloadTemplate,
  onAnalyze,
  validationErrors,
  totalRecords,
  validRecords,
  invalidRecords,
}: TransactionUploadCardProps) {
  return (
    <div className="rounded-xl border border-[#343644] bg-[#1C1D27] p-6">
      <h2 className="font-manrope text-[20px] font-semibold leading-[28px] tracking-[0px] text-[#EDEFFF]">
        Upload transaction data
      </h2>

      <p className="mt-3 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
        CSV · Up to 1 MB · Maximum 500 records
      </p>

      <div className="mt-4 rounded-xl border border-[#343644] bg-[#171A2E] p-8">
        <h3 className="break-words font-manrope text-[20px] font-semibold leading-[28px] text-[#EDEFFF]">
          {selectedFile ?? "Choose your CSV file"}
        </h3>

        <p className="mt-3 font-sans text-[12px] font-normal leading-[18px] text-[#B7B9CB]">
          Click to browse your files
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={onFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={onChooseFile}
          className="mt-4 flex h-[46px] w-[220px] items-center justify-center rounded-lg border border-[#343644] bg-[#1C1D27] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] transition hover:bg-[#252630]"
        >
          {selectedFile ? "Choose another file" : "Choose file"}
        </button>
      </div>

      <button
        type="button"
        onClick={onSyntheticSample}
        className="mt-4 flex h-[46px] w-full items-center justify-center rounded-lg border border-[#343644] bg-[#1C1D27] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] transition hover:bg-[#252630]"
      >
        Use synthetic sample
      </button>

      <button
        type="button"
        onClick={onDownloadTemplate}
        className="mt-4 flex h-[46px] w-full items-center justify-center rounded-lg border border-[#343644] bg-[#1C1D27] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#EDEFFF] transition hover:bg-[#252630]"
      >
        Download template
      </button>

      {pageState === "validation-error" && (
        <ValidationErrors errors={validationErrors} />
      )}

      {pageState === "valid" && (
        <ValidDataset
          totalRecords={totalRecords}
          validRecords={validRecords}
          invalidRecords={invalidRecords}
        />
      )}

      <button
        type="button"
        disabled={pageState !== "valid"}
        onClick={onAnalyze}
        className={`mt-4 flex h-[46px] w-full items-center justify-center rounded-lg px-4 font-sans text-[14px] font-medium leading-[20px] transition ${
          pageState === "valid"
            ? "bg-[#455EFF] text-[#EDEFFF] hover:bg-[#4057E6]"
            : "cursor-not-allowed bg-[#191B26] text-[#737687]"
        }`}
      >
        Analyze transactions
      </button>
    </div>
  );
}
