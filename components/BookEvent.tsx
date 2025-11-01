'use client';
import  { useState } from 'react'

const BookEvent = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
