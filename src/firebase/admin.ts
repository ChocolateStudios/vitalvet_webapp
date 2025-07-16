import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';

// Cuando se despliega en un entorno de Firebase (como Cloud Functions),
// el SDK de Admin se inicializa automáticamente sin credenciales.
// Para desarrollo local, necesitarás configurar las credenciales de tu cuenta de servicio.
// https://firebase.google.com/docs/admin/setup#initialize-sdk
if (!admin.apps.length) {
  admin.initializeApp();
}

const adminDb = getDatabase();

export { admin, adminDb };

