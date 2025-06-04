import React from "react";
import Link from "next/link";

function Proyectos() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Proyectos</h2>
        <p className="text-lg text-gray-600 mb-4">
          Explora los proyectos destacados de nuestros estudiantes, donde la innovación y la creatividad se unen para
          crear soluciones tecnológicas impactantes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí puedes mapear tus proyectos */}
          <Link href="/proyecto/1" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Proyecto 1</h3>
            <p className="text-gray-600">Descripción breve del proyecto 1.</p>
          </Link>
          <Link href="/proyecto/2" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Proyecto 2</h3>
            <p className="text-gray-600">Descripción breve del proyecto 2.</p>
          </Link>
          <Link href="/proyecto/3" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Proyecto 3</h3>
            <p className="text-gray-600">Descripción breve del proyecto 3.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
export default Proyectos;



