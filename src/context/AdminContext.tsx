'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { supabase } from '@/lib/supabaseClient'

interface AdminContextType {
  isAdmin: boolean
  editMode: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  toggleEditMode: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Chequear si ya hay una sesión activa al cargar la app
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        await validateAdmin(data.session.user.id)
      }

      setIsLoading(false)
    }
    loadSession()

    // Escuchar cambios de sesión
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await validateAdmin(session.user.id)
        }
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false)
          setEditMode(false)
        }
      }
    )

    return () => sub.subscription.unsubscribe()
  }, [])

  // Verificar si el usuario está en la tabla
  const validateAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('admins')
      .select('id')
      .eq('user_id', userId)
      .single()

    setIsAdmin(!!data)
  }

  // Login con email + password
  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.user) return false

    await validateAdmin(data.user.id)
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setIsAdmin(false)
    setEditMode(false)
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
