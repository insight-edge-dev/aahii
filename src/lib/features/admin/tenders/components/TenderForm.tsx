"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import { FileText, Plus, Trash2, X } from "lucide-react";
import { createTender, updateTender } from "../api/tenders.api";
import { AdminTender } from "../hooks/useTenders";

type TenderStatus = "ACTIVE" | "CLOSED" | "CANCELLED";
type TenderDocumentKind = "TENDER_DOCUMENT" | "CORRIGENDUM";

type UploadRow = {
  title: string;
  kind: TenderDocumentKind;
  file: File | null;
};

type TenderFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
  editData?: AdminTender | null;
};

const statusOptions: TenderStatus[] = ["ACTIVE", "CLOSED", "CANCELLED"];

const emptyForm = {
  ref: "",
  title: "",
  description: "",
  itemType: "",
  publicationDate: "",
  preBidMeeting: "",
  bidEndDateTime: "",
  bidOpeningDateTime: "",
  status: "ACTIVE" as TenderStatus,
  archived: false,
  isActive: true,
};

function emptyUploadRow(kind: TenderDocumentKind): UploadRow {
  return {
    title: "",
    kind,
    file: null,
  };
}

export function TenderForm({
  onClose,
  onSuccess,
  editData,
}: TenderFormProps) {
  const isEdit = !!editData;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploads, setUploads] = useState<UploadRow[]>([
    emptyUploadRow("TENDER_DOCUMENT"),
  ]);

  useEffect(() => {
    if (!editData) return;

    setForm({
      ref: editData.ref,
      title: editData.title,
      description: editData.description,
      itemType: editData.itemType ?? "",
      publicationDate: editData.publicationDate ?? "",
      preBidMeeting: editData.preBidMeeting ?? "",
      bidEndDateTime: editData.bidEndDateTime ?? "",
      bidOpeningDateTime: editData.bidOpeningDateTime ?? "",
      status: editData.status,
      archived: editData.archived,
      isActive: editData.isActive,
    });

    setUploads([]);
  }, [editData]);

  const updateUpload = (
    index: number,
    patch: Partial<UploadRow>,
  ) => {
    setUploads((current) =>
      current.map((upload, uploadIndex) =>
        uploadIndex === index ? { ...upload, ...patch } : upload,
      ),
    );
  };

  const addUploadRow = (kind: TenderDocumentKind) => {
    setUploads((current) => [...current, emptyUploadRow(kind)]);
  };

  const removeUploadRow = (index: number) => {
    setUploads((current) =>
      current.filter((_, uploadIndex) => uploadIndex !== index),
    );
  };

  const validate = () => {
    if (form.ref.trim().length < 3) {
      toast.error("Tender reference is required");
      return false;
    }

    if (form.title.trim().length < 5) {
      toast.error("Tender title must be at least 5 characters");
      return false;
    }

    if (form.description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return false;
    }

    const incompleteUpload = uploads.some(
      (upload) => upload.title.trim() || upload.file,
    );

    if (incompleteUpload) {
      const invalid = uploads.some(
        (upload) => !upload.title.trim() || !upload.file,
      );

      if (invalid) {
        toast.error("Each uploaded document needs a title and PDF file");
        return false;
      }
    }

    const invalidFile = uploads.some(
      (upload) => upload.file && upload.file.type !== "application/pdf",
    );

    if (invalidFile) {
      toast.error("Only PDF files are allowed");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const toastId = toast.loading(
      isEdit ? "Updating tender..." : "Creating tender...",
    );

    try {
      setLoading(true);

      const completedUploads = uploads.filter(
        (upload) => upload.title.trim() && upload.file,
      );

      const fd = new FormData();

      fd.append(
        "tenderData",
        JSON.stringify({
          ...form,
          ref: form.ref.trim(),
          title: form.title.trim(),
          description: form.description.trim(),
          itemType: form.itemType.trim(),
          publicationDate: form.publicationDate.trim(),
          preBidMeeting: form.preBidMeeting.trim(),
          bidEndDateTime: form.bidEndDateTime.trim(),
          bidOpeningDateTime: form.bidOpeningDateTime.trim(),
        }),
      );

      fd.append(
        "documents",
        JSON.stringify(
          completedUploads.map((upload, index) => ({
            title: upload.title.trim(),
            kind: upload.kind,
            sortOrder: index,
          })),
        ),
      );

      completedUploads.forEach((upload, index) => {
        if (upload.file) {
          fd.append(`documentFile_${index}`, upload.file);
        }
      });

      if (isEdit && editData) {
        await updateTender(editData.id, fd);
      } else {
        await createTender(fd);
      }

      toast.success(isEdit ? "Tender updated" : "Tender created", {
        id: toastId,
      });

      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data &&
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : "Something went wrong";

      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[85vh] overflow-y-auto pr-1">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? "Edit Tender" : "Create Tender"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload PDF tender documents for public display.
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Tender No / Reference">
            <input
              className="admin-input"
              value={form.ref}
              onChange={(event) =>
                setForm({ ...form, ref: event.target.value })
              }
              placeholder="AGIHF/RFB/SUPPLY/2025-26/003"
            />
          </Field>

          <Field label="Status">
            <select
              className="admin-input"
              value={form.status}
              onChange={(event) =>
                setForm({
                  ...form,
                  status: event.target.value as TenderStatus,
                })
              }
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Title">
          <input
            className="admin-input"
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            placeholder="Supply of Components for Single Low-Field MRI Unit"
          />
        </Field>

        <Field label="Description">
          <textarea
            className="admin-input min-h-28"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            placeholder="Brief tender description"
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Type of Items">
            <input
              className="admin-input"
              value={form.itemType}
              onChange={(event) =>
                setForm({ ...form, itemType: event.target.value })
              }
              placeholder="Supply / Works / Services"
            />
          </Field>

          <Field label="Bid Publication">
            <input
              className="admin-input"
              value={form.publicationDate}
              onChange={(event) =>
                setForm({ ...form, publicationDate: event.target.value })
              }
              placeholder="17-06-2026 11:00:00"
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Pre-Bid Meeting">
            <input
              className="admin-input"
              value={form.preBidMeeting}
              onChange={(event) =>
                setForm({ ...form, preBidMeeting: event.target.value })
              }
              placeholder="17-06-2026 11:00:00"
            />
          </Field>

          <Field label="Bid End Date/Time">
            <input
              className="admin-input"
              value={form.bidEndDateTime}
              onChange={(event) =>
                setForm({ ...form, bidEndDateTime: event.target.value })
              }
              placeholder="30-06-2026 13:00:00"
            />
          </Field>

          <Field label="Bid Opening Date/Time">
            <input
              className="admin-input"
              value={form.bidOpeningDateTime}
              onChange={(event) =>
                setForm({ ...form, bidOpeningDateTime: event.target.value })
              }
              placeholder="30-06-2026 13:30:00"
            />
          </Field>
        </div>

        <div className="flex flex-wrap gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              checked={form.archived}
              onChange={(event) =>
                setForm({ ...form, archived: event.target.checked })
              }
              type="checkbox"
            />
            Archived
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              checked={form.isActive}
              onChange={(event) =>
                setForm({ ...form, isActive: event.target.checked })
              }
              type="checkbox"
            />
            Visible on public page
          </label>
        </div>

        {isEdit && editData?.documents?.length ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              Current documents
            </p>
            <div className="mt-3 grid gap-2">
              {editData.documents.map((document) => (
                <a
                  key={document.id}
                  className="flex items-center gap-2 text-sm text-blue-700 underline"
                  href={`/api/tenders/documents/${document.id}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FileText size={15} />
                  {document.title}
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-blue-700">
              Uploading new PDFs will replace all current documents.
            </p>
          </div>
        ) : null}

        <DocumentUploadSection
          kind="TENDER_DOCUMENT"
          onAdd={() => addUploadRow("TENDER_DOCUMENT")}
          onRemove={removeUploadRow}
          onUpdate={updateUpload}
          rows={uploads}
          title="Tender Documents"
        />

        <DocumentUploadSection
          kind="CORRIGENDUM"
          onAdd={() => addUploadRow("CORRIGENDUM")}
          onRemove={removeUploadRow}
          onUpdate={updateUpload}
          rows={uploads}
          title="Corrigendum and Related Notices"
        />

        <div className="sticky bottom-0 flex gap-3 border-t border-gray-100 bg-white py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-2 text-gray-700 transition hover:bg-gray-50"
            type="button"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 rounded-xl bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
            type="button"
          >
            {loading ? "Saving..." : isEdit ? "Update Tender" : "Create Tender"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(229 231 235);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: box-shadow 150ms ease, border-color 150ms ease;
        }

        .admin-input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 3px rgb(219 234 254);
        }
      `}</style>
    </div>
  );
}

function Field({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      {children}
    </label>
  );
}

function DocumentUploadSection({
  kind,
  onAdd,
  onRemove,
  onUpdate,
  rows,
  title,
}: {
  kind: TenderDocumentKind;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, patch: Partial<UploadRow>) => void;
  rows: UploadRow[];
  title: string;
}) {
  const matchingRows = rows
    .map((row, index) => ({ ...row, index }))
    .filter((row) => row.kind === kind);

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          type="button"
        >
          <Plus size={14} />
          Add PDF
        </button>
      </div>

      <div className="mt-3 grid gap-3">
        {matchingRows.length ? (
          matchingRows.map((row) => (
            <div
              className="grid gap-3 rounded-xl bg-gray-50 p-3 md:grid-cols-[1fr_1fr_auto]"
              key={row.index}
            >
              <input
                className="admin-input"
                onChange={(event) =>
                  onUpdate(row.index, { title: event.target.value })
                }
                placeholder="Document title"
                value={row.title}
              />
              <input
                accept="application/pdf"
                className="admin-input"
                onChange={(event) =>
                  onUpdate(row.index, {
                    file: event.target.files?.[0] ?? null,
                  })
                }
                type="file"
              />
              <button
                onClick={() => onRemove(row.index)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="rounded-xl bg-gray-50 p-3 text-sm text-gray-500">
            No PDFs added.
          </p>
        )}
      </div>
    </div>
  );
}
