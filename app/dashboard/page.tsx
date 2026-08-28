"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, CheckSquare, LogOut } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import type { Task } from "@/lib/data";

// ── Auth helpers (inline, no external lib/auth.ts dependency) ──────────────
function getSession(): { email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("todo_session");
    return raw ? (JSON.parse(raw) as { email: string }) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem("todo_session");
}

// ── Task persistence helpers ───────────────────────────────────────────────
function loadTasks(userId: string): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`todo_tasks_${userId}`);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function saveTasks(userId: string, tasks: Task[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(`todo_tasks_${userId}`, JSON.stringify(tasks));
  }
}

// ── Sub-components (inline) ────────────────────────────────────────────────

function DashboardHeader({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">
          {t("dashboard.welcome")}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          {email}
        </h1>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-all duration-200 hover:border-red-400 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        aria-label={t("dashboard.logout")}
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        {t("dashboard.logout")}
      </button>
    </div>
  );
}

function AddTaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const t = useTranslations();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError(t("dashboard.taskRequired"));
      return;
    }
    onAdd(trimmed);
    setValue("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:gap-3">
      <div className="flex-1">
        <label htmlFor="task-input" className="sr-only">
          {t("dashboard.taskPlaceholder")}
        </label>
        <input
          id="task-input"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          placeholder={t("dashboard.taskPlaceholder")}
          className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-200 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          aria-describedby={error ? "task-error" : undefined}
        />
        {error && (
          <p id="task-error" className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.16)] transition-all duration-200 hover:opacity-90 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:scale-95"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {t("dashboard.addTask")}
      </button>
    </form>
  );
}

function TaskItem({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) {
  const t = useTranslations();
  const date = new Date(task.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.li
      layout
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-[var(--accent)]/40 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-start gap-3 min-w-0">
        <CheckSquare
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[hsl(var(--foreground))]">
            {task.title}
          </p>
          <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
            {date}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={t("dashboard.deleteTask")}
        className="shrink-0 rounded-lg p-2 text-[hsl(var(--muted-foreground))] transition-all duration-200 hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:hover:bg-red-950/30"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.li>
  );
}

function EmptyState() {
  const t = useTranslations();
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center gap-5 py-16 text-center"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="20"
          y="16"
          width="80"
          height="88"
          rx="10"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        <rect x="34" y="36" width="52" height="6" rx="3" fill="hsl(var(--border))" />
        <rect x="34" y="52" width="40" height="6" rx="3" fill="hsl(var(--border))" />
        <rect x="34" y="68" width="46" height="6" rx="3" fill="hsl(var(--border))" />
        <circle cx="88" cy="88" r="18" fill="var(--accent)" />
        <path
          d="M82 88h12M88 82v12"
          stroke="hsl(var(--background))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-base font-semibold text-[hsl(var(--foreground))]">
          {t("dashboard.emptyTitle")}
        </p>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          {t("dashboard.emptyDesc")}
        </p>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setMounted(true);
    const session = getSession();
    if (!session) {
      window.location.href = "/login";
      return;
    }
    setEmail(session.email);
    setTasks(loadTasks(session.email));
  }, []);

  function handleAdd(title: string) {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user_id: email,
      title,
      created_at: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveTasks(email, updated);
  }

  function handleDelete(id: string) {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(email, updated);
  }

  function handleLogout() {
    clearSession();
    window.location.href = "/login";
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[hsl(var(--background))]">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-[hsl(var(--border))]" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        {/* Header */}
        <Reveal>
          <section aria-label={t("dashboard.headerLabel")}>
            <DashboardHeader email={email} onLogout={handleLogout} />
          </section>
        </Reveal>

        {/* Stats bar */}
        <Reveal delay={0.08}>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-bold text-[var(--accent)]">
                {tasks.length}
              </div>
              <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                {t("dashboard.statTotal")}
              </div>
            </div>
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-bold text-[hsl(var(--foreground))]">
                {tasks.length > 0 ? tasks.length : 0}
              </div>
              <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                {t("dashboard.statPending")}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="text-3xl font-bold text-[hsl(var(--foreground))]">
                0
              </div>
              <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                {t("dashboard.statDone")}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Add task */}
        <Reveal delay={0.12}>
          <section
            aria-label={t("dashboard.addSectionLabel")}
            className="mt-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
          >
            <h2 className="mb-4 text-base font-semibold text-[hsl(var(--foreground))]">
              {t("dashboard.addHeading")}
            </h2>
            <AddTaskForm onAdd={handleAdd} />
          </section>
        </Reveal>

        {/* Task list */}
        <Reveal delay={0.16}>
          <section aria-label={t("dashboard.listLabel")} className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">
                {t("dashboard.listHeading")}
              </h2>
              {tasks.length > 0 && (
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-0.5 text-xs font-medium text-[var(--accent)]">
                  {tasks.length}
                </span>
              )}
            </div>

            {tasks.length === 0 ? (
              <EmptyState />
            ) : (
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
                aria-label={t("dashboard.listLabel")}
              >
                <AnimatePresence mode="popLayout">
                  {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </section>
        </Reveal>
      </div>
    </main>
  );
}