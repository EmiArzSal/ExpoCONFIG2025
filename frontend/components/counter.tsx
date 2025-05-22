import React, { useEffect, useState } from 'react'

function Counter() {
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
  )
}

export default Counter