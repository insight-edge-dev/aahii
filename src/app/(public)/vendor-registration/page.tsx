// app/vendor/register/page.tsx


import VendorRegistrationSystem from "@/lib/features/vendor-registration/components/VendorRegistrationSystem";
export default function VendorRegistrationPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Page Header */}
        {
          /* Vendor Registration System Component (The third component we built) */
          <VendorRegistrationSystem />
        }
       
      </div>
    </main>
  );
}