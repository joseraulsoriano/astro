<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const snowflakes = ref([]);
let intervalId = null;
const reducedMotion = ref(false);

const createSnowflake = () => {
  const id = Date.now() + Math.random();
  const size = Math.random() * 4 + 2; // Tamaño entre 2-6px
  snowflakes.value.push({
    id,
    left: `${Math.random() * 100}%`,
    duration: `${3 + Math.random() * 4}s`, // Duración entre 3-7s
    delay: `${Math.random() * 2}s`,
    size: `${size}px`,
    opacity: Math.random() * 0.5 + 0.3, // Opacidad entre 0.3-0.8
  });

  // Mantener máximo 100 copos para performance
  if (snowflakes.value.length > 100) {
    snowflakes.value.shift();
  }

  // Eliminar el copo después de la animación
  setTimeout(() => {
    snowflakes.value = snowflakes.value.filter((flake) => flake.id !== id);
  }, 7000);
};

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reducedMotion.value = true;
    return;
  }

  intervalId = setInterval(createSnowflake, 150);

  for (let i = 0; i < 20; i++) {
    setTimeout(() => createSnowflake(), i * 100);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div id="snowfall" class="fixed inset-0 pointer-events-none z-0" :class="{ 'snowfall--static': reducedMotion }">
    <div
      v-for="flake in snowflakes"
      :key="flake.id"
      class="snowflake"
      :style="{ 
        left: flake.left, 
        animationDuration: flake.duration,
        animationDelay: flake.delay,
        width: flake.size,
        height: flake.size,
        opacity: flake.opacity
      }"
    ></div>
  </div>
</template>

<style scoped>
#snowfall {
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -10px;
  background: radial-gradient(circle, rgba(114, 47, 55, 0.4) 0%, rgba(114, 47, 55, 0.1) 100%);
  border-radius: 50%;
  animation: snowfall linear infinite;
  box-shadow: 0 0 6px rgba(114, 47, 55, 0.3);
}

@keyframes snowfall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0.4;
  }
  100% {
    transform: translateY(100vh) translateX(20px) rotate(360deg);
    opacity: 0.1;
  }
}

.snowfall--static .snowflake {
  animation: none;
  opacity: 0.15;
}
</style>
