import { BaseModel } from "@/contexts/_shared/server/models/base.model";

export class GlobalModeConfig extends BaseModel {
    public name: string = "";
    public isDefault: boolean = false;
}