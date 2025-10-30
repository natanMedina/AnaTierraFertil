'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import { ContactDialog } from '@/components/shared/ContactDialog'
import { useAdmin } from '@/context/AdminContext'

export default function Header() {
  const { isAdmin, editMode, toggleEditMode, logoutAdmin } = useAdmin()
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex items-center justify-between py-4 px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <Image
            src="/logo.svg"
            alt={`Logo ${siteConfig.name}`}
            width={36}
            height={36}
          />
          <span className="text-xl font-semibold text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-9">
          <Link href="/biography" className="hover:text-primary transition">
            Conoceme
          </Link>
          <Link href="/products" className="hover:text-primary transition">
            Productos
          </Link>
          <Link href="/services" className="hover:text-primary transition">
            Servicios
          </Link>
          <Link href="/news" className="hover:text-primary transition">
            Novedades
          </Link>

          {/* Contact Button */}
          <Button
            onClick={() => setOpen(true)}
            className="bg-brand hover:bg-brand/80 text-white"
          >
            Contacto
          </Button>

          {isAdmin ? (
            <>
              <Button
                variant="outline"
                onClick={toggleEditMode}
                className={`w-45 rounded-md ${
                  editMode
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {editMode ? 'Salir del modo edición' : 'Entrar al modo edición'}
              </Button>
              <Button
                onClick={logoutAdmin}
                className="px-3 py-1 bg-red-400 hover:bg-red-800 text-white rounded-md"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Link
              href="/admin/login"
              className="px-3 py-1 bg-gray-300 text-white rounded-md"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
      <ContactDialog open={open} onOpenChange={setOpen} />
    </header>
  )
}
