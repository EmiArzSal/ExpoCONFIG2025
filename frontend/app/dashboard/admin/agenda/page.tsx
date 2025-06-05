"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2, Eye } from "lucide-react"

export default function AdminAgendaPage() {
  const eventos = [
    {
      id: 1,
      titulo: "Exposición de Proyectos - Grupo A",
      fecha: "20 Jun 2024",
      horaInicio: "09:00",
      horaFin: "12:00",
      ubicacion: "Edificio 4 - Aulas 401-405",
      participantes: 25,
      tipo: "Exposición",
      estado: "Programado",
    },
    {
      id: 2,
      titulo: "Taller de Innovación Tecnológica",
      fecha: "18 Jun 2024",
      horaInicio: "14:00",
      horaFin: "17:00",
      ubicacion: "Laboratorio de Computación 3",
      participantes: 40,
      tipo: "Taller",
      estado: "Confirmado",
    },
    {
      id: 3,
      titulo: "Ceremonia de Premiación",
      fecha: "22 Jun 2024",
      horaInicio: "10:00",
      horaFin: "11:30",
      ubicacion: "Auditorio Principal",
      participantes: 150,
      tipo: "Ceremonia",
      estado: "Programado",
    },
  ]

  const proximosEventos = [
    { titulo: "Reunión de Coordinación", fecha: "Hoy", hora: "15:00", tipo: "Reunión" },
    { titulo: "Revisión de Espacios", fecha: "Mañana", hora: "09:00", tipo: "Inspección" },
    { titulo: "Capacitación Profesores", fecha: "17 Jun", hora: "16:00", tipo: "Capacitación" },
  ]

  const estadisticas = [
    { titulo: "Eventos Totales", valor: "12", color: "text-blue-600" },
    { titulo: "Esta Semana", valor: "5", color: "text-green-600" },
    { titulo: "Participantes", valor: "150", color: "text-purple-600" },
    { titulo: "Espacios Utilizados", valor: "8", color: "text-orange-600" },
  ]

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestión de Agenda</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {estadisticas.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                    <p className="text-2xl font-bold">{stat.valor}</p>
                  </div>
                  <Calendar className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>Eventos programados para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximosEventos.map((evento, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{evento.titulo}</p>
                      <p className="text-xs text-gray-500">
                        {evento.fecha} - {evento.hora}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {evento.tipo}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendario Visual */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Vista de Calendario</CardTitle>
              <CardDescription>Junio 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center">
                {/* Días de la semana */}
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
                  <div key={dia} className="p-2 font-medium text-sm text-gray-500">
                    {dia}
                  </div>
                ))}
                {/* Días del mes */}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((dia) => (
                  <div
                    key={dia}
                    className={`p-2 text-sm border rounded cursor-pointer hover:bg-gray-50 ${
                      [18, 20, 22].includes(dia) ? "bg-blue-100 border-blue-300" : ""
                    }`}
                  >
                    {dia}
                    {[18, 20, 22].includes(dia) && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Todos los Eventos</CardTitle>
            <CardDescription>Gestiona todos los eventos del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventos.map((evento) => (
                <div key={evento.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium">{evento.titulo}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {evento.fecha}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {evento.horaInicio} - {evento.horaFin}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {evento.ubicacion}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {evento.participantes} participantes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={evento.estado === "Confirmado" ? "default" : "outline"}>{evento.estado}</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
