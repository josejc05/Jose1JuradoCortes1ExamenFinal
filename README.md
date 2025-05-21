# Jose1JuradoCortes1ExamenFinal

## Diseño CSS

Para el diseño he utilizado CSS Grid para organizar el contenido principal en dos columnas: una para las entradas y otra para el formulario de creación.
Además, he usado Flexbox dentro de la sección de entradas para apilar las tarjetas verticalmente con espacio entre ellas.
La página es completamente responsiva: al reducir el tamaño de pantalla a menos de 768px, la disposición pasa a una sola columna. También se aplicaron sombras, bordes y colores para que sea más visual.
El formulario tiene campos claros y botón grande para facilitar su uso en dispositivos móviles.

## Funcionalidad JavaScript

Uso addEventListener('DOMContentLoaded') para asegurarme de que todo el DOM esté cargado antes de manipularlo.

### Agregar entradas
Cuando el usuario envía el formulario, capturamos el submit, prevenimos el comportamiento por defecto (que es recargar), y tomamos el título y contenido. Luego llamamos a createEntry() para insertar la nueva entrada al DOM dinámicamente.

### Eliminar entradas
Cada entrada incluye un botón "Eliminar". Al hacer clic, se elimina el elemento padre del DOM. Esto permite eliminar entradas sin necesidad de recargar.

## Backend - Node.js + API REST

### Configuración del servidor
Se usó Express para crear el servidor y express.static() para servir el HTML, CSS y JS desde la carpeta public.

### Endpoints
GET /entries: Lee y devuelve las entradas desde el archivo entries.json.
POST /entries: Recibe una nueva entrada en formato JSON, la agrega al arreglo y sobrescribe el archivo.

### Manejo de errores
Se manejan errores de lectura, escritura y parsing del archivo JSON.
Se validan datos faltantes en las solicitudes POST.

### Almacenamiento
Las entradas se guardan en el archivo server/entries.json, usando el sistema de archivos de Node.

## Análisis – Mejoras en Rendimiento y Seguridad

### 1. Rendimiento
Mejora sugerida: Implementar almacenamiento en base de datos como SQLite o MongoDB.

Justificación: Leer y escribir todo el archivo JSON en cada petición puede escalar mal con muchas entradas. Una base de datos permitiría búsquedas y escritura más eficientes y seguras, además de facilitar concurrencia.

### 2. Seguridad
Mejora sugerida: Sanitizar entradas del usuario y evitar ejecución de scripts.

Justificación: Actualmente, los datos se insertan directamente en el DOM, lo que puede permitir ataques XSS si un usuario ingresa código malicioso. Se debería escapar el contenido antes de insertarlo o usar librerías que lo hagan automáticamente.
