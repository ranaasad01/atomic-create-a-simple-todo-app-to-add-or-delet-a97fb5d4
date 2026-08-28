"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) {
      next.email = t("login.errorEmailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t("login.errorEmailInvalid");
    }
    if (!password) {
      next.password = t("login.errorPasswordRequired");
    } else if (password.length < 6) {
      next.password = t("login.errorPasswordShort");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    if (!validate()) return;
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 700));
      const raw = typeof window !== "undefined" ? localStorage.getItem("todo_users") : null;
      const users: { email: string; password: string }[] = raw ? JSON.parse(raw) : [];
      const match = users.find((u) => u.email === email && u.password === password);
      if (!match) {
        setAuthError(t("login.errorInvalidCredentials"));
        setLoading(false);
        return;
      }
      localStorage.setItem("todo_session", JSON.stringify({ email }));
      window.location.href = "/dashboard";
    } catch {
      setAuthError(t("login.errorGeneric"));
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.10)]">
          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[0_4px_14px_rgba(0,0,0,0.15)]">
              <LogIn className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              {t("login.heading")}
            </h1>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              {t("login.subheading", { app: APP_NAME })}
            </p>
          </div>

          {/* Auth error banner */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-400"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{authError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
              >
                {t("login.emailLabel")}
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder={t("login.emailPlaceholder")}
                  className={cn(
                    "w-full rounded-xl border bg-[hsl(var(--background))] py-2.5 pl-10 pr-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/40",
                    errors.email
                      ? "border-red-400 focus:border-red-400"
                      : "border-[hsl(var(--border))] focus:border-[var(--accent)]"
                  )}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
              >
                {t("login.passwordLabel")}
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder={t("login.passwordPlaceholder")}
                  className={cn(
                    "w-full rounded-xl border bg-[hsl(var(--background))] py-2.5 pl-10 pr-4 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/40",
                    errors.password
                      ? "border-red-400 focus:border-red-400"
                      : "border-[hsl(var(--border))] focus:border-[var(--accent)]"
                  )}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-red-500" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  {t("login.loadingButton")}
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  {t("login.submitButton")}
                </>
              )}
            </motion.button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
            {t("login.noAccount")}{" "}
            <Link
              href="/signup"
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 rounded"
            >
              {t("login.signUpLink")}
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}