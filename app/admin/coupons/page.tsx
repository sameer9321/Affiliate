import AdminCrudList from "@/components/admin/AdminCrudList";
export default function Page(){return <AdminCrudList title="Coupons" subtitle="Add, edit and delete promo codes and deals." api="/api/admin/coupons" addHref="/admin/coupons/add"/>}
