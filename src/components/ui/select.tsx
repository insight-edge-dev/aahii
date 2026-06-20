"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string, label: string) => void;
  label: string;
  name?: string;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used inside Select");
  }
  return context;
}

type SelectProps = {
  children: React.ReactNode;
  defaultLabel?: string;
  defaultValue?: string;
  name?: string;
};

export function Select({
  children,
  defaultLabel = "Select",
  defaultValue = "",
  name,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValueState] = React.useState(defaultValue);
  const [label, setLabel] = React.useState(defaultLabel);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function setValue(nextValue: string, nextLabel: string) {
    setValueState(nextValue);
    setLabel(nextLabel);
    setOpen(false);
  }

  return (
    <SelectContext.Provider value={{ open, setOpen, value, setValue, label, name }}>
      <div className="relative" ref={rootRef}>
        {name ? <input name={name} type="hidden" value={value} /> : null}
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = useSelect();

  return (
    <button
      aria-expanded={open}
      className={`flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 text-left text-sm font-medium text-slate-800 outline-none transition hover:bg-slate-50 focus:ring-2 focus:ring-blue-500/20 ${className}`}
      onClick={() => setOpen(!open)}
      type="button"
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        className={`size-4 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export function SelectValue() {
  const { label } = useSelect();
  return <span className="truncate">{label}</span>;
}

export function SelectContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div
      className={`absolute left-0 top-[calc(100%+8px)] z-50 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  const { setValue, value: selectedValue } = useSelect();
  const selected = value === selectedValue;
  const label = String(children);

  return (
    <button
      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
        selected
          ? "bg-blue-50 font-semibold text-blue-700"
          : "text-slate-700 hover:bg-slate-50"
      }`}
      onClick={() => setValue(value, label)}
      type="button"
    >
      <span className="truncate">{children}</span>
      {selected ? <Check aria-hidden="true" className="size-4" /> : null}
    </button>
  );
}

