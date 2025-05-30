"use client"
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
import Footer from "@/components/footer"


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
      <Footer/>
    </div>
  )
}