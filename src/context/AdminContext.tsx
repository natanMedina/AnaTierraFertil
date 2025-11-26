'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Session, User } from '@supabase/supabase-js'

interface AdminContextType {
  session: Session | null
  user: User | null
  isAdmin: boolean
  editMode: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  toggleEditMode: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState<boolean>(false)

  // sincronización/flags
  const [authResolved, setAuthResolved] = useState(false)
  const [adminResolved, setAdminResolved] = useState(false)
  const isLoading = !(authResolved && adminResolved)

  const listenerFiredRef = useRef(false) // para saber si onAuthStateChange ya notificó
  const initialTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    // Solo corre en el cliente
    const stored = localStorage.getItem('admin:editMode')
    setEditMode(stored === '1')
  }, [])

  // 1) Obtener sesión inicial y suscribirse a cambios de auth
  useEffect(() => {
    let mounted = true

    const init = async () => {
      // 1a) obtiene sesión conocida (si hay)
      try {
        const { data } = await supabase.auth.getSession()
        if (!mounted) return
        setSession(data.session ?? null)
        setUser(data.session?.user ?? null)
        // si ya hay sesión, marcamos authResolved (no necesitamos esperar el listener)
        if (data.session) {
          listenerFiredRef.current = true
          setAuthResolved(true)
        }
      } catch (err) {
        console.error('getSession error', err)
      }

      // 1b) subscribe a onAuthStateChange — lo usamos para confirmar/actualizar estado
      const { data: sub } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          // el listener puede dispararse inmediatamente en algunos entornos
          listenerFiredRef.current = true
          setSession(session ?? null)
          setUser(session?.user ?? null)
          setAuthResolved(true)
        }
      )

      // 1c) fallback: si ni getSession ni el listener nos han resuelto auth en X ms,
      // consideramos la resolución (evita redirecciones infinitas en casos raros).
      initialTimeoutRef.current = window.setTimeout(() => {
        if (!listenerFiredRef.current) {
          // No hubo evento -> aún así marcamos que auth fue resuelta (aunque user = null)
          setAuthResolved(true)
        }
      }, 1500)

      return () => {
        mounted = false
        try {
          sub.subscription.unsubscribe()
        } catch {}
        if (initialTimeoutRef.current) {
          clearTimeout(initialTimeoutRef.current)
        }
      }
    }

    init()

    // nota: init devuelve cleanup en la misma closure, React manejará la limpieza
    return () => {
      // React cleanup: si init aún no retornó cleanup, no hacemos nada extra
    }
  }, [])

  // 2) Verificar si es admin — solo correr cuando authResolved sea true
  useEffect(() => {
    let mounted = true
    setAdminResolved(false) // cada vez que user cambie, volvemos a comprobar

    const doCheck = async () => {
      // Si aún no se resolvió el auth (podría no haber user aun), espera
      if (!authResolved) {
        // no hacemos nada, el efecto volverá a correr cuando authResolved cambie
        return
      }

      // si no hay user después de authResolved => no es admin
      if (!user) {
        if (!mounted) return
        setIsAdmin(false)
        setAdminResolved(true)
        return
      }

      try {
        const { data, error } = await supabase
          .from('admins')
          .select('user_id')
          .eq('user_id', user.id)
          .limit(1)
          .maybeSingle()

        if (!mounted) return

        if (error) {
          console.error('Error comprobando admin:', error)
          setIsAdmin(false)
        } else {
          setIsAdmin(Boolean(data))
        }
      } catch (err) {
        console.error('checkAdmin exception', err)
        if (mounted) setIsAdmin(false)
      } finally {
        if (mounted) setAdminResolved(true)
      }
    }

    doCheck()

    return () => {
      mounted = false
    }
  }, [user, authResolved])

  // persistir editMode
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (editMode) localStorage.setItem('admin:editMode', '1')
    else localStorage.removeItem('admin:editMode')
  }, [editMode])

  // login con email + contraseña
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.user) return false
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setIsAdmin(false)
    setEditMode(false)

    setAdminResolved(true)
    setAuthResolved(true)
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  return (
    <AdminContext.Provider
      value={{
        session,
        user,
        isAdmin,
        editMode,
        isLoading,
        login,
        logout,
        toggleEditMode,
      }}
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
