
import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className=" bg-gray-100 text-black text-center p-4 w-full" >
      <div div className="flex flex-col container mx-auto">
        <div>
          <Link to={"/terms"}>Terms of Use</Link>
        <p>Contact us</p> <br />
        </div>
        <div>
          <p>&copy; 2024 The Light Blue house Company. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
