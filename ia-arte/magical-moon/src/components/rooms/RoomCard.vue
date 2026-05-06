<template>
  <article class="room-card group">
    <a :href="`/sala/${room.id}`" class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2">
      <div class="room-visual">
        <img :src="room.image" :alt="room.name" class="room-image" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
        <div class="room-scrim" />
        <span class="room-cta"> Ver sala </span>
      </div>
      <div class="room-body">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <h3 class="room-title">{{ room.name }}</h3>
          <span class="room-chip">{{ room.theme }}</span>
        </div>
        <p class="room-description">{{ room.description }}</p>
        <dl class="room-meta">
          <div>
            <dt class="sr-only">Curaduría</dt>
            <dd>{{ room.creator }}</dd>
          </div>
          <div>
            <dt class="sr-only">Obras</dt>
            <dd>{{ room.artworkCount }} piezas</dd>
          </div>
        </dl>
      </div>
    </a>
  </article>
</template>

<script setup>
defineProps({
  room: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.room-card {
  @apply relative overflow-hidden rounded-[1.65rem] border border-slate-200/90 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200/90 hover:shadow-[0_26px_52px_rgb(15_23_42_/0.09)];
}

.room-card:nth-child(even) .room-visual {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%);
}

.room-card:nth-child(odd) .room-visual {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 88%);
}

.room-visual {
  @apply relative aspect-[5/3] overflow-hidden bg-slate-100;
}

.room-image {
  @apply h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04];
}

.room-scrim {
  @apply pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100;
}

.room-cta {
  @apply absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition group-hover:bg-white;
}

.room-body {
  @apply space-y-3 p-6;
}

.room-title {
  @apply max-w-[16rem] font-display text-xl font-semibold tracking-tight text-slate-900;
}

.room-chip {
  @apply rounded-lg rounded-tr-2xl bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-wine;
}

.room-description {
  @apply line-clamp-2 text-sm leading-relaxed text-slate-600;
}

.room-meta {
  @apply flex flex-wrap gap-x-6 gap-y-1 border-t border-slate-100 pt-4 text-sm text-slate-500;
}

.room-meta dd {
  @apply m-0;
}
</style>
