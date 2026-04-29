# Proyectos UX / UI

Colección de prototipos y sitios: formulario PHP de demostración, galería **Museo Fragmentos** (Astro + Vue) y blog personal (Astro).

## Estructura

```
ux-design/
├── login/                    # Registro HTML / CSS / PHP (requiere servidor PHP)
├── ia-arte/
│   └── magical-moon/         # Galería Museo Fragmentos (Astro 5, Vue, Tailwind)
├── ia-astro/                 # Blog / portafolio (Astro, MDX, TypeScript)
├── ANALISIS_Y_MEJORAS.md     # Notas de análisis (referencia)
├── RESUMEN_EJECUTIVO.md
├── PASOS_INMEDIATOS.md
└── README.md
```

## Requisitos

- **Node.js** 18 o superior (proyectos Astro).
- **PHP** opcional, solo para la carpeta `login/` (ver sección más abajo).

## Uso rápido por proyecto

### Museo Fragmentos (`ia-arte/magical-moon`)

```bash
cd ia-arte/magical-moon
npm install
npm run dev
```

- Desarrollo: suele abrirse en `http://localhost:4321` (ver consola).
- Producción: `npm run build` genera `dist/` (sitio estático, apto para Netlify, Vercel, GitHub Pages con adaptación de base, etc.).

### Blog / portafolio (`ia-astro`)

```bash
cd ia-astro
npm install
npm run dev
```

- Build: `npm run build` → `dist/`.
- En `astro.config.mjs`, `site` está como `https://example.com`; cámbialo por tu dominio real antes de publicar (canonical, RSS, sitemap).

### Login (`login/`)

Formulario de demostración; el POST va a `guardar.php`.

```bash
cd login
php -S localhost:8080
```

Abre `http://localhost:8080` (no uses `file://` si quieres que funcione el PHP).

El archivo `usuarios.txt` (si se genera) está en `.gitignore` y no debe subirse.

## Publicar en GitHub

1. Crea un repositorio vacío en GitHub (sin README si ya tienes uno local).
2. En la raíz de `ux-design`:

```bash
git init
git add .
git status
git commit -m "Initial commit: monorepo ux-design"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Si antes trabajabas con repos git dentro de `magical-moon` o `ia-astro`, este monorepo usa **un solo** historial en la raíz; no hace falta subcarpeta `.git` dentro de cada proyecto.

## Licencia y datos

Los proyectos son personales / de demostración. No incluyas API keys ni `.env` reales; usa `.env.example` si documentas variables.
