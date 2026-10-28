export function SourceAvailability() {
  return (
    <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
      <h2 className="text-lg font-medium text-[#EDEFFF]">
        Source availability
      </h2>

      <p className="mt-3 text-sm text-[#A8ADB8]">
        Disabling a source prevents future imports.
      </p>

      <p className="mt-4 text-sm leading-6 text-[#EDEFFF]">
        Previously analyzed datasets and their results remain available for
        review.
      </p>
    </section>
  );
}
