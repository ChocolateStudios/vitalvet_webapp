import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DDjY1BeH.mjs';
import { manifest } from './manifest_B8yD3l2E.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/app/calendar.astro.mjs');
const _page2 = () => import('./pages/app/home.astro.mjs');
const _page3 = () => import('./pages/app/login.astro.mjs');
const _page4 = () => import('./pages/app/pets/_petid_/medical-history/_medicalappointmentid_.astro.mjs');
const _page5 = () => import('./pages/app/pets/_petid_/medical-history.astro.mjs');
const _page6 = () => import('./pages/app/pets/_petid_.astro.mjs');
const _page7 = () => import('./pages/app/profile.astro.mjs');
const _page8 = () => import('./pages/app/register.astro.mjs');
const _page9 = () => import('./pages/app.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/app/calendar.astro", _page1],
    ["src/pages/app/home.astro", _page2],
    ["src/pages/app/login.astro", _page3],
    ["src/pages/app/pets/[petId]/medical-history/[medicalAppointmentId].astro", _page4],
    ["src/pages/app/pets/[petId]/medical-history.astro", _page5],
    ["src/pages/app/pets/[petId].astro", _page6],
    ["src/pages/app/profile.astro", _page7],
    ["src/pages/app/register.astro", _page8],
    ["src/pages/app/index.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/user/vitalvetwebapp/dist/client/",
    "server": "file:///home/user/vitalvetwebapp/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
