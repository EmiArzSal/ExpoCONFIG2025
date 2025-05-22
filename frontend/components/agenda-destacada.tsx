import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Award, Users, MapPin, Clock, ChevronRight, ExternalLink, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

function AgendaDestacada() {
  return (
    <section id="agenda" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Agenda Destacada</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Conoce los eventos principales de nuestra exposición. ¡No te pierdas ninguna actividad!
                </p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden border-none shadow-md">
                  <div className="h-2 bg-blue-600"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="text-gray-700">Día 1 - 20 Junio</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Exposición</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Inauguración y Exposición de Proyectos</h3>
                    <p className="text-gray-600 mb-4">
                      Apertura oficial de la exposición y presentación de proyectos de Ingeniería de Software y Bases de
                      Datos.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>10:30 - 18:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Edificios 3 y 4</span>
                    </div>
                  </CardContent>
                </Card>
    
                <Card className="bg-neutral-100 overflow-hidden border-none shadow-md">
                  <div className="h-2 bg-purple-600"></div>
                  <CardContent className="p-6">
                    <div className="flex  justify-between items-start mb-4">
                      <Badge variant="outline" className="text-gray-700">Día 2 - 21 Junio</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Conferencia</Badge>
                    </div>
                    <h3 className="text-xl text-gray-800 font-bold mb-2">Conferencia: Innovación Tecnológica</h3>
                    <p className="text-gray-600 mb-4">
                      Conferencia magistral sobre las últimas tendencias en innovación tecnológica y su impacto en la
                      industria.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>12:00 - 14:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Auditorio Principal</span>
                    </div>
                  </CardContent>
                </Card>
    
                <Card className="bg-neutral-100 overflow-hidden border-none shadow-md">
                  <div className="h-2 bg-green-600"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="text-gray-700">Día 3 - 22 Junio</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Premiación</Badge>
                    </div>
                    <h3 className="text-xl text-gray-800 font-bold mb-2">Premiación y Clausura</h3>
                    <p className="text-gray-600 mb-4">
                      Ceremonia de premiación a los mejores proyectos y clausura oficial de la exposición.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>16:00 - 18:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Auditorio Principal</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
    
              <div className="text-center mt-8">
                <Link href="/dashboard/estudiante/agenda">
                  <Button variant="outline" className="gap-2">
                    Ver Agenda Completa
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
  )
}

export default AgendaDestacada