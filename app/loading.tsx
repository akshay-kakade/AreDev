import { EventCardSkeleton, Skeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <section>
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-96" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="mt-20 space-y-7">
        <Skeleton className="h-6 w-40" />
        <ul className="events">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="list-none">
              <EventCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
