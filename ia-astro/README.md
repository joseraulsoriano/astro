# IA Astro - Blog Personal

Blog personal desarrollado con Astro, sistema de contenido con Markdown/MDX y diseño minimalista inspirado en Bear Blog.

## Descripción

Blog personal de José Raúl Soriano Cazabal desarrollado con Astro. Incluye sistema de blog con Content Collections, soporte para Markdown y MDX, feed RSS, sitemap y diseño SEO-friendly.

## Características

- ✅ **Diseño Minimalista**: Estilo limpio y profesional
- ✅ **100/100 Lighthouse Performance**: Optimizado para rendimiento
- ✅ **SEO-Friendly**: URLs canónicas, OpenGraph y metadatos
- ✅ **Sitemap**: Generación automática de sitemap
- ✅ **RSS Feed**: Feed RSS para suscriptores
- ✅ **Markdown & MDX**: Sistema de contenido con soporte completo
- ✅ **Content Collections**: Gestión de contenido tipado

## Tecnologías

- **Astro**: Framework para sitios web estáticos
- **TypeScript**: Tipado estático
- **Markdown/MDX**: Sistema de contenido
- **Content Collections**: Gestión tipada de contenido

## Estructura del Proyecto

```
ia-astro/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Header.astro      # Cabecera del sitio
│   │   ├── Footer.astro      # Pie de página
│   │   ├── BaseHead.astro    # Metadatos HTML
│   │   └── ...
│   ├── content/              # Content Collections
│   │   └── blog/             # Posts del blog
│   │       ├── first-post.md
│   │       ├── angular-post.md
│   │       ├── using-mdx.mdx
│   │       └── ...
│   ├── layouts/              # Layouts de página
│   │   └── BlogPost.astro    # Layout para posts
│   ├── pages/                # Páginas del sitio
│   │   ├── index.astro       # Página principal
│   │   ├── about.astro       # Sobre mí
│   │   ├── blog/             # Blog
│   │   │   ├── index.astro   # Lista de posts
│   │   │   └── [...slug].astro # Página de post individual
│   │   └── rss.xml.js        # Generador de RSS
│   ├── styles/               # Estilos globales
│   │   └── global.css
│   └── consts.ts             # Constantes del sitio
├── public/                   # Archivos estáticos
│   ├── fonts/                # Fuentes personalizadas
│   ├── icons/                # Iconos de tecnologías
│   ├── perfil.jpeg           # Foto de perfil
│   └── blog-placeholder-*.jpg # Imágenes placeholder
└── package.json
```

## Instalación

1. Navega al directorio del proyecto:

```bash
cd ia-astro
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

| Comando          | Acción                                    |
| :--------------- | :---------------------------------------- |
| `npm install`    | Instala dependencias                      |
| `npm run dev`    | Servidor de desarrollo en `localhost:4321`|
| `npm run build`  | Build para producción en `./dist/`        |
| `npm run preview`| Vista previa del build localmente         |

## Escribir un Nuevo Post

1. Crea un archivo `.md` o `.mdx` en `src/content/blog/`
2. Agrega frontmatter con metadatos:

```markdown
---
title: "Título del Post"
description: "Descripción corta"
pubDate: 2024-01-01
heroImage: "/blog-placeholder-1.jpg"
---
```

3. El post aparecerá automáticamente en el blog

## Características Técnicas

### Content Collections
- Gestión tipada de contenido
- Validación automática de frontmatter
- TypeScript para autocompletado

### SEO
- URLs canónicas
- OpenGraph tags
- Metadatos completos
- Sitemap XML automático

### Performance
- Generación estática
- CSS minimalista
- Sin JavaScript innecesario
- Score perfecto en Lighthouse

### RSS Feed
- Feed RSS en `/rss.xml`
- Actualización automática con nuevos posts

## Iconos de Tecnologías

El blog incluye iconos para diversas tecnologías:
- Angular, Astro, Bootstrap, C++, CSS, HTML
- JavaScript, Markdown, PHP, Python
- React, Swift, TypeScript

## Personalización

### Cambiar Información Personal
Edita `src/consts.ts` para cambiar:
- Título del sitio
- Descripción
- Autor
- Enlaces sociales

### Agregar Posts
Crea archivos Markdown en `src/content/blog/` con el frontmatter adecuado.

## Despliegue

El proyecto genera archivos estáticos que pueden desplegarse en:

- **Netlify**: Despliegue automático desde Git
- **Vercel**: Despliegue con un comando
- **GitHub Pages**: Con GitHub Actions
- **Cualquier hosting estático**: Subir carpeta `dist/`

## Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Bear Blog](https://github.com/HermanMartinus/bearblog/) - Inspiración del diseño
