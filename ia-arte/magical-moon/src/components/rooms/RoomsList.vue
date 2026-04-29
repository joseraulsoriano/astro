<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <RoomCard
      v-for="room in rooms"
      :key="room.id"
      :room="room"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RoomCard from './RoomCard.vue';

const rooms = ref([]);

onMounted(() => {
  // TODO: Obtener desde Supabase
  rooms.value = [
    {
      id: 1,
      name: 'Arte Contemporáneo 2024',
      description: 'Colección de las mejores obras contemporáneas del año',
      artworkCount: 45,
      creator: 'Museo de Arte Moderno',
      image: '/main.png',
      theme: 'moderno'
    },
    {
      id: 2,
      name: 'Masters del Renacimiento',
      description: 'Obras maestras de los grandes artistas del Renacimiento',
      artworkCount: 32,
      creator: 'Galería Nacional',
      image: '/1.png',
      theme: 'clásico'
    },
    {
      id: 3,
      name: 'Fotografía Urbana',
      description: 'La ciudad a través del lente de fotógrafos contemporáneos',
      artworkCount: 28,
      creator: 'Colección Personal',
      image: '/2.png',
      theme: 'fotografía'
    }
  ];
});
</script>

