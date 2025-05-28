"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ConfirmAccountPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState("Verificando...")

  useEffect(() => {
    if (!token) {
      setStatus("Token no válido.")
      return
    }
    // Llama a tu backend para confirmar la cuenta
    fetch("http://localhost:8080/api/auth/confirm-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("¡Cuenta confirmada! Ya puedes iniciar sesión.")
        } else {
          setStatus(data.message || "No se pudo confirmar la cuenta.")
        }
      })
      .catch(() => setStatus("Error al confirmar la cuenta."))

  }, [token])

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Confirmación de cuenta</h1>
      <p>{status}</p>
    </div>
  )
}