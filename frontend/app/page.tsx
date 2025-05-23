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
import DepartmentSection from "@/components/departments"
import Testimonios from "@/components/testimonios"
import GallerySection from "@/components/gallery-section"
import CiaSection from "@/components/cia-section"


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
      <DepartmentSection/>

      {/* Testimonios */}
      <Testimonios/>

      {/* Galería */}
      <GallerySection/>

      {/* CTA */}
      <CiaSection/>

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
