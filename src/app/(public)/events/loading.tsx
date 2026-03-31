import { EventCardSkeletonGrid } from "@/components/events/EventCardSkeleton";

export default function EventsLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero skeleton */}
      <section className="hero-gradient py-14 px-4 text-center border-b border-ink-700">
        <div className="skeleton h-9 w-96 max-w-full mx-auto rounded" />
        <div className="skeleton h-5 w-72 max-w-full mx-auto mt-3 rounded" />
      </section>

      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters skeleton */}
          <aside className="md:w-56 lg:w-64 shrink-0 space-y-3">
            <div className="skeleton h-4 w-16 rounded" />
            <div className="flex flex-wrap gap-2">
              {[80, 64, 96, 80].map((w, i) => (
                <div key={i} className={`skeleton h-7 rounded-md`} style={{ width: w }} />
              ))}
            </div>
          </aside>

          {/* Cards skeleton */}
          <div className="flex-1">
            <EventCardSkeletonGrid count={6} />
          </div>
        </div>
      </div>
    </div>
  );
}
