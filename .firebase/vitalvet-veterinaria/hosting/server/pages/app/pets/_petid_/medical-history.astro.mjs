import { e as createComponent, f as createAstro, m as maybeRenderHead, k as renderComponent, h as addAttribute, r as renderTemplate } from '../../../../chunks/astro/server_C2nqEJVv.mjs';
import 'kleur/colors';
import { $ as $$AppLayout } from '../../../../chunks/AppLayout_S0x-ecEl.mjs';
import { $ as $$PetBaseTextInput } from '../../../../chunks/pet-base-text-input_Datu_Lrf.mjs';
import { M as MedicalAppointmentsApiMock } from '../../../../chunks/medical-appointments.mock_Wgoq_aVA.mjs';
export { renderers } from '../../../../renderers.mjs';

function getAllMedicalAppointmentsByPetId(petId) {
  const medicalAppointments = MedicalAppointmentsApiMock.getAllMedicalAppointmentsByPetId(petId);
  const medicalAppointmentsInfo = medicalAppointments.map((ma, index) => {
    return {
      id: ma.id,
      appointmentNumber: index + 1,
      createdAt: ma.createdAt,
      doctorName: "Doctor ejemplo"
    };
  });
  return medicalAppointmentsInfo;
}

const $$Astro$1 = createAstro();
const $$PetMedicalHistory = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PetMedicalHistory;
  const { petId } = Astro2.props;
  const medicalHistory = getAllMedicalAppointmentsByPetId(petId);
  const inputFields = [
    {
      id: "name",
      name: "name",
      type: "text",
      autocomplete: "name",
      placeholder: "Pepito",
      label: "Nombre"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="p-4 sm:p-6 lg:p-8 h-full"> <h2 class="text-2xl font-bold">Historial médico</h2> <form class="flex items-center gap-8 h-full"> <div class="flex flex-col flex-3 items-center rounded-md outline-3 outline-blue-800 px-7 py-15"> <div class="w-fit"> <img src="/src/assets/petProfilePhoto.png" alt="Foto de Pepito" class="rounded-full w-40 h-40 object-cover border"> </div> ${renderComponent($$result, "PetBaseTextInput", $$PetBaseTextInput, { ...inputFields[0], "class": "w-full" })} </div> <div class="mt-8 flow-root"> <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"> <table class="min-w-full divide-y divide-gray-300"> <thead> <tr> <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0">N° cita</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha de creación</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Última visualización</th> </tr> </thead> <tbody class="divide-y divide-gray-200"> ${medicalHistory.map(
    (medicalAppointment) => renderTemplate`<tr class="relative hover:bg-gray-50 cursor-pointer"> <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center text-gray-900 sm:pl-0"> <a${addAttribute(`/app/pets/${petId}/medical-history/${medicalAppointment.id}`, "href")} class="before:absolute before:inset-0"${addAttribute(`Ver detalles de la cita n\xFAmero ${medicalAppointment.appointmentNumber} de ${medicalAppointment.doctorName}`, "aria-label")}> <span class="relative z-10">${medicalAppointment.appointmentNumber}</span> </a> </td> <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${medicalAppointment.createdAt}</td> <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${medicalAppointment.doctorName}</td> </tr>`
  )} </tbody> </table> </div> </div> </div> </form> </div>`;
}, "/home/user/vitalvetwebapp/src/contexts/medical_histories/presentation/pages/pet-medical-history.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$MedicalHistory = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MedicalHistory;
  const { petId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PetMedicalHistoryPage", $$PetMedicalHistory, { "petId": petId })} ` })}`;
}, "/home/user/vitalvetwebapp/src/pages/app/pets/[petId]/medical-history.astro", void 0);

const $$file = "/home/user/vitalvetwebapp/src/pages/app/pets/[petId]/medical-history.astro";
const $$url = "/app/pets/[petId]/medical-history";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MedicalHistory,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
