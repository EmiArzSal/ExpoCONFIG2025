import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, FileText, Award, Users, MapPin, BarChart4, Printer, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Datos de ejemplo
  const estadisticas = {
    proyectosTotal: 86,
    estudiantesTotal: 215,
    profesoresTotal: 24,
    espaciosTotal: 30,
    espaciosAsignados: 25,
  }

  const departamentos = [
    { nombre: "Ingeniería en Sistemas Computacionales", proyectos: 42, porcentaje: 49 },
    { nombre: "Ciencias Sociales", proyectos: 18, porcentaje: 21 },
    { nombre: "Ciencias Básicas", proyectos: 26, porcentaje: 30 },
  ]

  const proximosEventos = [
    {
      id: 1,
      titulo: "Exposición de Proyectos",
      fecha: "20 Jun 2024",
      hora: "10:30 - 18:00",
      lugar: "Edificios 3 y 4",
      tipo: "Exposición",
    },
    {
      id: 2,
      titulo: "Conferencia: Innovación Tecnológica",
      fecha: "19 Jun 2024",
      hora: "12:00 - 14:00",
      lugar: "Auditorio Principal",
      tipo: "Conferencia",
    },
    {
      id: 3,
      titulo: "Taller de Desarrollo Web",
      fecha: "18 Jun 2024",
      hora: "16:00 - 18:00",
      lugar: "Laboratorio 3",
      tipo: "Taller",
    },
  ]

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Dashboard de Administrador</h1>
          <div className="flex gap-2">
            <Button>
              <Printer className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Proyectos</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.proyectosTotal}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500">Espacios asignados</span>
                <span className="font-medium">
                  {estadisticas.espaciosAsignados}/{estadisticas.espaciosTotal}
                </span>
              </div>
              <Progress
                value={(estadisticas.espaciosAsignados / estadisticas.espaciosTotal) * 100}
                className="h-1 mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Estudiantes</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.estudiantesTotal}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500">Participación</span>
                <span className="font-medium">68%</span>
              </div>
              <Progress value={68} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Profesores</p>
                  <h3 className="text-2xl font-bold mt-1">{estadisticas.profesoresTotal}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500">Participación</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Eventos</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <CalendarDays className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500">Programados</span>
                <span className="font-medium">12/15</span>
              </div>
              <Progress value={80} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Distribución por Departamento */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Proyectos por Departamento</CardTitle>
              <CardDescription>Distribución de proyectos registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departamentos.map((depto, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{depto.nombre}</span>
                      <span className="text-sm text-gray-500">{depto.proyectos} proyectos</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${depto.porcentaje}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/dashboard/admin/reportes">
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    Ver Estadísticas Detalladas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Próximos Eventos</CardTitle>
                <Link href="/dashboard/admin/agenda">
                  <Button variant="ghost" size="sm">
                    Ver Agenda Completa
                  </Button>
                </Link>
              </div>
              <CardDescription>Eventos programados para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proximosEventos.map((evento) => (
                  <div
                    key={evento.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium">{evento.titulo}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>
                          {evento.fecha}, {evento.hora}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{evento.lugar}</div>
                    </div>
                    <Badge variant="outline">{evento.tipo}</Badge>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/admin/agenda/crear">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Programar Evento
                </Button>
              </Link>
              <Link href="/dashboard/admin/espacios">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Gestionar Espacios
                </Button>
              </Link>
              <Link href="/dashboard/admin/proyectos">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Todos los Proyectos
                </Button>
              </Link>
              <Link href="/dashboard/admin/participantes">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar Participantes
                </Button>
              </Link>
              <Link href="/dashboard/admin/evaluaciones">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Configurar Evaluaciones
                </Button>
              </Link>
              <Link href="/dashboard/admin/reportes/generar">
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="h-4 w-4 mr-2" />
                  Generar Constancias
                </Button>
              </Link>
              <Link href="/dashboard/admin/configuracion">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración del Sistema
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
