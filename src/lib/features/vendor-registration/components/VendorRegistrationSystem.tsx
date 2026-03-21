"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Building2,
  CheckCircle2,
  Loader2,
  Briefcase,
  Mail,
  Globe,
  MapPin,
  Map,
  Phone,
  CreditCard,
  FileText,
  Factory,
  Package,
  UploadCloud,
  Trash2,
  User,
  ShieldCheck
} from "lucide-react";

// ==========================================
// 1. TYPES & INTERFACES (The Strict Schema)
// ==========================================
interface Address {
  address: string;
  pin: string;
  contactNumber: string;
}

interface DocumentFlags {
  hasAuthorizationCertificate: boolean;
  hasTradeLicense: boolean;
  hasItrYear1: boolean;
  hasItrYear2: boolean;
  hasPfRegistration: boolean;
  hasEsicRegistration: boolean;
  hasClraRegistration: boolean;
}

interface VendorFullState {
  // Section 1: Details
  category: string[];
  entityName: string;
  email: string;
  website: string;
  registeredAddress: Address;
  communicationAddress: Address & { sameAsRegistered: boolean };
  taxDetails: {
    panNumber: string;
    cinNumber: string;
    gstApplicable: boolean;
    gstRegistrationType: string;
    gstNumber: string;
    msmeApplicable: boolean;
    msmeNumber: string;
    msmeType: string;
    msmeClass: string;
  };
  // NEW: Added Business Details to match Backend
  businessDetails: {
    establishmentType: string;
    keyProductsStr: string; // Stored as string for UI, converted to array on submit
    specificProductsStr: string; // Stored as string for UI, converted to array on submit
    hasRelationWithAGIHF: boolean;
  };
  // Section 2: Documents & Applicant
  documentFlags: DocumentFlags;
  applicant: {
    applicantName: string;
    authorisedPerson: string;
  };
}

const MAX_FILE_SIZE_BYTES = 300 * 1024; // 300KB

// ==========================================
// 2. MASTER CONTROLLER (Holds State & Submit)
// ==========================================
export default function VendorRegistrationSystem() {
  const [form, setForm] = useState<VendorFullState>({
    category: [],
    entityName: "",
    email: "",
    website: "",
    registeredAddress: { address: "", pin: "", contactNumber: "" },
    communicationAddress: { sameAsRegistered: true, address: "", pin: "", contactNumber: "" },
    taxDetails: {
      panNumber: "",
      cinNumber: "",
      gstApplicable: false,
      gstRegistrationType: "",
      gstNumber: "",
      msmeApplicable: false,
      msmeNumber: "",
      msmeType: "",
      msmeClass: "",
    },
    businessDetails: {
      establishmentType: "",
      keyProductsStr: "",
      specificProductsStr: "",
      hasRelationWithAGIHF: false,
    },
    documentFlags: {
      hasAuthorizationCertificate: false,
      hasTradeLicense: false,
      hasItrYear1: false,
      hasItrYear2: false,
      hasPfRegistration: false,
      hasEsicRegistration: false,
      hasClraRegistration: false,
    },
    applicant: { applicantName: "", authorisedPerson: "" },
  });

  const [files, setFiles] = useState<Record<string, File>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(fileErrors).length > 0) {
      alert("Please resolve file upload errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // --- PAYLOAD SANITIZER (Fixes 400 Bad Request) ---
      // We deep clone the state to mold it exactly into what the backend expects
      const payload: any = JSON.parse(JSON.stringify(form));

      // 1. Format Business Arrays
      payload.businessDetails.keyProducts = form.businessDetails.keyProductsStr
        .split(',').map((s) => s.trim()).filter(Boolean);
      payload.businessDetails.specificProducts = form.businessDetails.specificProductsStr
        .split(',').map((s) => s.trim()).filter(Boolean);

      delete payload.businessDetails.keyProductsStr;
      delete payload.businessDetails.specificProductsStr;

      // 2. Omit Tax Details if Toggles are False (Strict Schema fix)
      if (!payload.taxDetails.gstApplicable) {
        delete payload.taxDetails.gstRegistrationType;
        delete payload.taxDetails.gstNumber;
      }
      if (!payload.taxDetails.msmeApplicable) {
        delete payload.taxDetails.msmeNumber;
        delete payload.taxDetails.msmeType;
        delete payload.taxDetails.msmeClass;
      }

      // 3. Remove Empty Optionals
      if (!payload.website) delete payload.website;
      if (!payload.taxDetails.cinNumber) delete payload.taxDetails.cinNumber;

      // --- CREATE FORMDATA ---
      const formData = new FormData();
      formData.append("vendorData", JSON.stringify(payload));

      Object.keys(files).forEach((key) => {
        formData.append(key, files[key]);
      });

      // --- API CALL ---
      const response = await fetch("/api/vendors/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("🚨 BACKEND REJECTED THE REQUEST:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData?.message || `Server Error: ${response.status}`);
      }

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll user to top to see message
      // window.location.href = "/success";
    } catch (error: any) {
      console.error("Submission error details:", error);
      alert(error.message || "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 👇 ADD THIS ENTIRE BLOCK right above your main return statement
  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 mt-12 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-10 sm:p-14 rounded-3xl shadow-xl border border-gray-100 text-center animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
          <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Registration Successful
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Thank you for registering. Your vendor details and documents have been submitted securely and are now pending for review.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.reload()} // Quick way to reset state
              className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
            >
              Submit Another Vendor
            </button>
            <button
              onClick={() => window.location.href = '/'} // Redirect to your home/dashboard
              className="px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-500/30 active:scale-[0.98]"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50/50 min-h-screen">

      {/* Enhanced Header */}
      <div className="text-center mb-10 pb-6 border-b border-gray-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 shadow-sm">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Vendor Registration
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Join our network. Please provide your business details and upload the required compliance documents to complete your onboarding profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative">
        <VendorDetailsSection
          form={form}
          setForm={setForm}
          setFiles={setFiles}
          setFileErrors={setFileErrors}
        />

        <DocumentsSection
          form={form}
          setForm={setForm}
          files={files}
          setFiles={setFiles}
          fileErrors={fileErrors}
          setFileErrors={setFileErrors}
        />

        {/* Standard Inline Submit Button */}
        <div className="pt-4 flex justify-end items-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Submit Registration</span>
                <CheckCircle2 className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// 3. SUB-COMPONENT: Vendor Details (Section 1)
// ==========================================
function VendorDetailsSection({ form, setForm, setFiles, setFileErrors }: any) {
  const CATEGORIES = [
    { value: "trader", label: "Trader" },
    { value: "manufacturer", label: "Manufacturer" },
    { value: "authorised_dealer", label: "Authorised Dealer" },
    { value: "service_provider", label: "Service Provider" },
  ];

  const handleTopLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileKey: string) => {
    const file = e.target.files?.[0];
    setFileErrors((prev: any) => { const err = { ...prev }; delete err[fileKey]; return err; });

    if (!file) {
      setFiles((prev: any) => { const f = { ...prev }; delete f[fileKey]; return f; });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileErrors((prev: any) => ({ ...prev, [fileKey]: "Exceeds 300KB limit." }));
      e.target.value = "";
      return;
    }
    setFiles((prev: any) => ({ ...prev, [fileKey]: file }));
  };

  // Upgraded input styles for better focus rings and padding
  const inputStyles = "w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-gray-50/50 focus:bg-white";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionStyles = "mb-10 pb-8 border-b border-gray-100 last:border-0";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">

      {/* 1. Category (Upgraded to Pill Toggles) */}
      <div className={sectionStyles}>
        <div className="flex items-center space-x-2 mb-4">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">1. Business Category <span className="text-red-500">*</span></h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = form.category.includes(cat.value);
            return (
              <label
                key={cat.value}
                className={`flex items-center justify-center px-5 py-2.5 rounded-xl border cursor-pointer transition-all select-none
                  ${isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <input
                  type="checkbox"
                  className="hidden" // Hide the ugly default checkbox
                  checked={isSelected}
                  onChange={() => {
                    setForm((prev: any) => ({
                      ...prev,
                      category: isSelected
                        ? prev.category.filter((c: string) => c !== cat.value)
                        : [...prev.category, cat.value],
                    }));
                  }}
                />
                <span className="text-sm font-semibold">{cat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Basic Info (Upgraded with icons) */}
      <div className={sectionStyles}>
        <div className="flex items-center space-x-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">2. Basic Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelStyles}>Entity Name <span className="text-red-500">*</span></label>
            <input required name="entityName" value={form.entityName} onChange={handleTopLevelChange} className={inputStyles} placeholder="Registered company name" />
          </div>
          <div>
            <label className={labelStyles}>Email Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input required type="email" name="email" value={form.email} onChange={handleTopLevelChange} className={`${inputStyles} pl-10`} placeholder="company@example.com" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelStyles}>Website (Optional)</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input type="url" name="website" value={form.website} onChange={handleTopLevelChange} className={`${inputStyles} pl-10`} placeholder="https://www.example.com" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 & 4. Address Section */}
      <div className={sectionStyles}>
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">3. Registered Address</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="md:col-span-3">
            <label className={labelStyles}>Full Address <span className="text-red-500">*</span></label>
            <textarea required rows={2} value={form.registeredAddress.address} onChange={(e) => handleNestedChange("registeredAddress", "address", e.target.value)} className={`${inputStyles} resize-none`} placeholder="Building, Street, Area..." />
          </div>
          <div>
            <label className={labelStyles}>PIN Code <span className="text-red-500">*</span></label>
            <div className="relative">
              <Map className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input required value={form.registeredAddress.pin} onChange={(e) => handleNestedChange("registeredAddress", "pin", e.target.value)} className={`${inputStyles} pl-10`} placeholder="e.g. 110001" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelStyles}>Contact Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input required type="tel" value={form.registeredAddress.contactNumber} onChange={(e) => handleNestedChange("registeredAddress", "contactNumber", e.target.value)} className={`${inputStyles} pl-10`} placeholder="+91" />
            </div>
          </div>
        </div>

        {/* 4. Communication Address */}
        <div className="flex items-center justify-between mb-5 mt-8 border-t border-gray-100 pt-8">
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">4. Communication Address</h2>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <input type="checkbox" checked={form.communicationAddress.sameAsRegistered} onChange={(e) => handleNestedChange("communicationAddress", "sameAsRegistered", e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm font-medium text-gray-700">Same as Registered</span>
          </label>
        </div>

        {!form.communicationAddress.sameAsRegistered && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="md:col-span-3">
              <label className={labelStyles}>Full Address <span className="text-red-500">*</span></label>
              <textarea required rows={2} value={form.communicationAddress.address} onChange={(e) => handleNestedChange("communicationAddress", "address", e.target.value)} className={`${inputStyles} resize-none`} />
            </div>
            <div>
              <label className={labelStyles}>PIN Code <span className="text-red-500">*</span></label>
              <input required value={form.communicationAddress.pin} onChange={(e) => handleNestedChange("communicationAddress", "pin", e.target.value)} className={inputStyles} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Contact Number <span className="text-red-500">*</span></label>
              <input required type="tel" value={form.communicationAddress.contactNumber} onChange={(e) => handleNestedChange("communicationAddress", "contactNumber", e.target.value)} className={inputStyles} />
            </div>
          </div>
        )}
      </div>

      {/* 5. Tax Details */}
      <div className={sectionStyles}>
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">5. Tax & Registration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <label className={labelStyles}>PAN Number <span className="text-red-500">*</span></label>
            <input required pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" maxLength={10} title="Valid 10-character PAN (e.g., ABCDE1234F)" value={form.taxDetails.panNumber} onChange={(e) => handleNestedChange("taxDetails", "panNumber", e.target.value.toUpperCase())} className={`${inputStyles} uppercase font-medium`} placeholder="ABCDE1234F" />
          </div>
          <div>
            <label className={labelStyles}>CIN Number (Optional)</label>
            <input value={form.taxDetails.cinNumber} onChange={(e) => handleNestedChange("taxDetails", "cinNumber", e.target.value.toUpperCase())} className={`${inputStyles} uppercase font-medium`} placeholder="L12345AA1234PLC123456" />
          </div>
        </div>

        {/* GST Toggle (Premium Segmented UI) */}
        <div className="flex items-center justify-between mb-5 mt-6 border-t border-gray-100 pt-6">
          <label className="text-sm font-semibold text-gray-900">GST Applicable?</label>
          <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
            <label className={`cursor-pointer px-5 py-1.5 text-sm font-medium rounded-md transition-all ${form.taxDetails.gstApplicable === true ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={form.taxDetails.gstApplicable === true} onChange={() => handleNestedChange("taxDetails", "gstApplicable", true)} />
              Yes
            </label>
            <label className={`cursor-pointer px-5 py-1.5 text-sm font-medium rounded-md transition-all ${form.taxDetails.gstApplicable === false ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={form.taxDetails.gstApplicable === false} onChange={() => handleNestedChange("taxDetails", "gstApplicable", false)} />
              No
            </label>
          </div>
        </div>

        {form.taxDetails.gstApplicable && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-blue-50/50 p-5 rounded-xl border border-blue-100 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className={labelStyles}>Registration Type <span className="text-red-500">*</span></label>
              <select required value={form.taxDetails.gstRegistrationType} onChange={(e) => handleNestedChange("taxDetails", "gstRegistrationType", e.target.value)} className={inputStyles}>
                <option value="">Select Type</option><option value="regular">Regular</option><option value="composition">Composition</option>
              </select>
            </div>
            <div>
              <label className={labelStyles}>GST Number <span className="text-red-500">*</span></label>
              <input required value={form.taxDetails.gstNumber} onChange={(e) => handleNestedChange("taxDetails", "gstNumber", e.target.value.toUpperCase())} className={`${inputStyles} uppercase font-medium`} placeholder="22AAAAA0000A1Z5" />
            </div>
          </div>
        )}

        {/* MSME Toggle */}
        <div className="flex items-center justify-between mb-5 mt-4 border-t border-gray-100 pt-6">
          <label className="text-sm font-semibold text-gray-900">MSME Applicable?</label>
          <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
            <label className={`cursor-pointer px-5 py-1.5 text-sm font-medium rounded-md transition-all ${form.taxDetails.msmeApplicable === true ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={form.taxDetails.msmeApplicable === true} onChange={() => handleNestedChange("taxDetails", "msmeApplicable", true)} />
              Yes
            </label>
            <label className={`cursor-pointer px-5 py-1.5 text-sm font-medium rounded-md transition-all ${form.taxDetails.msmeApplicable === false ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={form.taxDetails.msmeApplicable === false} onChange={() => handleNestedChange("taxDetails", "msmeApplicable", false)} />
              No
            </label>
          </div>
        </div>

        {form.taxDetails.msmeApplicable && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-blue-50/50 p-5 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className={labelStyles}>MSME Number <span className="text-red-500">*</span></label>
              <input required value={form.taxDetails.msmeNumber} onChange={(e) => handleNestedChange("taxDetails", "msmeNumber", e.target.value.toUpperCase())} className={`${inputStyles} uppercase font-medium`} placeholder="UDYAM-XX-00-0000000" />
            </div>
            <div>
              <label className={labelStyles}>MSME Type <span className="text-red-500">*</span></label>
              <select required value={form.taxDetails.msmeType} onChange={(e) => handleNestedChange("taxDetails", "msmeType", e.target.value)} className={inputStyles}>
                <option value="">Select Type</option><option value="micro">Micro</option><option value="small">Small</option><option value="medium">Medium</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 6. BUSINESS DETAILS */}
      <div className={sectionStyles}>
        <div className="flex items-center space-x-2 mb-4">
          <Factory className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">6. Business Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className={labelStyles}>Establishment Type <span className="text-red-500">*</span></label>
            <select required value={form.businessDetails.establishmentType} onChange={(e) => handleNestedChange("businessDetails", "establishmentType", e.target.value)} className={inputStyles}>
              <option value="">Select Type</option>
              <option value="proprietorship">Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="private_ltd">Private Limited</option>
              <option value="public_ltd">Public Limited</option>
              <option value="llp">LLP</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelStyles}>Key Products <span className="text-xs font-normal text-gray-500">(Comma separated)</span> <span className="text-red-500">*</span></label>
            <div className="relative">
              <Package className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input required placeholder="e.g. Pharmaceutical Supplies, Medical Equipment" value={form.businessDetails.keyProductsStr} onChange={(e) => handleNestedChange("businessDetails", "keyProductsStr", e.target.value)} className={`${inputStyles} pl-10`} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelStyles}>Specific Products <span className="text-xs font-normal text-gray-500">(Comma separated)</span> <span className="text-red-500">*</span></label>
            <input required placeholder="e.g. Surgical Gloves, Face Masks" value={form.businessDetails.specificProductsStr} onChange={(e) => handleNestedChange("businessDetails", "specificProductsStr", e.target.value)} className={inputStyles} />
          </div>
        </div>

        {/* AGIHF Toggle */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <label className="text-sm font-semibold text-gray-900">Has Relation with AGIHF?</label>
          <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
            <label className={`cursor-pointer px-5 py-1.5 text-sm font-medium rounded-md transition-all ${form.businessDetails.hasRelationWithAGIHF === true ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={form.businessDetails.hasRelationWithAGIHF === true} onChange={() => handleNestedChange("businessDetails", "hasRelationWithAGIHF", true)} />
              Yes
            </label>
            <label className={`cursor-pointer px-5 py-1.5 text-sm font-medium rounded-md transition-all ${form.businessDetails.hasRelationWithAGIHF === false ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <input type="radio" className="hidden" checked={form.businessDetails.hasRelationWithAGIHF === false} onChange={() => handleNestedChange("businessDetails", "hasRelationWithAGIHF", false)} />
              No
            </label>
          </div>
        </div>
      </div>

    </div>
  );
}
// ==========================================
// 4. SUB-COMPONENT: Documents & Applicant
// ==========================================
const OPTIONAL_DOCUMENTS = [
  { flag: "hasAuthorizationCertificate", key: "AUTHORIZATION_CERTIFICATE", label: "Authorization Certificate" },
  { flag: "hasTradeLicense", key: "TRADE_LICENSE", label: "Trade License" },
  { flag: "hasItrYear1", key: "ITR_YEAR_1", label: "ITR Year 1" },
  { flag: "hasItrYear2", key: "ITR_YEAR_2", label: "ITR Year 2" },
  { flag: "hasPfRegistration", key: "PF_REGISTRATION", label: "PF Registration" },
  { flag: "hasEsicRegistration", key: "ESIC_REGISTRATION", label: "ESIC Registration" },
  { flag: "hasClraRegistration", key: "CLRA_REGISTRATION", label: "CLRA Registration" },
] as const;

function DocumentsSection({ form, setForm, files, setFiles, fileErrors, setFileErrors }: any) {

  const handleFlagChange = (flagName: string, checked: boolean) => {
    setForm((prev: any) => ({
      ...prev,
      documentFlags: { ...prev.documentFlags, [flagName]: checked },
    }));

    if (!checked) {
      const docConfig = OPTIONAL_DOCUMENTS.find((d) => d.flag === flagName);
      if (docConfig && files[docConfig.key]) {
        setFiles((prev: any) => { const f = { ...prev }; delete f[docConfig.key]; return f; });
        setFileErrors((prev: any) => { const e = { ...prev }; delete e[docConfig.key]; return e; });
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileKey: string) => {
    const file = e.target.files?.[0];
    setFileErrors((prev: any) => { const err = { ...prev }; delete err[fileKey]; return err; });

    if (!file) {
      setFiles((prev: any) => { const f = { ...prev }; delete f[fileKey]; return f; });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileErrors((prev: any) => ({ ...prev, [fileKey]: "Exceeds 300KB limit." }));
      e.target.value = "";
      return;
    }
    setFiles((prev: any) => ({ ...prev, [fileKey]: file }));
  };

  // Inside DocumentsSection...

  const FileUploadBox = ({ fileKey, label, required = false }: { fileKey: string; label: string; required?: boolean }) => {
    const currentFile = files[fileKey];
    const error = fileErrors[fileKey];

    return (
      <div className={`relative flex flex-col p-5 border-2 border-dashed rounded-xl transition-all group
        ${currentFile ? 'border-green-400 bg-green-50/30' : error ? 'border-red-300 bg-red-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'}`}>

        <div className="flex justify-between items-start mb-3">
          <label className="text-sm font-semibold text-gray-900 flex items-center">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <span className="text-[10px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">Max 300KB</span>
        </div>

        {currentFile ? (
          <div className="flex items-center justify-between bg-white border border-green-200 p-3 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="bg-green-100 p-1.5 rounded-md">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">{currentFile.name}</span>
            </div>
            <button type="button" onClick={() => {
              setFiles((prev: any) => { const f = { ...prev }; delete f[fileKey]; return f; });
              setFileErrors((prev: any) => { const e = { ...prev }; delete e[fileKey]; return e; });
            }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors ml-2">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center py-4 bg-white border border-gray-200 rounded-lg shadow-sm group-hover:border-blue-300 transition-colors">
            <UploadCloud className="w-6 h-6 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" />
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">Click to browse</span>
            <input required={required} type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, fileKey)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        )}
        {error && <span className="text-xs text-red-600 font-medium mt-2 flex items-center"><ShieldCheck className="w-3 h-3 mr-1" />{error}</span>}
      </div>
    );
  };

  const inputStyles = "w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-gray-50/50 focus:bg-white";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-10">

      {/* SECTION 1: Checklist UI */}
      <section>
        <div className="flex items-center space-x-2 mb-5">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">7. Documents Checklist</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
          <label className="flex items-center space-x-3 text-sm p-2 rounded-lg bg-gray-100/50"><CheckCircle2 className="w-4 h-4 text-blue-600" /><span className="font-medium text-gray-700">PAN Card *</span></label>
          <label className="flex items-center space-x-3 text-sm p-2 rounded-lg bg-gray-100/50"><CheckCircle2 className="w-4 h-4 text-blue-600" /><span className="font-medium text-gray-700">Cancelled Cheque *</span></label>
          <label className="flex items-center space-x-3 text-sm p-2 rounded-lg bg-gray-100/50"><CheckCircle2 className="w-4 h-4 text-blue-600" /><span className="font-medium text-gray-700">Declaration Form *</span></label>

          {OPTIONAL_DOCUMENTS.map((doc) => (
            <label key={doc.key} className="flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
              <input type="checkbox" checked={form.documentFlags[doc.flag as keyof DocumentFlags]} onChange={(e) => handleFlagChange(doc.flag, e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">{doc.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* SECTION 2: File Uploads */}
      <section>
        <div className="flex items-center space-x-2 mb-5">
          <UploadCloud className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">8. Upload Files</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FileUploadBox fileKey="PAN_CARD" label="PAN Card" required />
          <FileUploadBox fileKey="CANCELLED_CHEQUE" label="Cancelled Cheque" required />
          <FileUploadBox fileKey="DECLARATION_FORM" label="Declaration Form" required />

          {/* Note: GST and MSME certs are uploaded in Section 5 via native inputs, 
              but the optional Checklist flags are uploaded here in the new UI */}
          {OPTIONAL_DOCUMENTS.map((doc) =>
            form.documentFlags[doc.flag as keyof DocumentFlags] && (
              <FileUploadBox key={doc.key} fileKey={doc.key} label={doc.label} required />
            )
          )}
        </div>
      </section>

      {/* SECTION 3: Applicant Details */}
      <section className="border-t border-gray-100 pt-8">
        <div className="flex items-center space-x-2 mb-5">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">9. Applicant Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/30 p-6 rounded-xl border border-blue-50">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Applicant Name <span className="text-red-500">*</span></label>
            <input required name="applicantName" value={form.applicant.applicantName} onChange={(e) => setForm((prev: any) => ({ ...prev, applicant: { ...prev.applicant, applicantName: e.target.value } }))} className={inputStyles} placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Authorised Person <span className="text-red-500">*</span></label>
            <input required name="authorisedPerson" value={form.applicant.authorisedPerson} onChange={(e) => setForm((prev: any) => ({ ...prev, applicant: { ...prev.applicant, authorisedPerson: e.target.value } }))} className={inputStyles} placeholder="Name of signatory" />
          </div>
        </div>
      </section>

    </div>
  );
}