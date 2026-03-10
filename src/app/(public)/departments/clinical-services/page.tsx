export default function UpcomingDepartmentsPage() {
  const departments = [
    { name: "Advanced Laparoscopic Surgery", bg: "bg-indigo-50", dot: "bg-indigo-500" },
    { name: "Endo-Urology", bg: "bg-yellow-50", dot: "bg-yellow-500" },
    { name: "Stem Cell Therapy", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    { name: "Precision Medicine", bg: "bg-pink-50", dot: "bg-pink-500" },

    { name: "Neonatology", bg: "bg-sky-50", dot: "bg-sky-500" },
    { name: "Robotic Surgery", bg: "bg-green-50", dot: "bg-green-500" },
    { name: "Advanced Neurosurgery", bg: "bg-blue-50", dot: "bg-blue-500" },
    { name: "Adult & Paediatric Cardiac Surgery", bg: "bg-violet-50", dot: "bg-violet-500" },

    { name: "Gastroenterology", bg: "bg-amber-50", dot: "bg-amber-500" },
    { name: "Hepatology", bg: "bg-cyan-50", dot: "bg-cyan-500" },
    { name: "Microbiology", bg: "bg-rose-50", dot: "bg-rose-500" },
    { name: "Critical Care", bg: "bg-purple-50", dot: "bg-purple-500" },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
            Upcoming Clinical Departments
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            These departments are currently under planning and development and
            will be operational in a phased manner.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {departments.map((dept, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 ${dept.bg}
                border border-black/5`}
            >
              {/* Upcoming badge */}
              <span className="inline-block mb-4 text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Upcoming
              </span>

              {/* Department name */}
              <h3 className="text-base font-semibold text-[#0b1b3a] leading-snug">
                {dept.name}
              </h3>

              {/* Right connector dot (LEGACY DETAIL) */}
              <span
                className={`hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${dept.dot}`}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}