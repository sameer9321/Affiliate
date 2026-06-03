import AdminCrudList from "@/components/admin/AdminCrudList";
export default function Page(){return <AdminCrudList title="Categories" subtitle="Add, edit and delete shopping categories." api="/api/admin/categories" addHref="/admin/categories/add"/>}
