import { getVendorById } from "@/lib/features/vendor-registration/services/vendor.service";
import VendorDetailsClient from "./VendorDetailsClient";

export default async function VendorDetailsPage({ params }: any) {
    try {
        const { id } = await params;

        if (!id) {
            return <div className="p-6">Invalid Vendor ID</div>;
        }

        const vendor= await getVendorById(id);

        if (!vendor) {
            return <div className="p-6">Vendor not found</div>;
        }

        return <VendorDetailsClient vendor={vendor} />;
    } catch (error) {
        console.error(error);
        return <div className="p-6">Something went wrong</div>;
    }
}