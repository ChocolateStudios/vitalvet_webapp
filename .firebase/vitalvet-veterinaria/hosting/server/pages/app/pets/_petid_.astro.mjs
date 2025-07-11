import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, k as renderComponent, n as createTransitionScope, r as renderTemplate } from '../../../chunks/astro/server_C2nqEJVv.mjs';
import 'kleur/colors';
import { $ as $$AppLayout } from '../../../chunks/AppLayout_S0x-ecEl.mjs';
import { $ as $$PetBaseTextInput } from '../../../chunks/pet-base-text-input_Datu_Lrf.mjs';
/* empty css                                         */
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Pet = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pet;
  const { petId } = Astro2.props;
  const inputFields = [
    {
      id: "name",
      name: "name",
      type: "text",
      autocomplete: "name",
      placeholder: "Pepito",
      label: "Nombre"
    },
    {
      id: "owner",
      name: "owner",
      type: "text",
      autocomplete: "owner",
      placeholder: "Manuel Quispe",
      label: "Propietario"
    },
    {
      id: "birthday",
      name: "birthday",
      type: "date",
      autocomplete: "birthday",
      placeholder: "17 / 03 / 2021",
      label: "Fecha de nacimiento"
    },
    {
      id: "age",
      name: "age",
      type: "number",
      autocomplete: "age",
      placeholder: "40",
      label: "Edad"
    },
    {
      id: "species",
      name: "species",
      type: "text",
      autocomplete: "species",
      placeholder: "Perro",
      label: "Especie"
    },
    {
      id: "subspecies",
      name: "subspecies",
      type: "text",
      autocomplete: "subspecies",
      placeholder: "Subespecie",
      label: "Subespecie"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="p-4 sm:p-6 lg:p-8 h-full"> <h2 class="text-2xl font-bold">Datos de la mascota</h2> <form class="flex items-center gap-8 h-full"> <div class="flex flex-col flex-3 items-center rounded-md outline-3 outline-blue-800 px-7 py-15"> <div class="w-fit"> <img src="/src/assets/petProfilePhoto.png" alt="Foto de Pepito" class="rounded-full w-40 h-40 object-cover border"${addAttribute(createTransitionScope($$result, "makz6a5e"), "data-astro-transition-persist")}> </div> ${renderComponent($$result, "PetBaseTextInput", $$PetBaseTextInput, { ...inputFields[0], "class": "w-full" })} </div> <div class="flex flex-col flex-4 rounded-md outline-3 outline-blue-950 px-7 py-8"> ${inputFields.map(
    (input, index) => index > 0 ? renderTemplate`${renderComponent($$result, "PetBaseTextInput", $$PetBaseTextInput, { ...input })}` : ""
  )} <div class="flex flex-col gap-1"> <a href="#" class="rounded-md bg-blue-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">Ver galería</a> <a${addAttribute(`/app/pets/${petId}/medical-history`, "href")} class="rounded-md bg-blue-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">Ver citas médicas</a> <button type="submit" class="rounded-md bg-blue-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">Guardar</button> </div> </div> </form> </div>`;
}, "/home/user/vitalvetwebapp/src/contexts/pets/presentation/pages/pet.astro", "self");

const $$Astro = createAstro();
const prerender = false;
const $$petId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$petId;
  const { petId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PetPage", $$Pet, { "petId": petId })} ` })}`;
}, "/home/user/vitalvetwebapp/src/pages/app/pets/[petId].astro", void 0);

const $$file = "/home/user/vitalvetwebapp/src/pages/app/pets/[petId].astro";
const $$url = "/app/pets/[petId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$petId,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
