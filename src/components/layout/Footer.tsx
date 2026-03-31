import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="font-sans text-sm text-parchment-muted">
          © {new Date().getFullYear()} Arkadia — Tous droits réservés.
        </p>
        <nav className="flex gap-6 text-sm text-parchment-muted">
          <Link href="/events" className="hover:text-copper-light transition-colors">
            Événements
          </Link>
          <Link href="/dashboard" className="hover:text-copper-light transition-colors">
            Mon espace
          </Link>
        </nav>
      </div>
    </footer>
  );
}
