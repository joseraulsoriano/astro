---
title: "Proyectos en C++"
description: "Ejercicios y utilidades en C++: memoria, rendimiento y buenas prácticas para estructuras clásicas de algoritmos."
pubDate: "Jan 12 2025"
heroImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=82"
languages: ["cplus"]
---

Estas piezas en **C++** sirvieron para reforzar **gestión de memoria**, complejidad algorítmica y hábitos de compilación multiplataforma. Trabajé listas, colas, grafos y archivos binarios para entender dónde compensa el coste de bajo nivel frente a prototipos en lenguajes más altos.

Un aprendizaje recurrente fue **medir antes de optimizar**: muchas mejoras vinieron de elegir la estructura correcta, no de micro-optimizar bucles. RAII y contenedores estándar redujeron fugas y código repetitivo.

Si el conjunto crece, el siguiente paso sería empaquetar pruebas unitarias mínimas y scripts de build reproducibles (CMake) para que cualquier entrega sea verificable en CI.
