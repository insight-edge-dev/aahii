import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--nav-blue)">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Effective date: {effectiveDate}
          </p>

          {intro.map((paragraph, index) => (
            <p
              key={index}
              className="mt-4 text-sm sm:text-[15px] leading-relaxed text-gray-600 max-w-3xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* TABLE OF CONTENTS */}
          <nav
            aria-label="On this page"
            className="hidden lg:block sticky top-24 self-start bg-white rounded-2xl shadow-sm p-5 h-fit"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              On this page
            </p>
            <ol className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className="text-sm text-gray-600 hover:text-(--nav-blue) transition"
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {/* CONTENT */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm sm:text-[15px] leading-relaxed text-gray-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-3 space-y-2 list-disc pl-5">
                    {section.list.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm sm:text-[15px] leading-relaxed text-gray-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
