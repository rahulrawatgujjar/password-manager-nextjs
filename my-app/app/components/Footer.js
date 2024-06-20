"use client"
import React from 'react'

const Footer = () => {
  return (
    <>
      {/* <div className='bg-slate-800 text-white flex flex-col items-center gap-3 py-2'>
        <div className="logo font-bold text-2xl">
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>Mg/&gt;</span>
        </div>
        <div className='flex items-center gap-1'>
          Created with
          <lord-icon
            style={{ width: "23px" }}
            src="https://cdn.lordicon.com/biobqpgs.json"
            trigger="hover"
            colors="primary:#f28ba8,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30">
          </lord-icon>
          by Rahul Rawat
        </div>
      </div> */}
      <footer className="bg-slate-800 text-white text-center px-4 md:px-24 pt-6">
        <section>
          <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>Mg/&gt;</span>
          </div>
        </section>
        <section className="m-5 text-md">
          <div id="foot" className=" w-full footer-start flex justify-center gap-5 sm:gap-16">
            <div className="linkedin cursor-pointer hover:text-green-300"
              onClick={() => window.open("https://www.linkedin.com/in/rahul-rawat-gujjar", "_blank")}
            >
              <i className="fa-brands fa-linkedin"></i>
              <p className='text-sm'>LinkedIn</p>
            </div>
            <div className="email cursor-pointer hover:text-green-300"
              onClick={() => window.location.href = "mailto:rrg.rawat.developer@gmail.com?body=%0D%0A"}
            >
              <i className="fa-solid fa-envelope"></i>
              <p className='text-sm'>Email</p>
            </div>
            <div className="insta cursor-pointer hover:text-green-300"
              onClick={() => window.open("https://www.instagram.com/rahul.rawat.rrg/", "_blank")}
            >
              <i className="fa-brands fa-square-instagram"></i>
              <p className='text-sm'>Instagram</p>
            </div>
            <div className="x-twitter cursor-pointer hover:text-green-300"
              onClick={() => window.open("https://x.com/RahulRa02228239", "_blank")}
            >
              <i className="fa-brands fa-x-twitter"></i>
              <p className='text-sm'>X-Twitter</p>
            </div>
          </div>
        </section>
        <section>
          <span className="text-xs">&copy; 2024 | PassMg | All Rights Reserved</span>
        </section>
      </footer >
    </>
  )
}

export default Footer