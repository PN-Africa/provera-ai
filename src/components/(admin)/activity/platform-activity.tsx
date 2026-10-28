"use client";

import { useMemo, useState } from "react";
import { ActivityFilters } from "./activity-filters";
import { ActivityTable, type ActivityEvent } from "./activity-table";

const sampleEvents: ActivityEvent[] = [
  {
    id: 1,
    date: "22 Oct · 09:45",
    actor: "Alex Morgan",
    event: "Updated detection rules to v1.4",
    result: "Success",
    category: "configuration",
    daysAgo: 4,
  },
  {
    id: 2,
    date: "22 Oct · 09:20",
    actor: "Jordan Lee",
    event: "Analyzed transaction CSV",
    result: "Success",
    category: "analysis",
    daysAgo: 4,
  },
  {
    id: 3,
    date: "21 Oct · 16:30",
    actor: "Alex Morgan",
    event: "Changed Sam Taylor to Viewer",
    result: "Success",
    category: "access",
    daysAgo: 5,
  },
  {
    id: 4,
    date: "21 Oct · 16:10",
    actor: "Jordan Lee",
    event: "Imported sample dataset",
    result: "Success",
    category: "import",
    daysAgo: 5,
  },
  {
    id: 5,
    date: "21 Oct · 15:42",
    actor: "Alex Morgan",
    event: "Deactivated Casey James",
    result: "Success",
    category: "access",
    daysAgo: 5,
  },
  {
    id: 6,
    date: "21 Oct · 14:08",
    actor: "Jordan Lee",
    event: "CSV rejected: missing timestamps",
    result: "Failed",
    category: "import",
    daysAgo: 5,
  },
];

export function PlatformActivity() {
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");
  const [period, setPeriod] = useState("7");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sampleEvents.filter((item) => {
      const matchesSearch =
        !query ||
        item.actor.toLowerCase().includes(query) ||
        item.event.toLowerCase().includes(query);

      const matchesType = eventType === "all" || item.category === eventType;

      const matchesPeriod = period === "all" || item.daysAgo <= Number(period);

      return matchesSearch && matchesType && matchesPeriod;
    });
  }, [search, eventType, period]);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Platform activity
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          See who changed access, updated settings or analyzed transaction data.
        </p>
      </header>

      <ActivityFilters
        search={search}
        onSearchChange={setSearch}
        eventType={eventType}
        onEventTypeChange={setEventType}
        period={period}
        onPeriodChange={setPeriod}
      />

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">Recent events</h2>
        <p className="mt-3 text-sm text-[#A8ADB8]">
          All times in UTC · Example activity
        </p>

        <div className="mt-4">
          <ActivityTable events={filteredEvents} />
        </div>
      </section>
    </div>
  );
}
