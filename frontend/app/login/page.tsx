"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Award, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("estudiante")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Validación básica
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        duration: 3000,
      })
      setIsLoading(false)
      return
    }

    // Mapeo del tipo de usuario para el backend
    let userTypeBackend = userType
    if (userType === "estudiante") userTypeBackend = "alumno"
    if (userType === "profesor") userTypeBackend = "profesor"
    if (userType === "admin") userTypeBackend = "admin"

    console.log("Iniciando login con:", { email, userType: userTypeBackend }) // Debug log

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userType: userTypeBackend,
        }),
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data) // Debug log
      console.log("Status de respuesta:", response.status) // Debug log

      // Verificar si la cuenta no está confirmada
      if (data.message && data.message.toLowerCase().includes("no confirmada")) {
        console.log("Cuenta no confirmada detectada") // Debug log
        toast({
          variant: "destructive",
          title: "Cuenta no confirmada",
          description: data.message,
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      // Verificar si la respuesta no es exitosa
      if (!response.ok) {
        console.log("Error en la respuesta:", data.message) // Debug log
        throw new Error(data.message || "Credenciales incorrectas.")
      }

      // Guardar token si existe
      if (data.data) {
        localStorage.setItem("token", data.data)
        console.log("Token guardado en localStorage") // Debug log
      }

      console.log("Login exitoso, mostrando toast...") // Debug log

      // Toast de éxito
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: "Bienvenido al sistema EXPOConfig. Redirigiendo...",
        duration: 2000,
      })

      // Determinar la ruta de redirección
      let redirectPath = "/dashboard"
      if (userType === "estudiante") {
        redirectPath = "/dashboard/estudiante"
      } else if (userType === "profesor") {
        redirectPath = "/dashboard/profesor"
      } else if (userType === "admin") {
        redirectPath = "/dashboard/admin"
      }

      console.log("Redirigiendo a:", redirectPath) // Debug log

      // Redirección con un pequeño delay para mostrar el toast
      setTimeout(() => {
        router.push(redirectPath)
      }, 2000)
    } catch (error) {
      console.error("Error en el login:", error) // Debug log

      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error instanceof Error ? error.message : "Credenciales incorrectas. Intente nuevamente.",
        duration: 5000,
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
              <Label htmlFor="userType" className="text-gray-800">
                Tipo de Usuario
              </Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType" className="bg-gray-100 border-none text-slate-500">
                  <SelectValue placeholder="Selecciona tu tipo de usuario" />
                </SelectTrigger>
                <SelectContent className="bg-gray-100 border-none">
                  <SelectItem className="bg-gray-100 border-none text-slate-500" value="estudiante">
                    Estudiante
                  </SelectItem>
                  <SelectItem className="bg-gray-100 border-none text-slate-500" value="profesor">
                    Profesor
                  </SelectItem>
                  <SelectItem className="bg-gray-100 border-none text-slate-500" value="admin">
                    Administrador
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                className="bg-gray-100 border-none text-slate-500"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-800">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  className="bg-gray-100 border-none text-slate-500 pr-10"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
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
      <Toaster />
    </div>
  )
}
