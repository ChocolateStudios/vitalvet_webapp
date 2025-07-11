import { A as AuditableModel } from './auditable.model_CyEaeU6Z.mjs';

class MedicalAppointmentResource extends AuditableModel {
  details = "";
  observations = "";
  petId = 0;
  doctorProfileId = 0;
  constructor(model) {
    super();
    this.id = model.id;
    this.details = model.details;
    this.observations = model.observations;
    this.petId = model.petId;
    this.doctorProfileId = model.doctorProfileId;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

const medicalAppointments = [
  {
    id: 1,
    details: "Cita médica con Dr. Smith",
    observations: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro distinctio dolor perferendis, aliquid delectus aperiam laudantium unde voluptatem, laborum mollitia tempora reiciendis accusamus nemo aspernatur. Laboriosam nulla quod harum molestiae.",
    petId: 1,
    doctorProfileId: 1,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  },
  {
    id: 2,
    details: "Cita médica con Dr. Johnson",
    observations: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro distinctio dolor perferendis, aliquid delectus aperiam laudantium unde voluptatem, laborum mollitia tempora reiciendis accusamus nemo aspernatur. Laboriosam nulla quod harum molestiae.",
    petId: 2,
    doctorProfileId: 2,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  }
];
class MedicalAppointmentsApiMock {
  static registerMedicalAppointment(data) {
    const newMedicalAppointment = data.toModel();
    newMedicalAppointment.id = medicalAppointments.length + 1, newMedicalAppointment.createdAt = /* @__PURE__ */ new Date();
    newMedicalAppointment.updatedAt = /* @__PURE__ */ new Date();
    medicalAppointments.push(newMedicalAppointment);
    return new MedicalAppointmentResource(newMedicalAppointment);
  }
  static updateMedicalAppointment(medicalAppointmentId, data) {
    const existingMedicalAppointment = medicalAppointments.find((ma) => ma.id === medicalAppointmentId);
    if (!existingMedicalAppointment) {
      throw Error(`Medical appointment not found with id ${medicalAppointmentId}`);
    }
    existingMedicalAppointment.details = data.details;
    existingMedicalAppointment.observations = data.observations;
    existingMedicalAppointment.updatedAt = /* @__PURE__ */ new Date();
    return new MedicalAppointmentResource(existingMedicalAppointment);
  }
  static deleteMedicalAppointment(medicalAppointmentId) {
    const existingMedicalAppointment = medicalAppointments.find((ma) => ma.id === medicalAppointmentId);
    if (!existingMedicalAppointment) {
      throw Error(`Medical appointment not found with id ${medicalAppointmentId}`);
    }
    medicalAppointments.splice(medicalAppointments.indexOf(existingMedicalAppointment), 1);
    return new MedicalAppointmentResource(existingMedicalAppointment);
  }
  static getMedicalAppointment(medicalAppointmentId) {
    console.log(medicalAppointments);
    const existingMedicalAppointment = medicalAppointments.find((ma) => ma.id === Number(medicalAppointmentId));
    if (!existingMedicalAppointment) {
      throw Error(`Medical appointment not found with id ${medicalAppointmentId}`);
    }
    return new MedicalAppointmentResource(existingMedicalAppointment);
  }
  static getAllMedicalAppointmentsByPetId(petId) {
    const appointmentsForPet = medicalAppointments.filter((ma) => ma.petId === petId);
    const resources = appointmentsForPet.map((ma) => new MedicalAppointmentResource(ma));
    return resources;
  }
}

export { MedicalAppointmentsApiMock as M };
