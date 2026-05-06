<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const motes = ref([]);
let intervalId = null;
const reducedMotion = ref(false);

const MAX_MOTES = 36;

const createMote = () => {
  const id = `${Date.now()}-${Math.random()}`;
  motes.value.push({
    id,
    left: `${6 + Math.random() * 88}%`,
    duration: `${14 + Math.random() * 12}s`,
    delay: `${Math.random() * 4}s`,
    size: `${1.5 + Math.random() * 2}px`,
    opacity: 0.12 + Math.random() * 0.18,
  });

  if (motes.value.length > MAX_MOTES) {
    motes.value.shift();
  }

  setTimeout(() => {
    motes.value = motes.value.filter((m) => m.id !== id);
  }, 28000);
};

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reducedMotion.value = true;
    return;
  }

  intervalId = setInterval(createMote, 420);

  for (let i = 0; i < 10; i += 1) {
    setTimeout(() => createMote(), i * 120);
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div
    id="ambient-particles"
    class="ambient pointer-events-none fixed inset-0 z-0 overflow-hidden"
    :class="{ 'ambient--static': reducedMotion }"
    aria-hidden="true"
  >
    <div
      v-for="m in motes"
      :key="m.id"
      class="mote"
      :style="{
        left: m.left,
        animationDuration: m.duration,
        animationDelay: m.delay,
        width: m.size,
        height: m.size,
        opacity: m.opacity,
      }"
    />
  </div>
</template>

<style scoped>
.mote {
  position: absolute;
  top: -8px;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.45), rgba(148, 163, 184, 0.12) 70%);
  box-shadow: 0 0 12px rgba(125, 211, 252, 0.15);
  animation: drift-fall linear infinite;
}

@keyframes drift-fall {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(100vh) translateX(-18px);
  }
}

.ambient--static .mote {
  animation: none;
  opacity: 0.08;
}
</style>
