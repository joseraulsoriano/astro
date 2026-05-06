<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Misión -->
          <div class="mission-card">
            <div class="icon-wrapper">
              <svg class="w-10 h-10 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 class="section-title">Por Qué Nacemos</h2>
            <p class="section-text">
              Nacemos de un pensamiento simple: <strong>¿por qué tener que salir y ver obras fuera de casa? 
              ¿Por qué no verlas estando en casa?</strong> Además, nace del abrirse a personas que no conocen 
              la historia del arte, y sobre todo nace del aspecto crítico de muchas personas del arte que no 
              pueden difundir sus obras.
            </p>
          </div>

          <!-- Cómo Lo Hacemos -->
          <div class="mission-card">
            <div class="icon-wrapper">
              <svg class="w-10 h-10 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 class="section-title">Cómo Lo Hacemos</h2>
        
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente de misión y visión
</script>

<style scoped>
.mission-card {
  @apply p-8 bg-wine/5 rounded-xl border border-wine/10;
}

.icon-wrapper {
  @apply w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-6 border border-wine/20;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 mb-4;
}

.section-text {
  @apply text-gray-700 leading-relaxed;
}
</style>

