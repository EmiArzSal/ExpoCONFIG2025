"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Award,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Calendar,
  Building,
  User,
  QrCode,
  Star,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Datos simulados más realistas
const proyectosDisponibles = [
  {
    id: "1",
    titulo: "Sistema de Detección de Fraudes con IA",
    stand: "M5-1011",
    departamento: "Ingeniería en Inteligencia Artificial",
    estudiantes: ["Ana García", "Carlos López"],
    profesor: "Dr. Juan Pérez",
    descripcion: "Plataforma que utiliza modelos de machine learning para detectar fraudes bancarios en tiempo real.",
    visitasHoy: 23,
    calificacion: 4.8,
    disponible: true,
    horario: "10:30 - 12:30",
  },
  {
    id: "2",
    titulo: "Asistente Virtual para Estudiantes",
    stand: "M4-1006",
    departamento: "Ingeniería en Inteligencia Artificial",
    estudiantes: ["Luis Martín", "Sofía Chen"],
    profesor: "Dra. Carmen Silva",
    descripcion: "Chatbot inteligente que responde dudas académicas y administrativas usando procesamiento de lenguaje natural.",
    visitasHoy: 31,
    calificacion: 4.9,
    disponible: true,
    horario: "11:00 - 13:00",
  },
  {
    id: "3",
    titulo: "Sistema de Seguridad Biométrica",
    stand: "M3-2007",
    departamento: "Ingeniería en Inteligencia Artificial",
    estudiantes: ["Roberto Kim", "Elena Vega"],
    profesor: "Ing. Miguel Torres",
    descripcion: "Autenticación multi-factor con reconocimiento facial y de voz para acceso seguro a laboratorios.",
    visitasHoy: 18,
    calificacion: 4.7,
    disponible: true,
    horario: "11:30 - 13:30",
  },
  {
    id: "4",
    titulo: "Plataforma de Gestión Escolar",
    stand: "M8-2003",
    departamento: "Ingeniería en Sistemas Computacionales",
    estudiantes: ["Patricia Morales", "Andrés Jiménez"],
    profesor: "Dr. Fernando Castro",
    descripcion: "Sistema web para la gestión de inscripciones, calificaciones y horarios escolares.",
    visitasHoy: 27,
    calificacion: 4.6,
    disponible: true,
    horario: "12:00 - 14:00",
  },
  {
    id: "5",
    titulo: "App de Reservas de Laboratorios",
    stand: "M5-3004",
    departamento: "Ingeniería en Sistemas Computacionales",
    estudiantes: ["Marina López", "Jorge Ramírez"],
    profesor: "Dra. Laura Méndez",
    descripcion: "Aplicación móvil para reservar laboratorios y equipos de cómputo en la escuela.",
    visitasHoy: 15,
    calificacion: 4.5,
    disponible: true,
    horario: "12:30 - 14:30",
  },
  {
    id: "6",
    titulo: "Red Social Académica",
    stand: "M6-3010",
    departamento: "Ingeniería en Sistemas Computacionales",
    estudiantes: ["Sergio Díaz", "Paola Ríos"],
    profesor: "Dr. Enrique Salinas",
    descripcion: "Plataforma para conectar estudiantes y profesores, compartir recursos y organizar eventos académicos.",
    visitasHoy: 20,
    calificacion: 4.7,
    disponible: true,
    horario: "13:00 - 15:00",
  },
  {
    id: "7",
    titulo: "Análisis de Datos de Tráfico Vehicular",
    stand: "M7-4006",
    departamento: "Licenciatura en Ciencia de Datos",
    estudiantes: ["Gabriela Torres", "Iván Mendoza"],
    profesor: "Mtro. Oscar Hernández",
    descripcion: "Proyecto de análisis y visualización de datos de tráfico para optimizar rutas en la ciudad.",
    visitasHoy: 12,
    calificacion: 4.4,
    disponible: true,
    horario: "13:30 - 15:30",
  },
  {
    id: "8",
    titulo: "Predicción de Enfermedades con Big Data",
    stand: "M8-4007",
    departamento: "Licenciatura en Ciencia de Datos",
    estudiantes: ["Valeria Pineda", "Hugo Sánchez"],
    profesor: "Ing. Alicia Romero",
    descripcion: "Modelo predictivo para identificar riesgos de enfermedades usando grandes volúmenes de datos médicos.",
    visitasHoy: 17,
    calificacion: 4.8,
    disponible: true,
    horario: "14:00 - 16:00",
  },
  {
    id: "9",
    titulo: "Visualización Interactiva de Datos Climáticos",
    stand: "M2-1008",
    departamento: "Licenciatura en Ciencia de Datos",
    estudiantes: ["Mario Castillo", "Fernanda Bravo"],
    profesor: "Dra. Teresa Aguilar",
    descripcion: "Dashboard interactivo para explorar y analizar datos históricos de clima en México.",
    visitasHoy: 22,
    calificacion: 4.6,
    disponible: true,
    horario: "14:30 - 16:30",
  },
  {
    id: "10",
    titulo: "Optimización de Rutas de Recolección de Basura",
    stand: "M1-1009",
    departamento: "Licenciatura en Ciencia de Datos",
    estudiantes: ["Ricardo Flores", "Daniela Cruz", "Esteban Morales"],
    profesor: "Dr. Pablo Zamora",
    descripcion: "Algoritmo de optimización para mejorar la eficiencia en la recolección de residuos urbanos.",
    visitasHoy: 19,
    calificacion: 4.9,
    disponible: true,
    horario: "15:00 - 17:00",
  },
]

const tiposVisitante = [
  { value: "estudiante", label: "Estudiante ESCOM" },
  { value: "profesor", label: "Profesor/Académico" },
  { value: "empresa", label: "Representante de Empresa" },
  { value: "publico", label: "Público General" },
  { value: "familia", label: "Familiar de Estudiante" },
]

export default function RegistroDeVisita() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    institucion: "",
    tipoVisitante: "",
    proyectoId: "",
    comentarios: "",
  })

  const [mensaje, setMensaje] = useState("")
  const [registrado, setRegistrado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any>(null)
  const [horaActual, setHoraActual] = useState(new Date())

  const [estadisticas, setEstadisticas] = useState({
    totalVisitantes: 127,
    estudiantes: 45,
    profesores: 23,
    empresas: 31,
    publicoGeneral: 28,
  })

  // Actualizar hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => setHoraActual(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Agregar después del useEffect existente de la hora
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/visitas/estadisticas")
        if (res.ok) {
          const data = await res.json()
          setEstadisticas(data)
        }
      } catch (error) {
        console.error("Error cargando estadísticas:", error)
      }
    }

    cargarEstadisticas()
    // Actualizar estadísticas cada 5 minutos
    const interval = setInterval(cargarEstadisticas, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "proyectoId") {
      const proyecto = proyectosDisponibles.find((p) => p.id === value)
      setProyectoSeleccionado(proyecto || null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.proyectoId || !formData.tipoVisitante) {
      setMensaje("Por favor completa todos los campos obligatorios.")
      return
    }

    setLoading(true)

    try {
      // Estructura de datos actualizada para coincidir con el backend
      const visitaData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || "98",
        institucion: formData.institucion || "",
        tipoVisitante: formData.tipoVisitante,
        proyectoId: formData.proyectoId,
        stand: proyectoSeleccionado?.stand || "",
        proyectoTitulo: proyectoSeleccionado?.titulo || "",
        comentarios: formData.comentarios || "",
      }

      const res = await fetch("http://localhost:8080/api/visitas/registrarVisita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitaData),
      })

      if (res.ok) {
        const response = await res.json()
        setMensaje(response.message || "¡Visita registrada exitosamente! Disfruta la exposición.")
        setRegistrado(true)

        // Reset form
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          institucion: "",
          tipoVisitante: "",
          proyectoId: "",
          comentarios: "",
        })
        setProyectoSeleccionado(null)
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error en el servidor")
      }
    } catch (error) {
      console.error("Error:", error)
      setMensaje(error instanceof Error ? error.message : "Error al registrar la visita. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setRegistrado(false)
    setMensaje("")
  }

  if (registrado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-12">
        <Card className="w-full max-w-lg shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">¡Registro Exitoso!</h2>
              <p className="text-gray-600">{mensaje}</p>
            </div>

            {proyectoSeleccionado && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Proyecto a Visitar:</h3>
                <p className="text-blue-700">{proyectoSeleccionado.titulo}</p>
                <p className="text-blue-600 text-sm">{proyectoSeleccionado.stand}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button onClick={resetForm} className="w-full">
                Registrar Otra Visita
              </Button>
              <Button variant="outline" className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generar Código QR
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Expo ESCOM 2024</h1>
          </div>
          <p className="text-lg text-gray-600">Registro de Visitantes</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(horaActual, "dd MMMM yyyy", { locale: es })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{format(horaActual, "HH:mm", { locale: es })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Visitante
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Personal */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Datos Personales
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nombre Completo *</label>
                      <Input
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Correo Electrónico *</label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Teléfono</label>
                      <Input
                        type="tel"
                        placeholder="55 1234 5678"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Tipo de Visitante *</label>
                      <Select
                        value={formData.tipoVisitante}
                        onValueChange={(value) => handleInputChange("tipoVisitante", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposVisitante.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Institución/Empresa</label>
                    <Input
                      type="text"
                      placeholder="Nombre de tu institución o empresa"
                      value={formData.institucion}
                      onChange={(e) => handleInputChange("institucion", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Selección de Proyecto */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Proyecto a Visitar
                  </h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Selecciona el proyecto *</label>
                    <Select
                      value={formData.proyectoId}
                      onValueChange={(value) => handleInputChange("proyectoId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Elige el proyecto que deseas visitar" />
                      </SelectTrigger>
                      <SelectContent>
                        {proyectosDisponibles.map((proyecto) => (
                          <SelectItem key={proyecto.id} value={proyecto.id} disabled={!proyecto.disponible}>
                            <div className="flex items-center justify-between w-full">
                              <span>
                                {proyecto.titulo} - {proyecto.stand}
                              </span>
                              {!proyecto.disponible && (
                                <Badge variant="secondary" className="ml-2">
                                  No disponible
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {proyectoSeleccionado && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-blue-900">{proyectoSeleccionado.titulo}</h4>
                          <p className="text-blue-700 text-sm">{proyectoSeleccionado.stand}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{proyectoSeleccionado.calificacion}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mb-3">{proyectoSeleccionado.descripcion}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Estudiantes:</span>
                          <p className="text-gray-700">{proyectoSeleccionado.estudiantes.join(", ")}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Profesor:</span>
                          <p className="text-gray-700">{proyectoSeleccionado.profesor}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Horario:</span>
                          <p className="text-gray-700">{proyectoSeleccionado.horario}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{proyectoSeleccionado.visitasHoy} visitas hoy</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Comentarios */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Comentarios adicionales</label>
                  <Textarea
                    placeholder="¿Hay algo específico que te interesa del proyecto? (opcional)"
                    value={formData.comentarios}
                    onChange={(e) => handleInputChange("comentarios", e.target.value)}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                  {loading ? "Registrando..." : "Registrar Visita"}
                </Button>

                {mensaje && !registrado && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <p className="text-red-700 text-sm">{mensaje}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral con estadísticas */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Estadísticas del Día
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{estadisticas.totalVisitantes}</div>
                <div className="text-sm text-gray-500">Visitantes registrados</div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estudiantes</span>
                  <span className="font-medium">{estadisticas.estudiantes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profesores</span>
                  <span className="font-medium">{estadisticas.profesores}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Empresas</span>
                  <span className="font-medium">{estadisticas.empresas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Público General</span>
                  <span className="font-medium">{estadisticas.publicoGeneral}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-green-600" />
                Proyectos Populares
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {proyectosDisponibles
                .sort((a, b) => b.visitasHoy - a.visitasHoy)
                .slice(0, 3)
                .map((proyecto, index) => (
                  <div key={proyecto.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{proyecto.titulo}</p>
                      <p className="text-xs text-gray-500">{proyecto.stand}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{proyecto.visitasHoy}</span>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
