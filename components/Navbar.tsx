"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const link = (href: string) =>
    pathname === href ? "nav-link active" : "nav-link";

  return (
    <nav className="nav">
      <Link className={link("/")} href="/">Home</Link>
      <Link className={link("/tree")} href="/tree">Tree View</Link>
      <Link className={link("/kanban")} href="/kanban">Kanban Board</Link>
    </nav>
  );
}
