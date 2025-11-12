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
import { useState } from 'react'
import { Settings } from 'lucide-react'

export function AdminSheet() {
  const { logout, editMode, toggleEditMode } = useAdmin()
  const [open, setOpen] = useState(false)

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

        <div className="mt-10">
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
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <Button type="submit" variant="admin" className="w-full">
            Guardar cambios
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
