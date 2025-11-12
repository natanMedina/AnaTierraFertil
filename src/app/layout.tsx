import './styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AdminProvider } from '@/context/AdminContext'
import { SiteConfigProvider } from '@/context/SiteConfigContext'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="text-gray-900">
        <AdminProvider>
          <SiteConfigProvider>
            <Header />
            {children}
            <Toaster richColors position="bottom-right" />
            <Footer />
          </SiteConfigProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
