 # Guía para CLAUDE AI - Proyecto VitalVet
 
 ## 1. Resumen del Proyecto
 
 **VitalVet** es una aplicación web para la gestión de historiales médicos de pacientes veterinarios. El objetivo es proporcionar una plataforma robusta y en tiempo real para que los veterinarios gestionen la información de las mascotas, incluyendo su historial médico, citas, baños y más.
 
 Este documento sirve como una guía esencial para cualquier agente de IA o desarrollador que trabaje en el proyecto. **Es crucial seguir estas directrices para mantener la consistencia, calidad y mantenibilidad del código.**
 
 ## 2. Arquitectura y Tecnologías
 
 | Componente | Tecnología/Patrón | Notas Clave |
 | :--- | :--- | :--- |
 | **Framework Frontend** | [Astro](https://astro.build/) | Utilizado para construir el sitio. Permite la creación de componentes y páginas. |
 | **Estilos Visuales** | [Tailwind CSS](https://tailwindcss.com/) | Framework CSS utility-first. **No se deben escribir archivos CSS personalizados.** |
 | **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Todo el código está tipado. Se debe mantener un tipado estricto. |
 | **Base de Datos** | Firebase Realtime Database | Base de datos NoSQL en tiempo real. El acceso se realiza a través de un patrón de repositorio. |
 | **Autenticación** | Firebase Authentication & JWT | Se usa Firebase Auth para la gestión de usuarios y JWT para la autorización de sesiones. |
 | **Hosting** | Firebase Hosting | Plataforma de despliegue de la aplicación. |
 
 ## 3. Estructura de Carpetas
 
 El proyecto sigue una arquitectura modular basada en "Contextos" o dominios de negocio, ubicada en `src/contexts`.
 
 ```
 src/
 ├── contexts/
 │   ├── _shared/              # Lógica, tipos y componentes compartidos
 │   ├── [feature_name]/       # Contexto de una funcionalidad (ej. 'pets', 'auth')
 │   │   ├── client/           # Lógica y componentes para el lado del cliente (Astro)
 │   │   │   ├── presentation/
 │   │   │   └── services/
 │   │   └── server/           # Lógica para el lado del servidor (API Routes, SSR)
 │   │       ├── application/
 │   │       │   └── usecases/ # Orquestan la lógica de negocio
 │   │       ├── infrastructure/
 │   │       │   └── repositories/ # Acceso y manipulación de datos (Firebase)
 │   │       ├── interfaces/
 │   │       │   └── api/
 │   │       │       └── resources/ # DTOs para la comunicación API
 │   │       └── models/         # Modelos de dominio del negocio
 │
 ├── firebase/                 # Configuración de Firebase (cliente y admin)
 ├── layouts/                  # Layouts de Astro
 └── pages/                    # Páginas y API endpoints de Astro
 ```
 
 ## 4. Patrones y Convenciones de Codificación
 
 Adherirse a estos patrones es **mandatorio**.
 
 ### 4.1. Lenguaje y Estilo
 
 - **TypeScript Estricto**: Todo el código debe estar correctamente tipado. Evita el uso de `any` a menos que sea absolutamente inevitable y justificado.
 - **Nomenclatura**:
   - `PascalCase` para clases, tipos e interfaces (ej. `class PetsRepository`, `type PetResource`).
   - `camelCase` para variables y funciones (ej. `const newPet`, `function getPet()`).
 - **Comentarios**: El código existente está comentado en **español**. Mantén esta convención para nuevos desarrollos.
 - **Modularidad**: Cada archivo tiene una única responsabilidad, como se define en la estructura de carpetas (un repositorio, un modelo, un caso de uso, etc.).
- **No reformatear código ajeno al cambio**: Cuando se solicite un cambio, **solo modifica el código directamente relacionado con ese cambio**. No reformatees líneas de código que no están involucradas, como agregar saltos de línea a funciones que estaban en una sola línea, cambiar el formato de parámetros, o reorganizar imports no relacionados. Mantén el estilo original del código circundante.
 
 ### 4.2. Patrón de Repositorio (Acceso a Datos)
 
 Toda la interacción con la base de datos (Firebase Realtime Database) **debe** realizarse a través de clases `Repository`.
 
 - **Ubicación**: `src/contexts/[feature]/server/infrastructure/repositories/`.
 - **Implementación**: Son clases con **métodos estáticos** (`static async`).
 - **Ejemplo**: `PetsRepository.getPet(petId)`.
 - **Interacción con Firebase**: Utilizan el SDK de Firebase (`firebase/client` o `firebase/admin`) con funciones como `ref`, `get`, `set`, `push`, `update`, `query`, etc.
 
 ### 4.3. Flujo de Datos: Modelos y Recursos (DTOs)
 
 Se utiliza un patrón de `Model` y `Resource` (Data Transfer Object) para separar la lógica de negocio de la representación de datos en la API.
 
 1.  **Model (`*.model.ts`)**:
     - Representa la entidad de negocio principal.
     - Utiliza tipos de datos ricos como `Date`.
     - Ubicación: `src/contexts/[feature]/server/models/`.
 
 2.  **SaveResource (`save-*.resource.ts`)**:
     - Es el DTO para peticiones de creación o actualización (ej. `POST`, `PUT`).
     - Contiene los datos tal como llegan de la API.
     - **Debe** tener un método `.toModel()` que lo convierte en una instancia del `Model`.
 
 3.  **Resource (`*.resource.ts`)**:
     - Es el DTO para las respuestas de la API (ej. `GET`).
     - **Debe** tener un método estático `fromModel(model)` que crea una instancia del `Resource` a partir de un `Model`.
 
 ### 4.4. Manejo de Datos en Firebase
 
 - **Fechas y Timestamps**: Firebase Realtime Database no tiene un tipo `Date` nativo. **Siempre** almacena las fechas como strings en formato ISO 8601 usando `.toISOString()`. Al leer los datos, conviértelos de nuevo a objetos `Date` con `new Date(isoString)`.
 - **IDs**: Los IDs de los nuevos registros se generan con la función `push()` de Firebase. El `key` resultante debe ser asignado al campo `id` del objeto antes de guardarlo.
 - **Contadores y Denormalización**: Para optimizar lecturas, se usan contadores denormalizados (ej. `bathsCount` en el modelo `Pet`). Estos contadores **deben** ser actualizados atómicamente usando `runTransaction()`.
 
 ### 4.5. Casos de Uso (`*.usecase.ts`)
 
 - **Propósito**: Orquestan la lógica de negocio. Un caso de uso puede llamar a uno o más repositorios para cumplir con un requerimiento.
 - **Ubicación**: `src/contexts/[feature]/server/application/usecases/`.
 - **Retorno**: Devuelven un objeto `UsecaseResult` con la forma `{ data: T, success: boolean }`.
 - **Manejo de Errores**: Deben capturar errores de los repositorios y lanzarlos para que el nivel superior (API Route) los maneje.
 
 ### 4.6. Estilos con Tailwind CSS
 
 - **Utility-First**: Aplica estilos usando clases de utilidad directamente en el marcado HTML/Astro/JSX.
 - **No CSS Personalizado**: No crees archivos `.css` o `<style>` con reglas CSS personalizadas. La configuración de Tailwind (`tailwind.config.mjs`) es el único lugar para definir tokens de diseño (colores, espaciado, etc.).
 
 ## 5. Variables de Entorno
 
 Para ejecutar el proyecto, el archivo `.env` debe contener las siguientes variables. Las variables `VITE_*` se obtienen de la consola de Firebase.
 
 ```
 # Firebase Client SDK Configuration
 VITE_API_KEY=...
 VITE_AUTH_DOMAIN=...
 VITE_PROJECT_ID=...
 VITE_STORAGE_BUCKET=...
 VITE_MESSAGING_SENDER_ID=...
 VITE_APP_ID=...
 
 # JWT Secret for session tokens
 JWT_SECRET=... # Debe ser una cadena larga, segura y aleatoria
 ```
 
 ## 6. Guía Práctica: Implementar una Nueva Funcionalidad
 
 Como ejemplo, para añadir una nueva funcionalidad "Vacunas" (`vaccines`) para una mascota, sigue estos pasos:
 
 1.  **Crear Estructura**: Crea la carpeta `src/contexts/vaccines/` con sus subdirectorios (`server/models`, `server/infrastructure/repositories`, etc.).
 
 2.  **Definir el Modelo**: Crea `src/contexts/vaccines/server/models/vaccine.model.ts`.
     ```typescript
     export interface Vaccine {
         id: string;
         petId: string;
         name: string;
         applicationDate: Date;
         createdAt: Date;
         updatedAt: Date;
     }
     ```
 
 3.  **Definir Recursos (DTOs)**: Crea `save-vaccine.resource.ts` y `vaccine.resource.ts` en `server/interfaces/api/resources/`.
 
 4.  **Crear el Repositorio**: Crea `src/contexts/vaccines/server/infrastructure/repositories/vaccines.repository.ts`.
     - Implementa los métodos estáticos: `registerVaccine`, `getVaccine`, `getAllVaccinesByPetId`, `updateVaccine`, `deleteVaccine`.
     - Recuerda convertir las fechas a ISO string al guardar y viceversa al leer.
     - Si es necesario, usa una transacción para actualizar un contador `vaccinesCount` en el modelo `Pet`.
 
 5.  **Crear Casos de Uso**: Crea los archivos necesarios en `server/application/usecases/`, por ejemplo, `register-vaccine.usecase.ts`. Este caso de uso llamará a `VaccinesRepository.registerVaccine`.
 
 6.  **Crear API Endpoint**: En `src/pages/api/pets/[petId]/vaccines.ts`, crea un endpoint de Astro que maneje las peticiones `POST`. Este endpoint importará y ejecutará el caso de uso correspondiente.
 
 7.  **Construir la UI**: Crea los componentes de Astro en `src/contexts/vaccines/client/components/` para listar, añadir o editar vacunas. Estos componentes consumirán los API endpoints creados.
 
 8.  **Aplicar Estilos**: Usa clases de Tailwind CSS directamente en tus componentes de Astro para darles estilo.
 
 ---
 
 **Al seguir estas directrices, asegurarás que tu contribución se alinee perfectamente con la estructura y calidad del proyecto VitalVet.**

## 7. Reglas de Despliegue (Firebase Hosting)

### 7.1. Cookies
- **Restricción**: Firebase Hosting elimina todas las cookies de las peticiones entrantes excepto una llamada `__session`.
- **Uso**: Cualquier dato que necesite persistir entre peticiones (como el token de autenticación) **debe** almacenarse dentro de la cookie `__session`.
- **Formato**: Se recomienda mantener el valor de `__session` lo más simple posible (ej. solo el token JWT string). Evitar estructuras JSON complejas si no son estrictamente necesarias para minimizar problemas de parsing y compatibilidad.
