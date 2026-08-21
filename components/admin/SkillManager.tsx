"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Skill, SkillCategory } from "@/types/skill";

const categories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database & Cloud",
  "Tools & Others",
];

type SkillForm = Omit<Skill, "id">;

const emptyForm: SkillForm = {
  name: "",
  category: "Frontend",
  proficiency: 80,
  iconName: "",
};

export default function SkillManager() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState<SkillForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadSkills() {
    const response = await fetch("/api/skills");
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }

    const result = await response.json();
    if (Array.isArray(result)) setSkills(result);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;

    fetch("/api/skills")
      .then(async (response) => {
        if (response.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return response.json();
      })
      .then((result) => {
        if (active && Array.isArray(result)) {
          setSkills(result);
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

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch(
      editingId ? `/api/skills/${editingId}` : "/api/skills",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          proficiency: Number(form.proficiency),
        }),
      },
    );

    if (!response.ok) {
      const result = await response.json();
      setMessage(result.error ?? "Unable to save skill");
      setSaving(false);
      return;
    }

    await loadSkills();
    resetForm();
    setMessage(editingId ? "Skill updated" : "Skill created");
    setSaving(false);
  }

  function editSkill(skill: Skill) {
    if (!skill.id) return;
    setEditingId(skill.id);
    setForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      iconName: skill.iconName ?? "",
    });
  }

  async function deleteSkill(id: string) {
    if (!window.confirm("Delete this skill?")) return;

    const response = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (response.ok) {
      setSkills((current) => current.filter((skill) => skill.id !== id));
      setMessage("Skill deleted");
    }
  }

  return (
    <section className="border-t border-border bg-muted/30 px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Skills</h2>
            <span className="text-sm text-muted-foreground">
              {skills.length} total
            </span>
          </div>
          {loading ? (
            <p className="text-muted-foreground">Loading skills...</p>
          ) : skills.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
              No skills yet. Add your first skill.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <article
                  key={skill.id ?? skill.name}
                  className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {skill.category}
                      </p>
                    </div>
                    <span className="font-medium text-primary">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => editSkill(skill)}
                      className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent">
                      Edit
                    </button>
                    {skill.id && (
                      <button
                        onClick={() => deleteSkill(skill.id!)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit skill" : "New skill"}
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
            placeholder="Skill name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
          <select
            value={form.category}
            onChange={(event) =>
              setForm({
                ...form,
                category: event.target.value as SkillCategory,
              })
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <label className="block space-y-2 text-sm font-medium">
            Proficiency: {form.proficiency}%
            <input
              type="range"
              min="0"
              max="100"
              value={form.proficiency}
              onChange={(event) =>
                setForm({ ...form, proficiency: Number(event.target.value) })
              }
              className="w-full accent-primary"
            />
          </label>
          <input
            placeholder="Icon name (optional)"
            value={form.iconName}
            onChange={(event) =>
              setForm({ ...form, iconName: event.target.value })
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Update skill" : "Create skill"}
          </button>
        </form>
      </div>
    </section>
  );
}
