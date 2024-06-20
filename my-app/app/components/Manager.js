"use client"
import React, { useEffect } from 'react'
import Background from './Background'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Typed from 'typed.js';
import Image from 'next/image';


const Manager = () => {

  const eyeRef = useRef(null);

  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  const passRef = useRef(null);

  const [src, setSrc] = useState('/icons/visibility.png');
  const [passType, setPassType] = useState("password")



  const getPasswords = async () => {
    const response = await fetch("/api/")
    const responseData = await response.json()
    const passwords = responseData.data;
    // const passwords = await response.json()
    if (passwords) {
      setPasswordArray(passwords);
    }
  }

  useEffect(() => {
    getPasswords();
  }, [])


  const showPassword = () => {
    console.log("show password")
    console.log(eyeRef.current.src)
    // if (eyeRef.current.src.includes("/icons/visibility.png")) {
    if (src === "/icons/visibility.png") {
      console.log("off")
      // eyeRef.current.src = "/icons/visibility_off.png"
      setSrc("/icons/visibility_off.png");
      setPassType("text");
      // passRef.current.type = "text"
    } else {
      // eyeRef.current.src = "/icons/visibility.png"
      setSrc("/icons/visibility.png");
      setPassType("password")
      // passRef.current.type = "password"
    }
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      // if we are editing then delete pre-existing data
      await fetch("/api/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: form.id })
      })

      // end

      const item = { ...form, id: uuidv4() }

      await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })

      setPasswordArray([...passwordArray, item]);
      setForm({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Password not saved!", {
        autoClose: 2000,
      });
    }
  }

  useEffect(() => {
    console.log(passwordArray)
  }, [passwordArray])


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }

  const deletePassword = async (id) => {
    const ready = confirm("Are you sure to delete?");
    if (ready) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      console.log("id to be deleted", id)
      await fetch("/api/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      })
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('Password deleted!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const editPassword = (id) => {
    const [item] = passwordArray.filter(item => item.id == id)
    setForm({ ...item, id })
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  }

  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Your own Password Manager'],
      typeSpeed: 50,
    });
    return () => {
      typed.destroy();
    };
  }, []);


  return (
    <>
      <Background />
      <div className="p-5 pb-10 md:px-0 md:mycontainer">
        <div className='py-3'>
          <h1 className='text-2xl md:text-4xl font-bold text-center'>
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>Mg/&gt;</span>
          </h1>
          <p className='text-base md:text-lg text-green-900 text-center'><span ref={el} /></p>
        </div>
        <div className='flex flex-col p-4 gap-8 items-center'>
          <input placeholder='Enter Website URL' className='rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' type="text" name="site" id="" value={form.site} onChange={handleChange} />
          <div className='flex flex-col md:flex-row justify-between gap-8 w-full'>
            <input placeholder='Enter Username' className='rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' type="text" name="username" id="" value={form.username} onChange={handleChange} />
            <div className='relative w-full'>
              <input ref={passRef} placeholder="Enter Password" className='rounded-full border border-green-500 p-4 py-1 w-full outline-none focus:outline-green-900 outline-offset-0' type={passType} name="password" id="" value={form.password} onChange={handleChange} />
              <span className='absolute right-[5px] top-[5px] cursor-pointer' onClick={showPassword}>
                <Image ref={eyeRef} className='p-1' width={25} height={25} src={src} alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className=' bg-green-500 w-fit rounded-full px-6 md:px-8 py-2 flex items-center gap-2 hover:bg-green-400 border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              style={{ "width": "25px", "height": "25px" }}
            >
            </lord-icon>
            <span>Save</span>
          </button>
        </div>
        <div className="passwords mt-3">
          <h2 className='text-xl md:text-2xl font-bold py-2'>Your Passwords</h2>
          <div className="outter overflow-x-auto">
            {
              (passwordArray.length === 0) ? (<div>No passwords to show</div>) : (
                <table className="table-auto w-full rounded-md overflow-hidden">
                  <thead className='bg-green-900 text-white'>
                    <tr>
                      <th className='py-2'>Website</th>
                      <th className='py-2'>Username</th>
                      <th className='py-2'>Password</th>
                      <th className='py-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-green-100'>
                    {
                      passwordArray.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className='p-2 text-center border border-white'>
                              <div className="flex items-center justify-center gap-1">
                                <a className='hover:text-green-700' href={(item.site.startsWith("https://")) ? item.site : ("https://" + item.site)} target='_blank'>{item.site}</a>
                                <div onClick={() => { copyText(item.site) }} className="lord-icon-copy p-1 flex items-center cursor-pointer">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                    trigger="hover"
                                    style={{ "width": "24px" }}>
                                  </lord-icon>
                                </div>
                              </div>
                            </td>
                            <td className='p-2 text-center border border-white'>
                              <div className="flex items-center justify-center gap-1">
                                <span>{item.username}</span>
                                <div onClick={() => { copyText(item.username) }} className="lord-icon-copy p-1 flex items-center cursor-pointer">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                    trigger="hover"
                                    style={{ "width": "24px" }}>
                                  </lord-icon>
                                </div>
                              </div>
                            </td>
                            <td className='p-2 text-center border border-white'>
                              <div className="flex items-center justify-center gap-1">
                                <span>{"*".repeat(item.password.length)}</span>
                                <div onClick={() => { copyText(item.password) }} className="lord-icon-copy p-1 flex items-center cursor-pointer">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                    trigger="hover"
                                    style={{ "width": "24px" }}>
                                  </lord-icon>
                                </div>
                              </div>
                            </td>
                            <td className='p-2 text-center border border-white'>
                              <div className="flex items-center justify-center gap-2">
                                <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                  <lord-icon
                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                    trigger="hover"
                                    style={{ "width": "24px" }}>
                                  </lord-icon>
                                </span>
                                <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                  <lord-icon
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    style={{ "width": "24px" }}>
                                  </lord-icon>
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
            }
          </div>

        </div>
      </div >
    </>
  )
}

export default Manager
