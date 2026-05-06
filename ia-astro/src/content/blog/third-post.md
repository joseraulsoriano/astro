---
title: "Lobo Bus ( BUAP )"
description: "App de movilidad universitaria con Swift y soporte backend en Python; POO, datos de rutas y foco en usabilidad en campus."
pubDate: "Jan 24 2025"
heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=82"
languages: ["Swift", "Python"]
---

**Lobo Bus** agrupa rutas y tiempos de transporte relacionados con la **BUAP**. La aplicación usa **Swift** para una interfaz rápida en iOS y estructuras de datos claras para manejar paradas y frecuencias.

El trabajo con **orientación a objetos** permitió aislar modelos de `Ruta`, `Parada` y `Viaje`, lo que facilita pruebas y cambios cuando la operación actualiza información. Python interviene donde conviene automatizar ingestion o exponer datos ligeramente procesados sin recompilar el cliente.

Próximos pasos razonables: modos fuera de línea con datos cacheados, avisos push solo cuando haya cambios verificados y accesibilidad (lectores de pantalla, contraste) en pantallas de mapa y listas.
