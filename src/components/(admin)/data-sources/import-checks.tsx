export function ImportChecks() {
  return (
    <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
      <h2 className="text-lg font-medium text-[#EDEFFF]">Import checks</h2>

      <p className="mt-3 text-sm text-[#A8ADB8]">
        Each upload is checked before analysis.
      </p>

      <p className="mt-4 text-sm leading-6 text-[#EDEFFF]">
        Required fields, valid amounts, timestamps and supported currencies are
        validated. Errors must be corrected before processing.
      </p>
    </section>
  );
}
