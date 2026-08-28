# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
create a simple todo app to add or delete task and also athentication as well

## Goal
Build a simple authenticated todo app with sign-up, login, and a protected dashboard where users can add and delete their personal tasks.

## Project type
saas-app

## Design system — match this exactly
- Color tokens: `--background: #F7F7F5`, `--foreground: #1A1A18`, `--card: #FFFFFF`, `--border: #E2E2DC`, `--muted-foreground: #6B6B63`, `--primary: #4F46E5`, `--accent: #E8E7FF`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`cta`, `dashboard`, `features`, `footerCopy`, `hero`, `how`, `login`, `nav`, `signup`, `testimonials`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
