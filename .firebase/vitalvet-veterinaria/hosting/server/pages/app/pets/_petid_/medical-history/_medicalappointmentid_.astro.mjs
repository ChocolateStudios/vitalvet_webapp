import { e as createComponent, f as createAstro, m as maybeRenderHead, k as renderComponent, r as renderTemplate } from '../../../../../chunks/astro/server_C2nqEJVv.mjs';
import 'kleur/colors';
import { $ as $$AppLayout } from '../../../../../chunks/AppLayout_S0x-ecEl.mjs';
import { $ as $$PetBaseTextInput } from '../../../../../chunks/pet-base-text-input_Datu_Lrf.mjs';
import { M as MedicalAppointmentsApiMock } from '../../../../../chunks/medical-appointments.mock_Wgoq_aVA.mjs';
export { renderers } from '../../../../../renderers.mjs';

function getMedicalAppointment(medicalAppointmentId) {
  const medicalAppointment = MedicalAppointmentsApiMock.getMedicalAppointment(medicalAppointmentId);
  return {
    ...medicalAppointment,
    appointmentNumber: Number(medicalAppointmentId) + 1
  };
}

const $$Astro$1 = createAstro();
const $$PetMedicalAppointment = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PetMedicalAppointment;
  const { petId, medicalAppointmentId } = Astro2.props;
  const medicalAppointment = getMedicalAppointment(medicalAppointmentId);
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
  const medicalAppointmentSections = [
    {
      title: "Datos de la cita",
      content: medicalAppointment.details
    },
    {
      title: "Observaciones",
      content: medicalAppointment.observations
    },
    {
      title: "Receta",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro distinctio dolor perferendis, aliquid delectus aperiam laudantium unde voluptatem, laborum mollitia tempora reiciendis accusamus nemo aspernatur. Laboriosam nulla quod harum molestiae."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="p-4 sm:p-6 lg:p-8 h-full"> <h2 class="text-2xl font-bold">Cita médica N° ${medicalAppointment.appointmentNumber}</h2> <form class="flex items-center gap-8 h-full"> <div class="flex flex-col flex-3 items-center rounded-md outline-3 outline-blue-800 px-7 py-15"> <div class="w-fit"> <img src="/src/assets/petProfilePhoto.png" alt="Foto de Pepito" class="rounded-full w-40 h-40 object-cover border"> </div> ${renderComponent($$result, "PetBaseTextInput", $$PetBaseTextInput, { ...inputFields[0], "class": "w-full" })} </div> <div class="flex flex-col flex-4 gap-4 overflow-y-auto"> ${medicalAppointmentSections.map(
    (section) => renderTemplate`<details class="group border border-gray-200 rounded-lg overflow-hidden"> <summary class="flex items-center justify-between p-4 cursor-pointer list-none bg-gray-50 hover:bg-gray-100 transition"> <h3 class="font-semibold text-gray-800">${section.title}</h3> <div class="transition-transform duration-300 group-open:rotate-180"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="6 9 12 15 18 9"></polyline> </svg> </div> </summary> <div class="p-4 border-t border-gray-200 bg-white text-gray-700"> ${section.content} </div> </details>`
  )} </div> </form> </div>`;
}, "/home/user/vitalvetwebapp/src/contexts/medical_histories/presentation/pages/pet-medical-appointment.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$medicalAppointmentId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$medicalAppointmentId;
  const { petId, medicalAppointmentId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PetMedicalAppointmentPage", $$PetMedicalAppointment, { "petId": petId, "medicalAppointmentId": medicalAppointmentId })} ` })}`;
}, "/home/user/vitalvetwebapp/src/pages/app/pets/[petId]/medical-history/[medicalAppointmentId].astro", void 0);

const $$file = "/home/user/vitalvetwebapp/src/pages/app/pets/[petId]/medical-history/[medicalAppointmentId].astro";
const $$url = "/app/pets/[petId]/medical-history/[medicalAppointmentId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$medicalAppointmentId,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
