import AdminEntityForm from "@/components/admin/AdminEntityForm";

export default function Page() {
  return (
    <AdminEntityForm
      title="Blog"
      api="/api/admin/blogs"
      backHref="/admin/blogs"
      fields={[
        { name: "title", label: "Title", required: true, fullWidth: true },
        { name: "category", label: "Category", type: "select", optionsFrom: "/api/admin/categories", fullWidth: true },
        { name: "content", label: "Content", type: "richtext", required: true },
        { name: "imageUrl", label: "Blog Image", type: "file", hint: "Size should be 700px by 310px" },
      ]}
    />
  );
}
