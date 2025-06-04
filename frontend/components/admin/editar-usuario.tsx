'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

type Usuario = {
  id: string
  nombreCompleto: string
  email: string
  userType: string
  group?: string
  boleta?: string
  department?: string
}

type Props = {
  open: boolean
  onClose: () => void
  onSave: () => void
  usuario: Usuario | null
}

export default function EditarUsuario({ open, onClose, onSave, usuario }: Props) {
  const [formData, setFormData] = useState<Usuario>({
    id: '',
    nombreCompleto: '',
    email: '',
    userType: '',
  })

  // Cuando se abre el modal con un usuario nuevo
  useEffect(() => {
    if (usuario) {
      setFormData({ ...usuario })
    }
  }, [usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/auth/admin/usuarios/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Error de servidor:', errorText)
      throw new Error('La respuesta del servidor no fue exitosa')
    }

    onSave()
    onClose()
  } catch (err: any) {
    console.error('Error al guardar usuario:', err)
    alert('Error al guardar los cambios. Consulta la consola.')
  }
}


  if (!usuario) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nombre completo</Label>
            <Input name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} />
          </div>

          <div>
            <Label>Correo</Label>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div>
            <Label>Rol</Label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="alumno">Alumno</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          {formData.userType === 'alumno' && (
            <>
              <div>
                <Label>Grupo</Label>
                <Input name="group" value={formData.group || ''} onChange={handleChange} />
              </div>
              <div>
                <Label>Boleta</Label>
                <Input name="boleta" value={formData.boleta || ''} onChange={handleChange} />
              </div>
            </>
          )}

          {formData.userType === 'profesor' && (
            <div>
              <Label>Departamento</Label>
              <Input name="department" value={formData.department || ''} onChange={handleChange} />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
