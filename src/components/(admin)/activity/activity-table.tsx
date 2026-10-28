export type ActivityEvent = {
  id: number;
  date: string;
  actor: string;
  event: string;
  result: "Success" | "Failed";
  category: "configuration" | "analysis" | "access" | "import";
  daysAgo: number;
};

type ActivityTableProps = {
  events: ActivityEvent[];
};

export function ActivityTable({ events }: ActivityTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-separate border-spacing-0 text-left">
        <thead>
          <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
            {["Date & time", "Actor", "Event", "Result"].map((heading) => (
              <th
                key={heading}
                className="border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {events.map((item) => (
            <tr key={item.id} className="text-sm text-[#EDEFFF]">
              <td className="whitespace-nowrap px-3 py-4">{item.date}</td>
              <td className="px-3 py-4">{item.actor}</td>
              <td className="px-3 py-4">{item.event}</td>
              <td
                className={`px-3 py-4 ${
                  item.result === "Success"
                    ? "text-[#34E89A]"
                    : "text-[#34E89A]"
                }`}
              >
                {item.result}
              </td>
            </tr>
          ))}

          {events.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-3 py-10 text-center text-sm text-[#A8ADB8]"
              >
                No activity matches your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
