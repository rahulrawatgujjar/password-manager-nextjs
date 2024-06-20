"use client"
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

const Navbar = () => {

  const router = useRouter();

  const path = usePathname();

  const logoutBtnRef = useRef(null);

  const addPhoneBtnRef = useRef(null);

  useEffect(() => {
    if (path === "/") {
      logoutBtnRef.current.style.display = "flex";
      addPhoneBtnRef.current.style.display = "flex";
    }
  }, [path])


  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.error)
    }
  }

  const addPhone = async () => {
    router.push("/addphone")
  }


  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-2 ">
        <div className="logo font-bold text-2xl">
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>Mg/&gt;</span>
        </div>
        <div className='buttons flex gap-2 sm:gap-5 items-center'>
          <button title='github' onClick={() => { window.open("https://github.com/rahulrawatgujjar", "_blank") }} className='flex items-center gap-3 hover:bg-green-700 p-1 rounded-full ring-white active:ring-1 w-fit h-fit'>
            <Image width={7} height={7} className='invert w-7  ' src="/icons/github.svg" alt="github" />
            <span className='font-bold hidden xl:inline'>GitHub</span>
          </button>
          <button title='logout' ref={logoutBtnRef} onClick={logout} className='hidden items-center gap-3 hover:bg-green-700 p-1 rounded-full ring-white active:ring-1'>
            <span className=" w-7 h-7 material-symbols-outlined invert bg-black rounded-full p-1">
              logout
            </span>
            <span className='font-bold hidden xl:inline'>Logout</span>
          </button>
          <button title='add phone' ref={addPhoneBtnRef} onClick={addPhone} className='hidden items-center gap-3 hover:bg-green-700 p-1 rounded-full ring-white active:ring-1'>
            {/* <span className=" w-7 h-7 material-symbols-outlined invert bg-black rounded-full p-1">
              logout
            </span> */}
            <span className='w-7 h-7 rounded-full p-1 flex items-center justify-center'>
              <i className="fa-brands fa-whatsapp text-3xl"></i>
            </span>
            <span className='font-bold hidden xl:inline'>Whatsapp</span>
          </button>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
