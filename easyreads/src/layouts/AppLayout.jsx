import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'


const AppLayout = () => {
  return (
    <div>
      {/* 
        I have an always-on-top header.
        The pages will change, and there will be no scrolling for pages. 
      */}
      <main className='mx-auto' style={{height : 'calc(100vh - 3rem)'}}>
        <Header /> 
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout