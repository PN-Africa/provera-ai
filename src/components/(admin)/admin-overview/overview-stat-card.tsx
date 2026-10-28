type OverviewStatCardProps = {
  title: string;
  value: string | number;
  description: string;
};

export function OverviewStatCard({
  title,
  value,
  description,
}: OverviewStatCardProps) {
  return (
    <div className="min-w-0 rounded-md bg-[#202027] p-4 sm:p-5">
      <p className="text-sm text-[#A8ADB8]">{title}</p>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-[#EDEFFF]">
        {value}
      </p>

      <p className="mt-3 text-xs leading-5 text-[#A8ADB8]">{description}</p>
    </div>
  );
}
