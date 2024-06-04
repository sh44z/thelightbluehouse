import React from 'react'

const PlaceImg = ({place, index=0, className=null}) => {
  if (!place.addedPhotos?.length) {
    return "";
  }
  
  if (!className) {
    className = "object-cover"
  }

  return (
    
       
      <img className={className} src={"https://localhost:7000/uploads/"+place.addedPhotos[index]} alt='' />
    
    
   
  )
}

export default PlaceImg
