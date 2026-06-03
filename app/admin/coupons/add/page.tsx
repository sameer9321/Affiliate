import AdminEntityForm from "@/components/admin/AdminEntityForm";

export default function Page() {
  return (
    <AdminEntityForm
      title="Coupon"
      api="/api/admin/coupons"
      backHref="/admin/coupons"
      fields={[
        { name: "title", label: "Coupon Title", required: true, fullWidth: true },
        { name: "description", label: "Coupon Description", fullWidth: true },
        { name: "storeUrl", label: "Store Url", fullWidth: true },
        { name: "code", label: "Coupon Code" },
        { name: "store", label: "Store", type: "select", optionsFrom: "/api/admin/stores" },
      ]}
    />
  );
}
