import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const SideLink = ({name, to , icon}) => {
        return(
            <NavLink 
                className='h-[15%] bg-green-300 flex items-center justify-center'
                to={to}
            >
                <div className='h-full w-[30%] bg-pink-300 flex items-center justify-center'>
                    <i class={`${icon} text-xl`}></i>
                </div>
                <div className='h-full w-[70%] flex items-center justify-center'>
                    {name}
                </div>
            </NavLink>
        )
    }

  return (
    <div className='flex flex-col h-[100%]'>
        <SideLink name={`JASH`} to={`/`} icon={'ri-link'} />
        <SideLink name={`JASH`} to={`/`} icon={'ri-link'} />
        <SideLink name={`JASH`} to={`/`} icon={'ri-link'} />
    </div>
  )
}

export default Sidebar