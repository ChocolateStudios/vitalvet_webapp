import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, o as renderSlot } from './astro/server_C2nqEJVv.mjs';
import 'kleur/colors';
import { $ as $$ClientRouter } from './ClientRouter_B6EMuBoM.mjs';
import { $ as $$Layout } from './Layout_D_FSyrDg.mjs';

const $$AppLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ClientRouter", $$ClientRouter, {})} ${maybeRenderHead()}<div class="flex h-screen bg-gray-100"> <!-- Esta barra lateral persistirá entre las navegaciones de la página --> <aside class="w-64 bg-white shadow-md flex flex-col"> <div class="p-4 text-2xl font-bold">VitalVet</div> <nav class="mt-4 mb-6 flex flex-col justify-between flex-1"> <div> <a href="/app/home" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Pacientes</a> <a href="/app/calendar" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Calendario</a> </div> <div> <a href="/app/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Perfil</a> </div> </nav> </aside> <main class="flex-1">${renderSlot($$result2, $$slots["default"])}</main> </div> ` })}`;
}, "/home/user/vitalvetwebapp/src/layouts/AppLayout.astro", void 0);

export { $$AppLayout as $ };
