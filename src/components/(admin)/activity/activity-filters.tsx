"use client";

type ActivityFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  eventType: string;
  onEventTypeChange: (value: string) => void;
  period: string;
  onPeriodChange: (value: string) => void;
};

export function ActivityFilters({
  search,
  onSearchChange,
  eventType,
  onEventTypeChange,
  period,
  onPeriodChange,
}: ActivityFiltersProps) {
  const inputClass =
    "min-h-[46px] rounded-lg border border-[#393943] bg-[#0B0B0D] px-4 text-sm text-[#EDEFFF] outline-none focus:border-[#34E89A]";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by actor or event"
        aria-label="Search activity by actor or event"
        className={inputClass}
      />

      <select
        value={eventType}
        onChange={(event) => onEventTypeChange(event.target.value)}
        aria-label="Filter by event type"
        className={`${inputClass} sm:min-w-[140px]`}
      >
        <option value="all">All event types</option>
        <option value="configuration">Configuration</option>
        <option value="analysis">Analysis</option>
        <option value="access">Access changes</option>
        <option value="import">Data imports</option>
      </select>

      <select
        value={period}
        onChange={(event) => onPeriodChange(event.target.value)}
        aria-label="Filter by time period"
        className={`${inputClass} sm:min-w-[120px]`}
      >
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="all">All time</option>
      </select>
    </div>
  );
}
