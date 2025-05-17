"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search, Calendar, MapPin, Users, Download } from "lucide-react"

export default function ProyectosEstudiante() {
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo
  const proyectos = [
    {
      id: 1,
      titulo: "Sistema de Gestión de Inventarios",
      materia: "Ingeniería de Software",
      estado: "Aprobado",
      fechaExposicion: "20 Jun 2024",
      horaExposicion: "10:30 - 12:00",
      ubicacion: "Stand 15, Edificio 4",
      equipo: ["Nacho", "Emi", "Belén"],
      descripcion:
        "Sistema para la gestión de inventarios con funcionalidades de seguimiento de productos, generación de reportes y alertas de stock.",
    },
    {
      id: 2,
      titulo: "Base de Datos Distribuida",
      materia: "Bases de Datos",
      estado: "Pendiente",
      fechaExposicion: "Pendiente",
      horaExposicion: "Pendiente",
      ubicacion: "Pendiente",
      equipo: ["Nacho", "Emi"],
      descripcion:
        "Implementación de una base de datos distribuida con replicación y fragmentación para mejorar el rendimiento y la disponibilidad.",
    },
    {
      id: 3,
      titulo: "Algoritmos de Cifrado",
      materia: "Criptografía",
      estado: "Rechazado",
      fechaExposicion: "N/A",
      horaExposicion: "N/A",
      ubicacion: "N/A",
      equipo: ["Belén", "Laura", "David"],
      descripcion: "Implementación y análisis de diferentes algoritmos de cifrado simétrico y asimétrico.",
    },
  ]

  const filteredProyectos = proyectos.filter(
    (proyecto) =>
      proyecto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.materia.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userType="estudiante">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Mis Proyectos</h1>
          <div className="flex gap-2">
            <Link href="/dashboard/estudiante/proyectos/nuevo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar proyectos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="todos">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="aprobados">Aprobados</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
            <TabsTrigger value="rechazados">Rechazados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-4">
            {filteredProyectos.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900">No se encontraron proyectos</p>
                  <p className="text-gray-500 mt-1">Intenta con otra búsqueda o registra un nuevo proyecto</p>
                  <Link href="/dashboard/estudiante/proyectos/nuevo" className="mt-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Proyecto
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredProyectos.map((proyecto) => (
                  <Card key={proyecto.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{proyecto.titulo}</h3>
                            <Badge
                              variant={
                                proyecto.estado === "Aprobado"
                                  ? "default"
                                  : proyecto.estado === "Pendiente"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {proyecto.estado}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{proyecto.materia}</p>
                          <p className="mt-2">{proyecto.descripcion}</p>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>Equipo: {proyecto.equipo.join(", ")}</span>
                            </div>

                            {proyecto.estado === "Aprobado" && (
                              <>
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span>
                                    {proyecto.fechaExposicion}, {proyecto.horaExposicion}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span>{proyecto.ubicacion}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 self-start">
                          <Link href={`/dashboard/estudiante/proyectos/${proyecto.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              Ver Detalles
                            </Button>
                          </Link>
                          {proyecto.estado === "Aprobado" && (
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Descargar Cartel
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="aprobados" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredProyectos
                .filter((proyecto) => proyecto.estado === "Aprobado")
                .map((proyecto) => (
                  <Card key={proyecto.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{proyecto.titulo}</h3>
                            <Badge>Aprobado</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{proyecto.materia}</p>
                          <p className="mt-2">{proyecto.descripcion}</p>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>Equipo: {proyecto.equipo.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>
                                {proyecto.fechaExposicion}, {proyecto.horaExposicion}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{proyecto.ubicacion}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 self-start">
                          <Link href={`/dashboard/estudiante/proyectos/${proyecto.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              Ver Detalles
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar Cartel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pendientes" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredProyectos
                .filter((proyecto) => proyecto.estado === "Pendiente")
                .map((proyecto) => (
                  <Card key={proyecto.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{proyecto.titulo}</h3>
                            <Badge variant="outline">Pendiente</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{proyecto.materia}</p>
                          <p className="mt-2">{proyecto.descripcion}</p>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>Equipo: {proyecto.equipo.join(", ")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 self-start">
                          <Link href={`/dashboard/estudiante/proyectos/${proyecto.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              Ver Detalles
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rechazados" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredProyectos
                .filter((proyecto) => proyecto.estado === "Rechazado")
                .map((proyecto) => (
                  <Card key={proyecto.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{proyecto.titulo}</h3>
                            <Badge variant="destructive">Rechazado</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{proyecto.materia}</p>
                          <p className="mt-2">{proyecto.descripcion}</p>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>Equipo: {proyecto.equipo.join(", ")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 self-start">
                          <Link href={`/dashboard/estudiante/proyectos/${proyecto.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              Ver Detalles
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
