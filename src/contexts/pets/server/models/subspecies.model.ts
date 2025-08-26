import { BaseModel } from "@/contexts/_shared/server/models/base.model";

export class Subspecies extends BaseModel {
    public name: string = "";
    public speciesId: number | string = 0;
}