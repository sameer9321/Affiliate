import AdminCrudList from "@/components/admin/AdminCrudList";
export default function Page(){return <AdminCrudList title="Blogs" subtitle="Add, edit and delete saving guide posts." api="/api/admin/blogs" addHref="/admin/blogs/add"/>}
