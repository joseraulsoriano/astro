# Magical Moon - Museo Digital de Arte

Museo digital gratuito donde artistas, museos e instituciones gubernamentales pueden exponer sus obras de arte. Plataforma interactiva con visualización 2D, 3D y Realidad Aumentada (AR).

## 🎨 Descripción

Magical Moon es un museo digital que permite a cualquier usuario (artistas, museos, instituciones gubernamentales) subir y exponer sus obras de arte digital. La plataforma ofrece una experiencia inmersiva única con visualización en múltiples formatos: vista normal (2D), proyección 3D y Realidad Aumentada para ver cómo se vería la obra en tu espacio real.

## ✨ Características Principales

### Visualización Múltiple
- **Vista Normal (2D)**: Visualización estándar de imágenes
- **Vista 3D**: Modelos 3D interactivos (GLB/GLTF)
- **Realidad Aumentada (AR)**: Ver obras en tu espacio real con la cámara del móvil
- **Salas Virtuales**: Organización de obras en exposiciones temáticas

### Gestión de Obras
- Subida segura de imágenes, PDFs y modelos 3D
- Metadatos completos (título, descripción, técnica, año, dimensiones)
- Categorías y tags para organización
- Sistema de búsqueda y filtros avanzados

### Social y Engagement
- Sistema de likes y comentarios
- Perfiles de artistas/museos
- Colecciones personales
- Compartir obras en redes sociales

### Autenticación
- Login con OAuth múltiple (Google, Meta/Facebook, Pinterest)
- Perfiles personalizados
- Dashboard para gestionar obras

## 🛠️ Tecnologías

### Frontend
- **Astro**: Framework para SSR y SEO
- **Vue.js**: Componentes interactivos
- **Tailwind CSS**: Estilos utility-first
- **Three.js**: Visualización 3D
- **AR.js / WebXR**: Realidad Aumentada

### Backend
- **Supabase**: PostgreSQL + Auth + Storage
- **Supabase Auth**: Autenticación OAuth
- **Supabase Storage**: Almacenamiento seguro de archivos

### Deploy
- **Netlify**: Hosting del frontend
- **Supabase**: Backend como servicio

## 🎯 Público Objetivo

- **Artistas**: Creadores y dueños de obras de arte
- **Museos**: Instituciones con colecciones/exposiciones
- **Gobierno**: Instituciones públicas con patrimonio artístico
- **Público General**: Amantes del arte y visitantes

## 🔒 Seguridad

- Validación estricta de tipos de archivo (MIME real, no solo extensión)
- Escaneo de seguridad de archivos
- Límites de tamaño por tipo de archivo
- Row Level Security (RLS) en base de datos
- Sanitización de nombres de archivo
- Políticas de acceso granulares

## Estructura del Proyecto

```
magical-moon/
├── src/
│   ├── components/
│   │   ├── SnowAnimation.vue       # Animación de nieve
│   │   ├── DescriptionCard.vue     # Tarjeta de descripción
│   │   ├── Welcome.astro           # Componente de bienvenida
│   │   ├── Welcome.vue             # Componente Vue
│   │   └── styles/
│   │       └── tailwind.css        # Estilos Tailwind
│   ├── layouts/
│   │   └── Layout.astro            # Layout principal
│   ├── pages/
│   │   └── index.astro             # Página principal
│   └── assets/                     # Assets y recursos
│       ├── astro.svg
│       ├── background.svg
│       ├── snowEffect.js
│       └── snowflake.svg
├── public/                         # Archivos estáticos
│   ├── favicon.svg
│   ├── main.png
│   ├── 1.png
│   └── 2.png
└── package.json
```

## 📚 Documentación del Proyecto

- **[VISIÓN_DEFINIDA.md](./VISION_DEFINIDA.md)**: Visión completa y requisitos del proyecto
- **[PLAN_DESARROLLO.md](./PLAN_DESARROLLO.md)**: Plan de desarrollo detallado por fases
- **[ANALISIS_ACTUAL.md](./ANALISIS_ACTUAL.md)**: Análisis del estado actual del proyecto
- **[SEGURIDAD_SUBIDA_ARCHIVOS.md](./SEGURIDAD_SUBIDA_ARCHIVOS.md)**: Plan de seguridad para subida de archivos
- **[supabase/migrations/001_initial_schema.sql](./supabase/migrations/001_initial_schema.sql)**: Esquema completo de base de datos

## 🚀 Instalación y Setup

### Prerequisitos

- Node.js 18+ y npm
- Cuenta de Supabase (gratuita)
- Cuentas de OAuth (Google, Meta para desarrollo)

### Pasos de Instalación

1. **Instala las dependencias:**

```bash
npm install
```

2. **Configura variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto:

```env
PUBLIC_SUPABASE_URL=tu-project-url
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

3. **Configura la base de datos:**

Ejecuta las migraciones de Supabase desde el archivo:
`supabase/migrations/001_initial_schema.sql`

4. **Inicia el servidor de desarrollo:**

```bash
npm run dev
```

5. **Abre [http://localhost:4321](http://localhost:4321) en tu navegador**

## Comandos

| Comando          | Acción                                    |
| :--------------- | :---------------------------------------- |
| `npm install`    | Instala dependencias                      |
| `npm run dev`    | Servidor de desarrollo en `localhost:4321`|
| `npm run build`  | Build para producción en `./dist/`        |
| `npm run preview`| Vista previa del build localmente         |

## 📁 Estructura del Proyecto

```
magical-moon/
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── validators.ts        # Validadores de archivos
│   ├── components/
│   │   ├── auth/                # Componentes de autenticación
│   │   ├── gallery/             # Componentes de galería
│   │   ├── upload/              # Componentes de subida
│   │   ├── 3d/                  # Visualización 3D
│   │   └── ar/                  # Realidad Aumentada
│   ├── pages/
│   │   ├── index.astro          # Home
│   │   ├── galeria.astro        # Galería pública
│   │   ├── obra/[slug].astro    # Detalle de obra
│   │   └── dashboard/           # Panel de control
│   └── api/
│       └── upload.ts            # Endpoint de subida
├── supabase/
│   └── migrations/              # Migraciones de BD
└── public/                      # Assets estáticos
```

## 🔐 Autenticación OAuth

El proyecto usa Supabase Auth con soporte para:
- Google OAuth
- Meta/Facebook OAuth
- Pinterest OAuth
- Más proveedores según necesidad

## 📊 Estado del Proyecto

### ✅ Completado (MVP Actual)
- Frontend básico con Astro + Vue.js
- Animaciones visuales (efecto nieve)
- Galería estática
- Diseño responsive

### 🚧 En Desarrollo
- Sistema de autenticación OAuth
- Backend con Supabase
- Subida segura de archivos
- Base de datos completa

### 📋 Pendiente
- Visualización 3D
- Realidad Aumentada
- Salas virtuales
- Features sociales

## 🤝 Contribución

Este es un proyecto en desarrollo activo. Consulta la documentación en los archivos mencionados arriba para más detalles sobre la arquitectura y plan de desarrollo.

## Despliegue

El proyecto está configurado para Netlify con `@astrojs/netlify`:

```bash
npm run build
```

Los archivos en `dist/` están listos para desplegar en Netlify o cualquier servicio de hosting estático.

## 📖 Recursos

### Documentación
- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Vue.js](https://vuejs.org)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Three.js](https://threejs.org/docs)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)

### Licencia
Este proyecto es gratuito y está dirigido a facilitar la exposición pública de arte.
