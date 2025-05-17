import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, FileText, Award, Users, MapPin } from "lucide-react"
import Link from "next/link"

export default function ProfesorDashboard() {
  // Datos de ejemplo
  const estadisticas = {
    proyectosRegistrados: 24,
    proyectosPendientes: 5,
    estudiantesParticipantes: 68,
    espaciosAsignados: 12,
  }

  const proyectosRecientes = [
    {
      id: 1,
      titulo: "Sistema de Gestión de Inventarios",
      estudiantes: "Nacho, Emi, Belén",
      estado: "Aprobado",
      materia: "Ingeniería de Software",
    },
    {
      id: 2,
      titulo: "Base de Datos Distribuida",
      estudiantes: "Carlos, Ana, Miguel",
      estado: "Pendiente",
      materia: "Bases de Datos",
    },
    {
      id: 3,
      titulo: "Aplicación de Criptografía",
      estudiantes: "Laura, David, Belén",
      estado: "Aprobado",
      materia: "Criptografía",
    },
  ]

  const proximasEvaluaciones = [
    {
      id: 1,
      titulo: "Evaluación de Proyectos de Ingeniería de Software",
      fecha: "20 Jun 2024",
      hora: "10:30 - 12:00",
      lugar: "Edificio 4",
      proyectos: 8,
    },
    {
      id: 2,
      titulo: "Evaluación de Proyectos de Bases de Datos",
      fecha: "20 Jun 2024",
      hora: "16:00 - 18:00",
      lugar: "Edificio 3",
      proyectos: 6,
    },
  ]

  return (
    <DashboardLayout userType="profesor">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard de Profesor</h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Proyectos Registrados</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.proyectosRegistrados}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <Progress value={80} className="h-1 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Proyectos Pendientes</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.proyectosPendientes}</h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <Progress value={20} className="h-1 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Estudiantes</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.estudiantesParticipantes}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <Progress value={68} className="h-1 mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Espacios Asignados</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.espaciosAsignados}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <Progress value={50} className="h-1 mt-4" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Proyectos Recientes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Proyectos Recientes</CardTitle>
                <Link href="/dashboard/profesor/proyectos">
                  <Button variant="ghost" size="sm">
                    Ver Todos
                  </Button>
                </Link>
              </div>
              <CardDescription>Últimos proyectos registrados por estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proyectosRecientes.map((proyecto) => (
                  <div
                    key={proyecto.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium">{proyecto.titulo}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>{proyecto.estudiantes}</span>
                        <span className="mx-1">•</span>
                        <span>{proyecto.materia}</span>
                      </div>
                    </div>
                    <Badge variant={proyecto.estado === "Aprobado" ? "default" : "outline"}>{proyecto.estado}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximas Evaluaciones */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Próximas Evaluaciones</CardTitle>
                <Link href="/dashboard/profesor/evaluaciones">
                  <Button variant="ghost" size="sm">
                    Ver Todas
                  </Button>
                </Link>
              </div>
              <CardDescription>Evaluaciones programadas para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximasEvaluaciones.map((evaluacion) => (
                  <div key={evaluacion.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <h3 className="font-medium">{evaluacion.titulo}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>
                        {evaluacion.fecha}, {evaluacion.hora}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-500">{evaluacion.lugar}</div>
                      <Badge variant="outline">{evaluacion.proyectos} proyectos</Badge>
                    </div>
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
              <Link href="/dashboard/profesor/proyectos/revisar">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Revisar Proyectos Pendientes
                </Button>
              </Link>
              <Link href="/dashboard/profesor/espacios">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Gestionar Espacios
                </Button>
              </Link>
              <Link href="/dashboard/profesor/evaluaciones/crear">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Crear Rúbrica de Evaluación
                </Button>
              </Link>
              <Link href="/dashboard/profesor/participantes">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Participantes
                </Button>
              </Link>
              <Link href="/dashboard/profesor/agenda">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Consultar Agenda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
