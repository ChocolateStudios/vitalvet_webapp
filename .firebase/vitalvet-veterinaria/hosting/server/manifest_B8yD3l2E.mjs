import 'kleur/colors';
import { q as decodeKey } from './chunks/astro/server_C2nqEJVv.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DnUZkrux.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/user/vitalvetwebapp/","cacheDir":"file:///home/user/vitalvetwebapp/node_modules/.astro/","outDir":"file:///home/user/vitalvetwebapp/dist/","srcDir":"file:///home/user/vitalvetwebapp/src/","publicDir":"file:///home/user/vitalvetwebapp/public/","buildClientDir":"file:///home/user/vitalvetwebapp/dist/client/","buildServerDir":"file:///home/user/vitalvetwebapp/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"app/calendar/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/app/calendar","isIndex":false,"type":"page","pattern":"^\\/app\\/calendar\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"calendar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/calendar.astro","pathname":"/app/calendar","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"app/home/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/app/home","isIndex":false,"type":"page","pattern":"^\\/app\\/home\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/home.astro","pathname":"/app/home","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"app/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/app/login","isIndex":false,"type":"page","pattern":"^\\/app\\/login\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/login.astro","pathname":"/app/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"app/profile/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/app/profile","isIndex":false,"type":"page","pattern":"^\\/app\\/profile\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/profile.astro","pathname":"/app/profile","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"app/register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/app/register","isIndex":false,"type":"page","pattern":"^\\/app\\/register\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/register.astro","pathname":"/app/register","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"app/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/app","isIndex":true,"type":"page","pattern":"^\\/app\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/index.astro","pathname":"/app","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/calendar.Drp41s2o.css"}],"routeData":{"route":"/app/pets/[petid]/medical-history/[medicalappointmentid]","isIndex":false,"type":"page","pattern":"^\\/app\\/pets\\/([^/]+?)\\/medical-history\\/([^/]+?)\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"pets","dynamic":false,"spread":false}],[{"content":"petId","dynamic":true,"spread":false}],[{"content":"medical-history","dynamic":false,"spread":false}],[{"content":"medicalAppointmentId","dynamic":true,"spread":false}]],"params":["petId","medicalAppointmentId"],"component":"src/pages/app/pets/[petId]/medical-history/[medicalAppointmentId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/calendar.Drp41s2o.css"}],"routeData":{"route":"/app/pets/[petid]/medical-history","isIndex":false,"type":"page","pattern":"^\\/app\\/pets\\/([^/]+?)\\/medical-history\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"pets","dynamic":false,"spread":false}],[{"content":"petId","dynamic":true,"spread":false}],[{"content":"medical-history","dynamic":false,"spread":false}]],"params":["petId"],"component":"src/pages/app/pets/[petId]/medical-history.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"},{"type":"external","src":"/_astro/calendar.Drp41s2o.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0;mix-blend-mode:plus-lighter}to{opacity:1;mix-blend-mode:plus-lighter}}@keyframes astroFadeOut{0%{opacity:1;mix-blend-mode:plus-lighter}to{opacity:0;mix-blend-mode:plus-lighter}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/app/pets/[petid]","isIndex":false,"type":"page","pattern":"^\\/app\\/pets\\/([^/]+?)\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"pets","dynamic":false,"spread":false}],[{"content":"petId","dynamic":true,"spread":false}]],"params":["petId"],"component":"src/pages/app/pets/[petId].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/user/vitalvetwebapp/src/contexts/pets/presentation/pages/pet.astro",{"propagation":"in-tree","containsHead":false}],["/home/user/vitalvetwebapp/src/pages/app/pets/[petId].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/app/pets/[petId]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/user/vitalvetwebapp/src/pages/app/calendar.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/home.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/pets/[petId]/medical-history.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/pets/[petId]/medical-history/[medicalAppointmentId].astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/profile.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/index.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/login.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/app/register.astro",{"propagation":"none","containsHead":true}],["/home/user/vitalvetwebapp/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/app/calendar@_@astro":"pages/app/calendar.astro.mjs","\u0000@astro-page:src/pages/app/home@_@astro":"pages/app/home.astro.mjs","\u0000@astro-page:src/pages/app/login@_@astro":"pages/app/login.astro.mjs","\u0000@astro-page:src/pages/app/pets/[petId]/medical-history/[medicalAppointmentId]@_@astro":"pages/app/pets/_petid_/medical-history/_medicalappointmentid_.astro.mjs","\u0000@astro-page:src/pages/app/pets/[petId]/medical-history@_@astro":"pages/app/pets/_petid_/medical-history.astro.mjs","\u0000@astro-page:src/pages/app/pets/[petId]@_@astro":"pages/app/pets/_petid_.astro.mjs","\u0000@astro-page:src/pages/app/profile@_@astro":"pages/app/profile.astro.mjs","\u0000@astro-page:src/pages/app/register@_@astro":"pages/app/register.astro.mjs","\u0000@astro-page:src/pages/app/index@_@astro":"pages/app.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B8yD3l2E.mjs","/home/user/vitalvetwebapp/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/home/user/vitalvetwebapp/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CpTTmnWB.mjs","/home/user/vitalvetwebapp/src/contexts/auth/presentation/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.D7mMjHnh.js","/home/user/vitalvetwebapp/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/user/vitalvetwebapp/src/contexts/auth/presentation/pages/login.astro?astro&type=script&index=0&lang.ts","const i=document.getElementById(\"login-form\");if(i){const n=document.getElementById(\"email\"),s=document.getElementById(\"password\"),a=(e,o)=>{const t=document.getElementById(`${e.id}-error-container`);t&&(t.textContent=o),e.classList.remove(\"outline-gray-300\",\"focus:outline-blue-800\"),e.classList.add(\"outline-red-500\",\"focus:outline-red-500\")},l=e=>{const o=document.getElementById(`${e.id}-error-container`);o&&(o.textContent=\"\"),e.classList.remove(\"outline-red-500\",\"focus:outline-red-500\"),e.classList.add(\"outline-gray-300\",\"focus:outline-blue-800\")};i.addEventListener(\"submit\",e=>{e.preventDefault(),l(n),l(s);const o=n.value,t=s.value;let r=!0;o?/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(o)||(a(n,\"Por favor, introduce un correo válido\"),r=!1):(a(n,\"El correo es obligatorio\"),r=!1),t?t.length<6&&(a(s,\"La contraseña debe tener al menos 6 caracteres\"),r=!1):(a(s,\"La contraseña es obligatoria\"),r=!1),r&&(console.log(\"Formulario válido. Redirigiendo a /app/home...\"),window.location.href=\"/app/home\")})}"]],"assets":["/_astro/calendar.Drp41s2o.css","/favicon.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/app/calendar/index.html","/app/home/index.html","/app/login/index.html","/app/profile/index.html","/app/register/index.html","/app/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"8Jpq8/cE8J5tkoDGfBFMZUegs3PlhD2ArkS6NbGfOXs=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/user/vitalvetwebapp/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
