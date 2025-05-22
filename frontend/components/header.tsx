import React from 'react'
import { Award } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'


function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">Expo ESCOM</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Acerca de
            </Link>
            <Link href="#agenda" className="text-gray-600 hover:text-blue-600 transition-colors">
              Agenda
            </Link>
            <Link href="#proyectos" className="text-gray-600 hover:text-blue-600 transition-colors">
              Proyectos
            </Link>
            <Link href="#departamentos" className="text-gray-600 hover:text-blue-600 transition-colors">
              Departamentos
            </Link>
            <Link href="#galeria" className="text-gray-600 hover:text-blue-600 transition-colors">
              Galería
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="bg-gray-200 text-black hover:bg-gray-300 hover:text-black border-none">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button className="text-white">Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>
  )
}

export default Header