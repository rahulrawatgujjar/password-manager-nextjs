"use client"
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col items-center gap-3 py-2'>
      <div className="logo font-bold text-2xl">
        <span className='text-green-500'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-500'>Mg/&gt;</span>
      </div>
      <div className='flex items-center gap-1'>
        Created with
        <lord-icon
          style={{ width:"23px" }}
          src="https://cdn.lordicon.com/biobqpgs.json"
          trigger="hover"
          colors="primary:#f28ba8,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30">
        </lord-icon>
        by Rahul Rawat
      </div>
    </div>
  )
}

export default Footer
