"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllAuditLogs, type AuditLog } from "@/lib/api/audit-logs";
import { ActivityFilters } from "./activity-filters";
import { ActivityTable, type ActivityEvent } from "./activity-table";
import { getAllWorkspaceMembers } from "@/lib/api/users";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(value));
}

function formatAction(action: string) {
  return action
    .split(".")
    .map((part) => part.replaceAll("_", " "))
    .join(" · ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getCategory(action: string) {
  if (action.startsWith("rule.") || action.startsWith("detection_rule.")) {
    return "configuration";
  }

  if (action.startsWith("transaction.") || action.startsWith("detection.")) {
    return "analysis";
  }

  if (
    action.startsWith("user.") ||
    action.startsWith("account.") ||
    action.startsWith("auth.")
  ) {
    return "access";
  }

  if (action.startsWith("upload.") || action.startsWith("import.")) {
    return "import";
  }

  return "all";
}

function toActivityEvent(
  log: AuditLog,
  actorNames: Record<string, string>,
): ActivityEvent {
  return {
    id: log.id,
    date: formatDate(log.occurredAt),
    // actor: actorNames[log.actorId] ?? `${log.actorRole} · ${log.actorId}`,
    actor: actorNames[log.actorId] ?? log.actorRole,
    event: `${formatAction(log.action)} (${log.entityType ?? "event"})`,
    result: "Recorded",
  };
}

export function PlatformActivity() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [actorNames, setActorNames] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");
  const [period, setPeriod] = useState("7");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    async function loadActivity() {
      try {
        setLoading(true);
        setError("");

        //   getAllAuditLogs(),
        //   getAllWorkspaceMembers(),
        // ]);
        const [auditLogs, members] = await Promise.all([
          getAllAuditLogs(),
          getAllWorkspaceMembers(),
        ]);

        if (cancelled) return;

        setLogs(auditLogs);

        setActorNames(
          Object.fromEntries(
            members.map((member) => [member.id, member.fullName]),
          ),
        );

        if (cancelled) return;

        // setLogs(auditResponse.data);
        setLogs(auditLogs);

        const names = Object.fromEntries(
          members.map((member) => [member.id, member.fullName]),
        );

        setActorNames(names);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load platform activity.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadActivity();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs
      .filter((log) => {
        const actorName = actorNames[log.actorId] ?? "";

        const matchesSearch =
          (actorName ?? "").toLowerCase().includes(query) ||
          (log.actorId ?? "").toLowerCase().includes(query) ||
          (log.actorRole ?? "").toLowerCase().includes(query) ||
          (log.action ?? "").toLowerCase().includes(query) ||
          (log.entityType ?? "").toLowerCase().includes(query) ||
          (log.entityId ?? "").toLowerCase().includes(query);
        const matchesType =
          eventType === "all" || getCategory(log.action) === eventType;

        const ageInDays =
          (now - new Date(log.occurredAt).getTime()) / (1000 * 60 * 60 * 24);

        const matchesPeriod = period === "all" || ageInDays <= Number(period);

        return matchesSearch && matchesType && matchesPeriod;
      })
      .map((log) => toActivityEvent(log, actorNames));
  }, [logs, actorNames, search, eventType, period, now]);

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
        <p className="mt-3 text-sm text-[#A8ADB8]">All times in UTC</p>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        {loading ? (
          <p className="mt-4 text-sm text-[#A8ADB8]">Loading activity…</p>
        ) : (
          <div className="mt-4">
            <ActivityTable events={filteredEvents} />
          </div>
        )}
      </section>
    </div>
  );
}
