<template>
  <section class="featured-artworks relative py-20 md:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-wine/80">Curaduría del mes</p>
        <h2 class="font-display text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          Obras destacadas
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Cuatro piezas que cruzan siglos y técnicas: de lienzos históricos a salas vivas capturadas en imagen.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        <a
          v-for="artwork in artworks"
          :key="artwork.id"
          :href="`/obra/${artwork.slug}`"
          class="artwork-card group block outline-none ring-wine focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <div class="artwork-image-wrapper">
            <img
              :src="artwork.image"
              :alt="artwork.title"
              class="artwork-image"
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer"
              width="800"
              height="800"
            />
            <div class="artwork-overlay">
              <span class="text-sm font-medium text-gray-700"> Ver ficha </span>
            </div>
          </div>
          <div class="artwork-info">
            <h3 class="artwork-title">{{ artwork.title }}</h3>
            <p class="artwork-artist">{{ artwork.artist }}</p>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ artwork.category }}</span>
              <div class="flex items-center gap-1.5 text-wine">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-sm font-medium text-gray-800">{{ artwork.likes }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div class="mt-14 text-center">
        <a href="/galeria" class="btn-primary inline-flex items-center gap-2">
          <span>Ver toda la colección</span>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { buildDemoFeatured } from '../../data/museumCollection';

const artworks = ref(buildDemoFeatured());
</script>

<style scoped>
.featured-artworks {
  background: linear-gradient(180deg, #f1f5f9 0%, #f8fafc 40%, #ffffff 100%);
}

.artwork-card {
  @apply overflow-hidden rounded-[1.5rem] rounded-tr-[2.5rem] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/25 hover:shadow-[0_22px_44px_rgb(15_23_42_/0.07)];
}

.artwork-image-wrapper {
  @apply relative aspect-square overflow-hidden bg-stone-100;
}

.artwork-image {
  @apply h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04];
}

.artwork-overlay {
  @apply absolute inset-0 flex items-center justify-center bg-gradient-to-t from-white/95 via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100;
}

.artwork-info {
  @apply border-t border-stone-100 p-4;
}

.artwork-title {
  @apply font-display text-lg font-semibold tracking-tight text-gray-900;
}

.artwork-artist {
  @apply mt-1 text-sm text-gray-600;
}

.btn-primary {
  @apply inline-flex transform items-center gap-2 rounded-2xl rounded-br-[1.5rem] border border-slate-200 bg-white px-8 py-3.5 font-semibold text-wine shadow-md transition hover:-translate-y-0.5 hover:border-wine/35 hover:bg-sky-50/50 hover:shadow-lg;
}
</style>
