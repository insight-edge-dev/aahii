import VendorRow from "./VendorRow";

type VendorListItem = {
  id: string;
  entityName?: string | null;
  email?: string | null;
  website?: string | null;
  status: string;
  createdAt?: string | Date;
};

type VendorTableProps = {
  vendors: VendorListItem[];
  loading: boolean;
  refresh: () => void;
};

export default function VendorTable({ vendors, loading, refresh }: VendorTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          />
        ))}
      </div>
    );
  }

  if (!vendors.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <p className="text-lg font-medium text-slate-900">
          No vendors found
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Try changing filters or adding new vendors
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {vendors.map((vendor) => (
        <VendorRow
          key={vendor.id}
          vendor={vendor}
          refresh={refresh}
        />
      ))}
    </div>
  );
}
