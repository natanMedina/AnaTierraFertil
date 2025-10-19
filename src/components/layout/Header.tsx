"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex items-center justify-between py-4 px-12">

        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <Image
            src="/logo.svg" // desde /public
            alt="Logo Ana Tierra Fértil"
            width={36}
            height={36}
          />
          <span className="text-xl font-semibold text-foreground">Ana Tierra Fértil</span>
        </Link>

        <nav className="flex items-center gap-9">
          <Link href="/productos" className="hover:text-primary transition">Productos</Link>
          <Link href="/cursos" className="hover:text-primary transition">Cursos</Link>
          <Link href="/servicios" className="hover:text-primary transition">Servicios</Link>
          <Link href="/novedades" className="hover:text-primary transition">Novedades</Link>

          <Button asChild className="bg-brand hover:bg-brand/80 text-white">
            <Link href="/contacto">Contacto</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
