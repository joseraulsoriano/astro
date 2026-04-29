<template>
  <div id="description-card" class="absolute bottom-0 left-0 w-full bg-white text-black p-4 shadow-custom-dark">
    <h3 class="text-xl font-bold">Descripción de la Obra Principal</h3>
    <p>Esta es la descripción de la obra principal. Aquí va un texto de ejemplo.</p>
  </div>
</template>

<style scoped>
#description-card {
  transform: translateY(100px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

#description-card.visible {
  transform: translateY(0);
  opacity: 1;
}
</style>