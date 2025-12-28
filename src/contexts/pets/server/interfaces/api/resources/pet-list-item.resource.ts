export class PetListItemResource {
    public id?: number | string = '';
    public name?: string = '';
    public medicalAppointmentsCount: number = 0;
    public bathsCount: number = 0;
    public owner?: string = '';
    public species?: string = '';
    public subspecies?: string = '';
    public isDead?: boolean = false;
}