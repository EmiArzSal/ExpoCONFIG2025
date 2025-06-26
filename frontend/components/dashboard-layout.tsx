"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Award, LayoutDashboard, Calendar, Users, FileText, MapPin, Settings, LogOut, Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "estudiante" | "profesor" | "admin"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${userType}`,
      icon: LayoutDashboard,
      roles: ["estudiante", "profesor", "admin"],
    },
    {
      title: "Proyectos",
      href: `/dashboard/${userType}/proyectos`,
      icon: FileText,
      roles: ["estudiante", "profesor", "admin"],
    },
    {
      title: "Agenda",
      href: `/dashboard/${userType}/agenda`,
      icon: Calendar,
      roles: ["estudiante", "profesor", "admin"],
    },
    {
      title: "Espacios",
      href: `/dashboard/${userType}/espacios`,
      icon: MapPin,
      roles: ["profesor", "admin"],
    },
    {
      title: "Usuarios",
      href: `/dashboard/${userType}/usuarios`,
      icon: Users,
      roles: ["profesor", "admin"],
    },
    {
      title: "Evaluaciones",
      href: `/dashboard/${userType}/evaluaciones`,
      icon: Award,
      roles: ["profesor", "admin"],
    },
    {
      title: "Usuarios",
      href: `/dashboard/${userType}/usuarios`,
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Configuración",
      href: `/dashboard/${userType}/configuracion`,
      icon: Settings,
      roles: ["estudiante", "profesor", "admin"],
    },
  ]

  const filteredNavItems = navigationItems.filter((item) => item.roles.includes(userType))

  const userName =
    userType === "estudiante" ? "Estudiante Demo" : userType === "profesor" ? "Profesor Demo" : "Administrador"

  const userEmail =
    userType === "estudiante" ? "estudiante@demo.com" : userType === "profesor" ? "profesor@demo.com" : "admin@demo.com"

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/escom-logo.png" alt="Expo ESCOM Logo" className="h-12 w-14 " />
            <span className="text-xl font-bold text-blue-600">EXPOConfig</span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((items) => (
            <Link
              key={items.href}
              href={items.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === items.href ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <items.icon className="h-5 w-5" />
              {items.title}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>
          <Link href="/login">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </Link>
        </div>
      </aside>

      {/* Sidebar móvil */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
            <img src="/images/escom-logo.png" alt="Expo ESCOM Logo" className="h-12 w-14 " />
            <span className="text-xl font-bold text-blue-600">EXPOConfig</span>
            </Link>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>
            <Link href="/login">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex items-center ml-auto gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="md:hidden">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
