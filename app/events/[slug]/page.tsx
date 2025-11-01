import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsItem = ({ icon, alt, label}: {icon: string, alt: string, label: string}) => (
   <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
   </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
     <div className="agenda">
      <h2>Agenda</h2>
      <ul>
          {agendaItems.map((item) => (
            <li key={item}> {item} </li>
          ))}
      </ul>
     </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)




const EventDetails = async({ params }: { params: Promise<{slug: string}>}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`, { cache: 'no-store' });
  const { event: {description, image , overview, date, time, agenda, location, audience, orginizer, tags , mode} } = await request.json();

  if (!description) return notFound();
  const bookings = 10;

  
// eslint-disable-next-line
// @ts-ignore
  const similarEvents : IEvent[] = await getSimilarEventsBySlug(slug);

  return (
     <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">
               
                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

              <section className="flex-col-gap-2">
                <h2>Overview</h2>
                <p>{overview}</p>
                
              </section>

        <section className="flex-col-gap-2">
                <h2>Event Details</h2>
                <EventDetailsItem icon="/icons/calendar.svg" alt="calendar" label={date} />                         
                <EventDetailsItem icon="/icons/clock.svg" alt="clock" label={time} />                         
                <EventDetailsItem icon="/icons/pin.svg" alt="location" label={location} />                         
                <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={mode} />                                  
                <EventDetailsItem icon="/icons/audience.svg" alt="audience" label={audience} />                                  
              </section>

              <EventAgenda agendaItems={agenda}/>
        
              <section className="flex-col-gap-2">
                <h2>Abot the Orginizer</h2>
                <p>{orginizer}</p>
              </section>

              <EventTags tags={tags}/>

        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join { bookings} People who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">
                Be the first one to book a spot!
              </p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
       <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
         <EventCard key={similarEvent.title} {...similarEvent} />
          ))}
        </div>
       </div>
    </section>
  )
}

export default EventDetails
//03:03:30