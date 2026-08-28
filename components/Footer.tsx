"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CheckSquare } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const footerItems = (
    Array.isArray(t.raw("footer")) ? t.raw("footer") : []
  ) as { text: string }[];

  const footerLinks = [
    { label: "Sign Up", href: "/signup", key: "signup" },
    { label: "Log In", href: "/login", key: "login" },
    { label: "Dashboard", href: "/dashboard", key: "dashboard" },
  ];

  const navT = (Array.isArray(t.raw("nav")) ? {} : t.raw("nav")) as Record<string, string>;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[var(--border)] bg-[var(--card)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--primary)] text-white">
                <CheckSquare className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="text-[0.875rem] font-semibold text-[var(--foreground)]">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-[0.75rem] text-[var(--muted-foreground)] max-w-xs leading-relaxed">
              {APP_TAGLINE}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[0.8125rem] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
              >
                {navT[link.key] ?? link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[0.75rem] text-[var(--muted-foreground)]">
            {t("footerCopy.copyright")}
          </p>
          <div className="flex flex-col gap-1">
            {footerItems.map((item, i) => (
              <p key={i} className="text-[0.75rem] text-[var(--muted-foreground)]">
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}