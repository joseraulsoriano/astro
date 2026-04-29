<template>
  <!-- Anfitrión Virtual en Hero -->
  <div class="host-greeting-container">
    <!-- Avatar del Anfitrión flotante -->
    <div class="host-avatar" :class="{ 'visible': isVisible }">
      <div class="avatar-circle">
        <svg class="w-12 h-12 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div class="speech-bubble bg-white border border-wine/20 shadow-xl">
        <p class="text-sm text-gray-800 font-medium">{{ greetingMessage }}</p>
        <p class="text-xs text-gray-600 mt-1">• Tu guía está aquí para ayudarte</p>
        <div class="speech-bubble-arrow"></div>
      </div>
    </div>

    <!-- Indicador de "Nuestro Anfitrión" -->
    <div class="host-indicator">
      <div class="flex items-center space-x-2 text-gray-600 text-sm">
        <div class="w-2 h-2 bg-wine rounded-full animate-pulse"></div>
        <span>Tu guía está aquí para ayudarte</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);
const greetingMessage = ref('¡Bienvenido! Explora nuestras obras gratis');

const greetings = [
  '¡Bienvenido! Explora nuestras obras gratis',
  'Hola, ¿en qué puedo ayudarte hoy?',
  'Descubre arte increíble sin registro',
  'Miles de obras esperando por ti',
  'Tómate tu tiempo, todo es gratis'
];

const changeGreeting = () => {
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  greetingMessage.value = randomGreeting;
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 1000);

  // Cambiar saludo cada 5 segundos
  setInterval(changeGreeting, 5000);
});
</script>

<style scoped>
.host-greeting-container {
  position: relative;
}

.host-avatar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 40;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  cursor: pointer;
}

.host-avatar.visible {
  opacity: 1;
  transform: translateY(0);
}

.avatar-circle {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%);
  border: 3px solid #722F37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(114, 47, 55, 0.2);
  position: relative;
  animation: float 3s ease-in-out infinite;
}

.avatar-circle::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #F5E6D3;
  border-radius: 50%;
  top: 8px;
  right: 8px;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

.speech-bubble {
  position: absolute;
  bottom: 80px;
  right: 0;
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 250px;
  min-width: 200px;
  animation: fadeInUp 0.5s ease;
}

.speech-bubble-arrow {
  position: absolute;
  bottom: -8px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
}

.host-indicator {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  z-index: 39;
  opacity: 0.8;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.9);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

