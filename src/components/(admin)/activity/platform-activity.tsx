// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { getAllAuditLogs, type AuditLog } from "@/lib/api/audit-logs";
// import { ActivityFilters } from "./activity-filters";
// import { ActivityTable, type ActivityEvent } from "./activity-table";
// import { getAllWorkspaceMembers } from "@/lib/api/users";

// function formatDate(value: string) {
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: "UTC",
//     timeZoneName: "short",
//   }).format(new Date(value));
// }

// function formatAction(action: string) {
//   return action
//     .split(".")
//     .map((part) => part.replaceAll("_", " "))
//     .join(" · ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// }

// function getCategory(action: string) {
//   if (action.startsWith("rule.") || action.startsWith("detection_rule.")) {
//     return "configuration";
//   }

//   if (action.startsWith("transaction.") || action.startsWith("detection.")) {
//     return "analysis";
//   }

//   if (
//     action.startsWith("user.") ||
//     action.startsWith("account.") ||
//     action.startsWith("auth.")
//   ) {
//     return "access";
//   }

//   if (action.startsWith("upload.") || action.startsWith("import.")) {
//     return "import";
//   }

//   return "all";
// }

// function toActivityEvent(
//   log: AuditLog,
//   actorNames: Record<string, string>,
// ): ActivityEvent {
//   return {
//     id: log.id,
//     date: formatDate(log.occurredAt),
//     // actor: actorNames[log.actorId] ?? `${log.actorRole} · ${log.actorId}`,
//     actor: actorNames[log.actorId] ?? log.actorRole,
//     event: `${formatAction(log.action)} (${log.entityType ?? "event"})`,
//     result: "Recorded",
//   };
// }

// export function PlatformActivity() {
//   const [logs, setLogs] = useState<AuditLog[]>([]);
//   const [actorNames, setActorNames] = useState<Record<string, string>>({});
//   const [search, setSearch] = useState("");
//   const [eventType, setEventType] = useState("all");
//   const [period, setPeriod] = useState("7");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [now] = useState(() => Date.now());

//   useEffect(() => {
//     let cancelled = false;

//     async function loadActivity() {
//       try {
//         setLoading(true);
//         setError("");

//         const auditLogs = await getAllAuditLogs();

//         if (cancelled) return;

//         setLogs(
//           [...auditLogs].sort(
//             (a, b) =>
//               new Date(b.occurredAt).getTime() -
//               new Date(a.occurredAt).getTime(),
//           ),
//         );
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Unable to load platform activity.",
//           );
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     loadActivity();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const filteredEvents = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return logs
//       .filter((log) => {
//         const actorName = actorNames[log.actorId] ?? "";

//         const matchesSearch =
//           (actorName ?? "").toLowerCase().includes(query) ||
//           (log.actorId ?? "").toLowerCase().includes(query) ||
//           (log.actorRole ?? "").toLowerCase().includes(query) ||
//           (log.action ?? "").toLowerCase().includes(query) ||
//           (log.entityType ?? "").toLowerCase().includes(query) ||
//           (log.entityId ?? "").toLowerCase().includes(query);
//         const matchesType =
//           eventType === "all" || getCategory(log.action) === eventType;

//         const ageInDays =
//           (now - new Date(log.occurredAt).getTime()) / (1000 * 60 * 60 * 24);

//         const matchesPeriod = period === "all" || ageInDays <= Number(period);

//         return matchesSearch && matchesType && matchesPeriod;
//       })
//       .map((log) => toActivityEvent(log, actorNames));
//   }, [logs, actorNames, search, eventType, period, now]);

//   return (
//     <div className="mx-auto w-full max-w-[1440px] space-y-6">
//       <header>
//         <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
//           Platform activity
//         </h1>
//         <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
//           See who changed access, updated settings or analyzed transaction data.
//         </p>
//       </header>

//       <ActivityFilters
//         search={search}
//         onSearchChange={setSearch}
//         eventType={eventType}
//         onEventTypeChange={setEventType}
//         period={period}
//         onPeriodChange={setPeriod}
//       />

//       <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
//         <h2 className="text-lg font-medium text-[#EDEFFF]">Recent events</h2>
//         <p className="mt-3 text-sm text-[#A8ADB8]">All times in UTC</p>

//         {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

//         {loading ? (
//           <p className="mt-4 text-sm text-[#A8ADB8]">Loading activity…</p>
//         ) : (
//           <div className="mt-4">
//             <ActivityTable events={filteredEvents} />
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "@/lib/api/auth";
import { getAllAuditLogs, type AuditLog } from "@/lib/api/audit-logs";
import { getAllWorkspaceMembers } from "@/lib/api/users";
import { ActivityFilters } from "./activity-filters";
import { ActivityTable, type ActivityEvent } from "./activity-table";

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

// function toActivityEvent(log: AuditLog, actorName: string): ActivityEvent {
//   return {
//     id: log.id,
//     date: formatDate(log.occurredAt),
//     // actor: log.actorRole ?? "You",
//     actor: actorName,
//     // actor: actorNames[log.actorId] ?? log.actorRole,
//     event: `${formatAction(log.action)} (${log.entityType ?? "event"})`,
//     result: "Recorded",
//   };
// }

// actorId is null for events with no signed-in user, e.g. a failed sign-in
function actorNameOf(log: AuditLog, names: Record<string, string>) {
  if (!log.actorId) return "System";
  return names[log.actorId] ?? (log.actorRole === "ADMIN" ? "Administrator" : "Analyst");
}

function toActivityEvent(log: AuditLog, actorName: string): ActivityEvent {
  return {
    id: log.id,
    date: formatDate(log.occurredAt),
    actor: actorName,
    event: `${formatAction(log.action)} (${log.entityType ?? "event"})`,
    result: "Recorded",
  };
}

export function PlatformActivity() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");
  const [period, setPeriod] = useState("7");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now] = useState(() => Date.now());
  // const { user } = useAuth();
  // Display names by account id: you, plus every analyst when you are an admin
  const [actorNames, setActorNames] = useState<Record<string, string>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let cancelled = false;

    async function loadActivity() {
      try {
        setLoading(true);
        setError("");

        const [auditLogs, currentUser] = await Promise.all([
          getAllAuditLogs(),
          getCurrentUser(),
        ]);
        const admin = currentUser.role.toUpperCase() === "ADMIN";
        // Admins see every analyst's activity; analysts only their own
        const members = admin ? await getAllWorkspaceMembers() : [];

        if (cancelled) return;

        setIsAdmin(admin);
        setActorNames({
          ...Object.fromEntries(members.map((m) => [m.id, m.fullName])),
          [currentUser.id]: `${currentUser.fullName || "You"} (you)`,
        });

        setLogs(
          [...auditLogs].sort(
            (a, b) =>
              new Date(b.occurredAt).getTime() -
              new Date(a.occurredAt).getTime(),
          ),
        );
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load platform activity.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    void loadActivity();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (
      logs
        .filter((log) => {
          const matchesSearch =
            actorNameOf(log, actorNames).toLowerCase().includes(query) ||
            (log.actorRole ?? "").toLowerCase().includes(query) ||
            (log.action ?? "").toLowerCase().includes(query) ||
            (log.entityType ?? "").toLowerCase().includes(query) ||
            (log.entityId ?? "").toLowerCase().includes(query);

          const matchesType =
            eventType === "all" || getCategory(log.action) === eventType;

          const ageInDays =
            (now - new Date(log.occurredAt).getTime()) / (1000 * 60 * 60 * 24);

          const matchesPeriod =
            period === "all" || (ageInDays >= 0 && ageInDays <= Number(period));

          return matchesSearch && matchesType && matchesPeriod;
        })
        // .map(toActivityEvent);
        .map((log) => toActivityEvent(log, actorNameOf(log, actorNames)))
    );
  }, [logs, search, eventType, period, now, actorNames]);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Platform activity
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          {isAdmin
            ? "Activity across the platform: every analyst's sign-ins, uploads, reviews and exports, and admin changes to access and rules."
            : "Your activity, including sign-ins, uploads, reviews and exports."}
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
