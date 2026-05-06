<template>
  <div class="artwork-detail min-h-screen bg-white pt-20">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-16 text-center">
      <svg class="animate-spin h-12 w-12 text-wine mx-auto" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-600 mt-4">Cargando obra...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!artwork" class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Obra no encontrada</h1>
      <a href="/galeria" class="text-wine hover:text-wine-dark">Volver a la galería</a>
    </div>

    <!-- Artwork Content -->
    <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumbs -->
      <nav class="mb-8 text-sm text-gray-600">
        <a href="/" class="hover:text-wine">Inicio</a>
        <span class="mx-2">/</span>
        <a href="/galeria" class="hover:text-wine">Galería</a>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ artwork.title }}</span>
      </nav>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <!-- Left: Image/Viewer -->
        <div class="artwork-viewer">
          <!-- View Mode Tabs -->
          <div class="view-tabs mb-4">
            <button 
              @click="viewMode = '2d'"
              :class="['tab-btn', { 'active': viewMode === '2d' }]"
            >
              2D
            </button>
            <button 
              @click="viewMode = '3d'"
              :class="['tab-btn', { 'active': viewMode === '3d' }]"
              :disabled="!artwork.model3D"
            >
              3D
            </button>
            <button 
              @click="viewMode = 'ar'"
              :class="['tab-btn', { 'active': viewMode === 'ar' }]"
              :disabled="!artwork.model3D"
            >
              AR
            </button>
          </div>

          <!-- 2D View -->
          <div v-if="viewMode === '2d'" class="view-container">
            <img 
              :src="artwork.image" 
              :alt="artwork.title"
              class="artwork-image-main"
              referrerpolicy="no-referrer"
            />
            <div class="image-actions">
              <button @click="downloadImage" class="action-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar
              </button>
              <button @click="shareArtwork" class="action-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartir
              </button>
            </div>
          </div>

          <!-- 3D View -->
          <div v-if="viewMode === '3d'" class="view-container">
            <Viewer3D 
              :model-url="artwork.model3D" 
              :camera-controls="true"
            />
          </div>

          <!-- AR View -->
          <div v-if="viewMode === 'ar'" class="view-container">
            <ViewerAR 
              :model-url="artwork.model3D"
            />
          </div>

          <!-- Additional Images -->
          <div v-if="artwork.additionalImages && artwork.additionalImages.length > 0" class="additional-images mt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Más imágenes</h3>
            <div class="grid grid-cols-4 gap-4">
              <img
                v-for="(img, index) in artwork.additionalImages"
                :key="index"
                :src="img"
                :alt="`${artwork.title} - Vista ${index + 2}`"
                referrerpolicy="no-referrer"
                @click="selectImage(img)"
                class="additional-img cursor-pointer hover:opacity-75 transition-opacity"
              />
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="artwork-info">
          <h1 class="artwork-title">{{ artwork.title }}</h1>
          <a :href="`/artista/${artwork.artistId}`" class="artist-link">
            <span class="text-xl text-gray-700 hover:text-wine">{{ artwork.artist }}</span>
            <svg v-if="artwork.artistVerified" class="w-5 h-5 text-wine inline ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </a>

          <!-- Stats -->
          <div class="artwork-stats">
            <div class="stat-item">
              <svg class="w-5 h-5 text-wine" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <span class="stat-value">{{ artwork.likes }}</span>
                <span class="stat-label">Me gusta</span>
              </div>
            </div>
            <div class="stat-item">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <div>
                <span class="stat-value">{{ artwork.views }}</span>
                <span class="stat-label">Visualizaciones</span>
              </div>
            </div>
            <div class="stat-item">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div>
                <span class="stat-value">{{ artwork.commentsCount }}</span>
                <span class="stat-label">Comentarios</span>
              </div>
            </div>
          </div>

          <!-- Rating -->
          <div class="rating-section">
            <div class="flex items-center gap-4 mb-2">
              <div class="rating-display">
                <span class="rating-value">{{ artwork.rating }}</span>
                <div class="stars-display">
                  <svg 
                    v-for="i in 5" 
                    :key="i"
                    :class="['star', { 'filled': i <= Math.round(artwork.rating) }]"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <span class="text-sm text-gray-600">({{ artwork.ratingsCount }} calificaciones)</span>
            </div>
            <button v-if="!userRating" @click="showRatingModal = true" class="rate-btn">
              Calificar esta obra
            </button>
          </div>

          <!-- Details -->
          <div class="details-section">
            <div class="detail-item">
              <span class="detail-label">Año</span>
              <span class="detail-value">{{ artwork.year }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Categoría</span>
              <span class="detail-value">{{ artwork.category }}</span>
            </div>
            <div v-if="artwork.technique" class="detail-item">
              <span class="detail-label">Técnica</span>
              <span class="detail-value">{{ artwork.technique }}</span>
            </div>
            <div v-if="artwork.dimensions" class="detail-item">
              <span class="detail-label">Dimensiones</span>
              <span class="detail-value">{{ artwork.dimensions }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="description-section">
            <h2 class="section-title">Descripción</h2>
            <p class="description-text">{{ artwork.description }}</p>
          </div>

          <!-- Actions -->
          <div class="actions-section">
            <button @click="toggleLike" :class="['like-btn', { 'liked': isLiked }]">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {{ isLiked ? 'Me gusta' : 'Me gusta' }}
            </button>
            <button @click="scrollToReviews" class="btn-secondary">
              Ver Reseñas
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <ReviewsSection 
        :artwork-id="artwork.id"
        :rating="artwork.rating"
        :ratings-count="artwork.ratingsCount"
        @rating-updated="updateRating"
      />

      <!-- Rating Modal -->
      <RatingModal
        v-if="showRatingModal"
        :artwork-id="artwork.id"
        @close="showRatingModal = false"
        @rated="handleRated"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Viewer3D from './Viewer3D.vue';
import ViewerAR from './ViewerAR.vue';
import ReviewsSection from './ReviewsSection.vue';
import RatingModal from './RatingModal.vue';
import { slugToDetailStub, buildDemoGallery } from '../../data/museumCollection';

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

const loading = ref(true);
const artwork = ref(null);
const viewMode = ref('2d');
const isLiked = ref(false);
const userRating = ref(null);
const DEMO_GLB = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

const fetchArtwork = async () => {
  loading.value = true;
  setTimeout(() => {
    const row = buildDemoGallery().find((x) => x.slug === props.slug);
    const stub = slugToDetailStub(props.slug);
    const isVan = props.slug === 'noche-estrellada';

    artwork.value = {
      id: row?.id ?? 1,
      slug: props.slug,
      title: row?.title ?? stub.titleHint,
      artist: row?.artist ?? stub.artistHint,
      artistId: isVan ? 'van-gogh' : String(row?.id ?? 1),
      artistVerified: isVan,
      description:
        row?.description ??
        `«${stub.titleHint}» forma parte de la muestra demo de Museo Fragmentos: un fragmento compartido para el estudio y el disfrute.`,
      image: stub.image,
      model3D: props.slug === 'obra-digital' ? DEMO_GLB : null,
      additionalImages: stub.additionalImages,
      year: row?.year ?? stub.yearHint,
      category: row?.category ?? 'Pintura',
      technique:
        row?.category === 'Digital'
          ? 'Archivo digital y acabado en panel'
          : row?.category === 'Fotografía'
            ? 'Impresión pigmento sobre papel algodón'
            : 'Óleo sobre lienzo (referencia histórica o réplica digital)',
      dimensions: 'Formato variable en sala (demo)',
      likes: row?.likes ?? 640,
      views: row?.views ?? 2400,
      commentsCount: 28,
      rating: 4.5,
      ratingsCount: 156,
      created_at: row?.created_at ?? '2024-01-15',
    };
    loading.value = false;
  }, 480);
};

const selectImage = (img) => {
  artwork.value.image = img;
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  // TODO: Actualizar en Supabase
};

const downloadImage = () => {
  // TODO: Implementar descarga
  console.log('Descargar imagen');
};

const shareArtwork = () => {
  // TODO: Implementar compartir
  if (navigator.share) {
    navigator.share({
      title: artwork.value.title,
      text: artwork.value.description,
      url: window.location.href
    });
  }
};

const scrollToReviews = () => {
  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
};

const updateRating = (newRating) => {
  artwork.value.rating = newRating.rating;
  artwork.value.ratingsCount = newRating.count;
};

const handleRated = (rating) => {
  userRating.value = rating;
  showRatingModal.value = false;
  updateRating({ rating: rating.rating, count: artwork.value.ratingsCount + 1 });
};

const applyViewFromQuery = () => {
  if (!artwork.value || typeof window === 'undefined') return;
  const mode = new URLSearchParams(window.location.search).get('v');
  if ((mode === '3d' || mode === 'ar') && artwork.value.model3D) {
    viewMode.value = mode;
    return;
  }
  viewMode.value = '2d';
};

watch(artwork, (a) => {
  if (a) applyViewFromQuery();
});

onMounted(() => {
  fetchArtwork();
});
</script>

<style scoped>
.artwork-viewer {
  @apply sticky top-24;
}

.view-tabs {
  @apply flex gap-2 border-b border-gray-200;
}

.tab-btn {
  @apply px-6 py-3 font-medium text-gray-600 hover:text-wine transition-colors border-b-2 border-transparent;
}

.tab-btn.active {
  @apply text-wine border-wine;
}

.tab-btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.view-container {
  @apply relative bg-gray-100 rounded-lg overflow-hidden;
  min-height: 500px;
}

.artwork-image-main {
  @apply w-full h-auto object-contain;
  max-height: 70vh;
}

.image-actions {
  @apply flex gap-4 mt-4;
}

.action-btn {
  @apply flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:border-wine hover:text-wine transition-colors;
}

.additional-img {
  @apply w-full aspect-square object-cover rounded-lg border-2 border-gray-200 hover:border-wine transition-colors;
}

.artwork-title {
  @apply text-4xl font-bold text-gray-900 mb-4;
}

.artist-link {
  @apply flex items-center mb-6;
}

.artwork-stats {
  @apply flex gap-6 py-6 border-y border-gray-200 my-6;
}

.stat-item {
  @apply flex items-center gap-2;
}

.stat-value {
  @apply block text-xl font-bold text-gray-900;
}

.stat-label {
  @apply block text-sm text-gray-600;
}

.rating-section {
  @apply mb-6 p-4 bg-wine/5 rounded-lg;
}

.rating-display {
  @apply flex items-center gap-2;
}

.rating-value {
  @apply text-3xl font-bold text-gray-900;
}

.stars-display {
  @apply flex gap-1;
}

.star {
  @apply w-5 h-5 text-gray-300;
}

.star.filled {
  @apply text-wine;
}

.rate-btn {
  @apply mt-2 px-4 py-2 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors text-sm;
}

.details-section {
  @apply mb-6 space-y-3;
}

.detail-item {
  @apply flex justify-between py-2 border-b border-gray-100;
}

.detail-label {
  @apply text-gray-600 font-medium;
}

.detail-value {
  @apply text-gray-900;
}

.description-section {
  @apply mb-6;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 mb-4;
}

.description-text {
  @apply text-gray-700 leading-relaxed;
}

.actions-section {
  @apply flex gap-4;
}

.like-btn {
  @apply flex items-center gap-2 px-6 py-3 bg-white border-2 border-wine text-wine rounded-lg hover:bg-wine hover:text-white transition-colors font-medium;
}

.like-btn.liked {
  @apply bg-wine text-white;
}

.btn-secondary {
  @apply px-6 py-3 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors font-medium;
}
</style>

