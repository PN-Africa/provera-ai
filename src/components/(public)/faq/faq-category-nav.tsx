import type { FAQCategory } from "./faq-data";

type FAQCategoryNavProps = {
  categories: FAQCategory[];
};

export function FAQCategoryNav({ categories }: FAQCategoryNavProps) {
  return (
    <nav
      aria-label="FAQ categories"
      className="grid grid-cols-2 gap-2 md:grid-cols-4"
    >
      {categories.map((category) => (
        <a
          key={category.id}
          href={`#${category.id}`}
          className="flex min-h-[33px] items-center justify-center rounded-[5px] border border-[#343644] bg-[#1C1D27] px-3 py-2 text-center text-[14px] sm:text-[11px] font-medium text-[#EDEFFF] transition-colors hover:border-[#5968FF] hover:bg-[#242635]  font-sans focus-visible:outline-none tracking-[0px] leading-[20px] focus-visible:ring-2 focus-visible:ring-[#5968FF]"
        >
          {category.title}
        </a>
      ))}
    </nav>
  );
}
