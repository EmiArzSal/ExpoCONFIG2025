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
  const [name, setName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [group, setGroup] = useState("")
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de registro - en producción, esto se conectaría al backend de Spring Boot
    try {
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
        role: userType === "estudiante" ? "alumno" : "profesor",
        group: userType === "estudiante" ? group : undefined,
        boleta: userType === "estudiante" ? studentId : undefined,
        department: userType === "profesor" ? department : undefined,
      }),
    })

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error en el registro")
    }

    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada correctamente",
    })

    setTimeout(() => {
    router.push("/login")
    }, 3500)
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
              <Label htmlFor="userType" className="text-gray-800">Tipo de Usuario</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="userType" className="bg-gray-100 border-none text-slate-500">
                  <SelectValue placeholder="Selecciona tu tipo de usuario" />
                </SelectTrigger>
                <SelectContent className="bg-gray-100 border-none">
                  <SelectItem value="estudiante" className="bg-gray-100 border-none text-slate-500">Estudiante</SelectItem>
                  <SelectItem value="profesor" className="bg-gray-100 border-none text-slate-500">Profesor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-800">Nombre Completo</Label>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre Completo" className="bg-gray-100 border-none text-slate-500" required  />
            </div>

            {userType === "estudiante" && (
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-gray-800">Número de Boleta</Label>
                <Input id="studentId" type="text" value={studentId} onChange={e => setStudentId(e.target.value)} className="bg-gray-100 border-none text-slate-500" placeholder="Ej: 2020630123" required />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800">Correo Electrónico</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 border-none text-slate-500" placeholder="correo@ejemplo.com" required />
            </div>

            {userType === "estudiante" && (
              <div className="space-y-2">
                <Label htmlFor="group" className="text-gray-800">Grupo</Label>
                <Input id="group" type="text" value={group} onChange={e => setGroup(e.target.value)} className="bg-gray-100 border-none text-slate-500" placeholder="Ej: 3CM1" required />
              </div>
            )}

            {userType === "profesor" && (
              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-800">Departamento</Label>
                <Select defaultValue="isc" value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="department" className="bg-gray-100 border-none text-slate-500">
                    <SelectValue className="bg-gray-100 border-none text-slate-500" placeholder="Selecciona tu departamento" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100 border-none">
                    <SelectItem value="isc" className="bg-gray-100 border-none text-slate-500">Ingeniería en Sistemas Computacionales</SelectItem>
                    <SelectItem value="social" className="bg-gray-100 border-none text-slate-500">Ingeniería en Inteligencia Artificial</SelectItem>
                    <SelectItem value="basic" className="bg-gray-100 border-none text-slate-500">Licenciatura en Ciencia de Datos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-800">Contraseña</Label>
              <Input id="password" className="bg-gray-100 border-none text-slate-500" type="password" value={password}
              onChange={e => setPassword(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-800">Confirmar Contraseña</Label>
              <Input id="confirmPassword" className="bg-gray-100 border-none text-slate-500" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
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
    </div>
  )
}
