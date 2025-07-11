import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_C2nqEJVv.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$PetBaseTextInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PetBaseTextInput;
  const { id, name, type, autocomplete, placeholder, label, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col ${className}`, "class")}> <label${addAttribute(id, "for")} class="text-sm/6 font-medium text-gray-900">${label}</label> <div class="mt-2"> <input${addAttribute(id, "id")}${addAttribute(name, "name")}${addAttribute(type, "type")}${addAttribute(autocomplete, "autocomplete")}${addAttribute(placeholder, "placeholder")} class="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm/6"> </div> <div${addAttribute(`${id}-error-container`, "id")} class="mt-1 text-sm text-red-600 h-4"></div> </div>`;
}, "/home/user/vitalvetwebapp/src/contexts/pets/presentation/components/pet-base-text-input.astro", void 0);

export { $$PetBaseTextInput as $ };
