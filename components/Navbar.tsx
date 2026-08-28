"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, APP_NAME } from "@/lib/data";
import { CheckSquare, Menu, X } from 'lucide-react';
import { useState } from "react";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navT = (Array.isArray(t.raw("nav")) ? {} : t.raw("nav")) as Record<string, string>;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileOpen(false);
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[var(--card)] border-b border-[var(--border)] shadow-[0_1px_3px_0_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary)] text-white">
            <CheckSquare className="w-4 h-4" aria-hidden="true" />
          </span>
          <span className="text-[0.9375rem] font-600 text-[var(--foreground)] tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={getLinkHref(link.href)}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-3 py-1.5 rounded-lg text-[0.875rem] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                isActive(link.href)
                  ? "bg-[var(--accent)] text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/60"
              }`}
            >
              {navT[link.key] ?? link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          aria-label="Mobile navigation"
          className="sm:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-3 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={getLinkHref(link.href)}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-3 py-2 rounded-lg text-[0.875rem] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                isActive(link.href)
                  ? "bg-[var(--accent)] text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/60"
              }`}
            >
              {navT[link.key] ?? link.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}