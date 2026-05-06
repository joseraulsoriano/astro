<template>
  <section id="features" ref="sectionRef" class="features relative py-20 md:py-28">
    <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Decora forma suave -->
      <div
        class="pointer-events-none absolute -left-24 top-[12%] h-48 w-48 rounded-[40%_60%_55%_45%] bg-sky-100/35 blur-2xl animate-drift-slow md:block"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -right-16 bottom-[8%] h-56 w-56 rounded-[55%_45%_45%_55%] bg-slate-200/50 blur-2xl animate-drift-slow md:block"
        style="animation-delay: -4s"
        aria-hidden="true"
      />

      <div class="relative mb-14 text-center">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Fragmentos útiles</p>
        <h2 class="font-display text-4xl tracking-tight text-slate-900 md:text-5xl">
          Una lectura cómoda del arte digital
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Menos decoración innecesaria: foco en recorrer, encontrar y compartir obra con vista clara.
        </p>
      </div>

      <div class="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        <article
          v-for="(item, i) in cards"
          :key="item.title"
          :ref="(el) => setCardRef(el, i)"
          class="feature-card"
          :class="{ 'feature-card--visible': visible[i] }"
        >
          <div class="blob" :style="{ '--blob': item.blob }" aria-hidden="true" />
          <div class="relative">
            <p class="eyebrow">{{ item.step }}</p>
            <h3 class="feature-title">{{ item.title }}</h3>
            <p class="feature-description">{{ item.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const sectionRef = ref(null);
const cardRefs = ref([]);
const visible = ref([]);
let observer;

function setCardRef(el, i) {
  if (el) cardRefs.value[i] = el;
}

const cards = [
  {
    step: '01 · Visual',
    title: 'Vistas 2D nítidas',
    text: 'Imágenes con espacio neutro para que coloreado y materia se lean sin cansar la vista.',
    blob: '210deg',
  },
  {
    step: '02 · Espacio',
    title: 'Modelo 3D cuando exista',
    text: 'Algunas piezas demo permiten orbitar sobre un archivo glTF; si no hay modelo, el flujo vuelve a 2D.',
    blob: '125deg',
  },
  {
    step: '03 · Lugar real',
    title: 'AR orientativa',
    text: 'Vista aumentada donde el dispositivo y el recurso lo permitan; es un modo extra, no el centro.',
    blob: '285deg',
  },
  {
    step: '04 · Sala',
    title: 'Salas temáticas',
    text: 'Recorridos agrupados por tono visual y curaduría, sin perder referencia entre piezas.',
    blob: '40deg',
  },
  {
    step: '05 · Hallazgos',
    title: 'Búsqueda conectada a datos demo',
    text: 'Sugerencias reales desde la colección de prueba y resultados agrupados por tipo.',
    blob: '320deg',
  },
  {
    step: '06 · Abierto',
    title: 'Gratis en este entorno demo',
    text: 'Sin paywall aquí; el proyecto prioriza muestra técnica y experiencia antes que cobro.',
    blob: '175deg',
  },
];

visible.value = cards.map(() => false);

onMounted(() => {
  if (typeof window === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    visible.value = cards.map(() => true);
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = cardRefs.value.indexOf(entry.target);
        if (idx === -1) return;
        const next = [...visible.value];
        next[idx] = true;
        visible.value = next;
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  nextTick(() => {
    cardRefs.value.filter(Boolean).forEach((el) => observer?.observe(el));
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.features {
  background: linear-gradient(165deg, #f8fafc 0%, #ffffff 52%, #f1f5f9 100%);
}

.feature-card {
  position: relative;
  overflow: hidden;
  padding: 1.75rem 1.5rem;
  opacity: 0;
  transform: translateY(1.125rem);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  border-radius: 1.75rem;
  border: 1px solid rgb(226 232 240 / 0.85);
  background: rgb(255 255 255 / 0.72);
  box-shadow: 0 14px 40px rgb(100 116 139 / 0.06);
}

.feature-card:nth-child(3n + 2) {
  border-radius: 1.5rem 2.25rem 1.85rem 1.25rem;
}

.feature-card:nth-child(3n) {
  border-radius: 2rem 1.25rem 1.5rem 2.35rem;
}

.feature-card:hover {
  @apply border-sky-200/80 shadow-lg;
}

.feature-card--visible {
  opacity: 1;
  transform: translateY(0);
}

.blob {
  position: absolute;
  right: -2rem;
  top: -2.5rem;
  width: 7rem;
  height: 7rem;
  border-radius: 58% 42% 45% 55% / 52% 48% 60% 40%;
  opacity: 0.5;
  background: linear-gradient(
    var(--blob, 180deg),
    rgb(186 230 253 / 0.45),
    rgb(203 213 225 / 0.25),
    rgb(226 232 240 / 0.15)
  );
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-card:hover .blob {
  transform: rotate(-8deg) scale(1.05);
}

.eyebrow {
  @apply text-xs font-semibold uppercase tracking-[0.16em] text-slate-500;
}

.feature-title {
  @apply mt-3 font-display text-xl font-semibold tracking-tight text-slate-900 md:text-[1.35rem];
}

.feature-description {
  @apply mt-2 text-[0.945rem] leading-relaxed text-slate-600;
}

@media (prefers-reduced-motion: reduce) {
  .feature-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none;
  }

  .feature-card:hover .blob {
    transform: none;
  }

  .blob {
    opacity: 0.28;
    transition: none;
  }
}
</style>
