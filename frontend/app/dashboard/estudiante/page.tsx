import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, Award, Clock, Bell } from "lucide-react"
import Link from "next/link"

export default function EstudianteDashboard() {
  // Datos de ejemplo
  const proximosEventos = [
    { id: 1, titulo: "Exposición de Proyectos", fecha: "20 Jun 2024", hora: "10:30 - 12:00", lugar: "Edificio 4" },
    { id: 2, titulo: "Taller de Innovación", fecha: "18 Jun 2024", hora: "16:00 - 18:00", lugar: "Laboratorio 3" },
  ]

  const misProyectos = [
    {
      id: 1,
      titulo: "Sistema de Gestión de Inventarios",
      materia: "Ingeniería de Software",
      estado: "Aprobado",
      fechaExposicion: "20 Jun 2024",
      horaExposicion: "10:30 - 12:00",
      ubicacion: "Stand 15, Edificio 4",
    },
    {
      id: 2,
      titulo: "Base de Datos Distribuida",
      materia: "Bases de Datos",
      estado: "Pendiente",
      fechaExposicion: "Pendiente",
      horaExposicion: "Pendiente",
      ubicacion: "Pendiente",
    },
  ]

  const notificaciones = [
    { id: 1, mensaje: "Tu proyecto ha sido aprobado", tiempo: "Hace 2 horas" },
    { id: 2, mensaje: "Se ha actualizado la ubicación de tu exposición", tiempo: "Hace 1 día" },
    { id: 3, mensaje: "Recordatorio: Entrega de carteles hasta el 18 de junio", tiempo: "Hace 2 días" },
  ]

  return (
    <DashboardLayout userType="estudiante">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard de Estudiante</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Próximos Eventos */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Próximos Eventos</CardTitle>
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>
              <CardDescription>Eventos programados para ti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximosEventos.map((evento) => (
                  <div key={evento.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <h3 className="font-medium">{evento.titulo}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {evento.fecha}, {evento.hora}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{evento.lugar}</div>
                  </div>
                ))}
                <Link href="/dashboard/estudiante/agenda">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Agenda Completa
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Mis Proyectos */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mis Proyectos</CardTitle>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <CardDescription>Proyectos registrados para la exposición</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {misProyectos.map((proyecto) => (
                  <div key={proyecto.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{proyecto.titulo}</h3>
                      <Badge variant={proyecto.estado === "Aprobado" ? "default" : "outline"}>{proyecto.estado}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{proyecto.materia}</div>
                    {proyecto.estado === "Aprobado" && (
                      <div className="mt-2 text-xs bg-blue-50 p-2 rounded">
                        <div>
                          <strong>Fecha:</strong> {proyecto.fechaExposicion}
                        </div>
                        <div>
                          <strong>Hora:</strong> {proyecto.horaExposicion}
                        </div>
                        <div>
                          <strong>Ubicación:</strong> {proyecto.ubicacion}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/dashboard/estudiante/proyectos">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Todos los Proyectos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Notificaciones */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notificaciones</CardTitle>
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <CardDescription>Actualizaciones recientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificaciones.map((notificacion) => (
                  <div key={notificacion.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <p className="text-sm">{notificacion.mensaje}</p>
                    <p className="text-xs text-gray-500 mt-1">{notificacion.tiempo}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Acciones comunes que puedes realizar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/dashboard/estudiante/proyectos/nuevo">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Registrar Nuevo Proyecto
                </Button>
              </Link>
              <Link href="/dashboard/estudiante/agenda">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Consultar Agenda
                </Button>
              </Link>
              <Link href="/dashboard/estudiante/evaluaciones">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Ver Evaluaciones
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
