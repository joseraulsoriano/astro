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
import { buildDemoRooms } from '../../data/museumCollection';

const rooms = ref([]);

onMounted(() => {
  rooms.value = buildDemoRooms();
});
</script>

