<template>
  <div
    class="artwork-card group cursor-pointer outline-none focus-within:border-wine/40 focus-within:shadow-md focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
    tabindex="0"
    role="article"
    :aria-labelledby="`artwork-title-${artwork.id}`"
    @click="$emit('click')"
    @keydown.enter.prevent="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <div class="artwork-image-wrapper">
      <img :src="artwork.image" :alt="artwork.title" class="artwork-image" loading="lazy" referrerpolicy="no-referrer" />
      <div class="artwork-overlay" @click.stop>
        <div class="flex flex-wrap items-center justify-center gap-2 px-2">
          <a :href="`/obra/${artwork.slug}`" class="mode-pill" @click.stop> 2D </a>
          <a :href="`/obra/${artwork.slug}?v=3d`" class="mode-pill" @click.stop> 3D </a>
          <a :href="`/obra/${artwork.slug}?v=ar`" class="mode-pill" @click.stop> AR </a>
        </div>
      </div>
    </div>
    <div class="artwork-info">
      <h3 class="artwork-title" :id="`artwork-title-${artwork.id}`">{{ artwork.title }}</h3>
      <p class="artwork-artist">{{ artwork.artist }}</p>
      <div class="mt-3 flex items-center justify-between gap-2 text-sm text-slate-600">
        <span>{{ artwork.category }} · {{ artwork.year }}</span>
        <span class="shrink-0 text-slate-500" :aria-label="`${artwork.likes} favoritos`">{{ artwork.likes }} me gusta</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  artwork: {
    type: Object,
    required: true,
  },
});

defineEmits(['click']);
</script>

<style scoped>
.artwork-card {
  @apply overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-wine/20 hover:shadow-lg;
}

.artwork-image-wrapper {
  @apply relative aspect-square overflow-hidden bg-slate-100;
}

.artwork-image {
  @apply h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05];
}

.artwork-overlay {
  @apply absolute inset-0 z-10 flex items-center justify-center bg-slate-50/95 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100;
}

.mode-pill {
  @apply rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-wine/40 hover:text-wine;
}

.artwork-info {
  @apply border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/50 p-4;
}

.artwork-title {
  @apply font-display text-lg font-semibold tracking-tight text-slate-900 line-clamp-1;
}

.artwork-artist {
  @apply text-sm text-slate-600;
}
</style>
