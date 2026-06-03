import AdminCrudList from "@/components/admin/AdminCrudList";
export default function Page(){return <AdminCrudList title="Stores" subtitle="Add, edit and delete affiliate stores." api="/api/admin/stores" addHref="/admin/stores/add"/>}
