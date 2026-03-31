import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mon profil",
};

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mon profil
          </h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et préférences.
          </p>
        </div>

        <div className="max-w-xl rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4 mb-6">
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt="Avatar"
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-card-foreground">
                {user?.fullName ?? "—"}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.emailAddresses[0]?.emailAddress ?? "—"}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            La gestion complète du profil sera disponible prochainement.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
