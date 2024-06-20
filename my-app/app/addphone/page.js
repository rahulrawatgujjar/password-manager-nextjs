"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';

const AddPhonePage = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    phone: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const addPhone = async (evt) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/whatsapp/addphone", user)
      console.log("Phone number added  successfully.", response.data);
      router.push("/")
    } catch (error) {
      console.log("Failed to add phone number.");
      console.log(error.response.data)
      toast.error(error.response.data.error);
    }

    setLoading(false);

  };

  useEffect(() => {
    if (user.phone.length>10) {
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
      <div className='min-h-[calc(100vh-216.9px)]'>
        <Background />
        <div className='container mx-auto min-h-[60vh] p-3 flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold my-4 text-slate-800'>Add Phone Number</h1>
          <div className='flex flex-col gap-5 text-lg' >
            <label htmlFor="phone">
              <input className='text-base rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' placeholder='Enter your phone number' onChange={handleChange} type="text" value={user.phone} name="phone" />
            </label>
            <button disabled={buttonDisabled} className='bg-green-500 rounded-full p-1 px-3 w-fit mx-auto disabled:bg-green-400 border border-green-700 active:ring-1 ring-green-700 cursor-pointer' onClick={addPhone}>Add Phone</button>
            {loading && <div className='text-center'>processing...</div>}
            <Link className='text-center text-green-700 hover:text-blue-500 text-sm' href="/">Vist main page</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>


  )
}

export default AddPhonePage
