function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-[#A8ADB8] sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}
