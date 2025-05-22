import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Award, Users, MapPin, Clock, ChevronRight, ExternalLink, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

function ProyectosDestacados() {
  return (
    <section id="proyectos" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Proyectos Destacados</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce algunos de los proyectos más innovadores de ediciones anteriores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sistema de Gestión Inteligente"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">2023</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Sistema de Gestión Inteligente</h3>
                <p className="text-gray-600 mb-4">
                  Plataforma que utiliza inteligencia artificial para optimizar procesos administrativos.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Ingeniería de Software</div>
                  <Badge variant="outline">1er Lugar</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Aplicación de Realidad Aumentada"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">2023</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Aplicación de Realidad Aumentada</h3>
                <p className="text-gray-600 mb-4">
                  Aplicación educativa que utiliza realidad aumentada para enseñar conceptos complejos.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Desarrollo Móvil</div>
                  <Badge variant="outline">2do Lugar</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sistema de Seguridad Biométrica"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">2023</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Sistema de Seguridad Biométrica</h3>
                <p className="text-gray-600 mb-4">
                  Sistema de autenticación que combina múltiples factores biométricos para mayor seguridad.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Criptografía</div>
                  <Badge variant="outline">3er Lugar</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/proyectos-anteriores">
              <Button className="gap-2">
                Explorar Más Proyectos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default ProyectosDestacados