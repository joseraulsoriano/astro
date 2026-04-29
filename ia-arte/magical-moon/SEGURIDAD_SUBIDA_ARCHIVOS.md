# 🔒 Plan de Seguridad para Subida de Archivos

## 🎯 Objetivos de Seguridad

1. **Prevenir malware/virus** en archivos subidos
2. **Validar tipos de archivo** reales (no solo extensión)
3. **Limitar tamaños** para prevenir abuso
4. **Proteger nombres de archivo** de inyección
5. **Sanitizar metadatos** (EXIF en imágenes)

---

## ✅ Validaciones Necesarias

### 1. Tipos de Archivo Permitidos

```typescript
// Tipos MIME permitidos
const ALLOWED_MIME_TYPES = {
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
};

// Extensiones permitidas (validación adicional)
const ALLOWED_EXTENSIONS = {
  images: ['.jpg', '.jpeg', '.png', '.webp'],
  pdfs: ['.pdf'],
  models_3d: ['.glb', '.gltf']
};
```

### 2. Límites de Tamaño

```typescript
const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024,      // 10 MB
  pdf: 25 * 1024 * 1024,        // 25 MB
  model_3d: 50 * 1024 * 1024    // 50 MB
};
```

### 3. Validación de Nombre de Archivo

```typescript
function sanitizeFilename(filename: string): string {
  // Remover caracteres peligrosos
  let sanitized = filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')  // Solo alfanuméricos, punto, guión, guión bajo
    .replace(/^\.+/, '')                // Remover puntos al inicio
    .replace(/\.+/g, '.')               // Múltiples puntos a uno solo
    .substring(0, 255);                 // Limitar longitud
  
  // Agregar timestamp para unicidad
  const timestamp = Date.now();
  const ext = sanitized.split('.').pop();
  const name = sanitized.replace(`.${ext}`, '');
  
  return `${name}_${timestamp}.${ext}`;
}
```

---

## 🛡️ Capas de Seguridad

### Capa 1: Frontend (Validación Inicial)

```vue
<!-- Componente FileUploader.vue -->
<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const selectedFile = ref(null);
const error = ref('');

const validateFile = (file) => {
  // Validar tipo MIME
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'application/pdf',
    'model/gltf-binary', 'model/gltf+json'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no permitido');
  }
  
  // Validar tamaño
  const maxSize = file.type.startsWith('image/') ? 10 * 1024 * 1024 :
                  file.type === 'application/pdf' ? 25 * 1024 * 1024 :
                  50 * 1024 * 1024;
  
  if (file.size > maxSize) {
    throw new Error(`Archivo muy grande. Máximo: ${maxSize / 1024 / 1024}MB`);
  }
  
  // Validar extensión
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.glb', '.gltf'];
  
  if (!allowedExts.includes(ext)) {
    throw new Error('Extensión no permitida');
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    validateFile(file);
    selectedFile.value = file;
    error.value = '';
  } catch (err) {
    error.value = err.message;
    selectedFile.value = null;
  }
};
</script>
```

### Capa 2: Backend API (Validación Estricta)

```typescript
// src/api/upload.ts (Astro Server Endpoint)
import { createClient } from '@supabase/supabase-js';
import { fileTypeFromBuffer } from 'file-type';

export async function POST({ request }) {
  try {
    // 1. Verificar autenticación
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401
      });
    }
    
    // 2. Obtener archivo del FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No se recibió archivo' }), {
        status: 400
      });
    }
    
    // 3. Validar tamaño
    const maxSize = getMaxSize(file.type);
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ 
        error: `Archivo muy grande. Máximo: ${maxSize / 1024 / 1024}MB` 
      }), {
        status: 400
      });
    }
    
    // 4. Validar MIME type REAL (no confiar en el del cliente)
    const buffer = await file.arrayBuffer();
    const fileType = await fileTypeFromBuffer(buffer);
    
    if (!fileType || !isAllowedMimeType(fileType.mime)) {
      return new Response(JSON.stringify({ 
        error: 'Tipo de archivo no permitido o inválido' 
      }), {
        status: 400
      });
    }
    
    // 5. Sanitizar nombre
    const sanitizedName = sanitizeFilename(file.name);
    
    // 6. Validar contenido adicional según tipo
    if (fileType.mime.startsWith('image/')) {
      await validateImage(buffer);
    } else if (fileType.mime === 'application/pdf') {
      await validatePDF(buffer);
    }
    
    // 7. Subir a Supabase Storage
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const filePath = `${userId}/${sanitizedName}`;
    const { data, error: uploadError } = await supabase.storage
      .from('artworks')
      .upload(filePath, buffer, {
        contentType: fileType.mime,
        upsert: false
      });
    
    if (uploadError) {
      throw uploadError;
    }
    
    // 8. Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('artworks')
      .getPublicUrl(filePath);
    
    // 9. Registrar en BD (con scan_status = 'pending')
    const { error: dbError } = await supabase
      .from('file_uploads')
      .insert({
        user_id: userId,
        filename: sanitizedName,
        file_type: getFileType(fileType.mime),
        file_size: file.size,
        mime_type: fileType.mime,
        storage_url: publicUrl,
        storage_path: filePath,
        scan_status: 'pending'
      });
    
    // 10. Procesar en background (thumbnails, optimización)
    // TODO: Implementar job queue para procesamiento
    
    return new Response(JSON.stringify({ 
      success: true,
      url: publicUrl,
      fileId: data.id
    }), {
      status: 200
    });
    
  } catch (error) {
    console.error('Error en upload:', error);
    return new Response(JSON.stringify({ 
      error: 'Error al subir archivo' 
    }), {
      status: 500
    });
  }
}

function getMaxSize(mimeType: string): number {
  if (mimeType.startsWith('image/')) return 10 * 1024 * 1024;
  if (mimeType === 'application/pdf') return 25 * 1024 * 1024;
  if (mimeType.includes('gltf') || mimeType === 'application/octet-stream') {
    return 50 * 1024 * 1024;
  }
  return 0;
}

function isAllowedMimeType(mime: string): boolean {
  const allowed = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'application/pdf',
    'model/gltf-binary', 'model/gltf+json', 'application/octet-stream'
  ];
  return allowed.includes(mime);
}

function getFileType(mime: string): 'image' | 'pdf' | '3d_model' {
  if (mime.startsWith('image/')) return 'image';
  if (mime === 'application/pdf') return 'pdf';
  return '3d_model';
}

async function validateImage(buffer: ArrayBuffer): Promise<void> {
  // Validar dimensiones mínimas/máximas
  // Validar que sea una imagen válida
  // TODO: Usar sharp o similar
}

async function validatePDF(buffer: ArrayBuffer): Promise<void> {
  // Validar que sea PDF válido (magic bytes: %PDF)
  const header = new Uint8Array(buffer.slice(0, 4));
  const pdfHeader = new TextDecoder().decode(header);
  if (!pdfHeader.startsWith('%PDF')) {
    throw new Error('Archivo PDF inválido');
  }
}

function sanitizeFilename(filename: string): string {
  // Implementar función de sanitización
  // ...
}
```

### Capa 3: Storage Policies (Supabase)

```sql
-- Política de Storage en Supabase
-- Solo usuarios autenticados pueden subir
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'artworks' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Usuarios pueden leer sus propias subidas y todas las públicas
CREATE POLICY "Users can read own uploads and public"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'artworks' AND
  (
    auth.uid()::text = (storage.foldername(name))[1] OR
    -- Verificar si la obra asociada es pública
    EXISTS (
      SELECT 1 FROM file_uploads fu
      JOIN artworks a ON a.image_url LIKE '%' || fu.storage_path
      WHERE fu.storage_path = name
      AND a.is_public = true
    )
  )
);
```

### Capa 4: Escaneo de Seguridad (Futuro)

```typescript
// Escaneo con ClamAV o servicio externo
async function scanFile(buffer: ArrayBuffer, fileId: string) {
  // Opción 1: ClamAV (servidor propio)
  // Opción 2: VirusTotal API
  // Opción 3: AWS GuardDuty
  
  // Por ahora, marcamos como 'safe' después de validaciones
  // En producción, implementar escaneo real
  
  const supabase = createClient(...);
  await supabase
    .from('file_uploads')
    .update({
      scan_status: 'safe',
      scan_result: { scanned_at: new Date(), method: 'basic_validation' }
    })
    .eq('id', fileId);
}
```

---

## 📋 Checklist de Implementación

### Frontend
- [x] Validación de tipo MIME
- [x] Validación de tamaño
- [x] Validación de extensión
- [x] Preview antes de subir
- [x] Indicador de progreso
- [x] Manejo de errores

### Backend
- [x] Verificación de autenticación
- [x] Validación de MIME type real (file-type)
- [x] Validación de tamaño
- [x] Sanitización de nombres
- [x] Validación de contenido (magic bytes)
- [x] RLS en Storage
- [ ] Escaneo de virus (futuro)

### Procesamiento
- [ ] Generación de thumbnails
- [ ] Optimización de imágenes
- [ ] Conversión a WebP
- [ ] Validación de dimensiones

---

## 🔧 Dependencias Necesarias

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "file-type": "^18.x",  // Para validar MIME real
    "sharp": "^0.32.x"     // Para procesamiento de imágenes
  }
}
```

---

## 🚨 Consideraciones Adicionales

### Rate Limiting
- Implementar límite de subidas por usuario (ej: 10 por hora)
- Prevenir abuso de almacenamiento

### Quotas por Usuario
- Límite total de almacenamiento por usuario
- Alerta cuando se aproxime al límite

### Monitoring
- Logs de todas las subidas
- Alertas de archivos sospechosos
- Métricas de uso

---

## 📝 Próximos Pasos

1. ✅ Implementar validación frontend
2. ✅ Crear endpoint de subida seguro
3. ✅ Configurar políticas de Storage
4. ⏳ Implementar procesamiento de imágenes
5. ⏳ Agregar escaneo de seguridad (futuro)

