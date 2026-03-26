import VendorRow from "./VendorRow";

export default function VendorTable({ vendors, loading, refresh }: any) {
  // 🔄 Loading State (Card Skeleton)
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-4">
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  // ❌ Empty State
  if (!vendors.length) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
        <p className="text-gray-500 text-lg font-medium">
          No vendors found
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Try changing filters or adding new vendors
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {/* 🔝 Table */}
      <table className="w-full">
        
        {/* Header */}
        <thead className="bg-gray-50 text-gray-600 text-sm sticky top-0 z-10">
          <tr>
             <th className="p-4 font-medium text-left">ID</th>
            <th className="p-4 font-medium text-left">Vendor</th>
            <th className="p-4 font-medium text-left">Email</th>
            <th className="p-4 font-medium text-left">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y">
          {vendors.map((vendor: any) => (
            <VendorRow
              key={vendor.id}
              vendor={vendor}
              refresh={refresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}