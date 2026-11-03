"use client";

import { useEffect, useState } from "react";

import {
  getTransactions,
  getDashboardSummary,
  getDashboardTrends,
  type Transaction,
  type DashboardSummary,
  type DashboardTrendPoint,
} from "@/lib/api/upload";
import OverviewStats from "./overview-stat-card";
import TransactionActivity from "./transaction-activity";
import RiskDistribution from "./risk-distribution";
import AttentionTable from "./attention-table";

// type OverviewPageContentProps = {
//   from?: string;
//   to?: string;
//   portal: boolean;
// };
type OverviewPageContentProps = {
  from?: string;
  to?: string;
  portal: "client" | "admin";
};

async function getAllTransactions(
  from?: string,
  to?: string,
): Promise<Transaction[]> {
  const limit = 100;
  let page = 1;
  const allTransactions: Transaction[] = [];

  while (true) {
    const response = await getTransactions({
      page,
      limit,
      from,
      to,
    });

    allTransactions.push(...response.data);

    if (!response.hasNextPage) {
      break;
    }

    page += 1;
  }

  return allTransactions;
}

export default function OverviewPageContent({
  from,
  to,
  portal,
}: OverviewPageContentProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [trendPoints, setTrendPoints] = useState<DashboardTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // async function loadOverview() {
    //   setLoading(true);
    //   setError(null);

    //   try {
    //     const [summaryResponse, trendsResponse, allTransactions] =
    //       await Promise.all([
    //         getDashboardSummary({ from, to }),
    //         getDashboardTrends({ from, to }),
    //         getAllTransactions(from, to),
    //       ]);

    //     if (cancelled) return;

    //     setSummary(summaryResponse);
    //     setTrendPoints(trendsResponse.points);
    //     setTransactions(allTransactions);
    //     setTotalTransactions(allTransactions.length);
    //   } catch (err) {
    //     if (cancelled) return;

    //     setError(
    //       err instanceof Error ? err.message : "Unable to load dashboard data.",
    //     );
    //   } finally {
    //     if (!cancelled) {
    //       setLoading(false);
    //     }
    //   }
    // }

    async function loadOverview() {
      setLoading(true);
      setError(null);

      try {
        // These keep using the page's existing date filters.
        const [summaryResponse, allTransactions] = await Promise.all([
          getDashboardSummary({ from, to }),
          getAllTransactions(from, to),
        ]);

        // Only the activity chart uses the last four calendar days.
        const today = new Date();
        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 3);

        const formatDate = (date: Date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        const trendsResponse = await getDashboardTrends({
          from: formatDate(fourDaysAgo),
          to: formatDate(today),
        });

        if (cancelled) return;

        setSummary(summaryResponse);
        setTrendPoints(trendsResponse.points);
        setTransactions(allTransactions);
        setTotalTransactions(allTransactions.length);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Unable to load dashboard data.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOverview();

    return () => {
      cancelled = true;
    };
  }, [from, to]);

  if (loading) {
    return <p>Loading overview...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* <OverviewStats
        transactions={transactions}
        totalTransactions={totalTransactions}
        summary={summary}
      /> */}
      <OverviewStats
        transactions={transactions}
        totalTransactions={totalTransactions}
      />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TransactionActivity points={trendPoints} />

        <RiskDistribution transactions={transactions} />
      </div>
      <AttentionTable transactions={transactions} portal={portal} />
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// import {
//   getTransactions,
//   getDashboardSummary,
//   getDashboardTrends,
//   type Transaction,
//   type DashboardSummary,
//   type DashboardTrendPoint,
// } from "@/lib/api/upload";

// import OverviewStats from "./overview-stat-card";
// import TransactionActivity from "./transaction-activity";
// import RiskDistribution from "./risk-distribution";
// import AttentionTable from "./attention-table";

// type OverviewPageContentProps = {
//   portal: "client" | "admin";
// };

// function getLastFourDays() {
//   const today = new Date();
//   const fromDate = new Date(today);

//   fromDate.setDate(today.getDate() - 3);

//   // Use local calendar dates, not UTC dates.
//   const formatDate = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   };

//   return {
//     from: formatDate(fromDate),
//     to: formatDate(today),
//   };
// }

// async function getAllTransactions(
//   from: string,
//   to: string,
// ): Promise<Transaction[]> {
//   const limit = 100;
//   let page = 1;
//   const allTransactions: Transaction[] = [];

//   while (true) {
//     const response = await getTransactions({
//       page,
//       limit,
//       from,
//       to,
//     });

//     allTransactions.push(...response.data);

//     if (!response.hasNextPage) {
//       break;
//     }

//     page += 1;
//   }

//   return allTransactions;
// }

// export default function OverviewPageContent({
//   portal,
// }: OverviewPageContentProps) {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [totalTransactions, setTotalTransactions] = useState(0);
//   const [summary, setSummary] = useState<DashboardSummary | null>(null);
//   const [trendPoints, setTrendPoints] = useState<DashboardTrendPoint[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let cancelled = false;

//     async function loadOverview() {
//       setLoading(true);
//       setError(null);

//       try {
//         const { from, to } = getLastFourDays();

//         const [summaryResponse, trendsResponse, allTransactions] =
//           await Promise.all([
//             getDashboardSummary({ from, to }),
//             getDashboardTrends({ from, to }),
//             getAllTransactions(from, to),
//           ]);

//         if (cancelled) return;

//         setSummary(summaryResponse);
//         setTrendPoints(trendsResponse.points);
//         setTransactions(allTransactions);
//         setTotalTransactions(allTransactions.length);
//       } catch (err) {
//         if (cancelled) return;

//         setError(
//           err instanceof Error ? err.message : "Unable to load dashboard data.",
//         );
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     }

//     loadOverview();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (loading) {
//     return <p>Loading overview...</p>;
//   }

//   if (error) {
//     return <p role="alert">{error}</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <OverviewStats
//         transactions={transactions}
//         totalTransactions={totalTransactions}
//       />
//       <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
//         <TransactionActivity points={trendPoints} />

//         <RiskDistribution transactions={transactions} />
//       </div>

//       <AttentionTable transactions={transactions} portal={portal} />
//     </div>
//   );
// }
