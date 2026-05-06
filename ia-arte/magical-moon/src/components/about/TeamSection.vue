<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-12">Desarrollo Apoyado Por</h2>
        
        <div class="bg-wine/5 border border-wine/20 rounded-2xl p-8 text-center">
          <div class="mb-6">
            <p class="text-gray-700 text-lg">
              Desarrollando soluciones tecnológicas innovadoras para el futuro del arte digital
            </p>
          </div>
        </div>

        <!-- Información Adicional -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="info-card">
            <h4 class="info-title">Contacto</h4>
            <p class="text-gray-600">¿Tienes preguntas o sugerencias?</p>
            <a href="/buscar" class="font-medium mt-2 inline-block text-wine hover:text-wine-dark">
              Buscar en el museo →
            </a>
          </div>
          <div class="info-card">
            <h4 class="info-title">Colabora</h4>
            <p class="text-gray-600">¿Quieres colaborar con el proyecto?</p>
            <a href="/#aviso-legal-demo" class="font-medium mt-2 inline-block text-wine hover:text-wine-dark">
              Aviso legal (demo) →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente de equipo/información
</script>

<style scoped>
.info-card {
  @apply p-6 bg-white border border-gray-200 rounded-xl;
}

.info-title {
  @apply text-xl font-semibold text-gray-900 mb-2;
}
</style>

