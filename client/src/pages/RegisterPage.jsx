import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [phone, setPhone] =  useState('');

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
    name, email, password, phone
   }); 

   alert("Registration Successful, now you can login")

    } catch (e) {
      alert("Registration Failed, Email already in use ")
    }
    
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className=''>
        <h1 className='text-4xl text-center mb-4 '>Register</h1>
     <form  className='max-w-md mx-auto flex flex-col' onSubmit={registerUser}>
       <input type='text' placeholder='Full Name' value={name} onChange={ev => setName(ev.target.value)} />
      <input type="email" placeholder='your@email.com' className='mb-4' value={email} onChange={ev => setEmail(ev.target.value)} />
      <input type="phone" placeholder='Phone number' className='mb-4' value={phone} onChange={ev => setPhone(ev.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
      <button className='primary '>Register</button>
      <div className='text-center py-2 text-gray-500'>
        Already have an account? <Link to="/login" className='underline text-black' >Login </Link>
      </div>
     </form>
      </div>
      
    </div>
  )
}

export default RegisterPage
