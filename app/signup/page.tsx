"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { APP_NAME } from "@/lib/data";

export default function SignUpPage() {
  const t = useTranslations();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validate = (): string | null => {
    if (!email.trim()) return t("signup.errorEmailRequired");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t("signup.errorEmailInvalid");
    if (password.length < 8) return t("signup.errorPasswordLength");
    if (password !== confirmPassword) return t("signup.errorPasswordMatch");
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const mockTakenEmails = ["test@example.com", "user@demo.com"];
    if (mockTakenEmails.includes(email.toLowerCase())) {
      setError(t("signup.errorDuplicateEmail"));
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-[hsl(var(--background))]">
      <div className="w-full max-w-md">
        <Reveal>
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.12)] p-8"
          >
            {/* Logo / Brand */}
            <div className="flex flex-col items-center mb-8">
              <div className="h-12 w-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                <UserPlus className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                {t("signup.heading")}
              </h1>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))] text-center">
                {t("signup.subheading", { appName: APP_NAME })}
              </p>
            </div>

            {/* Success Banner */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3"
              >
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-sm text-green-800">{t("signup.successMessage")}</p>
              </motion.div>
            )}

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
              >
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5"
                >
                  {t("signup.emailLabel")}
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("signup.emailPlaceholder")}
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] pl-10 pr-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5"
                >
                  {t("signup.passwordLabel")}
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("signup.passwordPlaceholder")}
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] pl-10 pr-10 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? t("signup.hidePassword") : t("signup.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                  {t("signup.passwordHint")}
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5"
                >
                  {t("signup.confirmPasswordLabel")}
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]"
                    aria-hidden="true"
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("signup.confirmPasswordPlaceholder")}
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] pl-10 pr-10 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? t("signup.hidePassword") : t("signup.showPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password strength indicator */}
              {password.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => {
                      const strength =
                        password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
                          ? 4
                          : password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)
                          ? 3
                          : password.length >= 8
                          ? 2
                          : 1;
                      return (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= strength
                              ? strength === 1
                                ? "bg-red-400"
                                : strength === 2
                                ? "bg-yellow-400"
                                : strength === 3
                                ? "bg-blue-400"
                                : "bg-green-400"
                              : "bg-[hsl(var(--border))]"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
                      ? t("signup.strengthStrong")
                      : password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)
                      ? t("signup.strengthGood")
                      : password.length >= 8
                      ? t("signup.strengthFair")
                      : t("signup.strengthWeak")}
                  </p>
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || success}
                whileHover={{ scale: loading || success ? 1 : 1.01 }}
                whileTap={{ scale: loading || success ? 1 : 0.98 }}
                className="w-full rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
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
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    {t("signup.loadingButton")}
                  </span>
                ) : success ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    {t("signup.successButton")}
                  </span>
                ) : (
                  t("signup.submitButton")
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-[hsl(var(--border))]" />
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{t("signup.orDivider")}</span>
              <div className="flex-1 h-px bg-[hsl(var(--border))]" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
              {t("signup.alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="font-medium text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
              >
                {t("signup.loginLink")}
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
              {t("signup.termsText")}{" "}
              <Link href="#" className="underline hover:text-[hsl(var(--foreground))] transition-colors">
                {t("signup.termsLink")}
              </Link>{" "}
              {t("signup.andText")}{" "}
              <Link href="#" className="underline hover:text-[hsl(var(--foreground))] transition-colors">
                {t("signup.privacyLink")}
              </Link>
              .
            </p>
          </motion.div>
        </Reveal>
      </div>
    </main>
  );
}