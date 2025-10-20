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
import { siteConfig } from '@/config/site'

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
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}${encodedMessage ? `?text=${encodedMessage}` : ''}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onOpenChange(false)
                window.open(whatsappUrl, '_blank')
              }}
              variant="outline"
              className="bg-background hover:bg-background/60 text-brand"
            >
              Seguro
            </Button>

            <Button
              onClick={() => onOpenChange(false)}
              className="bg-background hover:bg-background/60 text-brand"
            >
              Por ahora no
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
