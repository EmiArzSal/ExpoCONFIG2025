"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, GraduationCap, UserCheck, Search, Filter, Download, Plus, Mail, Phone } from "lucide-react"

export default function AdminParticipantesPage() {
  const estudiantes = [
    {
      id: 1,
      nombre: "Ana García",
      email: "ana.garcia@estudiante.edu",
      grupo: "4A",
      carrera: "Ingeniería en Sistemas",
      proyectos: 2,
      estado: "Activo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      nombre: "Luis Rodríguez",
      email: "luis.rodriguez@estudiante.edu",
      grupo: "4B",
      carrera: "Ingeniería en Sistemas",
      proyectos: 1,
      estado: "Activo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      nombre: "Carmen Silva",
      email: "carmen.silva@estudiante.edu",
      grupo: "4A",
      carrera: "Ingeniería en Sistemas",
      proyectos: 1,
      estado: "Inactivo",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const profesores = [
    {
      id: 1,
      nombre: "Dr. Carlos Mendoza",
      email: "carlos.mendoza@profesor.edu",
      departamento: "Ingeniería de Software",
      materias: ["Ingeniería de Software", "Bases de Datos"],
      proyectosAsignados: 15,
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Dra. María López",
      email: "maria.lopez@profesor.edu",
      departamento: "Desarrollo de Aplicaciones",
      materias: ["Desarrollo Móvil", "Programación Web"],
      proyectosAsignados: 12,
      estado: "Activo",
    },
  ]

  const grupos = [
    { nombre: "4A", estudiantes: 25, proyectos: 18, coordinador: "Dr. Carlos Mendoza" },
    { nombre: "4B", estudiantes: 28, proyectos: 20, coordinador: "Dra. María López" },
    { nombre: "4C", estudiantes: 22, proyectos: 15, coordinador: "Dr. Roberto Vega" },
  ]

  const estadisticas = [
    { titulo: "Total Estudiantes", valor: "150", icono: GraduationCap, color: "text-blue-600" },
    { titulo: "Profesores", valor: "12", icono: UserCheck, color: "text-green-600" },
    { titulo: "Grupos", valor: "6", icono: Users, color: "text-purple-600" },
    { titulo: "Participantes Activos", valor: "142", icono: Users, color: "text-orange-600" },
  ]

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {estadisticas.map((stat) => (
            <Card key={stat.titulo}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                    <p className="text-2xl font-bold">{stat.valor}</p>
                  </div>
                  <stat.icono className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs para diferentes tipos de participantes */}
        <Tabs defaultValue="estudiantes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
            <TabsTrigger value="profesores">Profesores</TabsTrigger>
            <TabsTrigger value="grupos">Grupos</TabsTrigger>
          </TabsList>

          {/* Tab de Estudiantes */}
          <TabsContent value="estudiantes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filtros de Búsqueda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input placeholder="Buscar estudiantes..." className="flex-1" />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Estudiantes</CardTitle>
                <CardDescription>Gestiona todos los estudiantes registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Grupo</TableHead>
                      <TableHead>Carrera</TableHead>
                      <TableHead>Proyectos</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Contacto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estudiantes.map((estudiante) => (
                      <TableRow key={estudiante.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={estudiante.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {estudiante.nombre
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{estudiante.nombre}</p>
                              <p className="text-sm text-gray-500">{estudiante.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{estudiante.grupo}</TableCell>
                        <TableCell>{estudiante.carrera}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{estudiante.proyectos} proyectos</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={estudiante.estado === "Activo" ? "default" : "secondary"}>
                            {estudiante.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Profesores */}
          <TabsContent value="profesores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Profesores</CardTitle>
                <CardDescription>Gestiona todos los profesores del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profesor</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Materias</TableHead>
                      <TableHead>Proyectos Asignados</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Contacto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profesores.map((profesor) => (
                      <TableRow key={profesor.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{profesor.nombre}</p>
                            <p className="text-sm text-gray-500">{profesor.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{profesor.departamento}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {profesor.materias.map((materia, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {materia}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{profesor.proyectosAsignados} proyectos</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{profesor.estado}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Grupos */}
          <TabsContent value="grupos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grupos.map((grupo, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Grupo {grupo.nombre}
                      <Badge variant="outline">{grupo.estudiantes} estudiantes</Badge>
                    </CardTitle>
                    <CardDescription>Coordinador: {grupo.coordinador}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Estudiantes:</span>
                        <span className="font-medium">{grupo.estudiantes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Proyectos:</span>
                        <span className="font-medium">{grupo.proyectos}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progreso:</span>
                        <Badge variant="outline">{Math.round((grupo.proyectos / grupo.estudiantes) * 100)}%</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Ver Detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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
