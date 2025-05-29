import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { BackgroundGradientAnimation } from './ui/background-gradient-animation'
import { TextGenerateEffect } from './ui/text-generate-effect';
import { text } from 'stream/consumers';
import { TypewriterEffect } from './ui/typewriter-effect';

function HeroSection() {
  const words = `Descubre el talento y la innovación de nuestros estudiantes en la exposición anual de proyectos académicos.`;
  const words2 = [
    {
      text: 'Exposición'
    },
    {
      text: 'de'
    },
    {
      text: 'proyectos'
    },
    {
      text: 'escolares'
    },
    {
      text: 'ESCOM'
    }
  ]
  return (
    
      <BackgroundGradientAnimation>
        <section className="relative text-white py-20 overflow-hidden"> 
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <Badge className="text-white bg-blue-500 hover:bg-blue-500 mb-4">20-22 Junio 2025</Badge>              
              <TypewriterEffect words={words2} className="text-6xl mb-4 text-white"/>

              <TextGenerateEffect words={words} className="text-xl md:text-2xl mb-8 text-blue-100" duration={1.5}/>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 border-none hover:bg-blue-400">
                  Registra tu Proyecto
                </Button>
                <Button size="lg" variant="outline" className="bg-purple-600 text-white border-none hover:bg-purple-300">
                  Ver Agenda Completa
                </Button>
              </div>
            </div>
          </div>
        </section>
      </BackgroundGradientAnimation>

  )
}

export default HeroSection