<template>
  <div id="reviews-section" class="reviews-section py-12 border-t border-gray-200">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Reseñas y Calificaciones
      </h2>
      <p class="text-gray-600">
        {{ ratingsCount }} calificaciones · Promedio: {{ rating.toFixed(1) }} ⭐
      </p>
    </div>

    <!-- New Review Form -->
    <div class="mb-8 p-6 bg-wine/5 rounded-lg border border-wine/20">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Escribe una reseña</h3>
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Calificación *
          </label>
          <div class="rating-input">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              @click="newReview.rating = i"
              :class="['star-btn', { 'active': i <= newReview.rating }]"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Título de la reseña
          </label>
          <input
            type="text"
            v-model="newReview.title"
            placeholder="Ej: Obra impresionante"
            class="form-input"
            maxlength="100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Reseña *
          </label>
          <textarea
            v-model="newReview.comment"
            required
            rows="4"
            placeholder="Comparte tu opinión sobre esta obra..."
            class="form-input"
            maxlength="1000"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            {{ newReview.comment.length }}/1000 caracteres
          </p>
        </div>

        <button type="submit" :disabled="!newReview.rating || !newReview.comment || submitting" class="submit-btn">
          <span v-if="!submitting">Publicar Reseña</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Publicando...
          </span>
        </button>
      </form>
    </div>

    <!-- Reviews List -->
    <div class="reviews-list space-y-6">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="review-card"
      >
        <div class="review-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">
              {{ review.userName.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="reviewer-name">{{ review.userName }}</p>
              <p class="review-date">{{ formatDate(review.createdAt) }}</p>
            </div>
          </div>
          <div class="review-rating">
            <div class="stars-small">
              <svg
                v-for="i in 5"
                :key="i"
                :class="['star-small', { 'filled': i <= review.rating }]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>

        <div v-if="review.title" class="review-title">
          {{ review.title }}
        </div>

        <p class="review-comment">{{ review.comment }}</p>

        <div class="review-actions">
          <button @click="toggleHelpful(review.id)" :class="['helpful-btn', { 'active': review.isHelpful }]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Útil ({{ review.helpfulCount }})
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="reviews.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-gray-600">Aún no hay reseñas. ¡Sé el primero en compartir tu opinión!</p>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center pt-6">
        <button @click="loadMore" class="load-more-btn">
          Cargar más reseñas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  artworkId: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  ratingsCount: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['rating-updated']);

const reviews = ref([]);
const submitting = ref(false);
const hasMore = ref(false);
const page = ref(1);

const newReview = reactive({
  rating: 0,
  title: '',
  comment: ''
});

const fetchReviews = async () => {
  // TODO: Obtener desde Supabase
  reviews.value = [
    {
      id: 1,
      userName: 'María González',
      rating: 5,
      title: 'Obra increíble',
      comment: 'Esta obra es simplemente espectacular. La técnica y el detalle son impresionantes.',
      createdAt: new Date('2024-01-20'),
      helpfulCount: 12,
      isHelpful: false
    },
    {
      id: 2,
      userName: 'Juan Pérez',
      rating: 4,
      title: 'Muy buena',
      comment: 'Me encantó ver esta obra en 3D. La experiencia AR también es genial.',
      createdAt: new Date('2024-01-18'),
      helpfulCount: 8,
      isHelpful: true
    }
  ];
};

const submitReview = async () => {
  submitting.value = true;
  // TODO: Guardar en Supabase
  setTimeout(() => {
    reviews.value.unshift({
      id: Date.now(),
      userName: 'Tú',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      createdAt: new Date(),
      helpfulCount: 0,
      isHelpful: false
    });
    
    newReview.rating = 0;
    newReview.title = '';
    newReview.comment = '';
    
    // Update rating
    emit('rating-updated', {
      rating: calculateNewRating(),
      count: props.ratingsCount + 1
    });
    
    submitting.value = false;
  }, 1000);
};

const calculateNewRating = () => {
  const total = reviews.value.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.value.length;
};

const toggleHelpful = (reviewId) => {
  const review = reviews.value.find(r => r.id === reviewId);
  if (review) {
    review.isHelpful = !review.isHelpful;
    review.helpfulCount += review.isHelpful ? 1 : -1;
    // TODO: Actualizar en Supabase
  }
};

const loadMore = () => {
  page.value++;
  // TODO: Cargar más reseñas
};

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(() => {
  fetchReviews();
});
</script>

<style scoped>
.rating-input {
  @apply flex gap-2;
}

.star-btn {
  @apply text-gray-300 hover:text-wine transition-colors cursor-pointer;
}

.star-btn.active {
  @apply text-wine;
}

.form-input {
  @apply w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-colors;
}

.submit-btn {
  @apply px-6 py-3 bg-wine text-white font-medium rounded-lg hover:bg-wine-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.review-card {
  @apply bg-white border border-gray-200 rounded-lg p-6;
}

.review-header {
  @apply flex items-start justify-between mb-4;
}

.reviewer-info {
  @apply flex items-center gap-3;
}

.reviewer-avatar {
  @apply w-10 h-10 rounded-full bg-wine text-white flex items-center justify-center font-semibold;
}

.reviewer-name {
  @apply font-semibold text-gray-900;
}

.review-date {
  @apply text-sm text-gray-500;
}

.stars-small {
  @apply flex gap-1;
}

.star-small {
  @apply w-4 h-4 text-gray-300;
}

.star-small.filled {
  @apply text-wine;
}

.review-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.review-comment {
  @apply text-gray-700 leading-relaxed mb-4;
}

.review-actions {
  @apply flex items-center gap-4;
}

.helpful-btn {
  @apply flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-wine transition-colors;
}

.helpful-btn.active {
  @apply text-wine;
}

.load-more-btn {
  @apply px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-wine hover:text-wine transition-colors;
}
</style>

