import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

/**
 * Creación de una instancia de Axios con configuración base.
 * Es una buena práctica definir la URL base de tu API en un archivo de entorno (.env)
 * y acceder a ella a través de `process.env.REACT_APP_API_URL` o `import.meta.env.VITE_API_URL` (para Vite).
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com/v1', // <-- Cambia esto por la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Maneja los errores de las peticiones de forma centralizada.
 * @param error El error capturado por Axios.
 * @param context Un string que describe el contexto de la petición (ej. 'GET /users').
 */
const handleError = (error: unknown, context: string): never => {
  // Imprime el error en la consola para depuración.
  console.error(`Error en la petición (${context}):`, error);

  // Vuelve a lanzar el error para que el código que llama a la función
  // pueda manejarlo también (ej. mostrando un mensaje al usuario).
  throw error;
};

/**
 * Realiza una petición GET.
 * @template T El tipo de dato esperado en la respuesta.
 * @param url El endpoint al que se hará la petición (ej. '/users').
 * @returns Una promesa que se resuelve con los datos de la respuesta.
 */
const get = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url);
    return response.data;
  } catch (error) {
    return handleError(error, `GET ${url}`);
  }
};

/**
 * Realiza una petición POST.
 * @template T El tipo de dato esperado en la respuesta.
 * @template D El tipo de dato del cuerpo de la petición.
 * @param url El endpoint.
 * @param data Los datos a enviar en el cuerpo de la petición.
 */
const post = async <T, D>(url:string, data: D): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    return handleError(error, `POST ${url}`);
  }
};

/**
 * Realiza una petición PUT.
 * @template T El tipo de dato esperado en la respuesta.
 * @template D El tipo de dato del cuerpo de la petición.
 * @param url El endpoint.
 * @param data Los datos a enviar en el cuerpo de la petición.
 */
const put = async <T, D>(url: string, data: D): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    return handleError(error, `PUT ${url}`);
  }
};

// NOTA: 'delete' es una palabra reservada en JavaScript, por lo que nombramos la función como 'del'.
// Al exportar, la renombramos a 'delete' para mantener una API consistente.
const del = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    return handleError(error, `DELETE ${url}`);
  }
};

export const http = {
  get,
  post,
  put, // Podemos exportar directamente los métodos de axios si no necesitan lógica extra
  delete: del,
};