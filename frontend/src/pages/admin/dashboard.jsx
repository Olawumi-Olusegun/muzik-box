import React from 'react'
import {  Outlet } from 'react-router-dom'
import Sidebar from './_components/sidebar';
import Navbar from './_components/navbar';


const AdminDashboard = () => {

  return (
    <div className='flex'>
      <aside className="min-h-screen">
        <Sidebar />
      </aside>
      <main className="flex-1">
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}

export default AdminDashboard