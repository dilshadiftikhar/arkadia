"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/events?filter=week", label: "Cette semaine" },
  { href: "/events", label: "Tous les events" },
  { href: "/events?filter=open-table", label: "Tables ouvertes" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-ink-800/90 backdrop-blur-md border-b border-ink-600">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/events" aria-label="Accueil Arkadia">
          <Logo variant="full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const basePath = link.href.split("?")[0];
            const isActive = pathname === basePath && link.href === "/events";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-sm transition-colors duration-200 hover:text-copper-light",
                  isActive
                    ? "text-copper-base border-b border-copper-base pb-0.5"
                    : "text-parchment-dim"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/events" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-secondary hidden md:inline-flex py-2 px-4 text-sm">
                Connexion
              </button>
            </SignInButton>
          </SignedOut>
          <Link href="/events" className="btn-primary hidden md:inline-flex py-2 px-4 text-sm">
            Réserver une soirée
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-copper-base p-1"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink-800 border-t border-ink-600 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block font-sans text-sm text-parchment-dim hover:text-copper-light transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events"
            className="btn-primary w-full justify-center mt-3 text-sm py-2"
            onClick={() => setMenuOpen(false)}
          >
            Réserver une soirée
          </Link>
        </div>
      )}
    </header>
  );
}
