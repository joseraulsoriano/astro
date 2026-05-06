<template>
  <section class="relative border-y border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-white py-12 md:py-16" aria-labelledby="recent-strip-heading">
    <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recientes</p>
      <h2 id="recent-strip-heading" class="font-display mt-2 text-center text-2xl tracking-tight text-slate-800 md:text-3xl">
        Últimas piezas en sala
      </h2>
      <p class="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
        Un carril horizontal con las últimas incorporaciones demo; desliza para explorar sin salir de la portada.
      </p>

      <div
        class="mt-8 flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:thin] snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300"
        role="list"
      >
        <a
          v-for="p in pieces"
          :key="p.slug"
          :href="`/obra/${p.slug}`"
          role="listitem"
          class="snap-start shrink-0 w-[42vw] max-w-[11rem] sm:max-w-[12.5rem] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
        >
          <div
            class="aspect-square overflow-hidden bg-slate-100 shadow-md ring-1 ring-slate-200/70 transition-[box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-wine/20 group-focus-visible:-translate-y-0.5"
          :class="thumbShape(p.id)"
          >
            <img
              :src="p.image"
              :alt="p.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
              referrerpolicy="no-referrer"
              width="400"
              height="400"
            />
          </div>
          <p class="mt-2 line-clamp-2 text-sm font-medium leading-snug text-slate-800">{{ p.title }}</p>
          <p class="mt-0.5 line-clamp-1 text-xs text-slate-500">{{ p.artist }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { buildDemoGallery } from '../../data/museumCollection';

const pieces = ref([]);

function thumbShape(id) {
  const mods = ['rounded-[1.35rem] rounded-se-[2.75rem]', 'rounded-[1.85rem] rounded-ss-[0.6rem]', 'rounded-3xl rounded-ee-[2rem]'];
  return mods[(Number(id) || 0) % mods.length];
}

onMounted(() => {
  const all = buildDemoGallery();
  pieces.value = [...all].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10);
});
</script>
