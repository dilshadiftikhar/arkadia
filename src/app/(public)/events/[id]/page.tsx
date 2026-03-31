import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventDetail } from "@/components/events/EventDetail";

interface EventPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  // In production, fetch event data here to build dynamic metadata
  return {
    title: `Événement #${params.id}`,
  };
}

export default function EventPage({ params }: EventPageProps) {
  if (!params.id) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <EventDetail id={params.id} />
      </main>
      <Footer />
    </div>
  );
}
