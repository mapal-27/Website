(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=(e,a,r=[])=>{const n=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(a).forEach(t=>{n.setAttribute(t,String(a[t]))}),r.length&&r.forEach(t=>{const o=q(...t);n.appendChild(o)}),n};var L=([e,a,r])=>q(e,a,r);/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=e=>Array.from(e.attributes).reduce((a,r)=>(a[r.name]=r.value,a),{}),x=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",N=e=>e.flatMap(x).map(r=>r.trim()).filter(Boolean).filter((r,n,t)=>t.indexOf(r)===n).join(" "),P=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(a,r,n)=>r.toUpperCase()+n.toLowerCase()),b=(e,{nameAttr:a,icons:r,attrs:n})=>{var c;const t=e.getAttribute(a);if(t==null)return;const o=P(t),u=r[o];if(!u)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const p=C(e),[d,v,h]=u,l={...v,"data-lucide":t,...n,...p},g=N(["lucide",`lucide-${t}`,p,n]);g&&Object.assign(l,{class:g});const f=L([d,l,h]);return(c=e.parentNode)==null?void 0:c.replaceChild(f,e)};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=["svg",i,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=["svg",i,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=["svg",i,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=["svg",i,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16.5 12"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=["svg",i,[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=["svg",i,[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=["svg",i,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=["svg",i,[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=["svg",i,[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=["svg",i,[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=["svg",i,[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"}],["path",{d:"M3 6h18"}],["path",{d:"M16 10a4 4 0 0 1-8 0"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=["svg",i,[["path",{d:"M7 20h10"}],["path",{d:"M10 20c5.5-2.5.8-6.4 3-10"}],["path",{d:"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"}],["path",{d:"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=["svg",i,[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{d:"M7 2v20"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=["svg",i,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];/**
 * @license lucide v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=({icons:e={},nameAttr:a="data-lucide",attrs:r={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const n=document.querySelectorAll(`[${a}]`);if(Array.from(n).forEach(t=>b(t,{nameAttr:a,icons:e,attrs:r})),a==="data-lucide"){const t=document.querySelectorAll("[icon-name]");t.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(t).forEach(o=>b(o,{nameAttr:"icon-name",icons:e,attrs:r})))}};Z({icons:{ArrowUpRight:I,ArrowRight:O,ArrowLeft:k,Menu:F,Flame:j,Utensils:H,MessageSquare:U,MapPin:V,Clock3:R,Phone:$,Sprout:B,ShoppingBag:T,Search:z,X:K}});const s=document.querySelector(".nav-toggle"),m=document.querySelector(".site-nav");function M(){s==null||s.setAttribute("aria-expanded","false"),s==null||s.setAttribute("aria-label","Open navigation"),m==null||m.classList.remove("is-open")}s==null||s.addEventListener("click",()=>{const e=s.getAttribute("aria-expanded")!=="true";s.setAttribute("aria-expanded",String(e)),s.setAttribute("aria-label",e?"Close navigation":"Open navigation"),m.classList.toggle("is-open",e)});m==null||m.querySelectorAll("a").forEach(e=>e.addEventListener("click",M));document.addEventListener("keydown",e=>{e.key==="Escape"&&(s==null?void 0:s.getAttribute("aria-expanded"))==="true"&&(M(),s.focus())});const A=document.querySelector("[data-load-map]");A==null||A.addEventListener("click",()=>{const e=document.createElement("iframe");e.title="Kwao Thai at 1207 A Esquimalt Road, Victoria",e.src="https://www.google.com/maps?q=Kwao+Thai+1207+A+Esquimalt+Road+Victoria+BC&output=embed",e.referrerPolicy="no-referrer-when-downgrade",e.allowFullscreen=!0,e.tabIndex=0,document.querySelector("[data-map-panel]").replaceChildren(e),e.focus()});const E=document.querySelector("[data-menu-controls]");var S;if(E){let h=function(l=!0){const g=e.value.toLowerCase().trim();let f=0;if(n.forEach(c=>{let y=0;c.querySelectorAll("[data-menu-item]").forEach(w=>{w.hidden=d!=="all"&&c.dataset.menuCategory!==d||!v.get(w).includes(g),w.hidden||y++}),c.hidden=y===0,f+=y}),r.forEach(c=>{const y=c.dataset.menuFilter===d;c.classList.toggle("active",y),c.setAttribute("aria-pressed",String(y))}),a.hidden=e.value.length===0,u.hidden=f!==0,o.textContent=`${f} ${f===1?"dish":"dishes"} shown`,l){const c=new URL(location.href);d==="all"?c.searchParams.delete("category"):c.searchParams.set("category",d),e.value.trim()?c.searchParams.set("q",e.value.trim()):c.searchParams.delete("q"),c.hash="",history.replaceState(null,"",c)}};var X=h;E.hidden=!1;const e=document.querySelector("#menu-search"),a=document.querySelector("[data-clear-search]"),r=[...document.querySelectorAll("[data-menu-filter]")],n=[...document.querySelectorAll("[data-menu-category]")],t=[...document.querySelectorAll("[data-menu-item]")],o=document.querySelector("[data-menu-status]"),u=document.querySelector("[data-menu-empty]"),p=new URLSearchParams(location.search);let d=r.some(l=>l.dataset.menuFilter===p.get("category"))?p.get("category"):"all";e.value=p.get("q")||"";const v=new Map(t.map(l=>[l,l.textContent.toLowerCase()]));r.forEach(l=>l.addEventListener("click",()=>{d=l.dataset.menuFilter,h()})),e.addEventListener("input",()=>h()),a.addEventListener("click",()=>{e.value="",h(),e.focus()}),document.querySelector("[data-menu-reset]").addEventListener("click",()=>{d="all",e.value="",h(),e.focus()}),h(!1),location.hash&&((S=document.getElementById(decodeURIComponent(location.hash.slice(1))))==null||S.scrollIntoView({behavior:"instant"}))}
