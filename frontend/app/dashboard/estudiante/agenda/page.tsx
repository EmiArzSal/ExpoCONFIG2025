"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, MapPin, Search, CalendarDays } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function AgendaEstudiante() {
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Datos de ejemplo
  const eventos = [
    {
      id: 1,
      titulo: "Exposición de Proyectos de Ingeniería de Software",
      tipo: "Exposición",
      fecha: "2024-06-20",
      hora: "10:30 - 12:00",
      lugar: "Edificio 4, Pasillos",
      organizador: "Departamento de ISC",
      descripcion: "Presentación de proyectos finales de la materia de Ingeniería de Software.",
    },
    {
      id: 2,
      titulo: "Exposición de Proyectos de Bases de Datos",
      tipo: "Exposición",
      fecha: "2024-06-20",
      hora: "16:30 - 18:00",
      lugar: "Edificio 4, Pasillos",
      organizador: "Departamento de ISC",
      descripcion: "Presentación de proyectos finales de la materia de Bases de Datos.",
    },
    {
      id: 3,
      titulo: "Taller de Desarrollo Web",
      tipo: "Taller",
      fecha: "2024-06-18",
      hora: "16:00 - 18:00",
      lugar: "Laboratorio 3",
      organizador: "Club de Programación",
      descripcion: "Taller práctico sobre desarrollo web moderno con React y Next.js.",
    },
    {
      id: 4,
      titulo: "Conferencia: Innovación Tecnológica",
      tipo: "Conferencia",
      fecha: "2024-06-19",
      hora: "12:00 - 14:00",
      lugar: "Auditorio Principal",
      organizador: "Subdirección Académica",
      descripcion: "Conferencia sobre las últimas tendencias en innovación tecnológica y su impacto en la industria.",
    },
    {
      id: 5,
      titulo: "Presentación de la Rondalla",
      tipo: "Cultural",
      fecha: "2024-06-21",
      hora: "13:00 - 14:00",
      lugar: "Explanada Principal",
      organizador: "Departamento de Actividades Culturales",
      descripcion: "Presentación musical de la rondalla de la escuela.",
    },
  ]

  const filteredEventos = eventos.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.lugar.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredByDate = date
    ? filteredEventos.filter((evento) => evento.fecha === format(date, "yyyy-MM-dd"))
    : filteredEventos

  // Agrupar eventos por fecha
  const eventosPorFecha: Record<string, typeof eventos> = {}
  filteredEventos.forEach((evento) => {
    if (!eventosPorFecha[evento.fecha]) {
      eventosPorFecha[evento.fecha] = []
    }
    eventosPorFecha[evento.fecha].push(evento)
  })

  // Ordenar fechas
  const fechasOrdenadas = Object.keys(eventosPorFecha).sort()

  return (
    <DashboardLayout userType="estudiante">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Agenda de Eventos</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Selecciona una fecha para ver los eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" locale={es} />
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => setDate(undefined)}>
                    Ver Todos los Eventos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar eventos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="todos">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="exposiciones">Exposiciones</TabsTrigger>
                <TabsTrigger value="talleres">Talleres</TabsTrigger>
                <TabsTrigger value="conferencias">Conferencias</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="mt-4">
                {date ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-blue-600" />
                      <h2 className="text-lg font-medium">
                        Eventos para el {format(date, "dd MMMM yyyy", { locale: es })}
                      </h2>
                    </div>

                    {filteredByDate.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <CalendarIcon className="h-10 w-10 text-gray-400 mb-4" />
                          <p className="text-lg font-medium text-gray-900">No hay eventos para esta fecha</p>
                          <p className="text-gray-500 mt-1">Selecciona otra fecha o consulta la agenda completa</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {filteredByDate.map((evento) => (
                          <Card key={evento.id}>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                                    <Badge variant="outline">{evento.tipo}</Badge>
                                  </div>

                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <div className="flex items-center gap-1 text-sm">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span>{evento.hora}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                      <MapPin className="h-4 w-4 text-gray-500" />
                                      <span>{evento.lugar}</span>
                                    </div>
                                  </div>

                                  <p className="mt-2">{evento.descripcion}</p>

                                  <div className="mt-2 text-sm text-gray-500">Organizado por: {evento.organizador}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {fechasOrdenadas.map((fecha) => (
                      <div key={fecha} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-blue-600" />
                          <h2 className="text-lg font-medium">
                            {format(new Date(fecha), "dd MMMM yyyy", { locale: es })}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {eventosPorFecha[fecha].map((evento) => (
                            <Card key={evento.id}>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                                      <Badge variant="outline">{evento.tipo}</Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-2">
                                      <div className="flex items-center gap-1 text-sm">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span>{evento.hora}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span>{evento.lugar}</span>
                                      </div>
                                    </div>

                                    <p className="mt-2">{evento.descripcion}</p>

                                    <div className="mt-2 text-sm text-gray-500">
                                      Organizado por: {evento.organizador}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="exposiciones" className="mt-4">
                <div className="space-y-6">
                  {fechasOrdenadas.map((fecha) => {
                    const exposiciones = eventosPorFecha[fecha].filter((e) => e.tipo === "Exposición")
                    if (exposiciones.length === 0) return null

                    return (
                      <div key={fecha} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-blue-600" />
                          <h2 className="text-lg font-medium">
                            {format(new Date(fecha), "dd MMMM yyyy", { locale: es })}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {exposiciones.map((evento) => (
                            <Card key={evento.id}>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                                      <Badge variant="outline">{evento.tipo}</Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-2">
                                      <div className="flex items-center gap-1 text-sm">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span>{evento.hora}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span>{evento.lugar}</span>
                                      </div>
                                    </div>

                                    <p className="mt-2">{evento.descripcion}</p>

                                    <div className="mt-2 text-sm text-gray-500">
                                      Organizado por: {evento.organizador}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="talleres" className="mt-4">
                <div className="space-y-6">
                  {fechasOrdenadas.map((fecha) => {
                    const talleres = eventosPorFecha[fecha].filter((e) => e.tipo === "Taller")
                    if (talleres.length === 0) return null

                    return (
                      <div key={fecha} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-blue-600" />
                          <h2 className="text-lg font-medium">
                            {format(new Date(fecha), "dd MMMM yyyy", { locale: es })}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {talleres.map((evento) => (
                            <Card key={evento.id}>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                                      <Badge variant="outline">{evento.tipo}</Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-2">
                                      <div className="flex items-center gap-1 text-sm">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span>{evento.hora}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span>{evento.lugar}</span>
                                      </div>
                                    </div>

                                    <p className="mt-2">{evento.descripcion}</p>

                                    <div className="mt-2 text-sm text-gray-500">
                                      Organizado por: {evento.organizador}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="conferencias" className="mt-4">
                <div className="space-y-6">
                  {fechasOrdenadas.map((fecha) => {
                    const conferencias = eventosPorFecha[fecha].filter((e) => e.tipo === "Conferencia")
                    if (conferencias.length === 0) return null

                    return (
                      <div key={fecha} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-blue-600" />
                          <h2 className="text-lg font-medium">
                            {format(new Date(fecha), "dd MMMM yyyy", { locale: es })}
                          </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {conferencias.map((evento) => (
                            <Card key={evento.id}>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                                      <Badge variant="outline">{evento.tipo}</Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-2">
                                      <div className="flex items-center gap-1 text-sm">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span>{evento.hora}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span>{evento.lugar}</span>
                                      </div>
                                    </div>

                                    <p className="mt-2">{evento.descripcion}</p>

                                    <div className="mt-2 text-sm text-gray-500">
                                      Organizado por: {evento.organizador}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
