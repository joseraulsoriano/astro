<template>
  <!-- Guía unificada: intro + pasos dentro del mismo diálogo (responsive, sin overlays rotos) -->
  <teleport to="body">
    <div
      v-if="isOpen"
      role="presentation"
      class="guide-backdrop fixed inset-0 z-[90] flex items-end justify-center bg-slate-900/50 backdrop-blur-sm motion-reduce:bg-slate-900/70 motion-reduce:backdrop-blur-none sm:items-center sm:p-6"
      @click.self="onBackdropClose"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-labelledby="headingId"
        tabindex="-1"
        class="flex max-h-[min(92dvh,760px)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.35rem] border border-slate-200 bg-white shadow-2xl outline-none ring-1 ring-slate-200/80 sm:max-w-xl sm:rounded-2xl"
        @keydown.escape.prevent="closeGuide"
      >
        <header class="shrink-0 border-b border-slate-100 bg-gradient-to-r from-sky-100/90 to-slate-50 px-4 py-4 sm:px-6 sm:py-5">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p v-if="phase === 'tour'" class="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Paso {{ tourIndex + 1 }} / {{ tourSteps.length }}
              </p>
              <h2 :id="headingId" class="font-display text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                {{ phase === 'intro' ? 'Bienvenido a Museo Fragmentos' : tourSteps[tourIndex]?.title }}
              </h2>
            </div>
            <button
              type="button"
              class="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-white/80 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
              aria-label="Cerrar guía"
              @click="closeGuide"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Intro -->
        <div v-if="phase === 'intro'" class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div class="flex flex-col items-center px-4 py-6 sm:px-8">
            <div class="relative mb-4">
              <div
                class="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-slate-100 ring-2 ring-wine/25"
              >
                <svg class="h-11 w-11 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span
                class="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-emerald-700"
                aria-hidden="true"
              >
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <p class="text-center text-sm text-slate-600 sm:text-base">Te explico en un minuto cómo moverte por el museo demo.</p>
          </div>

          <ul class="space-y-2 border-t border-slate-100 px-4 py-4 sm:px-8">
            <li
              v-for="(step, index) in introBullets"
              :key="index"
              class="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-700"
            >
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-wine text-xs font-bold text-white">
                {{ index + 1 }}
              </span>
              <span class="min-w-0 pt-0.5 leading-snug">{{ step }}</span>
            </li>
          </ul>

          <div class="mt-auto flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-4 sm:flex-row sm:px-8">
            <button
              type="button"
              class="order-2 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-wine/40 hover:text-wine sm:order-1 sm:flex-1"
              @click="skipAndClose"
            >
              Explorar solo
            </button>
            <button
              type="button"
              class="order-1 w-full rounded-xl bg-wine py-3 text-sm font-semibold text-white shadow-md transition hover:bg-wine-dark sm:order-2 sm:flex-1"
              @click="startTour"
            >
              Empezar recorrido
            </button>
          </div>
        </div>

        <!-- Tour por pasos -->
        <div v-else class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div class="px-4 py-5 sm:px-8">
            <p class="text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
              {{ tourSteps[tourIndex]?.body }}
            </p>
            <div v-if="tourSteps[tourIndex]?.actionLabel" class="mt-4">
              <button
                v-if="tourSteps[tourIndex]?.action === 'scroll'"
                type="button"
                class="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-wine shadow-sm transition hover:bg-sky-50 sm:w-auto sm:px-6"
                @click="runStepAction"
              >
                {{ tourSteps[tourIndex].actionLabel }}
              </button>
              <a
                v-else-if="tourSteps[tourIndex]?.href"
                :href="tourSteps[tourIndex].href"
                class="inline-flex w-full items-center justify-center rounded-xl bg-wine px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-wine-dark sm:w-auto"
                @click="afterNavLink"
              >
                {{ tourSteps[tourIndex].actionLabel }}
              </a>
            </div>
          </div>

          <div class="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-4 sm:px-8">
            <button
              type="button"
              class="text-sm font-medium text-slate-500 hover:text-wine"
              @click="endTourEarly"
            >
              Salir
            </button>
            <div class="flex flex-1 justify-end gap-2 sm:flex-initial">
              <button
                v-if="tourIndex > 0"
                type="button"
                class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300"
                @click="tourIndex--"
              >
                Atrás
              </button>
              <button
                type="button"
                class="rounded-xl bg-wine px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wine-dark"
                @click="nextTourStep"
              >
                {{ tourIndex === tourSteps.length - 1 ? 'Listo' : 'Siguiente' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const GUIDE_EVENT = 'museo-fragmentos:open-guide';

const isOpen = ref(false);
const phase = ref('intro');
const tourIndex = ref(0);

const headingId = 'welcome-guide-heading';

const introBullets = [
  'Arriba tienes acceso a Galería, Salas, Artistas y la búsqueda (ícono de lupa).',
  'En la portada verás piezas recientes y un carril horizontal que puedes deslizar en el móvil.',
  'En cada obra puedes abrir la ficha; en la demo, «Constelación sobre panel» incluye vista 3D de prueba.',
];

const tourSteps = [
  {
    title: 'Menú y búsqueda',
    body: 'Usa la barra superior para saltar entre secciones. La lupa abre el buscador en cualquier pantalla.',
    actionLabel: '',
  },
  {
    title: 'Bloque de características',
    body: 'Más abajo en la página, el apartado «Fragmentos útiles» resume cómo está pensada la demo.',
    actionLabel: 'Ir a características',
    action: 'scroll',
    scrollTarget: '#features',
  },
  {
    title: 'Explorar obras',
    body: 'En la Galería verás filtros y fichas con accesos 2D / 3D / AR según disponibilidad de cada obra.',
    actionLabel: 'Abrir Galería',
    href: '/galeria',
  },
  {
    title: 'Listo',
    body: 'Puedes volver a esta guía en cualquier momento tocando el botón flotante del anfitrión (esquina inferior derecha).',
    actionLabel: '',
  },
];

const openGuide = (mode = 'intro') => {
  isOpen.value = true;
  phase.value = mode;
  if (mode === 'tour') tourIndex.value = 0;
};

const closeGuide = () => {
  isOpen.value = false;
};

const persistSeen = () => {
  try {
    localStorage.setItem('magical-moon-welcome-seen', 'true');
  } catch {
    /* private mode */
  }
};

const skipAndClose = () => {
  persistSeen();
  closeGuide();
};

const startTour = () => {
  persistSeen();
  phase.value = 'tour';
  tourIndex.value = 0;
};

const nextTourStep = () => {
  if (tourIndex.value < tourSteps.length - 1) {
    tourIndex.value++;
    return;
  }
  try {
    localStorage.setItem('magical-moon-tour-completed', 'true');
  } catch {
    /* ignore */
  }
  closeGuide();
};

const endTourEarly = () => {
  persistSeen();
  try {
    localStorage.setItem('magical-moon-tour-skipped', 'true');
  } catch {
    /* ignore */
  }
  closeGuide();
};

const afterNavLink = () => {
  persistSeen();
  closeGuide();
};

const runStepAction = () => {
  const step = tourSteps[tourIndex.value];
  if (step.action !== 'scroll' || !step.scrollTarget) return;
  closeGuide();
  requestAnimationFrame(() => {
    document.querySelector(step.scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const onBackdropClose = () => {
  if (phase.value === 'intro') skipAndClose();
  else endTourEarly();
};

const onExternalOpen = () => {
  openGuide('intro');
};

let autoShowTimer = null;

onMounted(() => {
  if (typeof window === 'undefined') return;
  window.addEventListener(GUIDE_EVENT, onExternalOpen);

  let welcomeSeen = false;
  try {
    welcomeSeen = !!localStorage.getItem('magical-moon-welcome-seen');
  } catch {
    welcomeSeen = false;
  }

  if (!welcomeSeen) {
    autoShowTimer = window.setTimeout(() => openGuide('intro'), 600);
  }
});

onUnmounted(() => {
  if (autoShowTimer != null) {
    clearTimeout(autoShowTimer);
    autoShowTimer = null;
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener(GUIDE_EVENT, onExternalOpen);
  }
});
</script>

<style scoped>
.guide-backdrop {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
</style>
