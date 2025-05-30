import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

function CiaSection() {
  return (
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
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default CiaSection