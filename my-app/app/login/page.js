"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      router.push("/profile")
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
    <div className='container mx-auto p-3 min-h-[85vh] flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold my-2'>Login Page</h1>
      <div className='flex flex-col gap-3 text-lg' >
        <label htmlFor="email">Email:<br />
          <input className='px-4 py-1 text-black rounded-full text-base' placeholder='tony@gmail.com' onChange={handleChange} type="text" value={user.email} name="email" />
        </label>
        <label htmlFor="password">Password:<br />
          <input className='px-4 py-1 text-black rounded-full text-base' placeholder='' onChange={handleChange} type="text" value={user.password} name="password" />
        </label>
        <button disabled={buttonDisabled} className='bg-purple-500 rounded-full p-1 px-3 w-fit mx-auto disabled:bg-purple-400' onClick={onLogin}>Login</button>
        {loading && <div className='text-center'>processing...</div>}
        <Link className='text-center hover:text-blue-500' href="/signup">Vist signup page</Link>
      </div>
    </div>
  )
}

export default LoginPage
