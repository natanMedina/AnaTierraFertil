'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

type AdminContextType = {
  isAdmin: boolean
  editMode: boolean
  loginAdmin: () => void
  logoutAdmin: () => void
  toggleEditMode: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isAdmin') === 'true'
      setIsAdmin(stored)
    }
  }, [])

  const loginAdmin = () => {
    localStorage.setItem('isAdmin', 'true')
    setIsAdmin(true)
  }

  const logoutAdmin = () => {
    localStorage.removeItem('isAdmin')
    setIsAdmin(false)
    setEditMode(false)
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  return (
    <AdminContext.Provider
      value={{ isAdmin, editMode, loginAdmin, logoutAdmin, toggleEditMode }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin debe usarse dentro de <AdminProvider>')
  return ctx
}
