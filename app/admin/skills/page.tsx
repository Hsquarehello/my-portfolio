import { redirect } from "next/navigation";
import SkillManager from "@/components/admin/SkillManager";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { hasAdminSession } from "@/libs/auth";

export default async function AdminSkillsPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminNavbar />
      <SkillManager />
    </div>
  );
}
