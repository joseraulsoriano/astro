# 🚀 Plan de Desarrollo - Magical Moon Museo Digital

## 📅 Timeline General

**Duración Total:** 10-12 semanas  
**MVP Funcional:** 6 semanas  
**Features Completas:** 12 semanas

---

## 🎯 Fase 1: MVP Base (Semanas 1-6)

### Semana 1: Setup y Configuración

#### Día 1-2: Setup Supabase
- [ ] Crear cuenta/proyecto Supabase
- [ ] Configurar proyecto y obtener API keys
- [ ] Configurar variables de entorno (.env)

#### Día 3-4: Base de Datos
- [ ] Crear esquema completo en SQL
- [ ] Configurar RLS (Row Level Security)
- [ ] Crear funciones y triggers necesarios
- [ ] Testing de relaciones

#### Día 5: Autenticación OAuth
- [ ] Configurar Google OAuth en Supabase
- [ ] Configurar Meta OAuth en Supabase
- [ ] Configurar Pinterest OAuth (investigar disponibilidad)
- [ ] Testing de login/logout

---

### Semana 2: Sistema de Subida Seguro

#### Día 1-2: Validación Frontend
- [ ] Componente Vue de subida de archivos
- [ ] Validación de tipo MIME
- [ ] Validación de tamaño
- [ ] Preview de imagen antes de subir
- [ ] Indicador de progreso

#### Día 3-4: Backend Seguro
- [ ] Endpoint API para upload (Astro Server Endpoint)
- [ ] Validación de seguridad (MIME real, tamaño)
- [ ] Sanitización de nombres de archivo
- [ ] Integración con Supabase Storage
- [ ] Manejo de errores

#### Día 5: Procesamiento
- [ ] Generación de thumbnails
- [ ] Optimización de imágenes (resize, compresión)
- [ ] Conversión a WebP
- [ ] Almacenamiento de metadatos en BD

---

### Semana 3: Galería y Obras

#### Día 1-2: Listado de Obras
- [ ] Página de galería pública
- [ ] Grid/lista de obras con thumbnails
- [ ] Paginación o infinite scroll
- [ ] Filtros básicos (categoría, fecha)
- [ ] Búsqueda por texto

#### Día 3-4: Vista Detalle
- [ ] Página detalle de obra
- [ ] Imagen principal en alta resolución
- [ ] Información completa (descripción, artista, etc.)
- [ ] Galería de imágenes relacionadas (si hay)
- [ ] Navegación anterior/siguiente

#### Día 5: SEO Básico
- [ ] Meta tags dinámicos en páginas
- [ ] URLs amigables (/obra/[slug])
- [ ] Open Graph tags
- [ ] Sitemap básico

---

### Semana 4: Perfiles y Dashboard

#### Día 1-2: Perfil Público
- [ ] Página de perfil de artista/museo
- [ ] Galería de obras del artista
- [ ] Información del perfil (bio, avatar)
- [ ] Estadísticas básicas

#### Día 3-4: Dashboard Privado
- [ ] Panel de control del usuario
- [ ] Listado de obras propias
- [ ] Formulario de edición de obra
- [ ] Botón de eliminar obra
- [ ] Estadísticas de vistas/likes

#### Día 5: Gestión de Obras
- [ ] Formulario completo de creación/edición
- [ ] Campos: título, descripción, categoría, técnica, año, dimensiones
- [ ] Subida de múltiples imágenes
- [ ] Tags/categorías
- [ ] Publicar/ocultar obra

---

### Semana 5: Salas Virtuales Básicas

#### Día 1-2: Creación de Salas
- [ ] Formulario crear sala/exposición
- [ ] Nombre, descripción, tema
- [ ] Selector de obras para agregar
- [ ] Guardar orden de obras

#### Día 3-4: Vista de Salas
- [ ] Página de salas públicas
- [ ] Listado de salas disponibles
- [ ] Vista de sala con obras organizadas
- [ ] Navegación entre obras en la sala

#### Día 5: Integración
- [ ] Agregar salas al menú principal
- [ ] Salas destacadas en home
- [ ] Enlaces de obras a salas

---

### Semana 6: Visualización 3D (MVP)

#### Día 1-2: Setup Three.js
- [ ] Instalar Three.js en Astro
- [ ] Crear componente básico de visualizador
- [ ] Cargar modelo 3D (glb/gltf)
- [ ] Controles básicos de cámara

#### Día 3-4: Mejoras Visualización
- [ ] Iluminación adecuada
- [ ] Materiales y texturas
- [ ] Controles de zoom/rotación
- [ ] Modo pantalla completa

#### Día 5: Integración
- [ ] Botón "Ver en 3D" en detalle de obra
- [ ] Modal o página dedicada para 3D
- [ ] Fallback si no hay modelo 3D
- [ ] Testing en diferentes dispositivos

---

## 🎯 Fase 2: Features Avanzadas (Semanas 7-10)

### Semana 7-8: Realidad Aumentada (AR)

#### Semana 7: Setup AR
- [ ] Evaluar librerías (AR.js vs 8th Wall vs WebXR)
- [ ] Setup de AR básico
- [ ] Detección de superficie plana
- [ ] Colocación de modelo 3D en AR

#### Semana 8: AR Completo
- [ ] Escala real de la obra
- [ ] Ajuste de tamaño/rotación en AR
- [ ] Guardar posición
- [ ] Compatibilidad móvil
- [ ] Testing en iOS/Android

---

### Semana 9: Social Features

#### Día 1-2: Likes y Comentarios
- [ ] Sistema de likes (tabla, API)
- [ ] Contador de likes
- [ ] Componente de comentarios
- [ ] Lista de comentarios con paginación

#### Día 3-4: Compartir y Colecciones
- [ ] Botones de compartir (redes sociales)
- [ ] Sistema de colecciones personales
- [ ] Agregar/eliminar de colección
- [ ] Vista de colecciones

#### Día 5: Seguimiento
- [ ] Seguir/dejar de seguir usuarios
- [ ] Feed de actividades
- [ ] Notificaciones básicas

---

### Semana 10: Salas 3D Avanzadas

#### Día 1-3: Navegación 3D
- [ ] Escena 3D de sala completa
- [ ] Posicionamiento de obras en espacio 3D
- [ ] Cámara para navegar sala
- [ ] Transiciones entre salas

#### Día 4-5: Personalización
- [ ] Diseño de sala (paredes, iluminación)
- [ ] Organización espacial de obras
- [ ] Preview de sala antes de publicar

---

## 🎯 Fase 3: Optimización y SEO (Semanas 11-12)

### Semana 11: SEO Avanzado

- [ ] Schema.org markup completo (Artwork, Museum, Person)
- [ ] Sitemap.xml dinámico
- [ ] Robots.txt optimizado
- [ ] Meta descriptions optimizadas
- [ ] Canonical URLs
- [ ] JSON-LD structured data

### Semana 12: Performance y Testing

- [ ] Optimización de imágenes (lazy loading, WebP)
- [ ] Code splitting
- [ ] Caching strategies
- [ ] Testing de performance (Lighthouse)
- [ ] Testing de accesibilidad
- [ ] Testing en diferentes navegadores
- [ ] Testing móvil

---

## 📋 Checklist de Configuración Inicial

### Supabase Setup

```bash
# 1. Crear proyecto en supabase.com
# 2. Obtener:
#    - Project URL
#    - anon/public key
#    - service_role key
# 3. Configurar en .env
```

### Variables de Entorno (.env)

```env
# Supabase
PUBLIC_SUPABASE_URL=your-project-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OAuth (si necesario)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
META_APP_ID=...
META_APP_SECRET=...
```

### Instalación de Dependencias

```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-astro
npm install three
npm install @react-three/fiber @react-three/drei  # Si usas React para 3D
# o
npm install ar.js  # Para AR
```

---

## 🛠️ Estructura de Archivos Sugerida

```
magical-moon/
├── src/
│   ├── lib/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   ├── storage.ts            # Utilidades de almacenamiento
│   │   └── validators.ts         # Validadores de archivos
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginButton.vue
│   │   ├── gallery/
│   │   │   ├── ArtworkCard.vue
│   │   │   ├── ArtworkGrid.vue
│   │   │   └── ArtworkDetail.vue
│   │   ├── upload/
│   │   │   └── FileUploader.vue
│   │   ├── 3d/
│   │   │   └── ModelViewer.vue
│   │   ├── ar/
│   │   │   └── ARViewer.vue
│   │   └── rooms/
│   │       └── RoomViewer.vue
│   ├── pages/
│   │   ├── index.astro           # Home
│   │   ├── galeria.astro         # Galería pública
│   │   ├── obra/[slug].astro     # Detalle obra
│   │   ├── artista/[id].astro    # Perfil artista
│   │   ├── salas.astro           # Lista de salas
│   │   ├── sala/[id].astro       # Sala específica
│   │   └── dashboard/
│   │       ├── index.astro       # Dashboard principal
│   │       ├── subir-obra.astro  # Formulario subir
│   │       └── mis-obras.astro   # Lista obras propias
│   ├── api/
│   │   ├── upload.ts             # Endpoint upload
│   │   └── artworks.ts           # Endpoints CRUD
│   └── utils/
│       ├── security.ts           # Validaciones seguridad
│       └── seo.ts                # Utilidades SEO
├── public/
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

## 🔒 Checklist de Seguridad

### Validación de Archivos
- [x] Validar MIME type real (no solo extensión)
- [x] Validar tamaño máximo
- [x] Sanitizar nombres de archivo
- [x] Escanear archivos (virus/malware)
- [x] Limitar tipos permitidos estrictamente

### Base de Datos
- [x] RLS habilitado en todas las tablas
- [x] Políticas de acceso correctas
- [x] Validación de datos en BD (constraints)
- [x] Rate limiting en API

### Autenticación
- [x] Tokens JWT seguros
- [x] Refresh tokens
- [x] Logout apropiado
- [x] Protección CSRF

---

## 📊 Métricas de Éxito

### Técnicas
- ✅ Tiempo de carga < 3 segundos
- ✅ Lighthouse score > 90
- ✅ Mobile-friendly
- ✅ 0 vulnerabilidades críticas

### Funcionales
- ✅ 100% de obras visibles correctamente
- ✅ Upload funciona sin errores
- ✅ 3D/AR funcional en móviles modernos
- ✅ SEO indexado correctamente

---

## 🚀 Siguiente Acción Inmediata

**1. Crear proyecto Supabase y configurar variables de entorno**

¿Quieres que empiece con esto ahora?

