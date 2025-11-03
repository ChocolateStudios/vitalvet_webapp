import type { Pet } from "@/contexts/pets/server/models/pet.model";

export interface PetInfo extends Pet {
    ownerProfileId: number | string;
    ownerName: string;
    medicalAppointmentsCount: number;
    bathsCount: number;
    weight: number;
}

export interface PetListItemInfo {
    id?: number | string,
    name?: string,
    medicalAppointmentsCount: number,
    bathsCount: number,
    owner?: string,
    species?: string,
    subspecies?: string,
    isDead?: boolean,
}