"use client";

type StatusFilterProps = {
    status: string;
    setStatus: (status: string) => void;
};

export default function StatusFilter({ status, setStatus }: StatusFilterProps) {
    const options = [
        { label: "ALL", value: "" },
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" },
    ];

    return (
        <div className="flex w-fit gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
            {options.map((opt) => {
                const isActive = status === opt.value;

                return (
            <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200 hover:bg-gray-50 ${isActive
                        ? opt.value === "APPROVED"
                            ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-600"
                            : opt.value === "REJECTED"
                                ? "bg-red-600 text-white shadow-sm hover:bg-red-600"
                                : opt.value === "PENDING"
                                    ? "bg-amber-500 text-white shadow-sm hover:bg-amber-500"
                                    : "bg-gray-950 text-white shadow-sm hover:bg-gray-950"
                        : "text-gray-700"
                }`}
            >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}
