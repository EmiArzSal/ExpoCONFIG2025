"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Award, ArrowLeft, EyeOff, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("estudiante")
  const [name, setName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [group, setGroup] = useState("")
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [numeroEmpleado, setNumeroEmpleado] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Validación básica antes de enviar
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Las contraseñas no coinciden",
      })
      setIsLoading(false)
      return
    }

    //Validación contraseña de más de 8 caracteres
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Contraseña insegura",
        description: "Debe tener al menos 8 caracteres",
      })
      setIsLoading(false)
      return
    }

    // Validación de boleta de 10 caracteres numéricos
    if (userType === "estudiante") {
      const trimmedStudentId = studentId.trim()
      const boletaRegex = /^20\d{8}$/

      if (!boletaRegex.test(trimmedStudentId)) {
        toast({
          variant: "destructive",
          title: "Boleta inválida",
          description: "El formato de la boleta es inválido. Debe comenzar con '20' y tener exactamente 10 dígitos numéricos.",
        })
        setIsLoading(false)
        return
      }
    }

    // Validación de grupo no vacío
    if (userType === "profesor" && (!department || department.trim() === "")) {
      toast({
        variant: "destructive",
        title: "Departamento requerido",
        description: "Por favor selecciona tu departamento.",
      })
      setIsLoading(false)

      return
    }
    if(userType === "profesor" &&  !numeroEmpleado) {
      toast({
      variant: "destructive",
      title: "Número de empleado requerido",
      description: "Por favor ingresa tu número de empleado.",
      })
    setIsLoading(false)
    return
    }

    //Validación del grupo
    const trimmedGroup = group.trim().toUpperCase()
    const grupoGeneralRegex = /^[1-8][ABCS][MVX](?:[1-9]|1[0-9]|2[0-5])$/
    if (!grupoGeneralRegex.test(trimmedGroup) && userType === "estudiante") {
      toast({
        variant: "destructive",
        title: "Grupo inválido",
        description: "El grupo no está registrado como válido en el sistema.",
      })
      setIsLoading(false)
      return
    }

    
    try {
      console.log("Iniciando registro...") // Debug log

      const response = await fetch("http://localhost:8080/api/auth/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreCompleto: name,
          email,
          password,
          passwordConfirm: confirmPassword,
          userType: userType === "estudiante" ? "estudiante" : "profesor",
          group: userType === "estudiante" ? group : undefined,
          boleta: userType === "estudiante" ? studentId : undefined,
          department: userType === "profesor" ? department : undefined,
          numeroEmpleado: userType === "profesor" ? numeroEmpleado : undefined,
        }),
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data) // Debug log

      if (!response.ok) {
        const mensaje = data.message?.toLowerCase() || ""

        if (mensaje.includes("boleta")) {
          toast({
            variant: "destructive",
            title: "Boleta duplicada",
            description: "Ya existe un usuario registrado con ese número de boleta.",
          })
          setIsLoading(false)
          return
        }

        if (mensaje.includes("correo") || mensaje.includes("email")) {
          toast({
            variant: "destructive",
            title: "Correo duplicado",
            description: "Ya existe una cuenta registrada con ese correo electrónico.",
          })
          setIsLoading(false)
          return
        }

        toast({
          variant: "destructive",
          title: "Error en el registro",
          description: data.message || "Ocurrió un error al registrar la cuenta.",
        })
        setIsLoading(false)
        return
      }

      // Toast de éxito
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente.",
        duration: 3000,
      })

      // Esperar un poco antes de redirigir
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      console.error("Error en el registro:", error) // Debug log

      toast({
        variant: "destructive",
        title: "Error de registro",
        description: error instanceof Error ? error.message : "No se pudo completar el registro. Intente nuevamente.",
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
          <CardTitle className="text-gray-800">Crear Cuenta</CardTitle>
          <CardDescription>Regístrate para acceder al sistema EXPOConfig</CardDescription>
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
                  <SelectItem value="estudiante" className="bg-gray-100 border-none text-slate-500">
                    Estudiante
                  </SelectItem>
                  <SelectItem value="profesor" className="bg-gray-100 border-none text-slate-500">
                    Profesor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-800">
                Nombre Completo
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre Completo"
                className="bg-gray-100 border-none text-slate-500"
                required
              />
            </div>

            {userType === "estudiante" && (
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-gray-800">
                  Número de Boleta
                </Label>
                <Input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="bg-gray-100 border-none text-slate-500"
                  placeholder="Ej: 2020630123"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border-none text-slate-500"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            {userType === "estudiante" && (
              <div className="space-y-2">
                <Label htmlFor="group" className="text-gray-800">
                  Grupo
                </Label>
                <Input
                  id="group"
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="bg-gray-100 border-none text-slate-500"
                  placeholder="Ej: 3CM1"
                  required
                />
              </div>
            )}

            {userType === "profesor" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="numeroEmpleado" className="text-gray-800">
                    Número de Empleado
                  </Label>
                  <Input
                    id="numeroEmpleado"
                    type="text"
                    value={numeroEmpleado}
                    onChange={(e) => setNumeroEmpleado(e.target.value)}
                    className="bg-gray-100 border-none text-slate-500"
                    placeholder="Ej: EMP12345"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-800">
                    Departamento
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department" className="bg-gray-100 border-none text-slate-500">
                      <SelectValue placeholder="Selecciona tu departamento" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-100 border-none">
                      <SelectItem value="isc" className="bg-gray-100 border-none text-slate-500">
                        Ingeniería en Sistemas Computacionales
                      </SelectItem>
                      <SelectItem value="ia" className="bg-gray-100 border-none text-slate-500">
                        Ingeniería en Inteligencia Artificial
                      </SelectItem>
                      <SelectItem value="lcd" className="bg-gray-100 border-none text-slate-500">
                        Licenciatura en Ciencia de Datos
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

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
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-800">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  className="bg-gray-100 border-none text-slate-500"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"
                    tabIndex={-1}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-auto text-white" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="text-center text-sm text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Iniciar Sesión
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* Asegúrate de que el Toaster esté presente */}
      <Toaster />
    </div>
  )
}
