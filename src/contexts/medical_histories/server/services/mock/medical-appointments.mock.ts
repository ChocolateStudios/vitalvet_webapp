import type { MedicalAppointment } from "../../models/medical-appointment.model";
import { MedicalAppointmentResource } from "../../interfaces/api/resources/medical-appointment.resource";
import type { SaveMedicalAppointmentResource } from "../../interfaces/api/resources/save-medical-appointment.resource";

const medicalAppointments: MedicalAppointment[] = [
    {
        id: 1,
        details: "Cita médica con Dr. Smith",
        observations: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro distinctio dolor perferendis, aliquid delectus aperiam laudantium unde voluptatem, laborum mollitia tempora reiciendis accusamus nemo aspernatur. Laboriosam nulla quod harum molestiae.",
        petId: 1,
        doctorProfileId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        stringId: "1",
        prescription: "Tratamiento antipulgas"
    },
    {
        id: 2,
        details: "Cita médica con Dr. Johnson",
        observations: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro distinctio dolor perferendis, aliquid delectus aperiam laudantium unde voluptatem, laborum mollitia tempora reiciendis accusamus nemo aspernatur. Laboriosam nulla quod harum molestiae.",
        petId: 2,
        doctorProfileId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        stringId: "2",
        prescription: "Limpiar la herida y aplicar un antiséptico"
    },
];

export class MedicalAppointmentsApiMock {
    static registerMedicalAppointment(data: SaveMedicalAppointmentResource): MedicalAppointmentResource {
        const newMedicalAppointment: MedicalAppointment = data.toModel();
        newMedicalAppointment.id = medicalAppointments.length + 1,
        newMedicalAppointment.createdAt = new Date();
        newMedicalAppointment.updatedAt = new Date();
        medicalAppointments.push(newMedicalAppointment);
        return new MedicalAppointmentResource(newMedicalAppointment);
    }

    static updateMedicalAppointment(medicalAppointmentId: number, data: SaveMedicalAppointmentResource): MedicalAppointmentResource {
        const existingMedicalAppointment = medicalAppointments.find(ma => ma.id === medicalAppointmentId);

        if (!existingMedicalAppointment) {
            throw Error(`Medical appointment not found with id ${medicalAppointmentId}`);
        }

        existingMedicalAppointment.details = data.details;
        existingMedicalAppointment.observations = data.observations;
        existingMedicalAppointment.updatedAt = new Date();

        return new MedicalAppointmentResource(existingMedicalAppointment);
    }

    static deleteMedicalAppointment(medicalAppointmentId: number): MedicalAppointmentResource {
        const existingMedicalAppointment = medicalAppointments.find(ma => ma.id === medicalAppointmentId);

        if (!existingMedicalAppointment) {
            throw Error(`Medical appointment not found with id ${medicalAppointmentId}`);
        }

        medicalAppointments.splice(medicalAppointments.indexOf(existingMedicalAppointment), 1);
        return new MedicalAppointmentResource(existingMedicalAppointment);
    }

    static getMedicalAppointment(medicalAppointmentId: number): MedicalAppointmentResource {
        console.log(medicalAppointments);
        const existingMedicalAppointment = medicalAppointments.find(ma => ma.id === Number(medicalAppointmentId));

        if (!existingMedicalAppointment) {
            throw Error(`Medical appointment not found with id ${medicalAppointmentId}`);
        }

        return new MedicalAppointmentResource(existingMedicalAppointment);
    }

    static getAllMedicalAppointmentsByPetId(petId: number): MedicalAppointmentResource[] {
        const appointmentsForPet = medicalAppointments.filter(ma => ma.petId === petId);
        const resources = appointmentsForPet.map(ma => new MedicalAppointmentResource(ma));
        return resources;
    }
}