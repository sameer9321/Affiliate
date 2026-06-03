"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "checkbox" | "select" | "file" | "richtext";
  options?: string[];
  optionsFrom?: string;
  optionLabelKey?: string;
  optionValueKey?: string;
  required?: boolean;
  hint?: string;
  fullWidth?: boolean;
};

export default function AdminEntityForm({
  title,
  api,
  backHref,
  fields,
}: {
  title: string;
  api: string;
  backHref: string;
  fields: Field[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});

  const optionSources = useMemo(() => fields.filter((field) => field.optionsFrom), [fields]);

  useEffect(() => {
    if (!id) return;
    fetch(`${api}/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setValues(d);
        setLoading(false);
      });
  }, [id, api]);

  useEffect(() => {
    optionSources.forEach((field) => {
      fetch(field.optionsFrom as string)
        .then((r) => r.json())
        .then((data) => {
          const labelKey = field.optionLabelKey || "name";
          const valueKey = field.optionValueKey || labelKey;
          const options = Array.isArray(data)
            ? data.map((item) => String(item?.[valueKey] || item?.[labelKey] || "")).filter(Boolean)
            : [];
          setDynamicOptions((old) => ({ ...old, [field.name]: options }));
        })
        .catch(() => setDynamicOptions((old) => ({ ...old, [field.name]: [] })));
    });
  }, [optionSources]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = new FormData(e.currentTarget);

    const res = await fetch(id ? `${api}/${id}` : api, {
      method: id ? "PUT" : "POST",
      body,
    });

    setSaving(false);

    if (res.ok) {
      router.push(backHref);
      return;
    }

    const data = await res.json().catch(() => ({}));
    setError(data?.error || "Unable to save. Please login again or check required fields.");
  }

  if (loading) return <p className="p-6 font-black">Loading...</p>;

  return (
    <div>
      <Link href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-orange-500">
        <ArrowLeft size={17} />
        Back to {title}s
      </Link>

      <form onSubmit={submit} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <div className="border-t-4 border-indigo-500 px-7 py-5">
          <h1 className="text-xl font-black text-slate-900">{id ? "Edit" : "Add New"} {title}</h1>
        </div>

        {error && (
          <div className="mx-7 mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-x-8 gap-y-6 border-t border-slate-100 px-7 py-7 md:grid-cols-2">
          {fields.map((field) => {
            const baseClass = "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10";
            const wrapperClass = field.fullWidth || field.type === "textarea" || field.type === "richtext" ? "md:col-span-2" : "";
            const options = field.options || dynamicOptions[field.name] || [];

            if (field.type === "textarea" || field.type === "richtext") {
              return (
                <label key={field.name} className={wrapperClass}>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{field.label}</span>
                  {field.type === "richtext" && (
                    <div className="flex gap-6 rounded-t-md border border-b-0 border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900">
                      <span>B</span><span className="italic">I</span><span className="underline">U</span><span>•</span><span>S</span><span>≡</span>
                    </div>
                  )}
                  <textarea
                    name={field.name}
                    defaultValue={values[field.name] ?? ""}
                    required={field.required}
                    placeholder={field.label}
                    className={`${baseClass} ${field.type === "richtext" ? "min-h-56 rounded-t-none" : "min-h-28"}`}
                  />
                </label>
              );
            }

            if (field.type === "checkbox") {
              return (
                <label key={field.name} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                  <input name={field.name} type="checkbox" defaultChecked={Boolean(values[field.name])} className="h-5 w-5 accent-indigo-600" />
                  {field.label}
                </label>
              );
            }

            if (field.type === "select") {
              return (
                <label key={field.name} className={wrapperClass}>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{field.label}</span>
                  <select name={field.name} defaultValue={values[field.name] ?? ""} className={baseClass} required={field.required}>
                    <option value="">Select {field.label}</option>
                    {options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              );
            }

            if (field.type === "file") {
              return (
                <label key={field.name} className={wrapperClass}>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{field.label} {field.hint && <span className="ml-3 text-xs text-slate-500">{field.hint}</span>}</span>
                  {values[field.name] && <img src={values[field.name]} alt="Current upload" className="mb-3 h-24 w-32 rounded-lg border object-cover" />}
                  <input name={field.name} type="file" accept="image/*" className={baseClass} />
                </label>
              );
            }

            return (
              <label key={field.name} className={wrapperClass}>
                <span className="mb-2 block text-sm font-semibold text-slate-700">{field.label}</span>
                <input
                  name={field.name}
                  type={field.type || "text"}
                  step={field.type === "number" ? "any" : undefined}
                  defaultValue={values[field.name] ?? ""}
                  required={field.required}
                  placeholder={field.label}
                  className={baseClass}
                />
              </label>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 px-7 pb-7">
          <Link href={backHref} className="rounded-md bg-slate-300 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-400">Cancel</Link>
          <button disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-600 disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
