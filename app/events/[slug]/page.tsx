import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import { EventDetailsSkeleton } from "@/components/Skeletons";

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
  const { slug } = await params;

  return (
    <main>
      <Suspense fallback={<EventDetailsSkeleton /> }>
        <EventDetails params={slug} />
      </Suspense>
    </main>
  );
}
export default EventDetailsPage;
