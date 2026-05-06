<template>
  <div class="upload-container">
    <div class="upload-card">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Sección: Información Básica -->
        <section>
          <h2 class="section-title">Información Básica</h2>
          <div class="space-y-6">
            <div>
              <label class="form-label">Título de la Obra *</label>
              <input
                type="text"
                v-model="form.title"
                required
                placeholder="Ej: Noche Estrellada"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">Descripción *</label>
              <textarea
                v-model="form.description"
                required
                rows="4"
                placeholder="Describe tu obra, técnica utilizada, inspiración..."
                class="form-input"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Categoría *</label>
                <select v-model="form.category" required class="form-input">
                  <option value="">Selecciona una categoría</option>
                  <option value="pintura">Pintura</option>
                  <option value="escultura">Escultura</option>
                  <option value="fotografia">Fotografía</option>
                  <option value="digital">Arte Digital</option>
                  <option value="abstracto">Abstracto</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label class="form-label">Año de Creación *</label>
                <input
                  type="number"
                  v-model.number="form.year"
                  required
                  :min="1900"
                  :max="new Date().getFullYear()"
                  class="form-input"
                />
              </div>
            </div>

            <div>
              <label class="form-label">Técnica / Materiales</label>
              <input
                type="text"
                v-model="form.technique"
                placeholder="Ej: Óleo sobre lienzo, Escultura en mármol..."
                class="form-input"
              />
            </div>
          </div>
        </section>

        <!-- Sección: Archivos -->
        <section>
          <h2 class="section-title">Archivos de la Obra</h2>
          <div class="space-y-6">
            <!-- Imagen Principal -->
            <div>
              <label class="form-label">Imagen Principal *</label>
              <div 
                class="upload-area" 
                :class="{ 'border-red-300 bg-red-50': form.mainImageError, 'border-green-300 bg-green-50': form.mainImage && !form.mainImageError }"
                @click="triggerFileInput('main')" 
                @dragover.prevent 
                @drop.prevent="handleDrop($event, 'main')"
              >
                <input
                  ref="mainFileInput"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  @change="handleFileSelect($event, 'main')"
                  class="hidden"
                />
                <div v-if="!form.mainImage" class="upload-placeholder">
                  <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-gray-600 mb-2">Haz clic o arrastra una imagen</p>
                  <p class="text-sm text-gray-500">PNG, JPG, WEBP hasta 10MB</p>
                </div>
                <div v-else class="upload-preview">
                  <img :src="form.mainImagePreview" alt="Preview" class="preview-image" />
                  <div class="file-info">
                    <p class="file-name">{{ form.mainImage.name }}</p>
                    <p class="file-size">{{ formatFileSize(form.mainImage.size) }}</p>
                  </div>
                  <button type="button" @click.stop="removeFile('main')" class="remove-btn">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <p v-if="form.mainImageError" class="error-message">{{ form.mainImageError }}</p>
              <p v-else-if="form.mainImage" class="success-message">
                ✓ Archivo válido: {{ formatFileSize(form.mainImage.size) }}
              </p>
            </div>

            <!-- Imágenes Adicionales -->
            <div>
              <label class="form-label">Imágenes Adicionales (opcional)</label>
              <p class="text-xs text-gray-500 mb-4">Máximo 4 imágenes adicionales. PNG, JPG, WEBP hasta 10MB cada una.</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="(img, index) in form.additionalImages"
                  :key="index"
                  class="upload-area-small"
                  :class="{ 'border-red-300': img?.error }"
                  @click="triggerFileInput(`additional-${index}`)"
                >
                  <input
                    :ref="el => additionalFileInputs[index] = el"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    @change="handleFileSelect($event, `additional-${index}`)"
                    class="hidden"
                  />
                  <div v-if="!img" class="upload-placeholder-small">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div v-else class="upload-preview-small relative">
                    <img :src="img.preview" alt="Preview" class="preview-image-small" />
                    <div v-if="img.error" class="error-overlay">
                      <p class="text-xs text-red-600">{{ img.error }}</p>
                    </div>
                    <button type="button" @click.stop="removeAdditionalImage(index)" class="remove-btn-small">
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modelo 3D (opcional) -->
            <div>
              <label class="form-label">Modelo 3D (opcional)</label>
              <div 
                class="upload-area" 
                :class="{ 'border-red-300 bg-red-50': form.model3DError, 'border-green-300 bg-green-50': form.model3D && !form.model3DError }"
                @click="triggerFileInput('3d')"
              >
                <input
                  ref="model3DFileInput"
                  type="file"
                  accept=".glb,.gltf"
                  @change="handleFileSelect($event, '3d')"
                  class="hidden"
                />
                <div v-if="!form.model3D" class="upload-placeholder">
                  <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p class="text-gray-600 mb-2">Subir modelo 3D (GLB/GLTF)</p>
                  <p class="text-sm text-gray-500">Hasta 50MB</p>
                </div>
                <div v-else class="upload-preview">
                  <div class="file-info-full">
                    <svg class="w-12 h-12 text-wine mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p class="text-gray-900 font-medium">{{ form.model3D.name }}</p>
                    <p class="text-sm text-gray-600">{{ formatFileSize(form.model3D.size) }}</p>
                  </div>
                  <button type="button" @click.stop="removeFile('3d')" class="remove-btn">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <p v-if="form.model3DError" class="error-message">{{ form.model3DError }}</p>
              <p v-else-if="form.model3D" class="success-message">
                ✓ Modelo 3D válido: {{ formatFileSize(form.model3D.size) }}
              </p>
            </div>
          </div>
        </section>

        <!-- Sección: Configuración -->
        <section>
          <h2 class="section-title">Configuración</h2>
          <div class="space-y-4">
            <label class="flex items-start">
              <input type="checkbox" v-model="form.allowCommercialUse" class="checkbox-input mt-1" />
              <span class="ml-3 text-gray-700">
                Permitir uso comercial (con atribución)
              </span>
            </label>
            <label class="flex items-start">
              <input type="checkbox" v-model="form.allowRemix" class="checkbox-input mt-1" />
              <span class="ml-3 text-gray-700">
                Permitir remix y obras derivadas
              </span>
            </label>
          </div>
        </section>

        <!-- Botones -->
        <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button type="submit" :disabled="loading" class="submit-btn flex-1">
            <span v-if="!loading">Publicar Obra</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subiendo...
            </span>
          </button>
          <button type="button" @click="saveDraft" class="btn-secondary">
            Guardar Borrador
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { 
  validateFile, 
  validateImageFile, 
  validatePDFFile, 
  validate3DModelFile,
  formatFileSize,
  getMaxSize,
  getFileType,
} from '../../utils/fileValidation';

const form = reactive({
  title: '',
  description: '',
  category: '',
  year: new Date().getFullYear(),
  technique: '',
  mainImage: null,
  mainImagePreview: null,
  mainImageError: null,
  additionalImages: Array(4).fill(null),
  model3D: null,
  model3DError: null,
  allowCommercialUse: false,
  allowRemix: false
});

const loading = ref(false);
const mainFileInput = ref(null);
const model3DFileInput = ref(null);
const additionalFileInputs = ref(Array(4).fill(null));

const triggerFileInput = (type) => {
  if (type === 'main') {
    mainFileInput.value?.click();
  } else if (type === '3d') {
    model3DFileInput.value?.click();
  } else if (type.startsWith('additional-')) {
    const index = parseInt(type.split('-')[1]);
    additionalFileInputs.value[index]?.click();
  }
};

const handleFileSelect = async (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  let validationResult;

  try {
    // Validar según el tipo
    if (type === 'main') {
      validationResult = await validateImageFile(file);
      if (!validationResult.valid) {
        form.mainImageError = validationResult.error;
        form.mainImage = null;
        form.mainImagePreview = null;
        return;
      }
      
      form.mainImageError = null;
      form.mainImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        form.mainImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      
    } else if (type === '3d') {
      validationResult = validate3DModelFile(file);
      if (!validationResult.valid) {
        form.model3DError = validationResult.error;
        form.model3D = null;
        return;
      }
      
      form.model3DError = null;
      form.model3D = file;
      
    } else if (type.startsWith('additional-')) {
      const index = parseInt(type.split('-')[1]);
      validationResult = await validateImageFile(file);
      
      if (!validationResult.valid) {
        // Mostrar error en el slot específico
        if (form.additionalImages[index]) {
          form.additionalImages[index].error = validationResult.error;
        }
        form.additionalImages[index] = null;
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        form.additionalImages[index] = {
          file,
          preview: e.target.result,
          error: null
        };
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {
    console.error('Error validando archivo:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al validar el archivo';
    
    if (type === 'main') {
      form.mainImageError = errorMessage;
    } else if (type === '3d') {
      form.model3DError = errorMessage;
    }
  }
};

const handleDrop = async (event, type) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  
  if (!file) return;
  
  if (type === 'main') {
    // Simular evento de input para reutilizar la lógica
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const fakeEvent = {
      target: {
        files: dataTransfer.files
      }
    };
    await handleFileSelect(fakeEvent, 'main');
  }
};

const removeFile = (type) => {
  if (type === 'main') {
    form.mainImage = null;
    form.mainImagePreview = null;
    form.mainImageError = null;
    if (mainFileInput.value) {
      mainFileInput.value.value = '';
    }
  } else if (type === '3d') {
    form.model3D = null;
    form.model3DError = null;
    if (model3DFileInput.value) {
      model3DFileInput.value.value = '';
    }
  }
};

const removeAdditionalImage = (index) => {
  form.additionalImages[index] = null;
  if (additionalFileInputs.value[index]) {
    additionalFileInputs.value[index].value = '';
  }
};

const handleSubmit = async () => {
  // Validar que la imagen principal esté presente
  if (!form.mainImage) {
    form.mainImageError = 'La imagen principal es requerida';
    return;
  }

  // Validar todos los campos requeridos
  if (!form.title || !form.description || !form.category || !form.year) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  loading.value = true;
  
  try {
    // TODO: Subir archivos a Supabase Storage y crear registro en BD
    // Por ahora solo simulamos
    console.log('Formulario válido, listo para subir:', {
      ...form,
      mainImage: {
        name: form.mainImage.name,
        size: formatFileSize(form.mainImage.size),
        type: form.mainImage.type
      },
      model3D: form.model3D ? {
        name: form.model3D.name,
        size: formatFileSize(form.model3D.size),
        type: form.model3D.type
      } : null
    });
    
    // Simular subida
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navegar a dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Error al subir:', error);
    alert('Error al subir la obra. Por favor intenta de nuevo.');
  } finally {
    loading.value = false;
  }
};

const saveDraft = () => {
  // Guardar borrador en localStorage
  try {
    const draft = {
      ...form,
      mainImage: form.mainImage ? {
        name: form.mainImage.name,
        size: form.mainImage.size,
        type: form.mainImage.type
      } : null,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('artwork_draft', JSON.stringify(draft));
    alert('Borrador guardado correctamente');
  } catch (error) {
    console.error('Error guardando borrador:', error);
    alert('Error al guardar el borrador');
  }
};

// Cargar borrador si existe
const loadDraft = () => {
  try {
    const draft = localStorage.getItem('artwork_draft');
    if (draft) {
      const parsed = JSON.parse(draft);
      Object.assign(form, {
        title: parsed.title || '',
        description: parsed.description || '',
        category: parsed.category || '',
        year: parsed.year || new Date().getFullYear(),
        technique: parsed.technique || '',
        allowCommercialUse: parsed.allowCommercialUse || false,
        allowRemix: parsed.allowRemix || false
      });
    }
  } catch (error) {
    console.error('Error cargando borrador:', error);
  }
};

// Cargar borrador al montar
onMounted(() => {
  loadDraft();
});
</script>

<style scoped>
.upload-container {
  @apply w-full;
}

.upload-card {
  @apply max-w-4xl rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-xl ring-1 ring-slate-100;
}

.section-title {
  @apply mb-6 border-b border-slate-200 pb-3 font-display text-2xl font-semibold tracking-tight text-slate-900;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.form-input {
  @apply w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-wine focus:bg-white focus:ring-2 focus:ring-wine/20;
}

.checkbox-input {
  @apply w-4 h-4 text-wine border-gray-300 rounded focus:ring-wine;
}

.upload-area {
  @apply cursor-pointer rounded-2xl rounded-tr-[2.25rem] border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-wine/50 hover:bg-sky-50/30;
}

.upload-placeholder {
  @apply flex flex-col items-center justify-center;
}

.upload-preview {
  @apply relative;
}

.preview-image {
  @apply h-64 w-full rounded-2xl object-cover;
}

.remove-btn {
  @apply absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg leading-none text-slate-600 shadow-md ring-1 ring-slate-200 transition hover:text-wine;
}

.upload-area-small {
  @apply aspect-square cursor-pointer rounded-2xl rounded-bl-md border-2 border-dashed border-slate-300 p-4 text-center transition-colors hover:border-wine/50 hover:bg-sky-50/30;
}

.upload-placeholder-small {
  @apply flex items-center justify-center h-full;
}

.upload-preview-small {
  @apply h-full;
}

.preview-image-small {
  @apply h-full w-full rounded-xl object-cover;
}

.remove-btn-small {
  @apply absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-wine text-lg leading-none;
}

.file-info {
  @apply absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs;
}

.file-name {
  @apply font-medium truncate;
}

.file-size {
  @apply text-gray-300;
}

.file-info-full {
  @apply flex flex-col items-center justify-center p-4 text-center;
}

.error-message {
  @apply mt-2 text-sm text-red-600 flex items-center gap-2;
}

.success-message {
  @apply mt-2 text-sm text-green-600 flex items-center gap-2;
}

.error-overlay {
  @apply absolute inset-0 bg-red-50/90 flex items-center justify-center p-2;
}

.submit-btn {
  @apply rounded-xl bg-wine px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-wine-dark disabled:cursor-not-allowed disabled:opacity-50;
}

.btn-secondary {
  @apply rounded-xl border-2 border-wine bg-white px-8 py-3 font-semibold text-wine transition-colors hover:bg-sky-50/60;
}
</style>

