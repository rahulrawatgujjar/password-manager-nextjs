"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';

const LoginPage = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (evt) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user)
      console.log("Login success.", response.data);
      router.push("/")
    } catch (error) {
      console.log("Login failed.");
      console.log(error.response.data)
      toast.error(error.response.data.error);
    }

    setLoading(false);

  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
        <div className='container mx-auto min-h-[60vh] p-3 flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold my-4 text-slate-800'>Login Page</h1>
          <div className='flex flex-col gap-5 text-lg' >
            <label htmlFor="email">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your email id' onChange={handleChange} type="text" value={user.email} name="email" />
            </label>
            <label htmlFor="password">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your password' onChange={handleChange} type="text" value={user.password} name="password" />
            </label>
            <button disabled={buttonDisabled} className='bg-green-500 rounded-full p-1 px-3 w-fit mx-auto disabled:bg-green-400 border border-green-700 active:ring-1 ring-green-700 cursor-pointer' onClick={onLogin}>Login</button>
            {loading && <div className='text-center'>processing...</div>}
            <Link className='text-center text-green-700 hover:text-blue-500 text-sm' href="/signup">Vist signup page</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>


  )
}

export default LoginPage
