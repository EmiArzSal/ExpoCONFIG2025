'use client'

import { DashboardLayout } from "@/components/dashboard-layout"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import EditarUsuario from '@/components/admin/editar-usuario'


type Usuario = {
  id: string
  nombreCompleto: string
  email: string
  userType: string
  department?: string
  group?: string
  boleta?: string
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null)

  const cargarUsuarios = () => {
    fetch('http://localhost:8080/api/auth/admin/usuarios')
    .then(res => res.json())
    .then(data => setUsuarios(data))
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const abrirModal = (usuario: Usuario) => {
    setUsuarioActivo(usuario)
    setModalAbierto(true)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>

        <Card className="p-4 overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Nombre</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Grupo/Departamento</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id} className="border-t">
                  <td className="p-2">{usuario.nombreCompleto}</td>
                  <td className="p-2">{usuario.email}</td>
                  <td className="p-2 capitalize">{usuario.userType}</td>
                  <td className="p-2">
                    {usuario.userType === 'alumno' ? usuario.group : usuario.department}
                  </td>
                  <td className="p-2 text-center">
                    <Button size="sm" variant="outline" onClick={() => abrirModal(usuario)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <EditarUsuario
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          usuario={usuarioActivo}
          onSave={cargarUsuarios}
        />
      </div>
    </DashboardLayout>
  )
}
