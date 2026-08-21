"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/project";

type ProjectForm = Omit<Project, "id">;

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  category: "Frontend",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
};

export default function ProjectManager() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [technologyInput, setTechnologyInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    const response = await fetch("/api/projects");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }

    const result = await response.json();
    setProjects(result);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;

    fetch("/api/projects")
      .then(async (response) => {
        if (response.status === 401) {
          router.push("/admin/login");
          return null;
        }

        return response.json();
      })
      .then((result) => {
        if (active && Array.isArray(result)) {
          setProjects(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function addTechnology() {
    const technology = technologyInput.trim();
    if (!technology || form.technologies.includes(technology)) return;
    setForm((current) => ({
      ...current,
      technologies: [...current.technologies, technology],
    }));
    setTechnologyInput("");
  }

  function resetForm() {
    setForm(emptyForm);
    setTechnologyInput("");
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch(
      editingId ? `/api/projects/${editingId}` : "/api/projects",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    if (!response.ok) {
      const result = await response.json();
      setMessage(result.error ?? "Unable to save project");
      setSaving(false);
      return;
    }

    await loadProjects();
    resetForm();
    setMessage(editingId ? "Project updated" : "Project created");
    setSaving(false);
  }

  function editProject(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl ?? "",
      featured: project.featured ?? false,
    });
  }

  async function deleteProject(id: string) {
    if (!window.confirm("Delete this project?")) return;

    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (response.ok) {
      setProjects((current) => current.filter((project) => project.id !== id));
      setMessage("Project deleted");
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All projects</h2>
              <span className="text-sm text-muted-foreground">
                {projects.length} total
              </span>
            </div>
            {loading ? (
              <p className="text-muted-foreground">Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
                No projects yet. Add your first project.
              </p>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        {project.featured && (
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.category} · {project.technologies.join(", ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => editProject(project)}
                        className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-accent">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <form
            onSubmit={handleSubmit}
            className="h-fit space-y-5 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit project" : "New project"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-primary">
                  Cancel
                </button>
              )}
            </div>

            <input
              required
              placeholder="Project title"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
            />
            <textarea
              required
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
            />
            <select
              value={form.category}
              onChange={(event) =>
                setForm({
                  ...form,
                  category: event.target.value as ProjectForm["category"],
                })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2">
              <option>Frontend</option>
              <option>Backend</option>
              <option>Full-stack</option>
            </select>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  placeholder="Technology"
                  value={technologyInput}
                  onChange={(event) => setTechnologyInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTechnology();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="rounded-lg border border-border px-3 py-2">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.technologies.map((technology) => (
                  <button
                    type="button"
                    key={technology}
                    onClick={() =>
                      setForm({
                        ...form,
                        technologies: form.technologies.filter(
                          (item) => item !== technology,
                        ),
                      })
                    }
                    className="rounded-full bg-muted px-3 py-1 text-xs">
                    {technology} ×
                  </button>
                ))}
              </div>
            </div>
            <input
              type="url"
              placeholder="GitHub URL"
              value={form.githubUrl}
              onChange={(event) =>
                setForm({ ...form, githubUrl: event.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
            />
            <input
              type="url"
              placeholder="Live URL"
              value={form.liveUrl}
              onChange={(event) =>
                setForm({ ...form, liveUrl: event.target.value })
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  setForm({ ...form, featured: event.target.checked })
                }
              />
              Featured project
            </label>
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
            <button
              type="submit"
              disabled={saving || form.technologies.length === 0}
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-50">
              {saving
                ? "Saving..."
                : editingId
                  ? "Update project"
                  : "Create project"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
