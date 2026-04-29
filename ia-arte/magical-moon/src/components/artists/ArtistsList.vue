<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ArtistCard
      v-for="artist in artists"
      :key="artist.id"
      :artist="artist"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ArtistCard from './ArtistCard.vue';

const artists = ref([]);

onMounted(() => {
  // TODO: Obtener desde Supabase
  artists.value = [
    {
      id: 1,
      name: 'Vincent van Gogh',
      role: 'Pintor',
      avatar: '/main.png',
      artworkCount: 12,
      followers: 1250,
      verified: true
    },
    {
      id: 2,
      name: 'Artista Contemporáneo',
      role: 'Artista Digital',
      avatar: '/1.png',
      artworkCount: 8,
      followers: 890,
      verified: false
    },
    {
      id: 3,
      name: 'Museo de Arte Moderno',
      role: 'Institución',
      avatar: '/2.png',
      artworkCount: 45,
      followers: 3200,
      verified: true
    },
    ...Array.from({ length: 12 }, (_, i) => ({
      id: i + 4,
      name: `Artista ${i + 4}`,
      role: ['Pintor', 'Escultor', 'Fotógrafo', 'Artista Digital'][i % 4],
      avatar: '/main.png',
      artworkCount: Math.floor(Math.random() * 20) + 5,
      followers: Math.floor(Math.random() * 2000) + 100,
      verified: i % 3 === 0
    }))
  ];
});
</script>

