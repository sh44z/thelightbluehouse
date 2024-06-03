
import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className=" flex bg-gray-100 text-black text-center p-4 w-full mt-4" >
      <div div className="mx-auto">
        <div>
          <Link to={"/terms"}>Terms of Use</Link>
          <Link>Contact us</Link> 
        </div> <br />
        <div> 
          <p>&copy; 2024 The Light Blue house Company. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
