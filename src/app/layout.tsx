import type { Metadata } from 'next'
import './styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AdminProvider } from '@/context/AdminContext'

export const metadata: Metadata = {
  title: 'Ana Tierra Fertil',
  description: 'Sitio de cuidado femenino',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="text-gray-900">
        <AdminProvider>
          <Header />
          {children}
          <Footer />
        </AdminProvider>
      </body>
    </html>
  )
}
