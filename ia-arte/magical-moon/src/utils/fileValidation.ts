/**
 * Utilidades de validación de archivos para subida segura
 * Basado en el plan de seguridad del proyecto
 */

// Tipos MIME permitidos
export const ALLOWED_MIME_TYPES = {
  images: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ],
  pdfs: [
    'application/pdf'
  ],
  models_3d: [
    'model/gltf-binary',      // .glb
    'model/gltf+json',        // .gltf
    'application/octet-stream' // Fallback para glb
  ]
} as const;

// Extensiones permitidas
export const ALLOWED_EXTENSIONS = {
  images: ['.jpg', '.jpeg', '.png', '.webp'],
  pdfs: ['.pdf'],
  models_3d: ['.glb', '.gltf']
} as const;

// Límites de tamaño en bytes
export const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024,      // 10 MB
  pdf: 25 * 1024 * 1024,        // 25 MB
  model_3d: 50 * 1024 * 1024    // 50 MB
} as const;

// Tipos de archivo
export type FileType = 'image' | 'pdf' | 'model_3d';

/**
 * Obtiene el tipo de archivo basado en el MIME type
 */
export function getFileType(mimeType: string): FileType | null {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.includes('gltf') || mimeType === 'application/octet-stream') {
    return 'model_3d';
  }
  return null;
}

/**
 * Obtiene el tamaño máximo permitido para un tipo de archivo
 */
export function getMaxSize(fileType: FileType): number {
  return MAX_FILE_SIZES[fileType === 'image' ? 'image' : fileType === 'pdf' ? 'pdf' : 'model_3d'];
}

/**
 * Valida el tipo MIME del archivo
 */
export function isValidMimeType(mimeType: string): boolean {
  const allAllowed = [
    ...ALLOWED_MIME_TYPES.images,
    ...ALLOWED_MIME_TYPES.pdfs,
    ...ALLOWED_MIME_TYPES.models_3d
  ];
  return allAllowed.includes(mimeType as any);
}

/**
 * Valida la extensión del archivo
 */
export function isValidExtension(filename: string): boolean {
  const ext = '.' + filename.split('.').pop()?.toLowerCase();
  const allAllowed = [
    ...ALLOWED_EXTENSIONS.images,
    ...ALLOWED_EXTENSIONS.pdfs,
    ...ALLOWED_EXTENSIONS.models_3d
  ];
  return allAllowed.includes(ext as any);
}

/**
 * Sanitiza el nombre del archivo
 */
export function sanitizeFilename(filename: string): string {
  // Remover caracteres peligrosos
  let sanitized = filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')  // Solo alfanuméricos, punto, guión, guión bajo
    .replace(/^\.+/, '')                // Remover puntos al inicio
    .replace(/\.+/g, '.')               // Múltiples puntos a uno solo
    .substring(0, 255);                 // Limitar longitud
  
  // Agregar timestamp para unicidad
  const timestamp = Date.now();
  const parts = sanitized.split('.');
  const ext = parts.length > 1 ? parts.pop() : '';
  const name = parts.join('.');
  
  return ext ? `${name}_${timestamp}.${ext}` : `${name}_${timestamp}`;
}

/**
 * Formatea el tamaño del archivo para mostrar
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Valida un archivo completo
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  fileType?: FileType;
  sanitizedName?: string;
}

export function validateFile(file: File): ValidationResult {
  // 1. Validar que el archivo existe
  if (!file) {
    return {
      valid: false,
      error: 'No se seleccionó ningún archivo'
    };
  }

  // 2. Validar tipo MIME
  if (!isValidMimeType(file.type)) {
    return {
      valid: false,
      error: `Tipo de archivo no permitido. Tipos permitidos: ${ALLOWED_MIME_TYPES.images.join(', ')}, ${ALLOWED_MIME_TYPES.pdfs.join(', ')}, ${ALLOWED_MIME_TYPES.models_3d.join(', ')}`
    };
  }

  // 3. Validar extensión
  if (!isValidExtension(file.name)) {
    return {
      valid: false,
      error: `Extensión no permitida. Extensiones permitidas: ${ALLOWED_EXTENSIONS.images.join(', ')}, ${ALLOWED_EXTENSIONS.pdfs.join(', ')}, ${ALLOWED_EXTENSIONS.models_3d.join(', ')}`
    };
  }

  // 4. Obtener tipo de archivo
  const fileType = getFileType(file.type);
  if (!fileType) {
    return {
      valid: false,
      error: 'No se pudo determinar el tipo de archivo'
    };
  }

  // 5. Validar tamaño
  const maxSize = getMaxSize(fileType);
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Archivo muy grande. Tamaño máximo: ${formatFileSize(maxSize)}. Tu archivo: ${formatFileSize(file.size)}`
    };
  }

  // 6. Validar tamaño mínimo (archivos vacíos o muy pequeños pueden ser sospechosos)
  if (file.size < 100) {
    return {
      valid: false,
      error: 'El archivo es demasiado pequeño y puede estar corrupto'
    };
  }

  // 7. Sanitizar nombre
  const sanitizedName = sanitizeFilename(file.name);

  return {
    valid: true,
    fileType,
    sanitizedName
  };
}

/**
 * Valida una imagen específicamente (para dimensiones, etc.)
 */
export async function validateImageFile(file: File): Promise<ValidationResult> {
  const baseValidation = validateFile(file);
  if (!baseValidation.valid) {
    return baseValidation;
  }

  // Validar que sea realmente una imagen
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        // Validar dimensiones mínimas
        if (img.width < 100 || img.height < 100) {
          resolve({
            valid: false,
            error: 'La imagen es demasiado pequeña. Dimensiones mínimas: 100x100px'
          });
          return;
        }

        // Validar dimensiones máximas (prevenir imágenes gigantes)
        if (img.width > 10000 || img.height > 10000) {
          resolve({
            valid: false,
            error: 'La imagen es demasiado grande. Dimensiones máximas: 10000x10000px'
          });
          return;
        }

        resolve({
          valid: true,
          fileType: 'image',
          sanitizedName: baseValidation.sanitizedName
        });
      };

      img.onerror = () => {
        resolve({
          valid: false,
          error: 'El archivo no es una imagen válida o está corrupto'
        });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      resolve({
        valid: false,
        error: 'Error al leer el archivo'
      });
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Valida un PDF específicamente
 */
export async function validatePDFFile(file: File): Promise<ValidationResult> {
  const baseValidation = validateFile(file);
  if (!baseValidation.valid) {
    return baseValidation;
  }

  // Validar magic bytes del PDF (%PDF)
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4));
      const header = String.fromCharCode(...uint8Array);
      
      if (!header.startsWith('%PDF')) {
        resolve({
          valid: false,
          error: 'El archivo no es un PDF válido o está corrupto'
        });
        return;
      }

      resolve({
        valid: true,
        fileType: 'pdf',
        sanitizedName: baseValidation.sanitizedName
      });
    };

    reader.onerror = () => {
      resolve({
        valid: false,
        error: 'Error al leer el archivo'
      });
    };

    reader.readAsArrayBuffer(file.slice(0, 4)); // Solo leer los primeros 4 bytes
  });
}

/**
 * Valida un modelo 3D
 */
export function validate3DModelFile(file: File): ValidationResult {
  const baseValidation = validateFile(file);
  if (!baseValidation.valid) {
    return baseValidation;
  }

  // Para modelos 3D, la validación básica es suficiente
  // La validación real del contenido se hará en el backend
  return {
    valid: true,
    fileType: 'model_3d',
    sanitizedName: baseValidation.sanitizedName
  };
}

