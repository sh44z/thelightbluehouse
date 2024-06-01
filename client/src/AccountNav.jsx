import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
    const {pathname} = useLocation();
    let subpage = pathname.split("/")?.[2];
    if(subpage === undefined) {
        subpage ="profile"
    }

    function LinkClasses(type = null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';

        if (type === subpage ) {
          classes += ' bg-blue-300 rounded-full';
        } else {
            classes += "bg-gray-200"
        }
    
        return classes;
      }

  return (
    <nav className="w-full flex justify-center mt-8 mb-8 gap-4">
        <Link className={LinkClasses('profile')} to="/account">
          My Profile
        </Link>
        <Link className={LinkClasses('bookings')} to="/account/bookings">
          My Bookings
        </Link>
        <Link className={LinkClasses('places')} to="/account/places">
          My Accommodation
        </Link>
      </nav>
  )
}

export default AccountNav
