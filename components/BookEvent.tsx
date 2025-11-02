'use client';
import { CreateBooking } from '@/lib/actions/booking.action';
import  { useState } from 'react'
import posthog from 'posthog-js'


const BookEvent = ({ eventId, slug }: { eventId: string, slug: string}) => {

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
     e.preventDefault();
     const  { success } = await CreateBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture('event_booked', { eventId, slug, email });
    } else {
      console.error('Booking failed:');
      posthog.captureException("Booking creation failed");
    }

   

    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  }
  return (
    <div id='book-event'>
      {submitted ? (
       
          <h3>Thank you for booking!</h3>
         
          ):(
            <form onSubmit={handleSubmit}>
                   <div>
                     <label htmlFor="email">Email Address</label>
                     <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} 
                     id='email' placeholder='Enter Your Email Address'/>
                   </div>
                    <button type='submit' className='button-submit'>Book Now</button>
            </form>
          )}
       
    </div>
  )
}

export default BookEvent
