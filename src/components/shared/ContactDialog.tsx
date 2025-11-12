'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { siteConfigBase } from '@/config/site'
import Image from 'next/image'
import { useSiteConfig } from '@/context/SiteConfigContext'

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: string
}

export function ContactDialog({
  open,
  onOpenChange,
  message = '',
}: ContactDialogProps) {
  const { siteConfig, siteConfigLoading } = useSiteConfig()
  const encodedMessage = encodeURIComponent(message)
  if (siteConfigLoading) return <p>Cargando...</p>

  const whatsappUrl = `https://wa.me/${siteConfig.contact_whatsapp}${encodedMessage ? `?text=${encodedMessage}` : ''}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-brand py-10">
        <DialogHeader className="flex items-center gap-2">
          <DialogTitle className="text-center text-background text-xl">
            Serás redirigido a WhatsApp para comunicarte con{' '}
            {siteConfigBase.name}
          </DialogTitle>
          <Image
            src="/whatsapp-svgrepo-com.svg"
            alt={`Logo ${siteConfigBase.name}`}
            width={60}
            height={60}
          />
          <DialogDescription className="text-center text-gray-50 text-base">
            ¿Deseas continuar?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-4 px-10">
          <div className="w-full flex items-center justify-center gap-6">
            <Button
              onClick={() => {
                onOpenChange(false)
                window.open(whatsappUrl, '_blank')
              }}
              variant="outline"
              className="flex-1 bg-background hover:bg-background/60 text-brand"
            >
              Seguro
            </Button>

            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-background hover:bg-background/60 text-brand"
            >
              Por ahora no
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
