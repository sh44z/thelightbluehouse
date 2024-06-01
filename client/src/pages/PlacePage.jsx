import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';

const PlacePage = () => {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    useEffect(() => {
      if (!id) {
          return;
      }
  
      axios.get(`/places/${id}`).then((response) => {
          setPlace(response.data);
      });
  }, [id]); // Dependency array for useEffect

  if (!place) {
    return <div>Loading...</div>;
};

if (showAllPhotos) {
    return (
        <div className='absolute inset-0 bg-white  min-h-screen'>
            <div className='p-8 grid gap-4'>
                <div>
                    <h2 className='text-3xl mr-36'>Photos of {place.title}</h2>
                    <button onClick={() => setShowAllPhotos(false)} className='fixed top-2 gap-1 rounded-full text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                {place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo => (
                <div>
                    <img src={"http://localhost:7000/uploads/"+photo } />
                </div>
                    )) }    
            </div>

            
        </div>
    )
}

return (
    <div className="mt-4 -mx-8 px-8 pt-8">
        <h1 className='text-2xl'>{place.title}</h1>
        <a className='my-2 block font-semibold underline' target='_blank' href={"https://maps.google.com/?q="+place.address}>{place.address}</a><br/>
        
        <PlaceGallery place={place} />

        <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
            
            
            <div>
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>Description </h2>
                    {place.description}
                
                </div>
                <b>Check In:</b> {place.checkIn}<br />
                <b>Check Out:</b>  {place.checkOut}<br />
                <b>Max Number of Guests:</b>  {place.maxGuests}<br />
                
                
            </div>
           <div>
            <BookingWidget place={place} />
           </div>
        </div> 
        <div className='bg-white -mx-8 px-8 py-8'>
            <div className='font-semibold'>Extra Info</div>
            <div className='mb-4 mt-2 text-sm text-gray-500 leading-5'>{place.extraInfo}</div>
        </div>
        
    </div>
);

}

export default PlacePage
