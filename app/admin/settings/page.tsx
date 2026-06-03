import { KeyRound, ShieldCheck } from "lucide-react";

export default function Settings() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">Admin Settings</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Settings</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-black">Secure Authentication</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Admin authentication is handled through secure HTTP-only cookies. This keeps dashboard sessions safer than browser-only storage.
          </p>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <KeyRound size={26} />
          </div>
          <h2 className="text-2xl font-black">Credential Management</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Update credentials from your environment variables: <b>ADMIN_EMAIL</b>, <b>ADMIN_PASSWORD</b> or <b>ADMIN_PASSWORD_HASH</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
