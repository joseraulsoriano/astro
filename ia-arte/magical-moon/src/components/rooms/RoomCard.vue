<template>
  <div class="room-card group">
    <div class="room-image-wrapper">
      <img 
        :src="room.image" 
        :alt="room.name"
        class="room-image"
      />
      <div class="room-overlay">
        <a :href="`/sala/${room.id}`" class="overlay-btn-large">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Entrar a la Sala
        </a>
      </div>
    </div>
    <div class="room-info">
      <div class="flex items-start justify-between mb-2">
        <h3 class="room-title">{{ room.name }}</h3>
        <span class="room-badge">{{ room.theme }}</span>
      </div>
      <p class="room-description">{{ room.description }}</p>
      <div class="room-footer">
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-sm text-gray-600">{{ room.creator }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm text-gray-600 font-medium">{{ room.artworkCount }} obras</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  room: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.room-card {
  @apply bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-wine/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2;
}

.room-image-wrapper {
  @apply relative aspect-video overflow-hidden bg-gray-100;
}

.room-image {
  @apply w-full h-full object-cover transition-transform duration-500 group-hover:scale-110;
}

.room-overlay {
  @apply absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center;
}

.overlay-btn-large {
  @apply inline-flex items-center px-6 py-3 bg-wine text-white font-semibold rounded-lg hover:bg-wine-dark transition-colors;
}

.room-info {
  @apply p-6;
}

.room-title {
  @apply text-xl font-semibold text-gray-900 flex-1;
}

.room-badge {
  @apply px-3 py-1 text-xs font-medium bg-wine/10 text-wine rounded-full;
}

.room-description {
  @apply text-gray-600 mb-4 line-clamp-2;
}

.room-footer {
  @apply flex items-center justify-between pt-4 border-t border-gray-200;
}
</style>

