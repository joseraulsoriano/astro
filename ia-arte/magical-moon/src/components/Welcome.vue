<template>
  <section class="welcome-container py-16 px-8 relative">
    <h1 class="text-3xl font-bold text-center mb-6 text-customBlue">¿Quiénes Somos?</h1>
    <p class="text-lg text-center mb-12 text-customGray">Un equipo apasionado por la innovación y la tecnología. Nuestra misión es desarrollar soluciones creativas y eficaces.</p>

    <!-- Desierto de nieve -->
    <div class="absolute inset-0 bg-gradient-to-b from-customBlue to-customGray opacity-60 z-0"></div>

    <!-- Imagen principal -->
    <div
      class="relative flex justify-center items-center mb-12"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @touchstart="handleMouseDown"
      @touchend="handleMouseUp"
    >
      <img
        src="/main.png"
        alt="Obra principal"
        class="main-image rounded-xl shadow-custom-light transform transition-all duration-300 hover:scale-105 hover:shadow-custom-dark"
        style="cursor: pointer;"
      />
      <DescriptionCard v-if="isCardVisible" />
    </div>

    <!-- Imágenes secundarias que se desbloquean -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <img src="/1.png" alt="Obra secundaria 1" class="secondary-image rounded-xl shadow-custom-light transform transition-all opacity-0 pointer-events-none" />
      <img src="/2.png" alt="Obra secundaria 2" class="secondary-image rounded-xl shadow-custom-light transform transition-all opacity-0 pointer-events-none" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import DescriptionCard from './DescriptionCard.vue';

const isCardVisible = ref(false);

const handleMouseDown = () => {
  isCardVisible.value = true;

  // Mostrar imágenes secundarias
  const secondaryImages = document.querySelectorAll('.secondary-image');
  secondaryImages.forEach((image) => {
    image.classList.remove('opacity-0');
    image.classList.remove('pointer-events-none');
  });
};

const handleMouseUp = () => {
  // Ocultar imágenes secundarias
  const secondaryImages = document.querySelectorAll('.secondary-image');
  secondaryImages.forEach((image) => {
    image.classList.add('opacity-0');
    image.classList.add('pointer-events-none');
  });
};
</script>

<style scoped>
.main-image {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.secondary-image {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.hidden {
  visibility: hidden;
}

.show {
  visibility: visible;
}

#description-card {
  transform: translateY(100px);
}

#description-card.visible {
  transform: translateY(0);
  opacity: 1;
}
</style>