'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

interface AdminContextType {
  isAdmin: boolean
  editMode: boolean
  isLoading: boolean
  login: (password: string) => boolean
  logout: () => void
  toggleEditMode: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('isAdmin')
    if (stored === 'true') {
      setIsAdmin(true)
    }
    setIsLoading(false)
  }, [])

  const login = (password: string) => {
    if (
      password === 'clave012'
    ) {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    setEditMode(false)
    localStorage.removeItem('isAdmin')
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  return (
    <AdminContext.Provider
      value={{ isAdmin, editMode, isLoading, login, logout, toggleEditMode }}
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
