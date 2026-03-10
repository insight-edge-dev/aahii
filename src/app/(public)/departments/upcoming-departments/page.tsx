export default function UpcomingDepartmentsPage() {
  const departments = [
    { name: "General Medicine", bg: "bg-indigo-50", dot: "bg-indigo-500" },
    { name: "Surgery", bg: "bg-yellow-50", dot: "bg-yellow-500" },
    { name: "Gastroenterology", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    { name: "Gynaecology & Obstetrics", bg: "bg-pink-50", dot: "bg-pink-500" },

    { name: "Neurology", bg: "bg-sky-50", dot: "bg-sky-500" },
    { name: "Endocrinology", bg: "bg-green-50", dot: "bg-green-500" },
    { name: "Pulmonary Medicine", bg: "bg-blue-50", dot: "bg-blue-500" },
    { name: "Haematology", bg: "bg-violet-50", dot: "bg-violet-500" },

    { name: "Rheumatology", bg: "bg-amber-50", dot: "bg-amber-500" },
    { name: "Nephrology", bg: "bg-cyan-50", dot: "bg-cyan-500" },
    { name: "Psychiatry", bg: "bg-rose-50", dot: "bg-rose-500" },
    { name: "Critical Care", bg: "bg-purple-50", dot: "bg-purple-500" },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
            Upcoming Clinical Departments
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            These departments are currently under planning and development and
            will be operational in a phased manner.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 ${dept.bg} border border-black/5`}
            >
              {/* Status badge */}
              <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full mb-4">
                Upcoming
              </span>

              {/* Department name */}
              <h3 className="text-base font-semibold text-gray-900 leading-snug">
                {dept.name}
              </h3>

              {/* Dot connector */}
              <span
                className={`absolute -right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${dept.dot}`}
              ></span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}