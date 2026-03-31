import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Arkadia — Tous droits réservés.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/events" className="hover:text-foreground transition-colors">
            Événements
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Mon espace
          </Link>
        </nav>
      </div>
    </footer>
  );
}
