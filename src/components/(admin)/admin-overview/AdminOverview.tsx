import { OverviewStats } from "./overview-stats";
import { ManagementSections } from "./management-sections";

export function AdminOverview() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Admin overview
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#A8ADB8]">
          Manage access, transaction inputs and the settings behind every
          analysis.
        </p>
      </header>

      <OverviewStats />

      <ManagementSections />

      <p className="text-xs leading-5 text-[#A8ADB8]">
        Example workspace data · A flag requires review; it does not confirm
        fraud.
      </p>
    </div>
  );
}
