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
import { buildDemoArtists } from '../../data/museumCollection';

const artists = ref([]);

onMounted(() => {
  artists.value = buildDemoArtists();
});
</script>

