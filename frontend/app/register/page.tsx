"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Award, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("estudiante")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de registro - en producción, esto se conectaría al backend de Spring Boot
    try {
      // Aquí iría la llamada a la API de registro
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      })

      // Redirigir a la página de inicio de sesión
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: "No se pudo completar el registro. Intente nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-1 text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <Award className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-600">EXPOConfig</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>Regístrate para acceder al sistema EXPOConfig</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuario</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Selecciona tu tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estudiante">Estudiante</SelectItem>
                  <SelectItem value="profesor">Profesor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" type="text" placeholder="Nombre Apellido" required />
            </div>

            {userType === "estudiante" && (
              <div className="space-y-2">
                <Label htmlFor="studentId">Número de Control</Label>
                <Input id="studentId" type="text" placeholder="Ej: 2020630123" required />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
            </div>

            {userType === "estudiante" && (
              <div className="space-y-2">
                <Label htmlFor="group">Grupo</Label>
                <Input id="group" type="text" placeholder="Ej: 3CM1" required />
              </div>
            )}

            {userType === "profesor" && (
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select defaultValue="isc">
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Selecciona tu departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="isc">Ingeniería en Sistemas Computacionales</SelectItem>
                    <SelectItem value="social">Ciencias Sociales</SelectItem>
                    <SelectItem value="basic">Ciencias Básicas</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Iniciar Sesión
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
