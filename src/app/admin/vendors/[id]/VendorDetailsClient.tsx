"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Mail,
    Globe,
    FileText,
    MapPin,
    User,
    Building2,
    ArrowLeft,
    Download,
} from "lucide-react";

function formatDocumentType(type: string) {
  const map: Record<string, string> = {
    PAN_CARD: "Pan Card",
    CANCELLED_CHEQUE: "Cancelled Cheque",
    DECLARATION_FORM: "Declaration Form",
    GST_CERTIFICATE: "GST Certificate",
    MSME_CERTIFICATE: "MSME Certificate",
    AUTHORIZATION_CERTIFICATE: "Authorization Certificate",
    TRADE_LICENSE: "Trade License",
    ITR_YEAR_1: "ITR (Year 1)",
    ITR_YEAR_2: "ITR (Year 2)",
    PF_REGISTRATION: "PF Registration",
    ESIC_REGISTRATION: "ESIC Registration",
    CLRA_REGISTRATION: "CLRA Registration",
  };

  return map[type] || type.replace(/_/g, " ");
}

export default function VendorDetailsClient({ vendor }: any) {
    const [docUrl, setDocUrl] = useState<string | null>(null);
    const router = useRouter();

    return (
        <div className="flex gap-8 px-8 py-6 bg-[#f6f8fb] min-h-screen">

            {/* LEFT */}
            <div className="flex-1 space-y-8 max-w-5xl">

                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2.5 rounded-lg border bg-white hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} />
                    </button>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Building2 size={20} className="text-gray-600" />
                            {vendor.entityName}
                        </h1>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Mail size={14} />
                            {vendor.email}
                        </p>
                    </div>
                </div>

                {/* BASIC INFO */}
                <Section title="Basic Information" icon={<Globe size={16} />}>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <Input label="Entity Name" value={vendor.entityName} />
                        <Input label="Website" value={vendor.website} />
                        <Input label="Created Date" value={formatDate(vendor.createdAt)} />
                        <Input label="Status" value={vendor.status} />
                    </div>
                </Section>

                {/* ADDRESS */}
                <Section title="Address" icon={<MapPin size={16} />}>
                    <div className="space-y-4">
                        <Input label="Registered Address" value={vendor.address?.registeredAddress} />
                        <Input label="Communication Address" value={vendor.address?.communicationAddress} />
                    </div>
                </Section>

                {/* BUSINESS */}
                <Section title="Business Info" icon={<Building2 size={16} />}>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <Input label="Type" value={vendor.business?.establishmentType} />
                        <Input label="Products" value={vendor.business?.keyProducts?.join(", ")} />
                    </div>
                </Section>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-[450px] space-y-6">

                {/* STATUS */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white px-6 py-5 rounded-2xl shadow-md">
                    <p className="text-xs opacity-80">Current Status</p>
                    <p className="text-lg font-semibold mt-1">
                        {vendor.status}
                    </p>
                </div>

                {/* APPLICANT */}
                <div className="bg-white px-6 py-5 rounded-2xl border shadow-sm">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                        <User size={16} /> Applicant
                    </h3>

                    <p className="text-sm font-medium">
                        {vendor.applicant?.applicantName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {vendor.applicant?.authorisedPerson}
                    </p>
                </div>

                {/* DOCUMENTS */}
                <div className="bg-white px-6 py-5 rounded-2xl border shadow-sm">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                        <FileText size={16} /> Documents
                    </h3>

                    <div className="space-y-4">
                        {vendor.documents?.map((doc: any) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white transition"
                            >
                                {/* LEFT */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="p-2 bg-white rounded-lg border flex-shrink-0">
                                        <FileText size={14} className="text-gray-500" />
                                    </div>

                                    <span className="text-sm font-medium text-gray-800 truncate">
                                        {formatDocumentType(doc.documentType)}
                                    </span>
                                </div>

                                {/* RIGHT ACTIONS */}
                                <div className="flex items-center gap-3 flex-shrink-0 ml-4">

                                    {/* View */}
                                    <button
                                        onClick={() => setDocUrl(doc.fileUrl)}
                                        className="text-xs font-medium text-blue-600 hover:underline"
                                    >
                                        View
                                    </button>

                                    {/* Divider */}
                                    <div className="w-px h-4 bg-gray-300" />

                                    {/* Download */}
                                    <a
                                        href={doc.fileUrl.replace("/upload/", "/upload/fl_attachment/")}
                                        target="_blank"
                                        className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-blue-600 transition"
                                    >
                                        <Download size={13} />
                                        Download
                                    </a>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {docUrl && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white w-[85%] h-[85%] rounded-2xl p-4 relative shadow-lg">

                        <button
                            onClick={() => setDocUrl(null)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
                        >
                            ✕
                        </button>

                        {docUrl.includes(".pdf") ? (
                            <iframe src={docUrl} className="w-full h-full rounded-lg" />
                        ) : (
                            <img
                                src={docUrl}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function Section({ title, icon, children }: any) {
    return (
        <div className="bg-white px-6 py-5 rounded-2xl border shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
                {icon} {title}
            </h2>
            {children}
        </div>
    );
}

function Input({ label, value }: any) {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-800">
                {value || "—"}
            </div>
        </div>
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
}