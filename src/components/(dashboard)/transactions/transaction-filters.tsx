"use client";

export type RiskFilter = "All" | "High risk" | "Medium risk" | "Low risk";

export type TransactionSort =
  | "highest-risk"
  | "lowest-risk"
  | "newest"
  | "oldest";

interface TransactionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  riskFilter: RiskFilter;
  onRiskFilterChange: (value: RiskFilter) => void;
  sortBy: TransactionSort;
  onSortChange: (value: TransactionSort) => void;
}

const selectClassName =
  "h-[46px] w-full rounded-[6px] border border-[#343644] bg-[#202026] px-4 font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB] outline-none focus:border-[#203B30]";

export function TransactionFilters({
  search,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  sortBy,
  onSortChange,
}: TransactionFiltersProps) {
  return (
    <div className="mt-6 space-y-6">
      {/* Dataset + dates */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.65fr_1fr_1fr]">
        <div className="flex h-[46px] items-center rounded-[6px] border border-[#203B30] bg-[#202026] px-4">
          <span className="font-sans text-[14px] text-[#B7B9CB]">
            Sample transactions.csv
          </span>
        </div>

        <div className="flex h-[46px] items-center rounded-[6px] border border-[#203B30] bg-[#202026] px-4">
          <span className="font-sans text-[14px] text-[#B7B9CB]">
            From (UTC)&nbsp; 28 Sep 2026
          </span>
        </div>

        <div className="flex h-[46px] items-center rounded-[6px] border border-[#203B30] bg-[#202026] px-4">
          <span className="font-sans text-[14px] text-[#B7B9CB]">
            To (UTC)&nbsp; 01 Oct 2026
          </span>
        </div>
      </div>

      {/* Search + filters */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.65fr_0.6fr_0.65fr]">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search transaction or customer ID"
          aria-label="Search transaction or customer ID"
          className="h-[46px] rounded-[6px] border border-[#343644] bg-[#202026] px-4 font-sans text-[14px] text-[#EDEFFF] outline-none placeholder:text-[#B7B9CB] focus:border-[#203B30]"
        />

        <select
          value={riskFilter}
          onChange={(event) =>
            onRiskFilterChange(event.target.value as RiskFilter)
          }
          aria-label="Filter by risk"
          className={selectClassName}
        >
          <option value="All">Risk: All</option>
          <option value="High risk">Risk: High</option>
          <option value="Medium risk">Risk: Medium</option>
          <option value="Low risk">Risk: Low</option>
        </select>

        <select
          value={sortBy}
          onChange={(event) =>
            onSortChange(event.target.value as TransactionSort)
          }
          aria-label="Sort transactions"
          className={selectClassName}
        >
          <option value="highest-risk">Sort: Highest risk</option>
          <option value="lowest-risk">Sort: Lowest risk</option>
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
        </select>
      </div>
    </div>
  );
}
