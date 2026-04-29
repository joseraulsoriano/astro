<template>
  <section class="how-it-works py-20 md:py-32 relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Cómo Funciona
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Sigue estos simples pasos para comenzar a exponer o explorar arte
        </p>
      </div>

      <!-- Steps -->
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="step-card">
            <div class="step-number">1</div>
            <h3 class="step-title">Crea tu Cuenta</h3>
            <p class="step-description">
              Regístrate gratuitamente usando Google, Facebook o Pinterest. Es rápido y seguro.
            </p>
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="step-card">
            <div class="step-number">2</div>
            <h3 class="step-title">Sube tus Obras</h3>
            <p class="step-description">
              Comparte tus obras digitales. Sube imágenes, PDFs o modelos 3D con información detallada.
            </p>
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="step-card">
            <div class="step-number">3</div>
            <h3 class="step-title">Comparte y Explora</h3>
            <p class="step-description">
              Tus obras estarán disponibles para que todos las vean en 2D, 3D y Realidad Aumentada.
            </p>
            <div class="step-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <a href="/subir-obra" class="btn-primary inline-flex items-center gap-2">
          <span>Comienza Ahora</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente de cómo funciona
</script>

<style scoped>
.how-it-works {
  background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
}

.step-card {
  @apply relative bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-wine/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2;
}

.step-number {
  @apply absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-wine text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg;
}

.step-title {
  @apply text-2xl font-bold text-gray-900 mb-4 mt-4;
}

.step-description {
  @apply text-gray-600 leading-relaxed mb-6;
}

.step-icon {
  @apply w-16 h-16 mx-auto bg-wine/10 border border-wine/20 rounded-lg flex items-center justify-center text-wine;
}

.btn-primary {
  @apply px-8 py-4 bg-white text-wine font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-primary-light;
}
</style>

