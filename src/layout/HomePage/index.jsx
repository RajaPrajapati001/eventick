import React from 'react'
import Header from '../../pages/user/Header'
import Footer from '../../pages/user/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout