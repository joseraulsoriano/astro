<template>
  <div class="artwork-list-item group cursor-pointer" @click="$emit('click')">
    <div class="flex gap-4">
      <div class="artwork-image-wrapper flex-shrink-0">
        <img 
          :src="artwork.image" 
          :alt="artwork.title"
          class="artwork-image"
          loading="lazy"
          referrerpolicy="no-referrer"
        />
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h3 class="artwork-title">{{ artwork.title }}</h3>
          <p class="artwork-artist">{{ artwork.artist }}</p>
          <p class="text-sm text-gray-600 mt-2 line-clamp-2">
            {{ artwork.description || `Obra de ${artwork.category} del año ${artwork.year}` }}
          </p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600">{{ artwork.category }}</span>
            <span class="text-sm text-gray-600">{{ artwork.year }}</span>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4 text-wine" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="text-sm text-gray-700 font-medium">{{ artwork.likes }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button class="action-btn" title="Ver en 2D">2D</button>
            <button class="action-btn" title="Ver en 3D">3D</button>
            <button class="action-btn" title="Ver en AR">AR</button>
          </div>
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
</script>

<style scoped>
.artwork-list-item {
  @apply bg-white border border-gray-200 rounded-xl p-4 hover:border-wine/50 hover:shadow-lg transition-all duration-300;
}

.artwork-image-wrapper {
  @apply w-32 h-32 rounded-lg overflow-hidden bg-gray-100;
}

.artwork-image {
  @apply w-full h-full object-cover;
}

.artwork-title {
  @apply text-xl font-semibold text-gray-900 mb-1;
}

.artwork-artist {
  @apply text-sm text-gray-600 mb-2;
}

.action-btn {
  @apply px-3 py-1 text-sm border border-gray-300 rounded-lg text-gray-600 hover:border-wine hover:text-wine hover:bg-wine/5 transition-colors;
}
</style>

