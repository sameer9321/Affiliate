import AdminEntityForm from "@/components/admin/AdminEntityForm";

export default function Page() {
  return (
    <AdminEntityForm
      title="Category"
      api="/api/admin/categories"
      backHref="/admin/categories"
      fields={[
        { name: "name", label: "Category Name", required: true, fullWidth: true },
        { name: "imageUrl", label: "Category Image", type: "file", hint: "Size should be 715px by 400px", fullWidth: true },
      ]}
    />
  );
}
