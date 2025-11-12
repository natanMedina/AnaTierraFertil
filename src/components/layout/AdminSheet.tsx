'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/context/AdminContext'
import { useEffect, useState } from 'react'
import { Settings } from 'lucide-react'
import TextField from '../forms/fields/TextField'
import { useSiteConfig } from '@/context/SiteConfigContext'
import { SiteConfig } from '@/types/siteConfig'
import { validateSiteConfig } from '@/utils/validations'
import { toast } from 'sonner'

export function AdminSheet() {
  const { logout, editMode, toggleEditMode } = useAdmin()
  const { siteConfig, siteConfigLoading, saveSiteConfig } = useSiteConfig()
  const [open, setOpen] = useState(false)
  const [validation, setValidation] = useState({
    errors: {
      contact_username: '',
      contact_whatsapp: '',
    },
    isValid: false,
  })
  const [localSiteConfig, setLocalSiteConfig] = useState<
    Omit<SiteConfig, 'id'>
  >({
    contact_username: '',
    contact_whatsapp: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cargar datos si hay siteConfig
  useEffect(() => {
    const fetchSiteConfig = async () => {
      if (siteConfig) {
        setLocalSiteConfig({
          ...siteConfig,
          contact_whatsapp: siteConfig.contact_whatsapp.substring(3), // remover el +57
        })
      }
    }
    fetchSiteConfig()
  }, [siteConfig])

  useEffect(() => {
    if (!siteConfigLoading) setValidation(validateSiteConfig(localSiteConfig))
  }, [localSiteConfig])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validation.isValid) return

    setIsSubmitting(true)

    try {
      const payload = {
        contact_username: localSiteConfig.contact_username.trim(),
        contact_whatsapp: `+57${localSiteConfig.contact_whatsapp.trim()}`,
      }

      await saveSiteConfig(payload)
      toast.success('Información actualizada correctamente')
    } catch (err) {
      console.error(err)
      toast.error('Error al actualizar la información')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (siteConfigLoading) return

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Admin
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col h-full"
      >
        <SheetHeader>
          <SheetTitle>Panel de Administración</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Gestiona con el modo administrador: haz cambios a tu perfil o usa las
          herramientas de gestión.
        </SheetDescription>

        <div className="flex flex-col mt-10 gap-10">
          <div className="flex items-center gap-5">
            <Switch
              checked={editMode}
              onCheckedChange={toggleEditMode}
              className="data-[state=checked]:bg-admin"
            />
            <span className="text-sm font-medium text-foreground">
              Modo edición
            </span>
          </div>
          <div className="flex flex-col gap-5 text-xs">
            <TextField
              label="Username"
              placeholder="Nombre de usuario"
              onChange={(e) => {
                setLocalSiteConfig({
                  ...localSiteConfig,
                  contact_username: e.target.value,
                })
              }}
              value={localSiteConfig.contact_username}
              error={validation.errors.contact_username}
            />

            <TextField
              label="WhatsApp +57"
              placeholder="Número de contacto"
              onChange={(e) => {
                setLocalSiteConfig({
                  ...localSiteConfig,
                  contact_whatsapp: e.target.value,
                })
              }}
              value={localSiteConfig.contact_whatsapp}
              error={validation.errors.contact_whatsapp}
            />
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <Button
            type="submit"
            variant="admin"
            className="w-full"
            disabled={isSubmitting || !validation.isValid}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
          </Button>

          <Button
            variant="admin_destructive"
            className="w-full"
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
