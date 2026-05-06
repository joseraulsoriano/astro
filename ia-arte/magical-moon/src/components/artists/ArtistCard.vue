<template>
  <a :href="`/artista/${artist.id}`" class="artist-card group">
    <div class="artist-header">
      <div class="avatar-wrapper">
        <img 
          :src="artist.avatar" 
          :alt="artist.name"
          class="artist-avatar"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
        />
        <div v-if="artist.verified" class="verified-badge">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <h3 class="artist-name">{{ artist.name }}</h3>
      <p class="artist-role">{{ artist.role }}</p>
    </div>
    <div class="artist-stats">
      <div class="stat-item">
        <span class="stat-number">{{ artist.artworkCount }}</span>
        <span class="stat-label">Obras</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">{{ artist.followers }}</span>
        <span class="stat-label">Seguidores</span>
      </div>
    </div>
    <span class="view-profile-cta">
      Ver perfil
      <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  </a>
</template>

<script setup>
defineProps({
  artist: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.artist-card {
  @apply flex flex-col rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/30 hover:shadow-lg;
}

.artist-header {
  @apply text-center mb-6;
}

.avatar-wrapper {
  @apply relative inline-block mb-4;
}

.artist-avatar {
  @apply w-24 h-24 rounded-full object-cover border-4 border-gray-100 mx-auto;
}

.verified-badge {
  @apply absolute bottom-0 right-0 w-8 h-8 bg-wine rounded-full flex items-center justify-center border-4 border-white;
}

.artist-name {
  @apply font-display text-xl font-semibold tracking-tight text-gray-900 mb-1;
}

.artist-role {
  @apply text-sm text-gray-600;
}

.artist-stats {
  @apply flex items-center justify-around py-4 border-y border-gray-200 mb-4;
}

.stat-item {
  @apply text-center;
}

.stat-number {
  @apply block text-2xl font-bold text-wine;
}

.stat-label {
  @apply text-sm text-gray-600;
}

.stat-divider {
  @apply w-px h-8 bg-gray-200;
}

.view-profile-cta {
  @apply mt-auto flex w-full items-center justify-center rounded-xl bg-wine px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-wine-dark;
}
</style>

