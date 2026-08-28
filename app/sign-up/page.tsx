"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, CheckCircle, ArrowRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PERKS = [
  { icon: "✓", text: "Free forever, no credit card needed" },
  { icon: "✓", text: "Unlimited tasks and projects" },
  { icon: "✓", text: "Sync across all your devices" },
  { icon: "✓", text: "Simple, distraction-free interface" },
];

export default function SignUpPage() {
  const t = useTranslations();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = t("signup.errors.nameRequired");
    if (!form.email.trim()) next.email = t("signup.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t("signup.errors.emailInvalid");
    if (!form.password) next.password = t("signup.errors.passwordRequired");
    else if (form.password.length < 8)
      next.password = t("signup.errors.passwordLength");
    if (!form.confirmPassword)
      next.confirmPassword = t("signup.errors.confirmRequired");
    else if (form.password !== form.confirmPassword)
      next.confirmPassword = t("signup.errors.passwordMismatch");
    return next;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ["", t("signup.strength.weak"), t("signup.strength.fair"), t("signup.strength.good"), t("signup.strength.strong")][passwordStrength] ?? "";
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"][passwordStrength] ?? "";

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-[hsl(var(--background))]">
        <Reveal className="w-full max-w-md text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]/15 ring-4 ring-[var(--accent)]/20">
              <CheckCircle className="h-10 w-10 text-[var(--accent)]" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {t("signup.success.title")}
              </h1>
              <p className="mt-3 text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("signup.success.body")}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {t("signup.success.cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">

        {/* Left: branding + perks */}
        <Reveal className="hidden lg:block">
          <div className="space-y-8">
            <div>
              <span className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("signup.badge")}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] text-balance leading-tight">
                {t("signup.headline")}
              </h1>
              <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))] leading-relaxed text-pretty">
                {t("signup.subheadline")}
              </p>
            </div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {PERKS.map((perk, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-[hsl(var(--foreground))]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-bold text-[var(--accent)]">
                    {perk.icon}
                  </span>
                  <span className="text-sm leading-snug">{perk.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
              <p className="text-sm italic text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("signup.testimonial.quote")}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-bold text-[var(--accent)]">
                  M
                </div>
                <div>
                  <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{t("signup.testimonial.name")}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{t("signup.testimonial.role")}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal>
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.12)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/15">
                <UserPlus className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                  {t("signup.form.title")}
                </h2>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {t("signup.form.subtitle")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[hsl(var(--foreground))]"
                >
                  {t("signup.form.nameLabel")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("signup.form.namePlaceholder")}
                  className={cn(
                    "w-full rounded-xl border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
                    errors.name
                      ? "border-red-400 focus:ring-red-400"
                      : "border-[hsl(var(--border))]"
                  )}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-500" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[hsl(var(--foreground))]"
                >
                  {t("signup.form.emailLabel")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("signup.form.emailPlaceholder")}
                  className={cn(
                    "w-full rounded-xl border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
                    errors.email
                      ? "border-red-400 focus:ring-red-400"
                      : "border-[hsl(var(--border))]"
                  )}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[hsl(var(--foreground))]"
                >
                  {t("signup.form.passwordLabel")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={t("signup.form.passwordPlaceholder")}
                    className={cn(
                      "w-full rounded-xl border bg-[hsl(var(--background))] px-4 py-2.5 pr-11 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
                      errors.password
                        ? "border-red-400 focus:ring-red-400"
                        : "border-[hsl(var(--border))]"
                    )}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? t("signup.form.hidePassword") : t("signup.form.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {form.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-300",
                            passwordStrength >= n ? strengthColor : "bg-[hsl(var(--border))]"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {t("signup.form.strengthLabel")}{" "}
                      <span className="font-medium text-[hsl(var(--foreground))]">{strengthLabel}</span>
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p id="password-error" className="text-xs text-red-500" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[hsl(var(--foreground))]"
                >
                  {t("signup.form.confirmLabel")}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder={t("signup.form.confirmPlaceholder")}
                    className={cn(
                      "w-full rounded-xl border bg-[hsl(var(--background))] px-4 py-2.5 pr-11 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
                      errors.confirmPassword
                        ? "border-red-400 focus:ring-red-400"
                        : "border-[hsl(var(--border))]"
                    )}
                    aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? t("signup.form.hidePassword") : t("signup.form.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-error" className="text-xs text-red-500" role="alert">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                {t("signup.form.terms.prefix")}{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-[var(--accent)] transition-colors">
                  {t("signup.form.terms.termsLink")}
                </Link>{" "}
                {t("signup.form.terms.and")}{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--accent)] transition-colors">
                  {t("signup.form.terms.privacyLink")}
                </Link>
                {t("signup.form.terms.suffix")}
              </p>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {t("signup.form.submitting")}
                  </span>
                ) : (
                  t("signup.form.submit")
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
              {t("signup.form.loginPrompt")}{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--accent)] hover:underline underline-offset-2 transition-colors"
              >
                {t("signup.form.loginLink")}
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}