//Poner rfce para generar plantilla de componente


import React from 'react'
import { Award, ChevronRight } from 'lucide-react'
import Link from 'next/link'


function DepartmentSection() {
  return (
    <section id="departamentos" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Departamentos Participantes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce las diferentes áreas académicas que participan en nuestra exposición
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Ingeniería en Sistemas Computacionales</h3>
              <p className="text-gray-600 mb-4">
                Proyectos de desarrollo de software, bases de datos, inteligencia artificial y más.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">42 proyectos</span>
                <Link
                  href="/departamentos/isc"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  Ver proyectos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Ciencia de Datos</h3>
              <p className="text-gray-600 mb-4">
                Proyectos relacionados con análisis de datos, machine learning, etc.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">18 proyectos</span>
                <Link
                  href="/departamentos/sociales"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  Ver proyectos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Inteligencia Artificial</h3>
              <p className="text-gray-600 mb-4">
                Proyectos de matemáticas aplicadas, física computacional, algoritmos y más.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">26 proyectos</span>
                <Link
                  href="/departamentos/basicas"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  Ver proyectos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default DepartmentSection