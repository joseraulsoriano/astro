<template>
  <section class="cta py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white to-wine/5">
    <div class="absolute inset-0 bg-gradient-to-r from-wine/5 via-accent/10 to-wine/5"></div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          ¿Listo para Explorar el Arte?
        </h2>
        <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Explora miles de obras sin registro. Totalmente gratis.
        </p>
        <p class="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          ¿Eres artista? Sube tus obras y compártelas con el mundo.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/galeria" class="btn-primary group">
            <span>Explorar Galería Gratis</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="/subir-obra" class="btn-secondary group">
            <span>Subir Mis Obras</span>
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente de llamado a la acción
</script>

<style scoped>
.cta {
  background: radial-gradient(ellipse at center, rgba(114, 47, 55, 0.05) 0%, rgba(245, 230, 211, 0.1) 50%, transparent 70%);
}

.btn-primary {
  @apply inline-flex items-center gap-2 px-8 py-4 bg-white text-wine font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-primary-light;
}

.btn-secondary {
  @apply inline-flex items-center gap-2 px-8 py-4 bg-wine hover:bg-wine-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-wine;
}
</style>

