<template>
  <!-- FAB del anfitrión: abre la guía (evento global hacia WelcomeGuide.island) -->
  <div class="host-wrap">
    <div
      class="host-fab"
      :class="{ visible: isVisible, 'host-fab--open': bubbleOpen }"
    >
      <button
        type="button"
        class="fab-trigger"
        :aria-expanded="bubbleOpen"
        aria-controls="host-greeting-bubble"
        aria-label="Abrir guía del museo"
        @click="toggleBubble"
      >
        <span class="fab-ring" aria-hidden="true" />
        <span class="fab-inner">
          <svg class="h-7 w-7 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
      </button>

      <div
        v-show="bubbleOpen"
        id="host-greeting-bubble"
        class="host-bubble"
        role="region"
        aria-live="polite"
      >
        <p class="text-sm font-medium leading-snug text-slate-800">{{ greetingMessage }}</p>
        <button type="button" class="host-open-guide" @click="openGuide">
          Abrir guía paso a paso
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const GUIDE_EVENT = 'museo-fragmentos:open-guide';

const isVisible = ref(false);
const bubbleOpen = ref(false);
const greetingMessage = ref('¿Necesitas orientación? Toca para ver la guía.');

const greetings = [
  '¿Necesitas orientación? Toca para ver la guía.',
  'Aquí tienes la galería, salas y búsqueda en la parte superior.',
  'Desliza las piezas recientes en la portada desde el móvil.',
  'Puedes reabrir esta ayuda cuando quieras.',
];

let greetInterval = null;

function pickGreeting() {
  greetingMessage.value = greetings[Math.floor(Math.random() * greetings.length)];
}

const toggleBubble = () => {
  bubbleOpen.value = !bubbleOpen.value;
};

const openGuide = () => {
  bubbleOpen.value = false;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(GUIDE_EVENT));
  }
};

const onKeydown = (e) => {
  if (e.key === 'Escape') bubbleOpen.value = false;
};

let showTimer = null;

onMounted(() => {
  showTimer = window.setTimeout(() => {
    isVisible.value = true;
  }, 800);
  greetInterval = window.setInterval(pickGreeting, 12000);
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  if (showTimer != null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  if (greetInterval != null) {
    clearInterval(greetInterval);
    greetInterval = null;
  }
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.host-wrap {
  /* ancla visual sin position fixed en el hijo repetido */
  pointer-events: none;
}

.host-fab {
  pointer-events: auto;
  position: fixed;
  z-index: 45;
  right: max(0.75rem, env(safe-area-inset-right, 0px));
  bottom: max(0.75rem, env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.65rem;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.host-fab.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 640px) {
  .host-fab {
    right: max(1.25rem, env(safe-area-inset-right, 0px));
    bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
  }
}

.fab-trigger {
  position: relative;
  display: grid;
  place-items: center;
  border: none;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border-radius: 9999px;
  outline: none;
}

.fab-trigger:focus-visible .fab-inner {
  @apply ring-2 ring-wine ring-offset-2;
}

.fab-ring {
  position: absolute;
  inset: -3px;
  border-radius: 9999px;
  background: conic-gradient(from 160deg, rgb(125 211 252 / 0.65), rgb(61 106 140 / 0.45), rgb(226 232 240 / 0.8));
  opacity: 0.85;
}

.fab-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  border: 2px solid rgb(61 106 140);
  background: linear-gradient(160deg, #ffffff 0%, #f1f5f9 100%);
  box-shadow: 0 10px 30px rgb(15 23 42 / 0.12);
}

.host-fab--open .fab-inner {
  @apply bg-sky-50;
}

.host-bubble {
  width: min(18rem, calc(100vw - 2.5rem));
  max-width: 18rem;
  border-radius: 1rem;
  border: 1px solid rgb(226 232 240);
  background: rgb(255 255 255 / 0.98);
  padding: 0.75rem 0.875rem;
  box-shadow:
    0 18px 40px rgb(15 23 42 / 0.12),
    0 0 0 1px rgb(255 255 255 / 0.85) inset;
}

.host-open-guide {
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 0.65rem;
  background: rgb(61 106 140);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.45rem 0.65rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.host-open-guide:hover {
  background: rgb(46 84 112);
}

@media (prefers-reduced-motion: reduce) {
  .host-fab {
    transition: none;
  }

  .fab-ring {
    animation: none;
  }
}
</style>
