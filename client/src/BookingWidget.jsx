import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { differenceInBusinessDays, addDays } from 'date-fns';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('1');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }

    // Generate random check-in and check-out dates within the next two months
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 60); // Random number of days within the next 2 months
    const randomCheckIn = addDays(today, randomDays);
    const randomCheckOut = addDays(randomCheckIn, 4); // 4 nights

    setCheckIn(randomCheckIn.toISOString().split('T')[0]);
    setCheckOut(randomCheckOut.toISOString().split('T')[0]);
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInBusinessDays(new Date(checkOut), new Date(checkIn));
  } 

  const bookThisPlace = async () => {
    if (!user) {
      setRedirect('/login');
      return;
    }

    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        <b>Price Per Night: £</b> {place.price}
      </div>
      <div className="flex flex-col">
        <div className="bg-gray-100 py-4 px-4 rounded-2xl">
          <label>Check In: </label>
          <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
        </div>
        <div className="bg-gray-100 py-4 px-4 rounded-2xl">
          <label>Check Out:</label>
          <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
        </div>
        <div className="bg-gray-100 py-4 px-4 rounded-2xl">
          <label>Number of Guests:</label>
          <input type="number" value={numberOfGuests} onChange={(ev) => setNumberOfGuests(ev.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="bg-gray-100 py-4 px-4 rounded-2xl">
            <label>Your Full Name:</label>
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />

            <label>Phone Number:</label>
            <input type="number" value={mobile} onChange={(ev) => setMobile(ev.target.value)} />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book This Place
        {numberOfNights > 0 && <span> £{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
