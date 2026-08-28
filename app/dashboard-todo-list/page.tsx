"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle, Circle, ClipboardList, Sparkles } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Task } from "@/lib/data";

const MOCK_USER_ID = "demo-user-001";

const INITIAL_TASKS: Task[] = [
  { id: "1", user_id: MOCK_USER_ID, title: "Review project requirements", created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "2", user_id: MOCK_USER_ID, title: "Set up development environment", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", user_id: MOCK_USER_ID, title: "Write unit tests for core modules", created_at: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: "4", user_id: MOCK_USER_ID, title: "Design the dashboard layout", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardTodoListPage() {
  const t = useTranslations();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalTasks = tasks.length;
  const completedCount = completed.size;
  const pendingCount = totalTasks - completedCount;

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed) {
      setError(t("dashboard.error.empty"));
      return;
    }
    if (trimmed.length > 200) {
      setError(t("dashboard.error.tooLong"));
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      user_id: MOCK_USER_ID,
      title: trimmed,
      created_at: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setInput("");
    setError("");
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setCompleted((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function handleToggle(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleAdd();
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <Reveal>
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t("dashboard.badge")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
              {t("dashboard.heading")}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
              {t("dashboard.subheading")}
            </p>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.08}>
          <div className="mb-8 grid grid-cols-3 gap-4">
            {[
              { label: t("dashboard.stats.total"), value: totalTasks, accent: false },
              { label: t("dashboard.stats.pending"), value: pendingCount, accent: false },
              { label: t("dashboard.stats.completed"), value: completedCount, accent: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "rounded-2xl border p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]",
                  stat.accent
                    ? "border-[var(--accent)]/30 bg-[var(--accent)]/10"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                )}
              >
                <div
                  className={cn(
                    "text-3xl font-bold",
                    stat.accent ? "text-[var(--accent)]" : "text-[hsl(var(--foreground))]"
                  )}
                >
                  {mounted ? stat.value : 0}
                </div>
                <div className="mt-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Add Task Input */}
        <Reveal delay={0.12}>
          <div className="mb-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]">
            <label htmlFor="task-input" className="mb-2 block text-sm font-semibold text-[hsl(var(--foreground))]">
              {t("dashboard.input.label")}
            </label>
            <div className="flex gap-3">
              <input
                id="task-input"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder={t("dashboard.input.placeholder")}
                maxLength={200}
                aria-describedby={error ? "task-error" : undefined}
                className={cn(
                  "flex-1 rounded-xl border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/50",
                  error ? "border-red-400" : "border-[hsl(var(--border))]"
                )}
              />
              <motion.button
                onClick={handleAdd}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label={t("dashboard.input.addAriaLabel")}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                {t("dashboard.input.addButton")}
              </motion.button>
            </div>
            {error && (
              <p id="task-error" role="alert" className="mt-2 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
        </Reveal>

        {/* Task List */}
        <Reveal delay={0.16}>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] px-5 py-4">
              <ClipboardList className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {t("dashboard.list.heading")}
              </h2>
              <span className="ml-auto rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                {totalTasks}
              </span>
            </div>

            {tasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 px-6 py-16 text-center"
              >
                <CheckCircle className="h-12 w-12 text-[var(--accent)]/40" aria-hidden="true" />
                <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  {t("dashboard.list.empty")}
                </p>
              </motion.div>
            ) : (
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="divide-y divide-[hsl(var(--border))]"
                role="list"
                aria-label={t("dashboard.list.ariaLabel")}
              >
                <AnimatePresence initial={false}>
                  {tasks.map((task) => {
                    const isDone = completed.has(task.id);
                    return (
                      <motion.li
                        key={task.id}
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -24, transition: { duration: 0.25 } }}
                        layout
                        className="group flex items-start gap-3 px-5 py-4 transition-colors duration-150 hover:bg-[hsl(var(--muted))/0.4]"
                      >
                        <button
                          onClick={() => handleToggle(task.id)}
                          aria-label={isDone ? t("dashboard.task.markIncomplete") : t("dashboard.task.markComplete")}
                          className="mt-0.5 flex-shrink-0 text-[hsl(var(--muted-foreground))] transition-colors duration-150 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-full"
                        >
                          {isDone ? (
                            <CheckCircle className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                          ) : (
                            <Circle className="h-5 w-5" aria-hidden="true" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "text-sm font-medium leading-snug transition-all duration-200",
                              isDone
                                ? "text-[hsl(var(--muted-foreground))] line-through"
                                : "text-[hsl(var(--foreground))]"
                            )}
                          >
                            {task.title}
                          </p>
                          <p className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
                            {mounted ? formatDate(task.created_at) : ""}
                          </p>
                        </div>

                        <motion.button
                          onClick={() => handleDelete(task.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={t("dashboard.task.delete")}
                          className="flex-shrink-0 rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] opacity-0 transition-all duration-150 hover:bg-red-50 hover:text-red-500 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </motion.ul>
            )}
          </div>
        </Reveal>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-[hsl(var(--muted-foreground))]">{t("dashboard.progress.label")}</span>
                <span className="text-[var(--accent)]">
                  {mounted ? Math.round((completedCount / totalTasks) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))]">
                <motion.div
                  className="h-full rounded-full bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? `${(completedCount / totalTasks) * 100}%` : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                {t("dashboard.progress.summary", { completed: completedCount, total: totalTasks })}
              </p>
            </div>
          </Reveal>
        )}

      </div>
    </main>
  );
}