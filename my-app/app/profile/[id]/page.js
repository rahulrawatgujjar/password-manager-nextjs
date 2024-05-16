import React from 'react'

const ProfileIdPage = ({params}) => {
  return (
    <div className='container mx-auto min-h-[85vh] flex flex-col items-center justify-center gap-3'>
      <h1 className='text-2xl'>My Profile</h1>
      <div className='bg-orange-500 rounded-xl p-2'>
        {params.id}
      </div>
    </div>
  )
}

export default ProfileIdPage
