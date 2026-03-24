"use client";

export default function StatusFilter({ status, setStatus }: any) {
    const options = [
        { label: "ALL", value: "" },
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" },
    ];

    return (
        <div className="flex gap-2 bg-white p-1 rounded-xl border shadow-sm w-fit">
            {options.map((opt) => {
                const isActive = status === opt.value;

                return (
            <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${isActive
                        ? opt.value === "APPROVED"
                            ? "bg-green-500 text-white"
                            : opt.value === "REJECTED"
                                ? "bg-red-500 text-white"
                                : opt.value === "PENDING"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-black text-white"
                        : ""
                }`}
            >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}