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

type Departamento = {
  id: number;
  nombre: string;
  responsable: string;
  correo: string;
};

const departamentosIniciales: Departamento[] = [
  { id: 1, nombre: "Sistemas", responsable: "Ing. Pérez", correo: "perez@escom.ipn.mx" },
  { id: 2, nombre: "Redes", responsable: "Mtra. López", correo: "lopez@escom.ipn.mx" },
];

export default function DepartamentosConfig() {
  const [departamentos, setDepartamentos] = useState<Departamento[]>(departamentosIniciales);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Configuración de Departamentos</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Agregar Departamento
      </button>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Responsable</th>
            <th className="py-2 px-4 border-b">Correo</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((dep) => (
            <tr key={dep.id}>
              <td className="py-2 px-4 border-b">{dep.nombre}</td>
              <td className="py-2 px-4 border-b">{dep.responsable}</td>
              <td className="py-2 px-4 border-b">{dep.correo}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                  Editar
                </button>
                <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}