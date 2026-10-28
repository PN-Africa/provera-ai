import { SourcesTable } from "./sources-table";
import { ImportChecks } from "./import-checks";
import { SourceAvailability } from "./source-availability";

export function DataSources() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Data sources
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          Choose which transaction inputs are available to your team.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Available sources
        </h2>

        <p className="mt-3 text-sm text-[#A8ADB8]">
          MVP sources use CSV upload or a synthetic sample dataset.
        </p>

        <div className="mt-4">
          <SourcesTable />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ImportChecks />
        <SourceAvailability />
      </div>
    </div>
  );
}
