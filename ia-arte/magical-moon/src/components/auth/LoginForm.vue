<template>
  <div class="login-container">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-wine/10 rounded-full mb-4">
        <svg class="w-8 h-8 text-wine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
      <p class="text-gray-600">Accede a tu cuenta para subir y gestionar tus obras</p>
    </div>

    <!-- Formulario -->
    <div class="login-card">
      <div
        v-if="formError"
        class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        role="alert"
      >
        {{ formError }}
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6" novalidate>
        <div>
          <label class="form-label" for="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            v-model="email"
            required
            placeholder="tu@email.com"
            class="form-input"
            autocomplete="email"
            name="email"
          />
        </div>

        <div>
          <label class="form-label" for="login-password">Contraseña</label>
          <div class="relative">
            <input
              id="login-password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              placeholder="••••••••"
              class="form-input pr-12"
              autocomplete="current-password"
              name="password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-wine rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" v-model="rememberMe" class="checkbox-input" />
            <span class="ml-2 text-sm text-gray-600">Recordarme</span>
          </label>
          <a href="/auth/recuperar" class="text-sm text-wine hover:text-wine-dark">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Iniciando sesión...
          </span>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider">
        <span class="divider-text">O continúa con</span>
      </div>

      <!-- OAuth Buttons -->
      <div class="oauth-buttons">
        <button type="button" @click="loginWithGoogle" class="oauth-btn google">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" @click="loginWithMeta" class="oauth-btn meta">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Meta
        </button>
        <button type="button" @click="loginWithPinterest" class="oauth-btn pinterest">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.132 0 3.772-2.251 3.772-5.495 0-2.873-2.065-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.414 0 1.07.411 2.221.928 2.848.102.123.118.232.088.358-.095.395-.312 1.243-.354 1.415-.056.233-.186.283-.425.17-1.59-.741-2.589-3.071-2.589-4.934 0-4.024 2.922-7.715 8.422-7.715 4.424 0 7.858 3.153 7.858 7.364 0 4.395-2.771 7.923-6.619 7.923-1.292 0-2.513-.669-2.931-1.464l-.796 3.034c-.288 1.105-1.07 2.494-1.592 3.335C9.608 23.59 10.818 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
            />
          </svg>
          Pinterest
        </button>
      </div>

      <!-- Footer -->
      <div class="login-footer">
        <p class="text-gray-600">
          ¿Nuevo por aquí?
          <a href="/subir-obra" class="text-wine hover:text-wine-dark font-medium">
            Comienza subiendo una obra
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const formError = ref('');

const handleLogin = async () => {
  formError.value = '';
  const trimmedEmail = email.value.trim();
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    formError.value = 'Introduce un correo electrónico válido.';
    return;
  }
  if (password.value.length < 8) {
    formError.value = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  loading.value = true;
  // TODO: Implementar login con Supabase
  setTimeout(() => {
    loading.value = false;
    window.location.href = '/dashboard';
  }, 1500);
};

const loginWithGoogle = () => {
  // TODO: Implementar OAuth Google
  console.log('Login con Google');
};

const loginWithMeta = () => {
  // TODO: Implementar OAuth Meta
  console.log('Login con Meta');
};

const loginWithPinterest = () => {
  // TODO: Implementar OAuth Pinterest
  console.log('Login con Pinterest');
};
</script>

<style scoped>
.login-container {
  @apply w-full;
}

.login-card {
  @apply bg-white border border-gray-200 rounded-2xl shadow-xl p-8;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.form-input {
  @apply w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-wine focus:ring-2 focus:ring-wine/20 outline-none transition-colors text-gray-900;
}

.checkbox-input {
  @apply w-4 h-4 text-wine border-gray-300 rounded focus:ring-wine;
}

.submit-btn {
  @apply w-full px-6 py-3 bg-wine text-white font-semibold rounded-lg hover:bg-wine-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.divider {
  @apply relative my-6;
}

.divider::before {
  content: '';
  @apply absolute left-0 right-0 top-1/2 h-px bg-gray-200;
}

.divider-text {
  @apply relative bg-white px-4 text-sm text-gray-500;
}

.oauth-buttons {
  @apply space-y-3;
}

.oauth-btn {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors;
}

.oauth-btn.google {
  @apply text-gray-700;
}

.oauth-btn.meta {
  @apply text-gray-700;
}

.oauth-btn.pinterest {
  @apply text-gray-700;
}

.login-footer {
  @apply mt-6 text-center;
}
</style>

