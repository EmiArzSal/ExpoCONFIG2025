# ExpoCONFIG2025

ExpoCONFIG2025 es un sistema integral para la gestión de exposiciones académicas en ExpoESCOM. Su objetivo principal es facilitar la organización, el registro y el seguimiento de proyectos, profesores y visitantes durante el evento.

## 🚀 Descripción General

ExpoCONFIG2025 permite:
- Registrar y administrar proyectos presentados por estudiantes.
- Asignar y gestionar profesores responsables de cada proyecto.
- Controlar y monitorear la asistencia de visitantes.
- Proporcionar herramientas para la evaluación y retroalimentación de los proyectos expuestos.

El sistema ha sido diseñado para optimizar la logística del evento, brindar una experiencia más fluida a todos los participantes y permitir la recopilación de datos útiles para futuras ediciones de ExpoESCOM.

## 🛠️ Tecnologías Utilizadas

- **Backend:** Spring Boot (Java)
- **Frontend:** React (TypeScript y Next.js)
- **Base de datos:** MongoDB Atlas
- **Otros:** CSS, JavaScript

## 📦 Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

## 1. Clona el repositorio:
   ```sh
   git clone https://github.com/EmiArzSal/ExpoCONFIG2025.git
```
## 2. Configura las variables de entorno

### Backend

Crea un archivo `.env` en la carpeta `backend` (o utiliza `application.properties` si prefieres) e incluye la URI de tu base de datos MongoDB Atlas:
```ini
SPRING_DATA_MONGODB_URI=tu_uri_de_mongodb
```
