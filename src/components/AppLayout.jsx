import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { LayoutProvider, useLayout } from '../contexts/LayoutContext'

function InnerLayout() {
  const { collapsed, toggle } = useLayout()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar collapsed={collapsed} onClose={toggle} />

        <main className="flex-1 p-6 overflow-visible">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function AppLayout() {
  return (
    <LayoutProvider>
      <InnerLayout />
    </LayoutProvider>
  )
}
