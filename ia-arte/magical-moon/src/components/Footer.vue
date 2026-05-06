<template>
  <footer class="footer mt-20 border-t border-slate-200 bg-white">
    <div class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Marca -->
        <div class="footer-section">
          <h3 class="font-display mb-3 text-xl font-semibold text-slate-800">Museo Fragmentos</h3>
          <p class="mb-4 text-sm leading-relaxed text-slate-600">
            Museo digital demo para explorar obra, sala y archivo con una lectura cómoda para la vista.
          </p>
          <p class="text-xs text-slate-500">Redes y contacto público pendientes.</p>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Enlaces</h4>
          <ul class="footer-links">
            <li><a href="/galeria">Galería</a></li>
            <li><a href="/salas">Salas</a></li>
            <li><a href="/artistas">Artistas</a></li>
            <li><a href="/buscar">Búsqueda</a></li>
            <li><a href="/subir-obra">Subir obra</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Recursos</h4>
          <ul class="footer-links">
            <li><a href="/auth/login">Iniciar sesión</a></li>
            <li><a href="/galeria">Explorar colección</a></li>
            <li><a href="/buscar?q=digital">Buscar ejemplo</a></li>
          </ul>
        </div>

        <div id="aviso-legal-demo" class="footer-section scroll-mt-28">
          <h4 class="footer-title">Aviso (demo)</h4>
          <ul class="footer-links">
            <li><a href="#aviso-legal-demo">Términos y privacidad (resumen)</a></li>
            <li><a href="#aviso-legal-demo">Uso del sitio y derechos</a></li>
          </ul>
          <p class="mt-4 text-xs leading-relaxed text-slate-500">
            Proyecto de demostración: sin garantías legales ni operación real. Todo el contenido es ilustrativo.
          </p>
        </div>
      </div>

      <div class="border-t border-slate-200 pt-8">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p class="text-center text-sm text-slate-600 md:text-left">© {{ currentYear }} Museo Fragmentos.</p>
          <p class="text-sm text-slate-600">
            Desarrollo apoyado por <span class="font-semibold text-wine">Basil Soluciones</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #ffffff 0%, #f4f7fa 100%);
}

.footer-section {
  @apply space-y-3;
}

.footer-title {
  @apply mb-3 text-base font-semibold text-slate-900;
}

.footer-links {
  @apply space-y-2;
}

.footer-links li a {
  @apply text-sm text-slate-600 transition hover:text-wine;
}
</style>
