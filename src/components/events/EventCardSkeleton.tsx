export function EventCardSkeleton() {
  return (
    <div className="card-event overflow-hidden pointer-events-none">
      {/* Color band */}
      <div className="skeleton h-1 w-full" />

      <div className="p-5 space-y-3">
        {/* Date */}
        <div className="skeleton h-4 w-2/5 rounded" />

        {/* Title */}
        <div className="skeleton h-5 w-4/5 rounded" />
        <div className="skeleton h-5 w-3/5 rounded" />

        {/* Short desc */}
        <div className="space-y-1.5 pt-1">
          <div className="skeleton h-3.5 w-full rounded" />
          <div className="skeleton h-3.5 w-3/5 rounded" />
        </div>

        {/* Badges */}
        <div className="flex gap-2 pt-1">
          <div className="skeleton h-5 w-20 rounded-full" />
          <div className="skeleton h-5 w-16 rounded-full" />
        </div>

        {/* Capacity */}
        <div className="space-y-1.5 pt-1">
          <div className="skeleton h-3 w-1/4 rounded" />
          <div className="skeleton h-1 w-full rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-1">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function EventCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
