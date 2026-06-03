import AdminEntityForm from "@/components/admin/AdminEntityForm";

export default function Page() {
  return (
    <AdminEntityForm
      title="Store"
      api="/api/admin/stores"
      backHref="/admin/stores"
      fields={[
        { name: "name", label: "Store Name", required: true, fullWidth: true },
        { name: "description", label: "Store Description", type: "textarea", required: true },
        { name: "website", label: "Store Url", required: true, fullWidth: true },
        { name: "logoUrl", label: "Store Logo", type: "file", hint: "Size should be 200px by 200px" },
        { name: "category", label: "Category", type: "select", optionsFrom: "/api/admin/categories" },
      ]}
    />
  );
}
