import { redirect } from "next/navigation";
import ProjectManager from "@/components/admin/ProjectManager";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { hasAdminSession } from "@/libs/auth";

export default async function AdminProjectsPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminNavbar />
      <ProjectManager />
    </div>
  );
}
