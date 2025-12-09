import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class GlobalConfig extends AuditableModel {
    public showModeSelector: boolean = false;
}