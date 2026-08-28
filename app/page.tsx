"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { CheckCircle, Trash2, Plus, Shield, Zap, Star, ArrowRight } from 'lucide-react';
import Link from "next/link";

const FEATURES = [
  {
    icon: CheckCircle,
    title: "Simple Task Management",
    desc: "Add, complete, and delete tasks with a single click. No clutter, no confusion — just a clean list of what needs to get done.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your tasks belong to you. Every account is protected with secure authentication so only you can see your list.",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    desc: "Changes reflect immediately. No page reloads, no waiting — your task list stays in sync as you work.",
  },
];

const STEPS = [
  { number: "01", title: "Create an account", desc: "Sign up in seconds with just your email and a password." },
  { number: "02", title: "Add your tasks", desc: "Type a task and hit enter. It lands on your list right away." },
  { number: "03", title: "Stay on top", desc: "Delete tasks as you finish them and keep your focus sharp." },
];

const TESTIMONIALS = [
  {
    name: "Maria Chen",
    role: "Freelance Designer",
    quote: "Finally a todo app that doesn't get in my way. I open it, add my tasks, and get to work.",
    avatar: "/images/maria-chen-designer.jpg",
  },
  {
    name: "James Okafor",
    role: "Software Engineer",
    quote: "Clean, fast, and private. Everything I want from a task manager and nothing I don't.",
    avatar: "/images/james-okafor-engineer.jpg",
  },
  {
    name: "Sofia Reyes",
    role: "Product Manager",
    quote: "I've tried dozens of apps. This one sticks because it respects my time and attention.",
    avatar: "/images/sofia-reyes-pm.jpg",
  },
];

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="flex flex-col">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative overflow-hidden bg-[hsl(var(--background))] px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          {/* Subtle radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[520px] w-[520px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]"
              >
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                {t("hero.badge")}
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-balance text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-6xl lg:text-7xl"
              >
                {t("hero.headline")}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="max-w-xl text-pretty text-lg leading-relaxed text-[hsl(var(--muted-foreground))]"
              >
                {t("hero.subhead")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:brightness-110 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {t("hero.cta_primary")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-7 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-300 ease-out hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </motion.div>
            </motion.div>

            {/* Mini task preview */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
              className="mx-auto mt-14 max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.14)]"
            >
              {/* Fake input row */}
              <div className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3">
                <Plus className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{t("hero.mock_placeholder")}</span>
              </div>
              {/* Fake task rows */}
              {[
                { label: t("hero.mock_task1"), done: true },
                { label: t("hero.mock_task2"), done: false },
                { label: t("hero.mock_task3"), done: false },
              ].map((task, i) => (
                <div
                  key={i}
                  className="mt-3 flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={`h-4 w-4 shrink-0 ${task.done ? "text-[var(--accent)]" : "text-[hsl(var(--muted-foreground))]/40"}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm ${task.done ? "text-[hsl(var(--muted-foreground))] line-through" : "text-[hsl(var(--foreground))]"}`}
                    >
                      {task.label}
                    </span>
                  </div>
                  <Trash2 className="h-4 w-4 text-[hsl(var(--muted-foreground))]/40" aria-hidden="true" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Features ── */}
      <Reveal>
        <section
          id="features"
          className="bg-[hsl(var(--muted))] px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("features.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
                {t("features.heading")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                {t("features.subhead")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] transition-shadow duration-300 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.16)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                      <f.icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{f.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── How it works ── */}
      <Reveal>
        <section
          id="how-it-works"
          className="bg-[hsl(var(--background))] px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              {/* Left: copy */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {t("how.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
                  {t("how.heading")}
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {t("how.subhead")}
                </p>
                <Link
                  href="/signup"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[hsl(var(--background))] transition-all duration-300 ease-out hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {t("how.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Right: steps */}
              <div className="flex flex-col gap-5">
                {STEPS.map((step, i) => (
                  <Reveal key={step.number} delay={i * 0.1}>
                    <div className="flex items-start gap-5 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-6px_rgba(0,0,0,0.08)]">
                      <span className="shrink-0 text-2xl font-bold text-[var(--accent)]/30">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{step.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ── */}
      <Reveal>
        <section
          id="testimonials"
          className="bg-[hsl(var(--muted))] px-6 py-20 md:py-28"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
                {t("testimonials.heading")}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t_item, i) => (
                <Reveal key={t_item.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={t_item.avatar}
                        alt={t_item.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--accent)]/20"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{t_item.name}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{t_item.role}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      &ldquo;{t_item.quote}&rdquo;
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section
          id="cta"
          className="bg-[hsl(var(--background))] px-6 py-20 md:py-28"
        >
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-8 py-16 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-16px_rgba(0,0,0,0.12)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-4xl">
                {t("cta.heading")}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                {t("cta.subhead")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-[hsl(var(--background))] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-8 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-300 ease-out hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {t("cta.login")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}