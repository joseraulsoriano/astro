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
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c5.084 0 9.426-3.163 11.174-7.637-.15-.837-.298-2.096.034-2.996.326-.896 2.083-13.398 2.083-13.398s-.526-.108-1.379-.108c-1.084 0-2.567.137-4.017 1.232-1.75-3.834-4.302-5.505-6.447-5.505-2.384 0-3.931 1.734-3.931 4.037 0 1.55.583 2.94 1.848 3.467.207.086.39.046.453-.125l.365-1.462c.043-.167.027-.228-.116-.38-.328-.379-.537-.869-.537-1.564 0-2.02 1.483-3.887 3.868-3.887 2.12 0 3.676 1.285 3.676 3.006 0 2.247-1.006 4.149-2.485 4.149-.822 0-1.434-.677-1.238-1.506.236-.993.693-2.062.693-2.776 0-.64-.344-1.175-1.056-1.175-.838 0-1.513.866-1.513 2.028 0 .751.254 1.259.254 1.259l-1.014 4.296c-.243 1.033-.037 2.302-.019 2.428.01.077.107.096.151.037.06-.083.851-1.05 1.123-2.021.08-.293.461-1.787.461-1.787.227.434.892.816 1.598.816 2.105 0 3.532-2.196 3.532-5.366 0-2.81-2.053-5.395-5.932-5.395-4.096 0-6.514 3.033-6.514 6.168 0 1.525.58 2.893 1.825 3.803.205.152.312.083.312-.099v-2.214c0-.178-.103-.214-.241-.152-.884.413-1.861.564-2.693.564-2.123 0-3.385-1.286-3.385-3.129 0-2.537 2.202-4.85 5.952-4.85 3.1 0 5.148 2.208 5.148 5.16 0 3.082-1.94 5.558-4.629 5.558-.904 0-1.754-.47-2.044-1.056 0 0-.447 1.709-.554 2.13-.201.777-.746 1.751-1.111 2.345C2.67 19.848 6.268 22 10.214 22c5.77 0 10.786-4.477 10.786-10.786C21 5.372 16.627 0 12 0z"/>
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

