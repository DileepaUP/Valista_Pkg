import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

// The actual security boundary for every /admin/* page except /admin/login
// (that one lives in the sibling (auth) group, not wrapped by this layout —
// otherwise redirecting an unauthenticated user here would loop back into
// this same check). middleware.ts only checks cookie presence; this is the
// real server-side authorization check, per the plan's §4.4 requirement.
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-sand">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader name={admin.name} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
