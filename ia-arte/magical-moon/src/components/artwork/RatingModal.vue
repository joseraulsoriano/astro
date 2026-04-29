<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-btn">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="modal-title">Calificar esta obra</h2>

      <div class="rating-section">
        <p class="text-sm text-gray-600 mb-4">Selecciona tu calificación:</p>
        <div class="rating-input-large">
          <button
            v-for="i in 5"
            :key="i"
            type="button"
            @click="selectedRating = i"
            @mouseenter="hoveredRating = i"
            @mouseleave="hoveredRating = 0"
            :class="['star-btn-large', { 'active': i <= (hoveredRating || selectedRating) }]"
          >
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>
        <p v-if="selectedRating > 0" class="rating-text">
          {{ getRatingText(selectedRating) }}
        </p>
      </div>

      <div class="form-section">
        <label class="form-label">Título (opcional)</label>
        <input
          type="text"
          v-model="reviewTitle"
          placeholder="Ej: Obra increíble"
          class="form-input"
          maxlength="100"
        />
      </div>

      <div class="form-section">
        <label class="form-label">Reseña (opcional)</label>
        <textarea
          v-model="reviewComment"
          rows="4"
          placeholder="Comparte tu opinión..."
          class="form-input"
          maxlength="500"
        ></textarea>
      </div>

      <div class="modal-actions">
        <button @click="$emit('close')" class="btn-cancel">
          Cancelar
        </button>
        <button 
          @click="submitRating" 
          :disabled="selectedRating === 0 || submitting"
          class="btn-submit"
        >
          <span v-if="!submitting">Enviar Calificación</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  artworkId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['close', 'rated']);

const selectedRating = ref(0);
const hoveredRating = ref(0);
const reviewTitle = ref('');
const reviewComment = ref('');
const submitting = ref(false);

const getRatingText = (rating) => {
  const texts = {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente'
  };
  return texts[rating] || '';
};

const submitRating = async () => {
  submitting.value = true;
  // TODO: Guardar en Supabase
  setTimeout(() => {
    emit('rated', {
      rating: selectedRating.value,
      title: reviewTitle.value,
      comment: reviewComment.value
    });
    submitting.value = false;
  }, 1000);
};
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4;
}

.modal-content {
  @apply bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative;
}

.close-btn {
  @apply absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors;
}

.modal-title {
  @apply text-2xl font-bold text-gray-900 mb-6;
}

.rating-section {
  @apply mb-6 text-center;
}

.rating-input-large {
  @apply flex justify-center gap-2 mb-4;
}

.star-btn-large {
  @apply text-gray-300 hover:text-wine transition-colors cursor-pointer;
}

.star-btn-large.active {
  @apply text-wine;
}

.rating-text {
  @apply text-lg font-medium text-gray-700;
}

.form-section {
  @apply mb-4;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.form-input {
  @apply w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-colors;
}

.modal-actions {
  @apply flex gap-4 pt-6 border-t border-gray-200;
}

.btn-cancel {
  @apply flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium;
}

.btn-submit {
  @apply flex-1 px-6 py-3 bg-wine text-white rounded-lg hover:bg-wine-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>

