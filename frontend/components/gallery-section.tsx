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
                src="/images/gallery01.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery02.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery03.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery04.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery05.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery06.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery07.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/gallery08.jpg?height=300&width=300"
                alt="Exposición 2024"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>
  )
}

export default GallerySection