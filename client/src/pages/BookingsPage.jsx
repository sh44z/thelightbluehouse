import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios';
import PlaceImg from '../Placeimg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then(response => {
      setBookings(response.data);
    })
  }, [])

  return (
    <>
      <AccountNav />

      <div >
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className='flex flex-col sm:flex-row gap-4 bg-gray-100 rounded-2xl overflow-hidden' key={booking._id}>
            <div className='w-full sm:w-48'>
              <PlaceImg place={booking.place} />
            </div>
            <div className='py-3 pr-3'>
              <h2 className='text-l'>{booking.place.title}</h2>
             <div className='border-t border-gray-400 mt-2 pt-2'>
              <b>Check in:</b> {format(new Date(booking.checkIn), "dd-MM-yyyy")} <br />
              <b>Check out:</b> {format(new Date(booking.checkOut), "dd-MM-yyyy")}
            </div>
            <div className='mt-2 text-lg'>
               {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <b>{" "}Nights</b> | <b>Total Price £</b>{booking.price}
            </div>
            </div>
          </Link>
        
          

        ))}
      </div>
   
    </>
  )
}

export default BookingsPage
