"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';



const VerifyEmailPage = () => {

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    // console.log("urltoken:", urlToken)
    const decodedUrlToken = decodeURIComponent(urlToken);
    // console.log("decodedUrlToken: ", decodedUrlToken)
    setToken(urlToken);
  }, [searchParams])

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerified(true);
      setError(false);
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    if (token.length > 0) {
      // verifyUserEmail();
      // console.log(token);
    }
  }, [token])

  const handleClick = () => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }



  return (
    <>
      <Navbar />
      <div className='min-h-[calc(100vh-144.9px)]'>
        <Background />
        <div className='container mx-auto p-3 min-h-[60vh] flex flex-col justify-center items-center gap-3'>
          <h1 className='text-3xl font-bold my-4 text-slate-800'>Verify Email</h1>
          <div className='flex flex-col gap-5 p-5 m-1'>
            <h2 className='text-xl bg-green-200 text-black p-2 rounded-xl min-w-[300px] w-fit mx-auto break-all'>
              {token ? `${token}` : "no token"}
            </h2>
            <button onClick={handleClick} className='text-lg bg-green-500 rounded-full p-1 px-3 w-fit mx-auto disabled:bg-green-400 border border-green-700 active:ring-1 ring-green-700 cursor-pointer'>Click to verify</button>
            {verified && (
              <div className='text-center'>
                <h2 className='text-xl text-green-500'>Verified</h2>
                <Link className='hover:text-blue-500' href="/login">Click here to login</Link>
              </div>
            )}
            {error && (
              <h2 className='text-xl text-red-500'>Error</h2>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default VerifyEmailPage
