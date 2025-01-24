import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'


const AppLayout = () => {
  return (
    <div>
      {/* 
        - 
        - Next we have the render point for the Routes after the Header
      */}
      <main className='mx-auto' style={{height : 'calc(100vh - 3rem)'}}>
        <Header /> 
        <Outlet />
      </main>
      {/* <div className='p-10 text-center bg-gray-800 mt-10'>Footer</div> */}
    </div>
  )
}

export default AppLayout