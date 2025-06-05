"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"

export default function AdminProyectosPage() {
  const proyectos = [
    {
      id: 1,
      titulo: "Sistema de Gestión de Inventarios",
      estudiante: "Ana García",
      grupo: "4A",
      materia: "Ingeniería de Software",
      profesor: "Dr. Carlos Mendoza",
      estado: "Aprobado",
      fechaRegistro: "15 May 2024",
      fechaExposicion: "20 Jun 2024",
      ubicacion: "Stand 15, Edificio 4",
    },
    {
      id: 2,
      titulo: "Aplicación Móvil para Delivery",
      estudiante: "Luis Rodríguez",
      grupo: "4B",
      materia: "Desarrollo Móvil",
      profesor: "Dra. María López",
      estado: "Pendiente",
      fechaRegistro: "18 May 2024",
      fechaExposicion: "Pendiente",
      ubicacion: "Pendiente",
    },
    {
      id: 3,
      titulo: "Base de Datos Distribuida",
      estudiante: "Carmen Silva",
      grupo: "4A",
      materia: "Bases de Datos",
      profesor: "Dr. Carlos Mendoza",
      estado: "Rechazado",
      fechaRegistro: "12 May 2024",
      fechaExposicion: "N/A",
      ubicacion: "N/A",
    },
  ]

  const estadisticas = [
    { titulo: "Total Proyectos", valor: "45", icono: FileText, color: "text-blue-600" },
    { titulo: "Aprobados", valor: "32", icono: CheckCircle, color: "text-green-600" },
    { titulo: "Pendientes", valor: "8", icono: Clock, color: "text-yellow-600" },
    { titulo: "Rechazados", valor: "5", icono: XCircle, color: "text-red-600" },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Aprobado":
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "Rechazado":
        return <Badge className="bg-red-100 text-red-800">Rechazado</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestión de Proyectos</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
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

        {/* Filtros y búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="Buscar proyectos..." className="w-full" />
              </div>
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

        {/* Tabla de proyectos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Proyectos</CardTitle>
            <CardDescription>Gestiona todos los proyectos registrados en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Profesor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proyectos.map((proyecto) => (
                  <TableRow key={proyecto.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{proyecto.titulo}</p>
                        <p className="text-sm text-gray-500">Grupo {proyecto.grupo}</p>
                      </div>
                    </TableCell>
                    <TableCell>{proyecto.estudiante}</TableCell>
                    <TableCell>{proyecto.materia}</TableCell>
                    <TableCell>{proyecto.profesor}</TableCell>
                    <TableCell>{getEstadoBadge(proyecto.estado)}</TableCell>
                    <TableCell>{proyecto.fechaRegistro}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
