import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPhotos,setShowAllPhotos] = useState(false);

    if (!place) {
        return <div>Loading...</div>;
    };
    
    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white  min-h-screen'>
                <div className='bg-black text-white p-8 grid gap-4'>
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
                        <img src={"https://thelightbluehouse.onrender.com/uploads/"+photo } />
                    </div>
                        )) }    
                </div>
    
                
            </div>
        )
    }
    

  return (
    <div className='relative'>
            <div className='grid gap-2 grid-cols-[2fr_1fr] overflow-hidden'>
                 <div>
                    {place.addedPhotos?.[0] && (
                    <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={"https://thelightbluehouse.onrender.com/uploads/"+place.addedPhotos[0]} alt='' /> 
                    )}
                </div>
            <div className='grid'>
                {place.addedPhotos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={"https://thelightbluehouse.onrender.com/uploads/"+place.addedPhotos[1]} alt='' /> 
                )}
                <div className='overflow-hidden'>
                {place.addedPhotos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer relative top-2' src={"https://thelightbluehouse.onrender.com/uploads/"+place.addedPhotos[2]} alt='' /> 
                )}
                </div>
                
            </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-2 py2 px-4 bg-white rounded-2xl '>Show More Photos</button>
        </div>
  )
}

export default PlaceGallery
