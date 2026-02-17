import React, { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export function LayoutProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => setCollapsed((c) => !c)
  return (
    <LayoutContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
