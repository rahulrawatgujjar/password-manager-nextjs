"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { handleClientScriptLoad } from 'next/script';



const VerifyEmailPage = () => {

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    console.log("urltoken:",urlToken)
    const decodedUrlToken= decodeURIComponent(urlToken);
    console.log("decodedUrlToken: ",decodedUrlToken)
    setToken(urlToken);
  }, [])

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
      console.log(token);
    }
  }, [token])

  const handleClick = () => {
    if (token.length>0){
      verifyUserEmail()
    }
  }
  


  return (
    <div className='container mx-auto p-3 min-h-[85vh] flex flex-col justify-center items-center gap-3'>
      <h1 className='text-2xl'>Verify Email</h1>
      <div className='flex flex-col gap-5 p-5 m-1'>
        <h2 className='text-xl bg-orange-400 text-black p-2 rounded-xl w-fit mx-auto'>
          { token ? `${token}` : "no token"}
        </h2>
        <button onClick={handleClick} className='bg-purple-500 p-2 rounded-xl w-fit mx-auto'>Click to verify</button>
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
  )
}

export default VerifyEmailPage
