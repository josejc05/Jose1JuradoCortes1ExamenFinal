# Jose1JuradoCortes1ExamenFinal
https://github.com/josejc05/Jose1JuradoCortes1ExamenFinal.git

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
