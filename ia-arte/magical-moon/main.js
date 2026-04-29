// main.js

// Selecciona el botón de cambio de tema
const themeToggleButton = document.getElementById("themeToggle");

// Función para alternar el tema
function toggleTheme() {
  // Verifica si el tema oscuro ya está activado
  const isDarkMode = document.documentElement.classList.contains("dark");

  // Alterna la clase 'dark' en el elemento raíz
  if (isDarkMode) {
    document.documentElement.classList.remove("dark");
    themeToggleButton.textContent = "Cambiar a Modo Oscuro";
  } else {
    document.documentElement.classList.add("dark");
    themeToggleButton.textContent = "Cambiar a Modo Claro";
  }
}

// Agregar un evento al botón para alternar el tema
themeToggleButton.addEventListener("click", toggleTheme);