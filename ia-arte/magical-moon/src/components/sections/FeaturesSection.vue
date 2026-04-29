<template>
  <section id="features" class="features py-20 md:py-32 relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Características Únicas
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre las formas innovadoras de visualizar y experimentar el arte
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1: Vista 2D -->
        <div class="feature-card group">
          <div class="feature-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="feature-title">Vista Normal (2D)</h3>
          <p class="feature-description">
            Visualiza obras de arte en alta resolución con todos sus detalles. Explora pinturas, fotografías y arte digital.
          </p>
        </div>

        <!-- Feature 2: Vista 3D -->
        <div class="feature-card group">
          <div class="feature-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="feature-title">Proyección 3D</h3>
          <p class="feature-description">
            Experimenta obras en modelos 3D interactivos. Rota, acerca y explora cada ángulo como si estuvieras allí.
          </p>
        </div>

        <!-- Feature 3: Realidad Aumentada -->
        <div class="feature-card group">
          <div class="feature-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 class="feature-title">Realidad Aumentada</h3>
          <p class="feature-description">
            Coloca obras de arte en tu espacio real usando la cámara de tu dispositivo. Ve cómo se verían en tu pared.
          </p>
        </div>

        <!-- Feature 4: Salas Virtuales -->
        <div class="feature-card group">
          <div class="feature-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="feature-title">Salas Virtuales</h3>
          <p class="feature-description">
            Recorre exposiciones temáticas organizadas en salas virtuales 3D. Explora colecciones curadas por expertos.
          </p>
        </div>

        <!-- Feature 5: Descubrimiento -->
        <div class="feature-card group">
          <div class="feature-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="feature-title">Búsqueda Avanzada</h3>
          <p class="feature-description">
            Encuentra obras por artista, categoría, técnica, época o palabras clave. Navegación intuitiva y filtros potentes.
          </p>
        </div>

        <!-- Feature 6: Gratis -->
        <div class="feature-card group">
          <div class="feature-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="feature-title">100% Gratuito</h3>
          <p class="feature-description">
            Plataforma completamente gratuita para artistas y visitantes. Sin costos ocultos, sin suscripciones.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente de características
</script>

<style scoped>
.features {
  background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
}

.feature-card {
  @apply bg-white border border-gray-200 rounded-xl p-8 hover:border-wine/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2;
}

.feature-icon {
  @apply w-16 h-16 mb-6 bg-wine/10 border border-wine/20 rounded-lg flex items-center justify-center text-wine group-hover:scale-110 transition-transform duration-300;
}

.feature-title {
  @apply text-2xl font-bold text-gray-900 mb-4;
}

.feature-description {
  @apply text-gray-600 leading-relaxed;
}
</style>

