import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-purple-300 h-full w-full flex'>
        <div className='w-[17%] h-full bg-red-200 flex items-center justify-center'>
            LOGO
        </div>
        <div className='w-[83%] h-full bg-red-400 flex justify-center items-center'>
            TITLE
        </div>
        
    </div>
  )
}

export default Navbar