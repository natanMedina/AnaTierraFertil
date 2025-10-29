'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { siteConfig } from '@/config/site'
import { ContactDialog } from '@/components/shared/ContactDialog'

export default function Header() {
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
          <Link href="/store" className="hover:text-primary transition">
            Tienda
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
        </nav>
      </div>
      {/* Dialog */}
      <ContactDialog open={open} onOpenChange={setOpen} />
    </header>
  )
}
