import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class ProfileConfig extends AuditableModel {
    public profileId: number | string = 0;
    public modeId: number | string = 0;
}
