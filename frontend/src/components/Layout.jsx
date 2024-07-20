import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <>
        <div className='h-[100vh] w-full bg-blue-200 flex flex-col overflow-auto'>
            <div className='w-full h-[12%] bg-red-300'>
                <Navbar />
            </div>
            <div className='w-full h-[88%] flex bg-yellow-300'>
                <div className='w-[17%] bg-blue-300'>
                    <Sidebar />
                </div>
                <div className='w-[83%]'>
                    {children}
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout