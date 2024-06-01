import React, { useEffect, useState } from 'react'
import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


const PlacesFormPage = () => {
    const {id} = useParams();
    
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");  
    const [description, setDescription]  = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks]  = useState([]);
    const [extraInfo, setExtraInfo]  = useState("");
    const [checkIn, setCheckIn]  = useState("");
    const [checkOut, setCheckOut]  = useState("");
    const [maxGuests, setMaxGuests]  = useState(1);
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
          return;
        }
      
        axios.get("/places/" + id).then((response) => {
          const { data } = response;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.addedPhotos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price);
        });
      }, [id]);
      

    const inputHeader = (text) => {
        return ( <h2 className='text-2xl mt-4'>{text}</h2> )
     }
 
     const inputDescription = (text) =>{
        return( <p className='text-gray-500 text-sm'>{text}</p>  )
     } 
 
     const preInput = (header, description) => {
         return (
             <>  
              {inputHeader(header)}
              {inputDescription(description)}
             </>
         )
     }
 
    
     const savePlace = async (ev) => {
         ev.preventDefault();
         const placeData = {title, address, 
          addedPhotos, description, perks, 
           extraInfo, checkIn, checkOut, maxGuests, price};

         if (id) {
          //update place
          await axios.put("/places", {
            id, ...placeData
          } );
            setRedirect(true)
         } else {
         //new place          
         await axios.post("/places", placeData);
             setRedirect(true)
         }
     }
     
     if(redirect){
         return <Navigate to="/account/places" /> }

  return (
    <div>
    <AccountNav />
    <form onSubmit={savePlace} encType="multipart/form-data">
        {preInput('Title', 'Your Title should be Short and Catchy')}
        
        <input value={title} onChange={ev => setTitle(ev.target.value)} className='text-xl mt-4' type='text' placeholder='My Beautiful Apartment'></input>
         
         {preInput("Address", "Road Name, City, County, Country")}
        <input value={address} onChange={ev => setAddress(ev.target.value)} type="text" placeholder='Address' />
        
        {preInput("Photos", "More = better")}      
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        
        {preInput("Description", "Description of the place you are listing")}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

        {preInput("Perks", "Select all the Perks that apply")}                                    
        <div className='grid grid-cols-2 mt-2 gap-2 md:grid-cols-4 lg:grid-cols-6'>
        <Perks selected={perks} onChange={setPerks}/>
        </div>

        {preInput("Extra Information", "House Rules and Cancellation Policy")}                    
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

        {preInput("Check in Checkout Times", "Add Checkin Checkout times, remember to leave a window for cleaning between guests")}                
        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
            <div>
                <h3 className='mt-2 -mb-2'>Check In Time</h3>
               <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder='14:00' /> 
            </div>
            <div>
                <h3 className='mt-2 -mb-2'>Check Out Time </h3>
               <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder='11:00' />
            </div>
            <div>
                <h3 className='mt-2 -mb-2'>Maximum Number Of Guests </h3>
                <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" />
            </div>
            <div>
                <h3 className='mt-2 -mb-2'>Price Per Night  </h3>
                <input value={price} onChange={ev => setPrice(ev.target.value)} type="number" />
            </div>
            
            
        </div>
        <div>
                <button className='primary my-4'>Save</button>
            </div>
     </form>

</div>
  )
}

export default PlacesFormPage
