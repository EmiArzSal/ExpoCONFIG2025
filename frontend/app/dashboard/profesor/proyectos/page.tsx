'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

interface Project {
  id: string
  title: string
  description: string
  group: string
  career: string
  subject: string
  integrantes: string[]
  status: string
}

export default function AgregarProyecto() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    group: '',
    description: '',
    career: '',
    subject: '',
    integrantes: ''
  })

  const [projects, setProjects] = useState<Project[]>([])
  const [professorName, setProfessorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token. Inicia sesión.')

        const res = await fetch('http://localhost:8080/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const userData = await res.json()
        if (!res.ok) throw new Error(userData.message || 'Error al obtener usuario')
        const nombre = userData.nombreCompleto || userData.data?.nombreCompleto
        setProfessorName(nombre)

        const projectsRes = await fetch('http://localhost:8080/api/projects/my-projects', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const projectsData = await projectsRes.json()
        if (!projectsRes.ok) throw new Error(projectsData.message || 'Error al cargar proyectos')
        setProjects(projectsData.data || [])
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndProjects()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          integrantes: form.integrantes.split(',').map(i => i.trim()),
          professorName,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al registrar proyecto')

      toast.success('Proyecto registrado correctamente')
      setForm({ title: '', group: '', description: '', career: '', subject: '', integrantes: '' })
      setProjects(prev => [data.data, ...prev])
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Formulario */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Registrar nuevo proyecto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'group', 'career', 'subject'].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>
                {field === 'title' ? 'Título' :
                 field === 'group' ? 'Grupo' :
                 field === 'career' ? 'Carrera' :
                 field === 'subject' ? 'Materia' : field}
              </Label>
              <Input
                id={field}
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="integrantes">Integrantes (separados por coma)</Label>
            <Input
              id="integrantes"
              name="integrantes"
              value={form.integrantes}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Registrando...' : 'Registrar proyecto'}
          </Button>
        </form>
      </div>

      {/* Lista de proyectos */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Mis proyectos</h2>
        {loading ? (
          <p>Cargando proyectos...</p>
        ) : projects.length === 0 ? (
          <p>No tienes proyectos registrados.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <Card key={p.id}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-600">Grupo: <strong>{p.group}</strong></p>
                  <p className="text-sm text-gray-600">Carrera: {p.career}</p>
                  <p className="text-sm text-gray-600">Materia: {p.subject}</p>
                  <p className="text-sm text-gray-600">Estado: <span className="capitalize">{p.status || 'pendiente'}</span></p>
                  <p className="text-sm">Descripción:</p>
                  <p className="text-sm text-gray-800 bg-gray-100 rounded p-2">{p.description}</p>
                  <p className="text-sm">Integrantes:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {p.integrantes.map((nombre, index) => (
                      <li key={index}>{nombre}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
