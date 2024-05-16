"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';



const ProfilePage = () => {

  const router = useRouter();

  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me")
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch user data.");
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data)
    }
  }



  return (
    <div className='container mx-auto min-h-[85vh] flex flex-col items-center justify-center gap-3'>
      <h1 className='text-2xl'>Profile Page</h1>
      <div className='flex flex-col gap-3 p-3'>
        <div>
          {data.length ? <Link className='hover:text-blue-500' href={`/profile/${data}`}>{data}</Link> : "Nothing to show here."}
        </div>
        <button onClick={getUserDetails} className='bg-purple-500 hover:ring-2 ring-purple-700 p-2 rounded-xl w-fit mx-auto'>Get user data</button>
        <button onClick={logout} className='bg-red-500 hover:ring-2 ring-red-700 p-2 rounded-xl w-fit mx-auto'>Logout</button>
      </div>
    </div>
  )
}

export default ProfilePage
