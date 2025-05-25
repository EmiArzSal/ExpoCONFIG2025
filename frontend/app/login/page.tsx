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

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("estudiante")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    // Simulación de login - en producción, esto se conectaría al backend de Spring Boot
    try {
      
      const response = await fetch("http://localhost:8080/api/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userType,
        }),
      })

    if(!response.ok){
      throw new Error("Credenciales incorrectas.")
    }

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema EXPOConfig",
      })

      // Redirigir según el tipo de usuario
      if (userType === "estudiante") {
        router.push("/dashboard/estudiante")
      } else if (userType === "profesor") {
        router.push("/dashboard/profesor")
      } else if (userType === "admin") {
        router.push("/dashboard/admin")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas. Intente nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-1 text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <Award className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-600">EXPOConfig</h1>
      </div>

      <Card className="w-full max-w-md bg-white border-none">
        <CardHeader>
          <CardTitle className="text-gray-800">Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-gray-800">Tipo de Usuario</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType" className="bg-gray-100 border-none text-slate-500">
                  <SelectValue placeholder="Selecciona tu tipo de usuario" />
                </SelectTrigger>
                <SelectContent className="bg-gray-100 border-none">
                  <SelectItem className="bg-gray-100 border-none text-slate-500" value="estudiante">Estudiante</SelectItem>
                  <SelectItem className="bg-gray-100 border-none text-slate-500" value="profesor">Profesor</SelectItem>
                  <SelectItem className="bg-gray-100 border-none text-slate-500" value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800">Correo Electrónico</Label>
              <Input id="email" className="bg-gray-100 border-none text-slate-500" type="email" placeholder="correo@ejemplo.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-800">Contraseña</Label>
              <Input id="password" className="bg-gray-100 border-none text-slate-500" type="password" required />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-auto text-white" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            <div className="text-center text-sm text-slate-500">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
