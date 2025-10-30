'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { loginAdmin } = useAdmin()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const ADMIN_KEY = 'clave012'

    if (password === ADMIN_KEY) {
      loginAdmin()
      router.push('/')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login Admin</h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-brand text-white rounded-md p-2 hover:bg-brand/80"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
