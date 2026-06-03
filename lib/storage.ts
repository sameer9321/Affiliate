import { blogs, categories, coupons, stores, type Blog, type Category, type Coupon, type Store } from "@/data/seed";

export type DataKey = "stores" | "coupons" | "categories" | "blogs";
export type AppData = { stores: Store[]; coupons: Coupon[]; categories: Category[]; blogs: Blog[] };

export const defaultData: AppData = { stores, coupons, categories, blogs };

export function getData<T>(key: DataKey): T[] {
  if (typeof window === "undefined") return defaultData[key] as T[];
  const saved = window.localStorage.getItem(`saving-trendz-${key}`);
  if (!saved) return defaultData[key] as T[];
  try { return JSON.parse(saved) as T[]; } catch { return defaultData[key] as T[]; }
}

export function saveData<T>(key: DataKey, value: T[]) {
  window.localStorage.setItem(`saving-trendz-${key}`, JSON.stringify(value));
}

export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("saving-trendz-admin") === "true";
}
