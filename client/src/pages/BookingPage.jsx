import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import PlaceGallery from '../PlaceGallery';

const BookingPage = () => {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <a className='my-2 block font-semibold underline' target='_blank' href={"https://maps.google.com/?q="+booking.place.address}>{booking.place.address}</a>
      <PlaceGallery place={booking.place} />
    </div>
  )
}

export default BookingPage
