export const APP_NAME = "Todo App";
export const APP_TAGLINE = "Simple, fast, personal task management.";

export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Login", href: "/login", key: "login" },
  { label: "Sign Up", href: "/signup", key: "signup" },
  { label: "Dashboard", href: "/dashboard", key: "dashboard" },
];

export interface Task {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}