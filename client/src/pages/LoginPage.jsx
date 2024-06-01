import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const {setUser} = useContext(UserContext);

  async  function handleLoginSubmit(e) {
    e.preventDefault(); 
    try{
      const {data} = await axios.post("/login", {email, password}, );
      setUser(data);
      alert( "Login Successful" );
      setRedirect(true);
    } catch (err){
      alert("Log in Failed");
    };
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className=''>
        <h1 className='text-4xl text-center mb-4 '>Login</h1>
     <form  className='max-w-md mx-auto flex flex-col ' onSubmit={handleLoginSubmit}>
      <input type="email" placeholder='your@email.com' value={email} onChange={ev => setEmail(ev.target.value)} className='mb-4' />
      <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
      <button className='primary ' type="submit">Login</button>
      <div className='text-center py-2 text-gray-500'>
        Dont have an Account yet? <Link to="/register" className='underline text-black' >Register Now</Link>
      </div>
     </form>
      </div>
      
    </div>
  )
}

export default LoginPage
