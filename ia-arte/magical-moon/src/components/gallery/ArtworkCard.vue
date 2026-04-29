<template>
  <div class="artwork-card group cursor-pointer" @click="$emit('click')">
    <div class="artwork-image-wrapper">
      <img 
        :src="artwork.image" 
        :alt="artwork.title"
        class="artwork-image"
        loading="lazy"
      />
      <div class="artwork-overlay">
        <div class="flex items-center justify-center space-x-3">
          <a 
            href="#" 
            @click.stop.prevent="view2D"
            class="overlay-btn"
            title="Ver en 2D"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
          <a 
            href="#" 
            @click.stop.prevent="view3D"
            class="overlay-btn"
            title="Ver en 3D"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </a>
          <a 
            href="#" 
            @click.stop.prevent="viewAR"
            class="overlay-btn"
            title="Ver en AR"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="artwork-info">
      <h3 class="artwork-title">{{ artwork.title }}</h3>
      <p class="artwork-artist">{{ artwork.artist }}</p>
      <div class="flex items-center justify-between mt-3">
        <span class="text-sm text-gray-600">{{ artwork.category }} · {{ artwork.year }}</span>
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4 text-wine" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm text-gray-700 font-medium">{{ artwork.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  artwork: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);

const view2D = () => {
  // TODO: Abrir vista 2D
  console.log('Ver en 2D');
};

const view3D = () => {
  // TODO: Abrir vista 3D
  console.log('Ver en 3D');
};

const viewAR = () => {
  // TODO: Abrir vista AR
  console.log('Ver en AR');
};
</script>

<style scoped>
.artwork-card {
  @apply bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-wine/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2;
}

.artwork-image-wrapper {
  @apply relative aspect-square overflow-hidden bg-gray-100;
}

.artwork-image {
  @apply w-full h-full object-cover transition-transform duration-500 group-hover:scale-110;
}

.artwork-overlay {
  @apply absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center;
}

.overlay-btn {
  @apply w-12 h-12 rounded-full bg-wine/20 hover:bg-wine text-white transition-all duration-300 flex items-center justify-center hover:scale-110;
}

.artwork-info {
  @apply p-4;
}

.artwork-title {
  @apply text-lg font-semibold text-gray-900 mb-1 line-clamp-1;
}

.artwork-artist {
  @apply text-sm text-gray-600 mb-2;
}
</style>

