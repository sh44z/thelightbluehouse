import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../Placeimg';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className='text-center'>
        <Link
          className='bg-blue-300 text-white rounded-full py-2 px-6 gap-1 inline-flex'
          to={'/account/places/new'}
        >
          + Add New Place
        </Link>
      </div>

      <div className='mt-8'>
        {places.length > 0 &&
          places.map((place, index) => (
            <Link to={"/account/places/"+place._id} key={place.id || index} className="flex cursor-pointer gap-4 p-4 rounded-2xl">
              <div className='flex w-32 h-32 grow shrink-0'>
                <PlaceImg place={place} />
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
