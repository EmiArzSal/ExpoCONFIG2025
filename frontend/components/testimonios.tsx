import React from 'react'
import { Card, CardContent } from './ui/card'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'





function Testimonios() {
  const testimonials = [
    {
      name: "Enrique Cervantes",
      title: "Estudiante IIA",
      quote: "Participar en la Expo ESCOM fue una experiencia enriquecedora. Pudimos mostrar nuestro proyecto a otros estudiantes y profesores, recibiendo retroalimentación valiosa para mejorarlo."
    },
    {
      name: "Lule Margarita",
      title: "Jefa de departamento",
      quote: "La exposición es una oportunidad única para que los estudiantes demuestren sus habilidades y conocimientos adquiridos durante el semestre. Es gratificante ver su crecimiento."
    },
    {
      name: "Berenice Gutierrez",
      title: "Estudiante ISC",
      quote: "Nuestro proyecto quedó entre los primeros tres lugares, ¡estuvo padre! Además, la experiencia de presentar nuestro trabajo ante el jurado fue un gran aprendizaje."
    },
    {
      name: "Iván Blanco",
      title: "Profesor",
      quote: "La Expo ESCOM permite a los estudiantes aplicar sus conocimientos en proyectos reales y desarrollar habilidades de trabajo en equipo. Es un espacio fundamental para su formación profesional."
    },
    {
      name: "Reyna Abarca",
      title: "Profesora",
      quote: "Me impresiona el nivel de creatividad e innovación que presentan los alumnos cada año. La exposición fomenta el intercambio de ideas y el aprendizaje colaborativo."
    }
  ]
  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Experiencias de Participantes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lo que dicen nuestros estudiantes y profesores sobre la Expo ESCOM
            </p>
          </div>

          <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
        </div>
      </section>
  )
}

export default Testimonios