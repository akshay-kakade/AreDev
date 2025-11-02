import React from "react";

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-dark-200/70 animate-pulse rounded-md ${className}`} />
);

export const EventCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-[300px] w-full rounded-lg" />
    <div className="flex flex-row gap-2 items-center">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-32" />
    </div>
    <Skeleton className="h-5 w-3/4" />
    <div className="flex flex-row gap-2 items-center">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="flex flex-row gap-2 items-center">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

export const EventDetailsSkeleton = () => (
  <section id="event">
    <div className="header">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-full max-w-xl" />
    </div>

    <div className="details">
      <div className="content">
        <Skeleton className="h-[320px] w-full rounded-lg" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded" /><Skeleton className="h-4 w-24" /></div>
            <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded" /><Skeleton className="h-4 w-20" /></div>
            <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded" /><Skeleton className="h-4 w-32" /></div>
            <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded" /><Skeleton className="h-4 w-16" /></div>
            <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded" /><Skeleton className="h-4 w-28" /></div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-[6px]" />
          ))}
        </div>
      </div>

      <aside className="booking">
        <div className="signup-card">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-full rounded-[6px]" />
        </div>
      </aside>
    </div>

    <div className="flex w-full flex-col gap-4 pt-20">
      <Skeleton className="h-6 w-40" />
      <div className="events">
        {Array.from({ length: 3 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export const AdminEventRowSkeleton = () => (
  <div className="glass rounded-xl p-4 flex items-center justify-between">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-16 rounded-xl" />
      <Skeleton className="h-8 w-20 rounded-xl" />
    </div>
  </div>
);
