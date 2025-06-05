"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Award, BarChart3, TrendingUp, Star, Download, Eye, Settings } from "lucide-react"

export default function AdminEvaluacionesPage() {
  const evaluaciones = [
    {
      id: 1,
      proyecto: "Sistema de Gestión de Inventarios",
      estudiante: "Ana García",
      profesor: "Dr. Carlos Mendoza",
      calificacion: 9.2,
      estado: "Completada",
      fecha: "18 Jun 2024",
      criterios: {
        innovacion: 9.0,
        implementacion: 9.5,
        presentacion: 9.0,
        documentacion: 9.3,
      },
    },
    {
      id: 2,
      proyecto: "Aplicación Móvil para Delivery",
      estudiante: "Luis Rodríguez",
      profesor: "Dra. María López",
      calificacion: null,
      estado: "Pendiente",
      fecha: "20 Jun 2024",
      criterios: null,
    },
    {
      id: 3,
      proyecto: "Sistema de Monitoreo IoT",
      estudiante: "Carmen Silva",
      profesor: "Dr. Carlos Mendoza",
      calificacion: 8.7,
      estado: "Completada",
      fecha: "17 Jun 2024",
      criterios: {
        innovacion: 9.2,
        implementacion: 8.5,
        presentacion: 8.3,
        documentacion: 8.8,
      },
    },
  ]

  const estadisticas = [
    { titulo: "Evaluaciones Totales", valor: "45", icono: Award, color: "text-blue-600" },
    { titulo: "Completadas", valor: "32", icono: Star, color: "text-green-600" },
    { titulo: "Pendientes", valor: "13", icono: BarChart3, color: "text-yellow-600" },
    { titulo: "Promedio General", valor: "8.5", icono: TrendingUp, color: "text-purple-600" },
  ]

  const criteriosEvaluacion = [
    { nombre: "Innovación", peso: 25, promedio: 8.6 },
    { nombre: "Implementación", peso: 30, promedio: 8.8 },
    { nombre: "Presentación", peso: 25, promedio: 8.2 },
    { nombre: "Documentación", peso: 20, promedio: 8.4 },
  ]

  const topProyectos = [
    { proyecto: "Sistema de Gestión de Inventarios", calificacion: 9.2, estudiante: "Ana García" },
    { proyecto: "Plataforma E-learning", calificacion: 9.0, estudiante: "Roberto Vega" },
    { proyecto: "Sistema de Monitoreo IoT", calificacion: 8.7, estudiante: "Carmen Silva" },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Completada":
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800">En Proceso</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const getCalificacionColor = (calificacion: number) => {
    if (calificacion >= 9) return "text-green-600"
    if (calificacion >= 8) return "text-blue-600"
    if (calificacion >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestión de Evaluaciones</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reportes
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configurar Criterios
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Criterios de Evaluación */}
          <Card>
            <CardHeader>
              <CardTitle>Criterios de Evaluación</CardTitle>
              <CardDescription>Promedio por criterio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criteriosEvaluacion.map((criterio, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{criterio.nombre}</span>
                      <span className="text-sm text-gray-500">{criterio.promedio}/10</span>
                    </div>
                    <Progress value={criterio.promedio * 10} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Peso: {criterio.peso}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Proyectos */}
          <Card>
            <CardHeader>
              <CardTitle>Mejores Proyectos</CardTitle>
              <CardDescription>Proyectos con mayor calificación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProyectos.map((proyecto, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-yellow-600">#{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{proyecto.proyecto}</p>
                      <p className="text-xs text-gray-500">{proyecto.estudiante}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getCalificacionColor(proyecto.calificacion)}`}>
                        {proyecto.calificacion}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distribución de Calificaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Calificaciones</CardTitle>
              <CardDescription>Rango de calificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Excelente (9.0 - 10.0)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">15</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Muy Bueno (8.0 - 8.9)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bueno (7.0 - 7.9)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/4 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">4</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Regular (6.0 - 6.9)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/6 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">1</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Evaluaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Evaluaciones</CardTitle>
            <CardDescription>Todas las evaluaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Profesor Evaluador</TableHead>
                  <TableHead>Calificación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluaciones.map((evaluacion) => (
                  <TableRow key={evaluacion.id}>
                    <TableCell className="font-medium">{evaluacion.proyecto}</TableCell>
                    <TableCell>{evaluacion.estudiante}</TableCell>
                    <TableCell>{evaluacion.profesor}</TableCell>
                    <TableCell>
                      {evaluacion.calificacion ? (
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getCalificacionColor(evaluacion.calificacion)}`}>
                            {evaluacion.calificacion}
                          </span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      ) : (
                        <span className="text-gray-400">Pendiente</span>
                      )}
                    </TableCell>
                    <TableCell>{getEstadoBadge(evaluacion.estado)}</TableCell>
                    <TableCell>{evaluacion.fecha}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
