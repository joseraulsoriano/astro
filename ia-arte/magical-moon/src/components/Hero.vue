<template>
  <section class="hero relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9]">
    <!-- Background con Blanco y Vino -->
    <div class="absolute inset-0 z-0">
      <div class="stars"></div>
      <!-- Gradientes suaves -->
      <div class="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-sky-50/90 via-transparent to-slate-100/70"></div>
    </div>
    
    <!-- Anfitrión Virtual -->
    <HostGreeting />
    
    <!-- Moon container removed - replaced with host greeting -->

    <!-- Content -->
    <div class="container relative z-10 mx-auto px-4 pb-36 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-28 md:pb-24 md:pt-32 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Mensaje de Bienvenida Personalizado -->
        <div class="welcome-message mb-8">
          <div class="inline-flex items-center space-x-3 bg-wine/10 border border-wine/20 rounded-full px-6 py-3 mb-6">
            <div class="w-3 h-3 bg-wine rounded-full animate-pulse"></div>
            <span class="text-wine text-sm font-medium">Tu guía personal está aquí</span>
          </div>
        </div>

        <!-- Main Heading -->
        <h1 class="hero-title mb-6">
          <span class="font-display block text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl mb-2">
            Bienvenido a
          </span>
          <span class="font-display block text-5xl font-semibold tracking-tight text-wine sm:text-6xl md:text-7xl lg:text-8xl">
            Museo Fragmentos
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="font-display text-xl text-gray-700 sm:text-2xl md:text-3xl mb-4 font-medium">
          Museo digital de arte
        </p>
        
        <!-- Mensaje Principal -->
        <div class="hero-message bg-wine/5 border border-wine/20 rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
          <p class="text-lg sm:text-xl text-gray-800 mb-4 leading-relaxed">
            Como llegar a un museo físico, aquí tienes un <strong class="text-wine">anfitrión que te guía</strong> por nuestras colecciones.
          </p>
          <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
            Explora miles de obras <strong class="text-wine">sin registro</strong>. Todo es completamente <strong class="text-wine">gratis</strong>.
          </p>
        </div>
        
        <p class="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          ¿Eres artista? Sube tus obras y compártelas con el mundo.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="/galeria" class="btn-primary group">
            <span>Explorar Galería Gratis</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="/salas" class="btn-secondary group">
            <span>Salas Virtuales</span>
            <svg class="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div class="stat-card">
            <div class="stat-number">{{ stats.obras || '0' }}+</div>
            <div class="stat-label">Obras</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.artistas || '0' }}+</div>
            <div class="stat-label">Artistas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.salas || '0' }}+</div>
            <div class="stat-label">Salas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ stats.visitantes || '0' }}+</div>
            <div class="stat-label">Visitantes</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="pointer-events-none absolute bottom-[max(5.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 hidden -translate-x-1/2 sm:pointer-events-auto sm:bottom-8 sm:flex sm:flex-col sm:animate-bounce">
      <a href="#features" class="pointer-events-auto flex flex-col items-center text-slate-400 transition-colors hover:text-wine">
        <span class="text-sm mb-2">Desplázate</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import HostGreeting from './HostGreeting.vue';

const stats = ref({
  obras: '500',
  artistas: '120',
  salas: '25',
  visitantes: '10K'
});
</script>

<style scoped>
.hero {
  background: radial-gradient(ellipse at top, rgb(186 230 253 / 0.25) 0%, transparent 52%),
    radial-gradient(ellipse at bottom, rgb(203 213 225 / 0.35) 0%, transparent 50%);
}

.hero-message {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20% 30%, rgb(61 106 140 / 0.18), transparent),
    radial-gradient(2px 2px at 60% 70%, rgb(59 130 246 / 0.12), transparent),
    radial-gradient(1px 1px at 50% 50%, rgb(100 116 139 / 0.2), transparent),
    radial-gradient(1px 1px at 80% 10%, rgb(61 106 140 / 0.15), transparent),
    radial-gradient(2px 2px at 90% 60%, rgb(125 211 252 / 0.2), transparent),
    radial-gradient(1px 1px at 33% 80%, rgb(71 85 105 / 0.18), transparent),
    radial-gradient(1px 1px at 10% 40%, rgb(61 106 140 / 0.12), transparent);
  background-repeat: repeat;
  background-size: 200% 200%;
  animation: stars 20s linear infinite;
  opacity: 0.4;
}

@keyframes stars {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}


.hero-title {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.btn-primary {
  @apply inline-flex items-center gap-2 px-8 py-4 bg-white text-wine font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-primary-light;
}

.btn-secondary {
  @apply inline-flex items-center gap-2 px-8 py-4 bg-wine hover:bg-wine-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-wine;
}

.stat-card {
  @apply bg-wine/5 border border-wine/20 rounded-lg p-6 hover:bg-wine/10 transition-all duration-300;
}

.stat-number {
  @apply text-3xl md:text-4xl font-bold text-wine mb-2;
}

.stat-label {
  @apply text-gray-700 text-sm uppercase tracking-wider;
}
</style>

