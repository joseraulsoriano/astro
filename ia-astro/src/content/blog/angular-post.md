---
title: "Sistema de Administración"
description: "Notas sobre un panel interno con Angular en el front y servicios en Python: módulos, formularios y despliegue inicial."
pubDate: "Mar 18 2025"
heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=82"
languages: ["Angular", "Python"]
---

Este proyecto combina **Angular** para la interfaz y **Python** en el backend para exponer APIs y lógica de negocio. El objetivo fue centralizar datos operativos sin sacrificar claridad para quien administra el día a día.

Durante el desarrollo prioricé rutas y módulos por dominio, validación de formularios reactivos y manejo consistente de errores HTTP. Del lado del servidor, mantener contratos de API estables facilitó iterar en el front sin romper flujos ya probados.

Los siguientes pasos naturales serían endurecer autenticación (tokens, renovación), pruebas end-to-end en flujos críticos y métricas de uso para decidir qué pantallas optimizar primero.
