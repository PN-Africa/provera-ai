// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// // interface AnalysisCompleteStateProps {
// //   onReset: () => void;
// //   totalAnalyzed: number;
// //   totalFlagged: number;
// //   portal?: "admin" | "client";
// // }
// interface AnalysisCompleteStateProps {
//   onReset: () => void;
//   totalAnalyzed: number;
//   totalFlagged: number;
//   uploadId: string;
//   fileName: string;
//   portal?: "admin" | "client";
// }
// export function AnalysisCompleteState({
//   onReset,
//   totalAnalyzed,
//   totalFlagged,
//   portal = "client",
// }: AnalysisCompleteStateProps) {
//   const flaggedTransactionsPath =
//     portal === "admin"
//       ? "/admin/workspace/flagged-transactions"
//       : "/workspace/flagged-transactions";

//   const overviewPath =
//     portal === "admin" ? "/admin/workspace/overview" : "/workspace/overview";
//   const router = useRouter();
//   const uploadDetailsPath =
//     portal === "admin"
//       ? `/admin/workspace/uploads/${encodeURIComponent(uploadId)}`
//       : `/workspace/uploads/${encodeURIComponent(uploadId)}`;

//   return (
//     <div className="mt-6 rounded-xl border border-[#343644] bg-[#1C1D27] p-6 sm:p-10">
//       <h2 className="font-manrope text-[28px] font-semibold leading-[36px] text-[#EDEFFF]">
//         Your transaction analysis is ready
//       </h2>

//       <p className="mt-3 font-sans text-[16px] font-normal leading-[24px] text-[#EDEFFF]">
//         <span className="font-semibold">{totalAnalyzed}</span> transactions
//         analyzed. <span className="font-semibold">{totalFlagged}</span> flagged
//         for human review.
//       </p>

//       <p className="mt-2 font-sans text-[13px] leading-[20px] text-[#B7B9CB]">
//         A flagged transaction is not proof of fraud. Review flagged transactions
//         before taking action.
//       </p>

//       <div className="mt-5 flex flex-wrap gap-4">
//         {/* <Link
//           href={flaggedTransactionsPath}
//           className="flex min-h-[46px] items-center justify-center rounded-lg bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
//         >
//           Review flagged transactions
//         </Link>

//         <Link
//           href={overviewPath}
//           className="flex min-h-[46px] items-center justify-center rounded-lg border border-[#203B30] bg-[#34E89A] px-4 font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5]"
//         >
//           Open overview
//         </Link> */}

//         <button
//           type="button"
//           disabled={!uploadId}
//           onClick={() => router.push(uploadDetailsPath)}
//           className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-5 text-[14px] font-medium text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:opacity-50"
//         >
//           View Transaction Overview
//         </button>
//         {/* </Link> */}
//       </div>

//       <button
//         type="button"
//         onClick={onReset}
//         className="mt-4 block font-sans text-[14px] leading-[20px] text-[#B7B9CB] hover:text-[#EDEFFF] hover:underline"
//       >
//         Upload another dataset
//       </button>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface AnalysisCompleteStateProps {
  onReset: () => void;
  totalAnalyzed: number;
  totalFlagged: number;
  uploadId: string;
  fileName: string;
  portal?: "admin" | "client";
}

export function AnalysisCompleteState({
  onReset,
  totalAnalyzed,
  totalFlagged,
  uploadId,
  fileName,
  portal = "client",
}: AnalysisCompleteStateProps) {
  const router = useRouter();

  const uploadDetailsPath =
    portal === "admin"
      ? `/admin/workspace/uploads/${encodeURIComponent(uploadId)}`
      : `/workspace/uploads/${encodeURIComponent(uploadId)}`;

  return (
    <div className="mt-6 rounded-xl border border-[#343644] bg-[#1C1D27] p-6 sm:p-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#286B50] bg-[#153B2D]">
        <CheckCircle2 size={30} className="text-[#34E89A]" />
      </div>

      <p className="mt-6 text-[12px] font-medium uppercase tracking-[1.5px] text-[#34E89A]">
        Upload successful
      </p>

      <h2 className="mt-3 font-manrope text-[28px] font-semibold leading-[36px] text-[#EDEFFF]">
        Your transaction analysis is ready!
      </h2>

      <p className="mt-3 break-all text-[14px] font-medium text-[#34E89A]">
        {fileName}
      </p>

      <p className="mt-3 font-sans text-[14px] leading-[23px] text-[#B7B9CB]">
        Your dataset has been processed successfully.
        <span className="font-semibold text-[#EDEFFF]">
          {" "}
          {totalAnalyzed.toLocaleString()}
        </span>{" "}
        transactions analyzed and{" "}
        <span className="font-semibold text-[#FF9B9F]">
          {totalFlagged.toLocaleString()}
        </span>{" "}
        flagged for human review.
      </p>

      <p className="mt-2 font-sans text-[13px] leading-[20px] text-[#8D90A5]">
        A flagged transaction is not proof of fraud. Review flagged transactions
        before taking action.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={!uploadId}
          onClick={() => router.push(uploadDetailsPath)}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#34E89A] px-5 text-[14px] font-semibold text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          View Transaction Overview
          <ArrowRight size={17} />
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex min-h-[48px] items-center justify-center rounded-lg border border-[#343644] bg-[#202026] px-5 text-[14px] font-medium text-[#B7B9CB] transition hover:bg-[#30303B] hover:text-[#EDEFFF]"
        >
          Upload Another Dataset
        </button>
      </div>
    </div>
  );
}
