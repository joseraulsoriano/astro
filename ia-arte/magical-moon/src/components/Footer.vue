<template>
  <footer class="footer bg-white border-t border-gray-200 mt-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- About -->
        <div class="footer-section">
          <div class="flex items-center space-x-3 mb-4">
            <svg class="w-6 h-6 text-wine flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <h3 class="text-xl font-bold text-wine">Museo Fragmentos</h3>
          </div>
          <p class="text-gray-600 text-sm mb-4">
            Museo digital gratuito donde artistas, museos e instituciones pueden exponer sus obras de arte.
          </p>
          <p class="text-gray-500 text-xs">
            Las redes sociales oficiales se anunciarán aquí. Mientras tanto, visita la sección «Sobre nosotros».
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="footer-title">Enlaces rápidos</h4>
          <ul class="footer-links">
            <li><a href="/galeria">Galería</a></li>
            <li><a href="/salas">Salas virtuales</a></li>
            <li><a href="/artistas">Artistas</a></li>
            <li><a href="/buscar">Búsqueda</a></li>
            <li><a href="/subir-obra">Subir obra</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="footer-section">
          <h4 class="footer-title">Recursos</h4>
          <ul class="footer-links">
            <li><a href="/sobre-nosotros">Sobre nosotros</a></li>
            <li><a href="/subir-obra">Cómo subir obras</a></li>
            <li><a href="/auth/login">Iniciar sesión</a></li>
            <li><a href="/galeria">Explorar la galería</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-section">
          <h4 class="footer-title">Información legal</h4>
          <ul class="footer-links">
            <li><a href="/sobre-nosotros#informacion-legal">Términos y privacidad (resumen)</a></li>
            <li><a href="/sobre-nosotros#informacion-legal">Uso del sitio y derechos</a></li>
          </ul>
          <p class="text-gray-500 text-xs mt-4 leading-relaxed">
            Museo Fragmentos es un proyecto demo. Consulta el aviso completo en la página «Sobre nosotros».
          </p>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
          <p class="text-gray-600 text-sm text-center md:text-left">
            © {{ currentYear }} Museo Fragmentos. Todos los derechos reservados.
          </p>
          <div class="flex items-center space-x-2 text-gray-600 text-sm">
            <span>Desarrollo apoyado por</span>
            <span class="font-semibold text-wine">Basil Soluciones</span>
          </div>
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
  background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
}

.footer-section {
  @apply space-y-4;
}

.footer-title {
  @apply text-gray-900 font-semibold mb-4 text-lg;
}

.footer-links {
  @apply space-y-2;
}

.footer-links li a {
  @apply text-gray-600 hover:text-wine transition-colors text-sm;
}
</style>
