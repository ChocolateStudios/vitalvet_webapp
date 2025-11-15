// Importa las dependencias de Firebase
import { https } from 'firebase-functions/v2';
import { initializeApp } from 'firebase-admin/app';

// Importa el manejador de peticiones de tu servidor Astro
// La ruta es relativa a la raíz del proyecto después de construir
import { handler } from './dist/server/entry.mjs';

// Inicializa la app de Firebase (necesario para el entorno de functions)
initializeApp();

// Crea y exporta la Cloud Function
// El nombre "server" debe coincidir con el que pusiste en firebase.json
export const server = https.onRequest(
  { memory: '512MiB' }, // <-- Aumentamos la memoria aquí
  handler
);