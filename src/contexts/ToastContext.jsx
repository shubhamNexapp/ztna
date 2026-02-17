import React, { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

let idCounter = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, { duration = 3000, type = 'info' } = {}) => {
    const id = idCounter++
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, duration)
  }, [])

  const value = { showToast }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed z-50 right-4 bottom-4 flex flex-col gap-2 items-end">
        {toasts.map((t) => (
          <div key={t.id} className={`max-w-sm w-full px-4 py-2 rounded shadow-md text-sm text-white ${t.type === 'error' ? 'bg-rose-600' : 'bg-indigo-600'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastContext
