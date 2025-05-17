"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"

export default function NuevoProyecto() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [integrantes, setIntegrantes] = useState([{ nombre: "", numeroControl: "", correo: "" }])

  const handleAddIntegrante = () => {
    setIntegrantes([...integrantes, { nombre: "", numeroControl: "", correo: "" }])
  }

  const handleRemoveIntegrante = (index: number) => {
    const newIntegrantes = [...integrantes]
    newIntegrantes.splice(index, 1)
    setIntegrantes(newIntegrantes)
  }

  const handleIntegranteChange = (index: number, field: string, value: string) => {
    const newIntegrantes = [...integrantes]
    newIntegrantes[index] = { ...newIntegrantes[index], [field]: value }
    setIntegrantes(newIntegrantes)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de envío - en producción, esto se conectaría al backend de Spring Boot
    try {
      // Aquí iría la llamada a la API para registrar el proyecto
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Proyecto registrado",
        description: "Tu proyecto ha sido registrado exitosamente y está pendiente de aprobación.",
      })

      // Redirigir a la lista de proyectos
      router.push("/dashboard/estudiante/proyectos")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al registrar el proyecto",
        description: "No se pudo registrar el proyecto. Intente nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userType="estudiante">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Registrar Nuevo Proyecto</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Proyecto</CardTitle>
                <CardDescription>Ingresa los detalles básicos de tu proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título del Proyecto</Label>
                  <Input id="titulo" placeholder="Ej: Sistema de Gestión de Inventarios" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materia">Materia</Label>
                  <Select required>
                    <SelectTrigger id="materia">
                      <SelectValue placeholder="Selecciona la materia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingenieria-software">Ingeniería de Software</SelectItem>
                      <SelectItem value="bases-datos">Bases de Datos</SelectItem>
                      <SelectItem value="criptografia">Criptografía</SelectItem>
                      <SelectItem value="redes">Redes de Computadoras</SelectItem>
                      <SelectItem value="inteligencia-artificial">Inteligencia Artificial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profesor">Profesor</Label>
                  <Select required>
                    <SelectTrigger id="profesor">
                      <SelectValue placeholder="Selecciona el profesor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profesor1">Profesora Delia</SelectItem>
                      <SelectItem value="profesor2">Profesor Don Mati</SelectItem>
                      <SelectItem value="profesor3">Profesora Cindy Miraflor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción del Proyecto</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe brevemente en qué consiste tu proyecto..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrantes del Equipo</CardTitle>
                <CardDescription>Agrega a todos los integrantes que participan en el proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrantes.map((integrante, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Integrante {index + 1}</h3>
                      {integrantes.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveIntegrante(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`nombre-${index}`}>Nombre Completo</Label>
                        <Input
                          id={`nombre-${index}`}
                          value={integrante.nombre}
                          onChange={(e) => handleIntegranteChange(index, "nombre", e.target.value)}
                          placeholder="Nombre Apellido"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`numeroControl-${index}`}>Número de Control</Label>
                        <Input
                          id={`numeroControl-${index}`}
                          value={integrante.numeroControl}
                          onChange={(e) => handleIntegranteChange(index, "numeroControl", e.target.value)}
                          placeholder="Ej: 2020630123"
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`correo-${index}`}>Correo Electrónico</Label>
                        <Input
                          id={`correo-${index}`}
                          type="email"
                          value={integrante.correo}
                          onChange={(e) => handleIntegranteChange(index, "correo", e.target.value)}
                          placeholder="correo@ejemplo.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={handleAddIntegrante} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Integrante
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Archivos del Proyecto</CardTitle>
                <CardDescription>Sube los archivos relacionados con tu proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cartel">Cartel del Proyecto (opcional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF o imagen (máx. 10MB)</p>
                    <Input id="cartel" type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    <Button type="button" variant="outline" size="sm" className="mt-4">
                      Seleccionar Archivo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentacion">Documentación Técnica (opcional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF o documento (máx. 20MB)</p>
                    <Input id="documentacion" type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    <Button type="button" variant="outline" size="sm" className="mt-4">
                      Seleccionar Archivo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confirmación</CardTitle>
                <CardDescription>Revisa la información antes de enviar</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Al enviar este formulario, confirmas que toda la información proporcionada es correcta y que has
                  obtenido el consentimiento de todos los integrantes del equipo para registrarlos en este proyecto.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Registrar Proyecto"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
