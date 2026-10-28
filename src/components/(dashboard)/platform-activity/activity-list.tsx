const activities = [
  {
    date: "01 Oct, 15:04 UTC",
    actor: "Workspace owner",
    action: "Analyzed 69 transactions",
  },
  {
    date: "01 Oct, 14:55 UTC",
    actor: "Workspace owner",
    action: "Updated detection configuration",
  },
  {
    date: "01 Oct, 14:45 UTC",
    actor: "Workspace owner",
    action: "Updated member access",
  },
];

export function ActivityList() {
  return (
    <>
      <section className="mt-6 rounded-[10px] border border-[#343644] bg-[#202026] px-6 py-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={`${activity.date}-${activity.action}`}
              className="grid grid-cols-1 gap-1 md:grid-cols-[1fr_1fr_1.7fr] md:items-center"
            >
              <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
                {activity.date}
              </p>

              <p className="font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
                {activity.actor}
              </p>

              <p className="font-sans text-[14px] font-normal leading-[20px] text-[#EDEFFF]">
                {activity.action}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 rounded-[6px] border border-[#343644] bg-[#202026] px-4 py-4">
        <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
          Illustrative activity for the design prototype. The web app records
          actual analysis and administration events.
        </p>
      </div>
    </>
  );
}
