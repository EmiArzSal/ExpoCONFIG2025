"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Award, Users, MapPin, Clock, ChevronRight, ExternalLink, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Counter from "@/components/counter"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import AgendaDestacada from "@/components/agenda-destacada"
import ProyectosDestacados from "@/components/proyectos-destacados"

export default function Home() {
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <HeroSection/>

      {/* Countdown */}
      <Counter/>

      {/* Acerca de */}
      <AboutSection/>

      {/* Agenda Destacada */}
      <AgendaDestacada/>

      {/* Proyectos Destacados */}
      <ProyectosDestacados/>

      {/* Departamentos */}
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

      {/* Testimonios */}
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

      {/* Galería */}
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

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para participar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Registra tu proyecto y forma parte de la Expo ESCOM 2024. ¡Muestra tu talento al mundo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Registrarse
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Expo ESCOM</span>
              </div>
              <p className="text-gray-400">
                Exposición anual de proyectos escolares de la Escuela Superior de Cómputo del IPN.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#acerca-de" className="text-gray-400 hover:text-white transition-colors">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="#agenda" className="text-gray-400 hover:text-white transition-colors">
                    Agenda
                  </Link>
                </li>
                <li>
                  <Link href="#proyectos" className="text-gray-400 hover:text-white transition-colors">
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="#galeria" className="text-gray-400 hover:text-white transition-colors">
                    Galería
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Av. Juan de Dios Bátiz s/n</li>
                <li>Nueva Industrial Vallejo</li>
                <li>Ciudad de México, CP 07738</li>
                <li>expo@escom.ipn.mx</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Sistema</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                    Registrarse
                  </Link>
                </li>
                <li>
                  <Link href="/ayuda" className="text-gray-400 hover:text-white transition-colors">
                    Ayuda
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Expo ESCOM. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="https://www.facebook.com" target="_blank" className="text-gray-400 hover:text-white">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" className="text-gray-400 hover:text-white">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" className="text-gray-400 hover:text-white">
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
