'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-[#111827]">
      <div className="mx-auto w-full max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition"
            >
              <Image
                src="/logo.svg"
                alt={`Logo ${siteConfig.name}`}
                width={28}
                height={28}
              />
              <span
                className="text-base font-semibold"
                style={{ color: '#FFFFFF' }}
              >
                {siteConfig.name}
              </span>
            </Link>
            <p
              className="text-sm leading-6 max-w-xs"
              style={{ color: '#9CA3AF' }}
            >
              Cuidado natural para la salud femenina con sabiduría ancestral.
            </p>
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <h3
              className="text-sm font-semibold tracking-wide"
              style={{ color: '#FFFFFF' }}
            >
              Servicios
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#9CA3AF' }}>
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Salud Femenina
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Cuidado Prenatal
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Yoga Terapéutico
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Consultas
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="space-y-4">
            <h3
              className="text-sm font-semibold tracking-wide"
              style={{ color: '#FFFFFF' }}
            >
              Recursos
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#9CA3AF' }}>
              <li>
                <Link
                  href="/news"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Guías
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Recetas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand transition-colors duration-200"
                >
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contactoa */}
          <div className="space-y-4">
            <h3
              className="text-sm font-semibold tracking-wide"
              style={{ color: '#FFFFFF' }}
            >
              Contacto
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#9CA3AF' }}>
              <li>
                <Link
                  href={`mailto:${siteConfig.contact.username}`}
                  className="hover:text-brand transition-colors duration-200"
                >
                  {siteConfig.contact.username}
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+525551234567"
                  className="hover:text-brand transition-colors duration-200"
                >
                  {siteConfig.contact.whatsapp}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-border" />

        {/* Bottom bar */}
        <div className="flex items-center justify-center py-6">
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
