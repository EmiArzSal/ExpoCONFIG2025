import React from 'react'
import { Card, CardContent } from './ui/card'





function Testimonios() {
  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Experiencias de Participantes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lo que dicen nuestros estudiantes y profesores sobre la Expo ESCOM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=48&width=48" alt="Nacho" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">Nacho</h3>
                    <p className="text-sm text-gray-500">Estudiante</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Participar en la Expo ESCOM fue una experiencia enriquecedora. Pudimos mostrar nuestro proyecto a
                  otros estudiantes y profesores, recibiendo retroalimentación valiosa para mejorarlo."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Profesora Delia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Profesora Delia</h3>
                    <p className="text-sm text-gray-500">Jefe de Departamento</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "La exposición es una oportunidad única para que los estudiantes demuestren sus habilidades y
                  conocimientos adquiridos durante el semestre. Es gratificante ver su crecimiento."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg?height=48&width=48" alt="Belén" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">Belén</h3>
                    <p className="text-sm text-gray-500">Estudiante</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Nuestro proyecto quedó entre los primeros tres lugares, ¡estuvo padre! Además, la experiencia de
                  presentar nuestro trabajo ante el jurado fue un gran aprendizaje."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default Testimonios