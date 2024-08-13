import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/_components/sidebar'
import Navbar from '../admin/_components/navbar'

const AdminLayout = () => {
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

export default AdminLayout