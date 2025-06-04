"use client"
import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Label } from "@/components/ui/label"

interface Admin {
  id: string,
  nombreCompleto: string,
  email: string,
}

/**
 * Displays an administrative interface for managing admin users, allowing creation, listing, and deletion of administrators.
 *
 * Provides a dashboard page where admins can view all current administrators, add new ones via a modal form, and remove existing admins. Integrates with backend API endpoints for data persistence and uses toast notifications for user feedback.
 */
export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [nombreCompleto, setNombreCompleto] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const fetchAdmins = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/admin/admins", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          throw new Error("Error al obtener los administradores")
        }
        const data = await res.json()
        setAdmins(data.admins || [])
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar los administradores." })
      }
  }

  useEffect(() => {
    fetchAdmins()
  }, [token])

  // Simulación de creación de admin (reemplaza por llamada a tu API)
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:8080/api/auth/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombreCompleto, email, password, passwordConfirm: password, userType: "ADMIN"}),
      })
      const data = await res.json()
      if(!res.ok || !data.success) throw new Error(data.message || "No se pudo crear el admin")
      setAdmins([
        ...admins,
        { id: data.id || Date.now().toString(), nombreCompleto, email }
      ])
      toast({ title: "Admin creado", description: `Se agregó a ${nombreCompleto}` })
      setShowDialog(false)
      setNombreCompleto("")
      setEmail("")
      setPassword("")
      await fetchAdmins()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message || "No se pudo crear el admin." })
    } finally {
      setIsLoading(false)
    }
  }

  // Simulación de eliminación (reemplaza por llamada a tu API)
  const handleDeleteAdmin = async (id: string) => {
    try {
      await fetch(`http://localhost:8080/api/auth/delete-admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      toast({ title: "Admin eliminado", description: "El administrador ha sido eliminado." })
      await fetchAdmins()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message || "No se pudo eliminar el admin." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userType="admin">
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Administradores</CardTitle>
          <Button onClick={() => setShowDialog(true)} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Nuevo admin
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {admins.length === 0 && <div className="text-gray-500">No hay administradores registrados.</div>}
            {admins.map(admin => (
              <div key={admin.id} className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50">
                <div>
                  <div className="font-medium">{admin.nombreCompleto}</div>
                  <div className="text-xs text-gray-500">{admin.email}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteAdmin(admin.id)}
                  title="Eliminar admin"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal para crear admin */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nuevo administrador</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <Input
              placeholder="Nombre completo"
              className="bg-gray-100 border-none text-slate-500 pr-10"
              value={nombreCompleto}
              onChange={e => setNombreCompleto(e.target.value)}
              required
            />
            <Input
              placeholder="Correo electrónico"
              type="email"
              className="bg-gray-100 border-none text-slate-500 pr-10"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className="relative">
                <Input
                  placeholder="Contraseña"
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
            <div>
              <Input
                placeholder="Confirmar contraseña"
                type={showPassword ? "text" : "password"}
                className="bg-gray-100 border-none text-slate-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear admin"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}