import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'

function GallerySection() {
  return (
    <section id="galeria" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Galería de Ediciones Anteriores</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Revive los momentos más destacados de nuestras exposiciones pasadas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2023"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2023"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2023"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2023"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2022"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2022"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2022"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Exposición 2022"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/galeria">
              <Button variant="outline" className="gap-2">
                Ver Más Fotos
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default GallerySection