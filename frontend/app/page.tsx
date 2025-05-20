"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Award, Users, MapPin, Clock, ChevronRight, ExternalLink, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const expoDate = new Date("2025-06-20T10:00:00")
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date()
      const remainingTime = expoDate.getTime() - currentDate.getTime()

      const days = Math.max(0, Math.floor(remainingTime / (1000 * 60 * 60 * 24)))
      const hours = Math.max(0, Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      const minutes = Math.max(0, Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)))
      const seconds = Math.max(0, Math.floor((remainingTime % (1000 * 60)) / 1000))

      setTimeRemaining({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [expoDate])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">Expo ESCOM</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/pages/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Acerca de
            </Link>
            <Link href="/pages/agenda" className="text-gray-600 hover:text-blue-600 transition-colors">
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
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-blue-500 hover:bg-blue-500 mb-4">20-22 Junio 2024</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Exposición de Proyectos Escolares ESCOM</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Descubre el talento y la innovación de nuestros estudiantes en la exposición anual de proyectos
              académicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Registra tu Proyecto
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Ver Agenda Completa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="bg-white py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">La exposición comienza en</h2>
              <p className="text-gray-600">¡No te pierdas esta oportunidad de conocer proyectos innovadores!</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-50 rounded-lg p-4 w-24 text-center">
                <div className="text-3xl font-bold text-blue-600">{timeRemaining.days}</div>
                <div className="text-sm text-gray-600">Días</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 w-24 text-center">
                <div className="text-3xl font-bold text-blue-600">{timeRemaining.hours}</div>
                <div className="text-sm text-gray-600">Horas</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 w-24 text-center">
                <div className="text-3xl font-bold text-blue-600">{timeRemaining.minutes}</div>
                <div className="text-sm text-gray-600">Minutos</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 w-24 text-center">
                <div className="text-3xl font-bold text-blue-600">{timeRemaining.seconds}</div>
                <div className="text-sm text-gray-600">Segundos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acerca de */}
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

      {/* Agenda Destacada */}
      <section id="agenda" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Agenda Destacada</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce los eventos principales de nuestra exposición. ¡No te pierdas ninguna actividad!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-2 bg-blue-600"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Día 1 - 20 Junio</Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Exposición</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">Inauguración y Exposición de Proyectos</h3>
                <p className="text-gray-600 mb-4">
                  Apertura oficial de la exposición y presentación de proyectos de Ingeniería de Software y Bases de
                  Datos.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>10:30 - 18:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Edificios 3 y 4</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-100 overflow-hidden border-none shadow-md">
              <div className="h-2 bg-purple-600"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Día 2 - 21 Junio</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Conferencia</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">Conferencia: Innovación Tecnológica</h3>
                <p className="text-gray-600 mb-4">
                  Conferencia magistral sobre las últimas tendencias en innovación tecnológica y su impacto en la
                  industria.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>12:00 - 14:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Auditorio Principal</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-100 overflow-hidden border-none shadow-md">
              <div className="h-2 bg-green-600"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline">Día 3 - 22 Junio</Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Premiación</Badge>
                </div>
                <h3 className="text-xl text-gray-800 font-bold mb-2">Premiación y Clausura</h3>
                <p className="text-gray-600 mb-4">
                  Ceremonia de premiación a los mejores proyectos y clausura oficial de la exposición.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>16:00 - 18:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Auditorio Principal</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/dashboard/estudiante/agenda">
              <Button variant="outline" className="gap-2">
                Ver Agenda Completa
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section id="proyectos" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Proyectos Destacados</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce algunos de los proyectos más innovadores de ediciones anteriores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sistema de Gestión Inteligente"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">2023</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Sistema de Gestión Inteligente</h3>
                <p className="text-gray-600 mb-4">
                  Plataforma que utiliza inteligencia artificial para optimizar procesos administrativos.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Ingeniería de Software</div>
                  <Badge variant="outline">1er Lugar</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Aplicación de Realidad Aumentada"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">2023</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Aplicación de Realidad Aumentada</h3>
                <p className="text-gray-600 mb-4">
                  Aplicación educativa que utiliza realidad aumentada para enseñar conceptos complejos.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Desarrollo Móvil</div>
                  <Badge variant="outline">2do Lugar</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sistema de Seguridad Biométrica"
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">2023</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Sistema de Seguridad Biométrica</h3>
                <p className="text-gray-600 mb-4">
                  Sistema de autenticación que combina múltiples factores biométricos para mayor seguridad.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Criptografía</div>
                  <Badge variant="outline">3er Lugar</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/proyectos-anteriores">
              <Button className="gap-2">
                Explorar Más Proyectos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
                Iniciar Sesión
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
                    Iniciar Sesión
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
