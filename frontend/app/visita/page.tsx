"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const standsDisponibles = [
  "Stand 1",
  "Stand 2",
  "Stand 3",
  "Stand 4",
  "Stand 5",
]

export default function RegistroDeVisita() {
  const [nombre, setNombre] = useState("")
  const [stand, setStand] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [registrado, setRegistrado] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nombre.trim() || !stand) {
      setMensaje("Por favor ingresa tu nombre y selecciona un stand.")
      return
    }

    try {
      const res = await fetch("http://localhost:8080/api/visitas/registrarVisita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, stand }),
      })

      const texto = await res.text()
      setMensaje(texto)
      setRegistrado(true)
      setNombre("")
      setStand("")
    } catch (error) {
      setMensaje("Error al registrar visita.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-700">
            Registro de Visita
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!registrado ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nombre completo</label>
                <Input
                  type="text"
                  placeholder="Escribe tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Selecciona el stand</label>
                <Select value={stand} onValueChange={setStand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige un stand" />
                  </SelectTrigger>
                  <SelectContent>
                    {standsDisponibles.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Registrar Visita
              </Button>

              {mensaje && (
                <p className="text-center text-green-600 text-sm mt-2">
                  {mensaje}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center text-green-600 font-semibold text-lg">
              ✅ {mensaje}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}