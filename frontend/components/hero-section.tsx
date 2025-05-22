import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-blue-500 hover:bg-blue-500 mb-4">20-22 Junio 2024</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Exposición de Proyectos Escolares ESCOM</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Descubre el talento y la innovación de nuestros estudiantes en la exposición anual de proyectos
              académicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Registra tu Proyecto
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Ver Agenda Completa
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection