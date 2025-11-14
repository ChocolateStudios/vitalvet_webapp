
export const PET_STORAGE_ROUTE = 'pets';
export const MEDICAL_APPOINTMENT_STORAGE_ROUTE = (petId: string) => `pets/${petId}/medical_appointments`;
export const BATH_STORAGE_ROUTE = (petId: string) => `pets/${petId}/baths`;



