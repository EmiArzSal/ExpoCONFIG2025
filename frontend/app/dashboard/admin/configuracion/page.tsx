"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  UserCheck,
  Shield,
  ChevronRight,
  Cog,
  Database,
} from "lucide-react"

export default function ConfiguracionAdmin() {
  const configuraciones = [
    {
      titulo: "Gestión de Administradores",
      descripcion: "Administrar cuentas de administradores del sistema",
      icono: Shield,
      href: "/dashboard/admin/configuracion/admins",
      color: "bg-red-100 text-red-600",
      items: ["Crear administradores", "Permisos", "Roles"],
      badge: "Crítico",
    },
    {
      titulo: "Gestión de Usuarios",
      descripcion: "Administrar estudiantes, profesores y sus permisos",
      icono: Users,
      href: "/dashboard/admin/configuracion/usuarios-config",
      color: "bg-blue-100 text-blue-600",
      items: ["Estudiantes", "Profesores", "Permisos"],
      badge: "Activo",
    },
    {
      titulo: "Departamentos",
      descripcion: "Configurar departamentos académicos y sus responsables",
      icono: GraduationCap,
      href: "/dashboard/admin/configuracion/departamentos",
      color: "bg-purple-100 text-purple-600",
      items: ["ISC", "Ciencias Sociales", "Ciencias Básicas"],
      badge: null,
    },
    {
      titulo: "Materias",
      descripcion: "Gestionar materias y asignaciones por departamento",
      icono: BookOpen,
      href: "/dashboard/admin/configuracion/materias",
      color: "bg-green-100 text-green-600",
      items: ["Crear materias", "Asignar profesores", "Horarios"],
      badge: null,
    },
    {
      titulo: "Gestión de Profesores",
      descripcion: "Administrar información específica de profesores",
      icono: UserCheck,
      href: "/dashboard/admin/configuracion/profesores",
      color: "bg-amber-100 text-amber-600",
      items: ["Perfiles", "Especialidades", "Asignaciones"],
      badge: null,
    },
    {
      titulo: "Eventos del Sistema",
      descripcion: "Configurar eventos, fechas importantes y calendario",
      icono: Calendar,
      href: "/dashboard/admin/configuracion/eventos",
      color: "bg-indigo-100 text-indigo-600",
      items: ["Expo ESCOM", "Fechas límite", "Actividades"],
      badge: "Próximo",
    },
  ]

  const estadisticasConfig = {
    totalAdmins: 3,
    totalUsuarios: 239,
    departamentosActivos: 3,
    materiasRegistradas: 24,
    profesoresActivos: 18,
    eventosProximos: 5,
  }

  return (  
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6 text-blue-600" />
              Configuración del Sistema
            </h1>
            <p className="text-gray-600 mt-1">Administra todos los aspectos del sistema EXPOConfig</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Respaldo de Datos
            </Button>
            <Button>
              <Cog className="h-4 w-4 mr-2" />
              Configuración Global
            </Button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{estadisticasConfig.totalAdmins}</div>
              <div className="text-sm text-gray-500">Administradores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{estadisticasConfig.totalUsuarios}</div>
              <div className="text-sm text-gray-500">Usuarios</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{estadisticasConfig.departamentosActivos}</div>
              <div className="text-sm text-gray-500">Departamentos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{estadisticasConfig.materiasRegistradas}</div>
              <div className="text-sm text-gray-500">Materias</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{estadisticasConfig.profesoresActivos}</div>
              <div className="text-sm text-gray-500">Profesores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{estadisticasConfig.eventosProximos}</div>
              <div className="text-sm text-gray-500">Eventos</div>
            </CardContent>
          </Card>
        </div>

        {/* Secciones de configuración */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configuraciones.map((config, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-full ${config.color} group-hover:scale-110 transition-transform`}>
                    <config.icono className="h-6 w-6" />
                  </div>
                  {config.badge && (
                    <Badge variant={config.badge === "Crítico" ? "destructive" : "default"}>{config.badge}</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{config.titulo}</CardTitle>
                <CardDescription>{config.descripcion}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="space-y-1">
                    {config.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={config.href}>
                    <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200">
                      Configurar
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acciones rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Tareas comunes de administración del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4 flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Crear Usuario Masivo</span>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Programar Evento</span>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 flex-col gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">Importar Materias</span>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 flex-col gap-2">
                <Database className="h-5 w-5" />
                <span className="text-sm">Generar Reporte</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Información del sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Versión del Sistema</h3>
                <p className="text-sm text-gray-600">EXPOConfig v2.1.0</p>
                <p className="text-xs text-gray-500 mt-1">Última actualización: 15 Jun 2024</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Base de Datos</h3>
                <p className="text-sm text-gray-600">MongoDB 7.0</p>
                <p className="text-xs text-gray-500 mt-1">Estado: Conectado</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Último Respaldo</h3>
                <p className="text-sm text-gray-600">14 Jun 2024, 23:30</p>
                <p className="text-xs text-gray-500 mt-1">Automático diario</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
