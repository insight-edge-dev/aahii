import { Images } from "lucide-react";

import InfrastructureManager from "@/lib/features/admin/infrastructure/components/InfrastructureManager";

export default function AdminInfrastructurePage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-2 text-slate-500">
          <Images size={18} />
          <span className="text-sm font-medium">Institutional CMS</span>
        </div>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950">
          Infrastructure
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage Construction Progress images, ordering, and featured visuals.
        </p>
      </div>

      <InfrastructureManager />
    </div>
  );
}
