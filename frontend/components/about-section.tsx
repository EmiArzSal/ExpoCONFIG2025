import { Award, CalendarDays, MapPin, Users } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function AboutSection() {
  return (
      <section id="acerca-de" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Acerca de la Expo ESCOM</h2>
              <p className="text-lg text-gray-600 mb-4">
                La Exposición de Proyectos Escolares de ESCOM es un evento anual que se celebra al final del primer
                semestre, donde los estudiantes tienen la oportunidad de mostrar sus proyectos académicos desarrollados
                durante el periodo.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Este espacio permite valorar el esfuerzo y talento de nuestros estudiantes, además de fomentar la
                interacción con la comunidad académica, empresas y visitantes externos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Proyectos Destacados</h3>
                    <p className="text-gray-600 text-sm">Reconocimiento a los mejores trabajos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Networking</h3>
                    <p className="text-gray-600 text-sm">Conexión con empresas y profesionales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Eventos Diversos</h3>
                    <p className="text-gray-600 text-sm">Talleres, conferencias y actividades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Múltiples Espacios</h3>
                    <p className="text-gray-600 text-sm">Distribuidos por toda la escuela</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/img1.jpg"
                alt="Estudiantes presentando sus proyectos"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutSection