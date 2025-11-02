import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database';
import { Suspense } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getEvents = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, { next: { revalidate: 1 } });
  const { events } = await response.json();
  return events;
}

const Home = async() => {
  const events = await getEvents();
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <section>
      <h1 className='text-center'>From Code to Community—Meet, Learn, Grow.</h1>
      <p className='text-center mt-5'>Hackathons , Meetups, and Conferences, All in One Place</p>
       <ExploreBtn />
       <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>

        <ul className="events">
                    {events && events.length > 0 && events.map((event: IEvent) => (
                        <li key={event.title} className="list-none">
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
       </div>
    </section>
    </Suspense>
  )
}

export default Home

//03:40:00