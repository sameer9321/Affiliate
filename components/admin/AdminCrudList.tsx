"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, Edit3, Plus, Search, SlidersHorizontal, Trash2, X } from "lucide-react";

type Item = {
  id: string;
  name?: string;
  title?: string;
  category?: string;
  slug?: string;
  code?: string;
  store?: string;
  website?: string;
  sortOrder?: number;
};

type ReorderStep = "select-store" | "reorder-list";

function entityFromApi(api: string) {
  return api.split("/").filter(Boolean).pop() || "";
}

function singularTitle(title: string) {
  if (title.toLowerCase() === "categories") return "Category";
  if (title.endsWith("s")) return title.slice(0, -1);
  return title;
}

export default function AdminCrudList({
  title,
  subtitle,
  api,
  addHref,
}: {
  title: string;
  subtitle: string;
  api: string;
  addHref: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [stores, setStores] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);
  const [query, setQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState("all");
  const [reorderOpen, setReorderOpen] = useState(false);
  const [reorderStep, setReorderStep] = useState<ReorderStep>("select-store");
  const [selectedStore, setSelectedStore] = useState("");
  const [draftCouponIds, setDraftCouponIds] = useState<string[]>([]);
  const entity = entityFromApi(api);
  const isCoupons = entity === "coupons";

  async function load() {
    setLoading(true);
    const r = await fetch(api);
    setItems(await r.json());
    setLoading(false);
  }

  async function loadStores() {
    if (!isCoupons) return;
    const r = await fetch("/api/admin/stores");
    const data = await r.json();
    setStores(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    load();
    loadStores();
  }, []);

  async function del(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`${api}/${id}`, { method: "DELETE" });
    load();
  }

  async function updateSorting(id: string, targetPosition: number) {
    setSavingId(id);
    const res = await fetch("/api/admin/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity, id, targetPosition }),
    });
    setSavingId("");

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Unable to update sorting.");
      return;
    }
    load();
  }

  function openReorderModal() {
    setSelectedStore("");
    setDraftCouponIds([]);
    setReorderStep("select-store");
    setReorderOpen(true);
  }

  function closeReorderModal() {
    if (savingOrder) return;
    setReorderOpen(false);
    setReorderStep("select-store");
    setSelectedStore("");
    setDraftCouponIds([]);
  }

  function proceedToCouponReorder() {
    if (!selectedStore) {
      alert("Please select a store first.");
      return;
    }

    const coupons = items.filter((item) => item.store === selectedStore);
    if (coupons.length === 0) {
      alert("No coupons found for this store.");
      return;
    }

    setDraftCouponIds(coupons.map((coupon) => coupon.id));
    setReorderStep("reorder-list");
  }

  function moveDraftCoupon(id: string, targetPosition: number) {
    setDraftCouponIds((oldIds) => {
      const currentIndex = oldIds.indexOf(id);
      const newIndex = Math.max(0, Math.min(oldIds.length - 1, targetPosition - 1));
      if (currentIndex === -1 || currentIndex === newIndex) return oldIds;
      const nextIds = [...oldIds];
      const [selected] = nextIds.splice(currentIndex, 1);
      nextIds.splice(newIndex, 0, selected);
      return nextIds;
    });
  }

  async function saveCouponReorder() {
    if (!selectedStore || draftCouponIds.length === 0) return;
    setSavingOrder(true);
    const res = await fetch("/api/admin/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entity: "coupons", store: selectedStore, orderedIds: draftCouponIds }),
    });
    setSavingOrder(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Unable to save coupon order.");
      return;
    }

    setReorderOpen(false);
    setReorderStep("select-store");
    setSelectedStore("");
    setDraftCouponIds([]);
    load();
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter((i) => {
      const matchesSearch = !q || [i.name, i.title, i.category, i.store, i.code, i.website, i.slug]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
      const matchesStore = !isCoupons || storeFilter === "all" || i.store === storeFilter;
      return matchesSearch && matchesStore;
    });
  }, [items, query, storeFilter, isCoupons]);

  const selectedStoreCoupons = useMemo(() => {
    return draftCouponIds
      .map((id) => items.find((item) => item.id === id))
      .filter(Boolean) as Item[];
  }, [draftCouponIds, items]);

  const itemLabel = singularTitle(title);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">Admin Management</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-slate-500">{subtitle}</p>
          {isCoupons ? (
            <p className="mt-2 text-sm font-bold text-slate-400">Use Reorder Coupons to set each store coupon display order.</p>
          ) : (
            <p className="mt-2 text-sm font-bold text-slate-400">Use the Sorting dropdown to set your own website display order.</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={addHref}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-teal-700"
          >
            <Plus size={18} />
            Add New {itemLabel}
          </Link>

          {isCoupons && (
            <button
              type="button"
              onClick={openReorderModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:bg-cyan-600"
            >
              <ArrowDownUp size={18} />
              Reorder Coupons
            </button>
          )}
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <Search size={19} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
          />
        </div>

        {isCoupons && (
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-slate-500 shadow-sm outline-none lg:w-72"
          >
            <option value="all">All Stores</option>
            {stores.map((store) => (
              <option key={store.id} value={store.name}>
                {store.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 font-black text-slate-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 font-black text-slate-500">No records found.</p>
        ) : (
          filtered.map((i, index) => (
            <div
              key={i.id}
              className="grid gap-4 border-b border-slate-100 p-5 last:border-b-0 md:grid-cols-[64px_1fr_auto] md:items-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-lg font-black text-orange-500">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-950">{i.name || i.title}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {[i.category, i.store, i.code, i.website, i.slug].filter(Boolean).join(" • ") || "No extra details"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {!isCoupons && (
                  <label className="relative inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100">
                    <SlidersHorizontal size={16} />
                    <span>Sorting</span>
                    <select
                      value={index + 1}
                      disabled={savingId === i.id}
                      onChange={(e) => updateSorting(i.id, Number(e.target.value))}
                      className="cursor-pointer bg-transparent pl-1 text-sm font-black outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Set sorting order for ${i.name || i.title}`}
                    >
                      {items.map((_, orderIndex) => (
                        <option key={orderIndex + 1} value={orderIndex + 1}>
                          {orderIndex + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <Link
                  href={`${addHref}?id=${i.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-black text-teal-700 transition hover:bg-teal-700 hover:text-white"
                >
                  <Edit3 size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => del(i.id)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {reorderOpen && isCoupons && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/55 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <ArrowDownUp size={24} className="text-slate-900" />
                <h2 className="text-2xl font-black text-slate-900">Reorder Coupons</h2>
              </div>
              <button
                type="button"
                onClick={closeReorderModal}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Close reorder coupons modal"
              >
                <X size={28} />
              </button>
            </div>

            {reorderStep === "select-store" ? (
              <div className="px-6 py-12">
                <div className="mb-8 rounded-xl border border-cyan-200 bg-cyan-100 px-5 py-4 text-center text-lg font-semibold text-cyan-950">
                  Please select a store to reorder its coupons
                </div>

                <label className="mx-auto block max-w-4xl text-center">
                  <span className="mb-3 block text-xl font-black text-slate-950">Select Store</span>
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="w-full rounded-2xl border-4 border-indigo-200 bg-white px-6 py-4 text-xl font-semibold text-slate-500 outline-none focus:border-indigo-300"
                  >
                    <option value="">-- Choose a Store --</option>
                    {stores.map((store) => (
                      <option key={store.id} value={store.name}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-7 text-center">
                  <button
                    type="button"
                    onClick={proceedToCouponReorder}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-600 px-7 py-4 text-lg font-black text-white shadow transition hover:bg-slate-800"
                  >
                    → Proceed to Reorder
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-8">
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-cyan-950 md:flex-row md:items-center md:justify-between">
                  <p className="text-base font-bold">
                    Reordering coupons for <span className="font-black">{selectedStore}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setReorderStep("select-store")}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-black text-cyan-700 shadow-sm transition hover:bg-cyan-100"
                  >
                    Change Store
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  {selectedStoreCoupons.map((coupon, index) => (
                    <div key={coupon.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[64px_1fr_180px] md:items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-base font-black text-orange-500">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-950">{coupon.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{coupon.code || "No code"}</p>
                      </div>
                      <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                        Position
                        <select
                          value={index + 1}
                          onChange={(e) => moveDraftCoupon(coupon.id, Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-black outline-none focus:border-cyan-400"
                        >
                          {selectedStoreCoupons.map((_, orderIndex) => (
                            <option key={orderIndex + 1} value={orderIndex + 1}>
                              {orderIndex + 1}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeReorderModal}
                    disabled={savingOrder}
                    className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200 disabled:opacity-60"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={saveCouponReorder}
                    disabled={savingOrder}
                    className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-blue-800 disabled:opacity-60"
                  >
                    {savingOrder ? "Saving..." : "Save Reorder"}
                  </button>
                </div>
              </div>
            )}

            {reorderStep === "select-store" && (
              <div className="flex justify-end border-t border-slate-100 px-6 py-5">
                <button
                  type="button"
                  onClick={closeReorderModal}
                  className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-950"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
