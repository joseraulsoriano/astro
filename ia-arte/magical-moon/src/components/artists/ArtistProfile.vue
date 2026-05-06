<template>
  <div class="artist-profile min-h-screen bg-white pt-20">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-16 text-center">
      <svg class="animate-spin h-12 w-12 text-wine mx-auto" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600 mt-4">Cargando perfil...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!artist" class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Artista no encontrado</h1>
      <a href="/artistas" class="text-wine hover:text-wine-dark">Volver a artistas</a>
    </div>

    <!-- Artist Content -->
    <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-8 text-sm text-gray-600">
        <a href="/" class="hover:text-wine">Inicio</a>
        <span class="mx-2">/</span>
        <a href="/artistas" class="hover:text-wine">Artistas</a>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ artist.name }}</span>
      </nav>

      <!-- Header Section -->
      <div class="bg-gradient-to-b from-wine/5 to-white rounded-2xl p-8 mb-8 border border-gray-200">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Avatar -->
          <div class="relative flex-shrink-0">
            <img 
              :src="artist.avatar" 
              :alt="artist.name"
              class="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
            />
            <div v-if="artist.verified" class="absolute -bottom-2 -right-2 w-10 h-10 bg-wine rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 text-center md:text-left">
          <h1 class="font-display text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl mb-2">
              {{ artist.name }}
            </h1>
            <p class="text-xl text-gray-600 mb-4">{{ artist.role }}</p>
            
            <!-- Stats -->
            <div class="flex flex-wrap gap-6 justify-center md:justify-start mb-6">
              <div class="stat-box">
                <span class="stat-value">{{ artist.artworkCount }}</span>
                <span class="stat-label">Obras</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{{ artist.followers }}</span>
                <span class="stat-label">Seguidores</span>
              </div>
              <div class="stat-box">
                <span class="stat-value">{{ artist.following }}</span>
                <span class="stat-label">Siguiendo</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                @click="toggleFollow"
                :class="['follow-btn', { 'following': isFollowing }]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ isFollowing ? 'Siguiendo' : 'Seguir' }}
              </button>
              <button class="contact-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contactar
              </button>
              <button @click="shareArtist" class="share-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartir
              </button>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div v-if="artist.bio" class="mt-8 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Biografía</h2>
          <p class="text-gray-700 leading-relaxed">{{ artist.bio }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs-container mb-8">
        <button 
          @click="activeTab = 'obras'"
          :class="['tab-btn', { 'active': activeTab === 'obras' }]"
        >
          Obras ({{ artist.artworkCount }})
        </button>
        <button 
          @click="activeTab = 'salas'"
          :class="['tab-btn', { 'active': activeTab === 'salas' }]"
        >
          Salas Virtuales ({{ artist.roomsCount }})
        </button>
        <button 
          @click="activeTab = 'sobre'"
          :class="['tab-btn', { 'active': activeTab === 'sobre' }]"
        >
          Sobre
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Obras -->
        <div v-if="activeTab === 'obras'" class="artworks-grid">
          <div v-if="artworks.length === 0" class="empty-state">
            <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-gray-600">Este artista aún no ha publicado obras</p>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <a
              v-for="artwork in artworks"
              :key="artwork.id"
              :href="`/obra/${artwork.slug}`"
              class="artwork-thumb"
            >
              <div class="artwork-thumb-image">
                <img :src="artwork.image" :alt="artwork.title" />
                <div class="artwork-thumb-overlay">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-white font-medium">{{ artwork.likes }}</span>
                  </div>
                </div>
              </div>
              <h3 class="artwork-thumb-title">{{ artwork.title }}</h3>
              <p class="artwork-thumb-year">{{ artwork.year }}</p>
            </a>
          </div>
        </div>

        <!-- Salas -->
        <div v-if="activeTab === 'salas'" class="rooms-grid">
          <div v-if="rooms.length === 0" class="empty-state">
            <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p class="text-gray-600">Este artista aún no ha creado salas virtuales</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              v-for="room in rooms"
              :key="room.id"
              :href="`/sala/${room.id}`"
              class="room-thumb"
            >
              <div class="room-thumb-image">
                <img :src="room.image" :alt="room.name" />
              </div>
              <div class="room-thumb-info">
                <h3 class="room-thumb-title">{{ room.name }}</h3>
                <p class="room-thumb-count">{{ room.artworkCount }} obras</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Sobre -->
        <div v-if="activeTab === 'sobre'" class="about-section">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="info-card">
              <h3 class="info-card-title">Información</h3>
              <dl class="info-list">
                <div v-if="artist.location">
                  <dt>Ubicación</dt>
                  <dd>{{ artist.location }}</dd>
                </div>
                <div v-if="artist.website">
                  <dt>Sitio Web</dt>
                  <dd><a :href="artist.website" target="_blank" class="text-wine hover:underline">{{ artist.website }}</a></dd>
                </div>
                <div v-if="artist.joinedDate">
                  <dt>Miembro desde</dt>
                  <dd>{{ formatDate(artist.joinedDate) }}</dd>
                </div>
              </dl>
            </div>
            <div class="info-card">
              <h3 class="info-card-title">Estadísticas</h3>
              <dl class="info-list">
                <div>
                  <dt>Total de obras</dt>
                  <dd>{{ artist.artworkCount }}</dd>
                </div>
                <div>
                  <dt>Seguidores</dt>
                  <dd>{{ artist.followers }}</dd>
                </div>
                <div>
                  <dt>Visualizaciones totales</dt>
                  <dd>{{ artist.totalViews }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { buildDemoArtists, buildDemoGallery, coverAt } from '../../data/museumCollection';

const props = defineProps({
  artistId: {
    type: String,
    required: true
  }
});

const loading = ref(true);
const artist = ref(null);
const artworks = ref([]);
const rooms = ref([]);
const activeTab = ref('obras');
const isFollowing = ref(false);

const fetchArtist = async () => {
  loading.value = true;
  setTimeout(() => {
    const id = props.artistId;
    const demoList = buildDemoArtists();
    const demo = demoList.find((a) => String(a.id) === String(id));

    if (!demo) {
      artist.value = null;
      loading.value = false;
      return;
    }

    const isVan = id === 'van-gogh';
    const numericId = typeof demo.id === 'number' ? demo.id : 11;

    artist.value = {
      id: demo.id,
      name: demo.name,
      role: demo.role,
      avatar: demo.avatar,
      verified: demo.verified,
      bio: isVan
        ? 'Pintor postimpresionista: pincelada visible, color casi musical y un impulso vital difícil de encerrar en una sola etiqueta.'
        : `${demo.name} trabaja series breves, casi diarios visuales, donde el accidente y el control negocian cada fondo.`,
      artworkCount: demo.artworkCount,
      followers: demo.followers,
      following: 32 + (numericId % 80),
      roomsCount: demo.verified ? 2 : 1,
      location: isVan ? 'Países Bajos' : 'Estudio itinerante',
      website: 'https://example.com',
      joinedDate: '2023-01-15',
      totalViews: demo.followers * 24,
    };

    if (isVan) {
      artworks.value = [
        { id: 1, title: 'La noche estrellada', year: 1889, image: coverAt(0), likes: 1250, slug: 'noche-estrellada' },
        { id: 2, title: 'Los girasoles', year: 1888, image: coverAt(10), likes: 980, slug: 'girasoles' },
        { id: 3, title: 'Autorretrato', year: 1889, image: coverAt(15), likes: 756, slug: 'autorretrato' },
      ];
      rooms.value = [
        { id: 1, name: 'Paisajes íntimos', image: coverAt(6), artworkCount: 6 },
        { id: 2, name: 'Luz de Arlés', image: coverAt(20), artworkCount: 5 },
      ];
    } else {
      const g = buildDemoGallery();
      const pick = (slug) => g.find((x) => x.slug === slug);
      const s1 = pick(`obra-${numericId + 4}`) || pick('obra-8');
      const s2 = pick(`obra-${numericId + 8}`) || pick('obra-9');
      const s3 = pick(`obra-${numericId + 12}`) || pick('obra-10');
      const fallback = (x, i) =>
        x || { title: 'Pieza de estudio', year: 2022, image: coverAt(numericId + i), likes: 120, slug: `obra-${8 + i}` };

      const a1 = fallback(s1, 0);
      const a2 = fallback(s2, 1);
      const a3 = fallback(s3, 2);
      artworks.value = [
        { id: 1, title: a1.title, year: a1.year, image: a1.image, likes: a1.likes, slug: a1.slug },
        { id: 2, title: a2.title, year: a2.year, image: a2.image, likes: a2.likes, slug: a2.slug },
        { id: 3, title: a3.title, year: a3.year, image: a3.image, likes: a3.likes, slug: a3.slug },
      ];
      rooms.value = [
        { id: 1, name: 'Sala principal', image: coverAt(numericId + 4), artworkCount: 4 },
        { id: 2, name: 'Archivo reciente', image: coverAt(numericId + 11), artworkCount: 3 },
      ];
    }

    loading.value = false;
  }, 650);
};

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
  // TODO: Actualizar en Supabase
};

const shareArtist = () => {
  if (navigator.share) {
    navigator.share({
      title: artist.value.name,
      text: artist.value.bio || `Conoce a ${artist.value.name} en Museo Fragmentos`,
      url: window.location.href
    });
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
};

onMounted(() => {
  fetchArtist();
});
</script>

<style scoped>
.stat-box {
  @apply text-center;
}

.stat-value {
  @apply block text-2xl font-bold text-wine;
}

.stat-label {
  @apply block text-sm text-gray-600;
}

.follow-btn {
  @apply px-6 py-3 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors font-medium flex items-center gap-2;
}

.follow-btn.following {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}

.contact-btn, .share-btn {
  @apply px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-wine hover:text-wine transition-colors font-medium flex items-center gap-2;
}

.tabs-container {
  @apply flex gap-2 border-b border-gray-200;
}

.tab-btn {
  @apply px-6 py-3 font-medium text-gray-600 hover:text-wine transition-colors border-b-2 border-transparent;
}

.tab-btn.active {
  @apply text-wine border-wine;
}

.artwork-thumb {
  @apply block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-wine/50 hover:shadow-lg transition-all;
}

.artwork-thumb-image {
  @apply relative aspect-square overflow-hidden bg-gray-100;
}

.artwork-thumb-image img {
  @apply w-full h-full object-cover;
}

.artwork-thumb-overlay {
  @apply absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center;
}

.artwork-thumb-title {
  @apply text-lg font-semibold text-gray-900 p-4 pb-1;
}

.artwork-thumb-year {
  @apply text-sm text-gray-600 px-4 pb-4;
}

.room-thumb {
  @apply block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-wine/50 hover:shadow-lg transition-all;
}

.room-thumb-image {
  @apply relative aspect-video overflow-hidden bg-gray-100;
}

.room-thumb-image img {
  @apply w-full h-full object-cover;
}

.room-thumb-info {
  @apply p-4;
}

.room-thumb-title {
  @apply text-lg font-semibold text-gray-900 mb-1;
}

.room-thumb-count {
  @apply text-sm text-gray-600;
}

.empty-state {
  @apply text-center py-16;
}

.info-card {
  @apply bg-wine/5 border border-wine/20 rounded-xl p-6;
}

.info-card-title {
  @apply text-xl font-semibold text-gray-900 mb-4;
}

.info-list {
  @apply space-y-3;
}

.info-list div {
  @apply flex justify-between py-2 border-b border-gray-200;
}

.info-list dt {
  @apply text-gray-600 font-medium;
}

.info-list dd {
  @apply text-gray-900;
}
</style>

