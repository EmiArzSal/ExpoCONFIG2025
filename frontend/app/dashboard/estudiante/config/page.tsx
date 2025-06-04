import React, { useState } from 'react';

function ConfigPage() {
  // Estado simulado del proyecto
  const [titulo, setTitulo] = useState('Título del Proyecto');
  const [descripcion, setDescripcion] = useState('Descripción actual del proyecto');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en backend
    setMensaje('¡Información actualizada correctamente!');
  };

  return (
    <div>
      <h1>Configuración del Proyecto</h1>
      
      {/* Actualizar información del proyecto */}
      <section>
        <h2>Actualizar Información</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              required
            />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
        {mensaje && <p style={{color: 'green'}}>{mensaje}</p>}
      </section>
      {/* ...resto de secciones... */}
    </div>
  );
}

export default ConfigPage