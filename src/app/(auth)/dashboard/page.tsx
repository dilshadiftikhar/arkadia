import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mon tableau de bord",
};

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bonjour, {user?.firstName ?? "joueur"} !
          </h1>
          <p className="text-muted-foreground">
            Retrouvez vos réservations et découvrez les prochains événements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold text-card-foreground mb-2">
              Mes réservations
            </h2>
            <p className="text-muted-foreground text-sm">
              Aucune réservation pour le moment.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold text-card-foreground mb-2">
              Prochains événements
            </h2>
            <p className="text-muted-foreground text-sm">
              Consultez la liste des événements disponibles.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
