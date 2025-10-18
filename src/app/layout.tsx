import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Ana Tierra Fertil',
  description: 'Sitio de cuidado femenino',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        {/* <Header /> */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
