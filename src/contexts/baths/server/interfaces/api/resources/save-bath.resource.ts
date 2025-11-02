import type { Bath } from "@/contexts/baths/server/models/bath.model";

export class SaveBathResource {
    public bathDate: Date = new Date();
    public observations: string = "";
    public doctorProfileId: number | string = 0;
    public imageURL?: string;

    constructor(bathDate: Date, observations: string, doctorProfileId: number | string) {
        this.bathDate = bathDate;
        this.observations = observations;
        this.doctorProfileId = doctorProfileId;
    }
    
    public toModel(): Bath {
        return {
            ...this,
            id: 0,
            petId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}