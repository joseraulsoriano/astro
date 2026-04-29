# IA Arte - Galería de Arte Interactiva

Proyecto de galería de arte interactiva desarrollada con Astro y Vue.js, con animaciones visuales y efectos especiales.

## Descripción

Galeria de arte digital con animaciones de nieve y efectos interactivos. Permite a los usuarios explorar obras de arte con una experiencia inmersiva y visualmente atractiva.

## Características

- **Animaciones de Nieve**: Efecto de partículas de nieve en toda la página
- **Galería Interactiva**: Visualización de obras de arte
- **Tarjetas de Descripción**: Información detallada al hacer clic en las obras
- **Desbloqueo de Contenido**: Imágenes adicionales que se desbloquean después de interacción
- **Diseño Responsive**: Adaptable a diferentes dispositivos

## Tecnologías

- **Astro**: Framework para sitios web estáticos
- **Vue.js**: Framework para componentes interactivos
- **Tailwind CSS**: Estilos utility-first
- **particles.js**: Animaciones de partículas

## Estructura

```
ia-arte/
└── magical-moon/
    ├── src/
    │   ├── components/
    │   │   ├── SnowAnimation.vue    # Animación de nieve
    │   │   ├── DescriptionCard.vue  # Tarjeta de descripción
    │   │   ├── Welcome.astro        # Componente de bienvenida
    │   │   └── Welcome.vue          # Componente Vue interactivo
    │   ├── layouts/
    │   │   └── Layout.astro         # Layout principal
    │   └── pages/
    │       └── index.astro          # Página principal
    └── public/                      # Imágenes y assets estáticos
```

## Instalación

1. Navega al directorio del proyecto:

```bash
cd ia-arte/magical-moon
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa del build
```

## Componentes Principales

### SnowAnimation.vue
Componente Vue que muestra animación de partículas de nieve usando particles.js.

### DescriptionCard.vue
Tarjeta que aparece al hacer clic en las obras, mostrando descripción y detalles.

### Welcome.astro
Componente principal que combina Astro y Vue para la interactividad.

## Características Visuales

- Animaciones de partículas de nieve
- Transiciones suaves
- Efectos hover y click
- Diseño moderno y minimalista
- Imágenes optimizadas

## Despliegue

El proyecto está configurado para desplegarse en Netlify:

```bash
npm run build
```

Los archivos en `dist/` están listos para desplegar.

