'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { siteConfig } from '@/config/site'

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
            Productos
          </Link>
          <Link href="/courses" className="hover:text-primary transition">
            Cursos
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-brand py-10">
          <DialogHeader>
            <DialogTitle className="text-center text-background text-xl">
              Serás redirigido a WhatsApp para comunicarte con {siteConfig.name}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-50 text-base py-2">
              ¿Deseas continuar?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-6">
            <div className="w-full flex items-center justify-center gap-4">
              <Button
                onClick={() => {
                  setOpen(false)
                  window.open(
                    `https://wa.me/${siteConfig.contact.whatsapp}`,
                    '_blank'
                  )
                }}
                variant="outline"
                className="bg-background hover:bg-background/60 text-brand"
              >
                Seguro
              </Button>

              <Button
                onClick={() => setOpen(false)}
                className="bg-background hover:bg-background/60 text-brand"
              >
                Por ahora no
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
