"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';

const SignupPage = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (evt) => {
    // console.log(evt)

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      // console.log("Signup success.", response.data);
      setLoading(false);
      router.push("/login")


    } catch (error) {
      console.log("Signup failed.");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-144.9px)]'>
        <Background />
        <div className='container mx-auto p-3 min-h-[60vh] flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold my-4 text-slate-800'>Signup Page</h1>
          <div className='flex flex-col gap-5 text-lg' >
            <label htmlFor="username">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your username' onChange={handleChange} type="text" value={user.username} name="username" />
            </label>
            {/* <label htmlFor="phone">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your phone number' onChange={handleChange} type="text" value={user.phone} name="phone" />
            </label> */}
            <label htmlFor="email">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your email' onChange={handleChange} type="text" value={user.email} name="email" />
            </label>
            <label htmlFor="password">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your password' onChange={handleChange} type="text" value={user.password} name="password" />
            </label>
            <button disabled={buttonDisabled} className='bg-green-500 rounded-full p-1 px-3 w-fit mx-auto disabled:bg-green-400 border border-green-700 active:ring-1 ring-green-700 cursor-pointer' onClick={onSignup}>Signup</button>
            {loading && <div className='text-center'>processing...</div>}
            <Link className='text-center text-green-700 hover:text-blue-500 text-sm' href="/login">Vist login page</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default SignupPage
