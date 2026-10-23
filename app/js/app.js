"use strict";
// AM PARFUMS Atelier interface: tab bar, large-title screens, grouped lists and bottom sheets.

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

// ---------- Icons ----------
const I=(d,extra="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const ICON={
  flask:I('<path d="M9.5 3h5M10.5 3v5.5L5 18.2A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-2.8L13.5 8.5V3"/><path d="M7.4 15h9.2"/>'),
  timer:I('<path d="M6.5 3h11M6.5 21h11"/><path d="M7.5 3c0 4.5 4.5 6 4.5 9s-4.5 4.5-4.5 9M16.5 3c0 4.5-4.5 6-4.5 9s4.5 4.5 4.5 9"/>'),
  book:I('<path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12.5v15H7a2.5 2.5 0 0 0-2.5 2.5z"/><path d="M4.5 20.5V5.5M19.5 18v3H7"/><path d="M9 7.5h6.5"/>'),
  studio:I('<path d="M4 6.5h9M17 6.5h3M4 12h3M11 12h9M4 17.5h11M19 17.5h1"/><circle cx="15" cy="6.5" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17.5" r="2"/>'),
  chev:I('<path d="M9 5.5l6.5 6.5L9 18.5"/>','class="chev"'),
  check:I('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  copy:I('<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>'),
  bookmark:I('<path d="M6.5 3.5h11v17L12 16.5l-5.5 4z"/>'),
  seal:I('<path d="M12 3l2.3 1.7 2.9-.2.9 2.7 2.4 1.6-.9 2.7.9 2.7-2.4 1.6-.9 2.7-2.9-.2L12 21l-2.3-1.7-2.9.2-.9-2.7-2.4-1.6.9-2.7-.9-2.7 2.4-1.6.9-2.7 2.9.2z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>'),
  sparkle:I('<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"/><path d="M18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>'),
  plus:I('<path d="M12 5v14M5 12h14"/>'),
  trash:I('<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>'),
  share:I('<path d="M12 15V3.5M7.5 8L12 3.5 16.5 8"/><path d="M6 11.5H5v9h14v-9h-1"/>'),
  download:I('<path d="M12 3.5V15M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>'),
  info:I('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.1"/>'),
  search:I('<circle cx="10.8" cy="10.8" r="6.3"/><path d="M15.5 15.5l4.5 4.5"/>'),
  person:I('<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c1.2-3.9 4.1-5.8 7.5-5.8s6.3 1.9 7.5 5.8"/>'),
  cloud:I('<path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.5 9.2 4.7 4.7 0 0 0 7 18.5z"/>'),
  stop:I('<rect x="7" y="7" width="10" height="10" rx="2"/>'),
};

// ---------- Small helpers ----------
const plural=(n,w)=>`${n} ${w}${n===1?"":"s"}`;
function haptic(){try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}}
let toastTimer=null;
function toast(msg,err){const t=$("#toast");t.textContent=String(msg).replace(/<[^>]*>/g,"");t.className="toast show"+(err?" err":"");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.className="toast"+(err?" err":""),err?5200:2600)}
window.addEventListener("error",e=>toast("Something went wrong: "+String(e.message||e.error).slice(0,140),true));
window.addEventListener("unhandledrejection",e=>toast("Something went wrong: "+String((e.reason&&(e.reason.message||e.reason.code))||e.reason).slice(0,140),true));

function seg(key,opts,cur,act="seg"){return`<div class="seg" role="group">${opts.map(([v,l])=>`<button type="button" data-act="${act}" data-key="${key}" data-v="${esc(v)}" aria-pressed="${String(v)===String(cur)}">${esc(l||v)}</button>`).join("")}</div>`}
function selectRow(key,title,opts,cur){const label=(opts.find(([v])=>String(v)===String(cur))||opts[0])[1];
  return`<label class="row"><span class="row-title">${title}</span><span class="row-value" data-val="${key}">${esc(label)}</span>${ICON.chev}
  <select class="row-select" data-key="${key}" aria-label="${title}">${opts.map(([v,l])=>`<option value="${esc(v)}"${String(v)===String(cur)?" selected":""}>${esc(l)}</option>`).join("")}</select></label>`}
function switchRow(key,title,sub){return`<label class="row"><span class="row-text"><span class="row-title">${title}</span>${sub?`<span class="row-sub">${sub}</span>`:""}</span><input type="checkbox" class="switch" data-key="${key}" ${state[key]?"checked":""}></label>`}
function linkRow(act,title,value,icon,extra=""){return`<button type="button" class="row link" data-act="${act}" ${extra}>${icon?`<span class="row-icon">${icon}</span>`:""}<span class="row-title">${title}</span><span class="row-value">${value??""}</span>${ICON.chev}</button>`}

async function copyText(t,label="Copied"){try{await navigator.clipboard.writeText(t);toast(label);haptic()}catch(e){openSheet({title:"Copy",render:()=>`<div class="pad"><p class="sec-f">Select all and copy.</p><textarea class="field-area mono" rows="14" readonly>${esc(t)}</textarea></div>`,mount:sh=>{const ta=$("textarea",sh.body);ta.focus();ta.select()}})}}

// ---------- Claude bridge (works when opened inside Claude; otherwise offline drafts) ----------
let sampleFn=null,dbFn=null,downloadsFn=null;
async function initClaude(){if(!window.claude)return;
  try{sampleFn=await window.claude.use("sample")}catch(e){sampleFn=null}
  try{dbFn=await window.claude.use("db")}catch(e){dbFn=null}
  try{downloadsFn=await window.claude.use("downloads")}catch(e){downloadsFn=null}}

// ---------- Batches and library persistence ----------
function bLocalLoad(){const v=store.get(BKEY,[]);return Array.isArray(v)?v:[]}
function bLocalSave(){store.set(BKEY,B.list)}
async function bPut(x){const i=B.list.findIndex(y=>y.id===x.id);if(i>=0)B.list[i]=x;else B.list.unshift(x);
  if(B.db){try{await B.db.collection("batches").doc(x.id).set(x)}catch(e){toast("Could not save to your account; kept on this device.",true);bLocalSave()}}else bLocalSave();refresh()}
async function bDel(id){B.list=B.list.filter(x=>x.id!==id);if(B.db){try{await B.db.collection("batches").doc(id).delete()}catch(e){}}else bLocalSave();refresh()}
function libLocalLoad(){const v=store.get(LKEY,{});return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}
async function libPut(id,x){LIB.map[id]=x;libChanged();if(LIB.db){try{await LIB.db.collection("library").doc(id).set(x)}catch(e){store.set(LKEY,LIB.map)}}else store.set(LKEY,LIB.map)}
function initData(){
  if(dbFn){B.db=dbFn;LIB.db=dbFn;
    dbFn.collection("batches").onSnapshot(snap=>{B.list=snap.docs.map(d=>({...d.data(),id:d.id})).sort((a,z)=>(z.approvedAt||0)-(a.approvedAt||0));B.ready=true;refresh()},
      ()=>{B.db=null;B.list=bLocalLoad();B.ready=true;refresh()});
    dbFn.collection("library").onSnapshot(snap=>{const m={};snap.docs.forEach(d=>{m[d.id]=d.data()});LIB.map=m;LIB.ready=true;libChanged();refresh()},
      ()=>{LIB.db=null;LIB.map=libLocalLoad();LIB.ready=true;libChanged();refresh()})}
  else{B.list=bLocalLoad();B.ready=true;LIB.map=libLocalLoad();LIB.ready=true;libChanged()}}

// ---------- Sheets ----------
const sheets=[];
function openSheet({title="",render,mount,cls="",onClose,headless=false,props={}}){
  const wrap=document.createElement("div");wrap.className="sheet-wrap";
  wrap.innerHTML=`<div class="sheet-backdrop" data-act="closeSheet"></div><div class="sheet ${cls}" role="dialog" aria-modal="true" aria-label="${esc(title||"Details")}">
    <div class="sheet-head${headless?" floating":""}"><span class="sheet-grab"></span><span class="sheet-title">${esc(title)}</span><button type="button" class="nav-btn" data-act="closeSheet">Done</button></div>
    <div class="sheet-body"></div></div>`;
  document.body.appendChild(wrap);
  const sh={wrap,el:$(".sheet",wrap),body:$(".sheet-body",wrap),render,onClose,pending:false,
    draw(){const top=this.body.scrollTop;this.body.innerHTML=this.render(this);this.body.scrollTop=top;mount&&mount(this)},
    close(){closeSheet(this)}};
  Object.assign(sh,props);wrap._sheet=sh;sheets.push(sh);sh.draw();
  sheets.forEach((s,i)=>s.wrap.classList.toggle("under",i<sheets.length-1));
  $("#stage").classList.add("stacked");
  requestAnimationFrame(()=>requestAnimationFrame(()=>wrap.classList.add("open")));
  dragToDismiss(sh);
  sh.body.addEventListener("focusout",()=>setTimeout(()=>{if(sh.pending&&!sh.body.contains(document.activeElement))redrawSheet(sh)},0));
  return sh}
function closeSheet(sh){if(!sh||sh.closing)return;sh.closing=true;sh.wrap.classList.remove("open");
  const i=sheets.indexOf(sh);if(i>=0)sheets.splice(i,1);
  sheets.forEach((s,j)=>s.wrap.classList.toggle("under",j<sheets.length-1));
  if(!sheets.length)$("#stage").classList.remove("stacked");
  setTimeout(()=>sh.wrap.remove(),420);sh.onClose&&sh.onClose()}
function redrawSheet(sh){const ae=document.activeElement;if(ae&&sh.body.contains(ae)&&/INPUT|TEXTAREA|SELECT/.test(ae.tagName)){sh.pending=true;return}sh.pending=false;sh.draw()}
function dragToDismiss(sh){const head=$(".sheet-head",sh.wrap);let y0=null,dy=0;
  const move=e=>{if(y0===null)return;dy=Math.max(0,(e.touches?e.touches[0].clientY:e.clientY)-y0);sh.el.style.transform=`translateY(${dy}px)`};
  const end=()=>{if(y0===null)return;sh.el.classList.remove("dragging");sh.el.style.transform="";if(dy>110)closeSheet(sh);y0=null;dy=0};
  head.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;y0=e.clientY;dy=0;sh.el.classList.add("dragging");head.setPointerCapture(e.pointerId)});
  head.addEventListener("pointermove",move);head.addEventListener("pointerup",end);head.addEventListener("pointercancel",end)}
const topSheet=el=>{const w=el&&el.closest(".sheet-wrap");return w?w._sheet:null};

// ---------- Tabs and screens ----------
let curTab="create";
function showTab(name){curTab=name;$$(".screen").forEach(s=>s.hidden=s.dataset.tab!==name);$$(".tab").forEach(t=>t.setAttribute("aria-selected",String(t.dataset.tab===name)));renderTab(name)}
function renderTab(name){({create:renderCreate,batches:renderBatches,library:renderLibrary,studio:renderStudio}[name]||(()=>{}))()}
function refresh(){updateBadges();if(curTab==="batches")renderBatches();if(curTab==="library")renderLibraryList();if(curTab==="studio")renderStudio();sheets.forEach(sh=>sh.live&&redrawSheet(sh))}
function updateBadges(){const open=B.list.filter(x=>bStage(x)==="ready").length;const bb=$("#badge-batches");bb.textContent=open||"";bb.hidden=!open;
  let rv=0;try{const st=libStats();rv=st.drafted-st.confirmed}catch(e){}const lb=$("#badge-library");lb.textContent=rv||"";lb.hidden=!rv}
function screenHead(title,eyebrow){return`<header class="hero">${eyebrow?`<p class="eyebrow">${eyebrow}</p>`:""}<h1 class="large-title">${title}</h1></header>`}

// ---------- Create ----------
const OCC_OPTS=["Any","Office","Daytime casual","Evening","Date night","Special event"].map(x=>[x,x]);
const SIZE_OPTS=[5,10,15,30,50].map(x=>[x,x+" mL"]);
const CONC_OPTS=[[12,"EDT · 12%"],[20,"EDP · 20%"],[25,"Parfum · 25%"],[30,"Extrait · 30%"],[100,"Oil only"]];
const DPG_OPTS=[["auto","Auto"],["0","None"],["1","1%"],["2","2%"],["3","3%"],["5","5%"]];
function renderCreate(){
  const el=$("#scr-create .content");
  el.innerHTML=`${screenHead("Atelier","AM PARFUMS · The Meridian Files")}
  <section id="drafts" aria-live="polite"></section>
  <h2 class="sec-h">The brief</h2>
  <div class="group">
    <div class="row stack"><span class="row-title">Wear it for</span>${seg("season",[["Everyday","Daily"],["Spring"],["Summer"],["Fall"],["Winter"]],state.season)}</div>
    ${selectRow("occasion","Occasion",OCC_OPTS,state.occasion)}
    <div class="row stack"><span class="row-title">Projection</span>${seg("intensity",[["Soft, close to skin","Soft"],["Moderate"],["Bold, room filling","Bold"]],state.intensity)}</div>
  </div>
  <h2 class="sec-h">Concept</h2>
  <div class="group"><textarea class="field-area" data-key="concept" rows="3" placeholder="A smoky leather library with a cold citrus opening">${esc(state.concept)}</textarea></div>
  <p class="sec-f">Optional. Words like smoky, rose, tea or vanilla steer which of your oils lead.</p>
  <h2 class="sec-h">Bottle</h2>
  <div class="group">
    ${selectRow("batch","Size",SIZE_OPTS,state.batch)}
    ${selectRow("conc","Strength",CONC_OPTS,state.conc)}
    ${selectRow("dpg","Plant Guru DPG",DPG_OPTS,state.dpg)}
  </div>
  <p class="sec-f">Measured by weight. Auto adds DPG only when a formula is heavy in thick, resinous oils, and never more than 5%.</p>
  <h2 class="sec-h">Materials</h2>
  <div class="group">
    ${switchRow("allowDiluted","Roll-ons & body oils","Diluted products, strength unknown")}
    ${switchRow("allowFinished","Finished perfumes",`${COLLECTION_SIZE} bottles in your collection`)}
    ${switchRow("allowEO","Essential oil accents","Added in whole drops")}
    ${linkRow("inventory","Inventory",`<span id="invCount">${inventoryCount()}</span> on hand`)}
    ${linkRow("roster","Names to avoid",rosterNames().length||"None")}
  </div>
  <div class="cta" id="cta"></div>
  <button type="button" class="btn-plain" data-act="copyBrief">${ICON.copy}<span>Copy the full AI brief</span></button>
  <p class="sec-f center">Drafts are untested predictions. Weigh on your 0.001 g scale and check supplier skin limits before wearing.</p>`;
  renderDrafts();renderCTA()}
function renderCTA(){const el=$("#cta");if(!el)return;
  el.innerHTML=state.busy?`<button type="button" class="btn-primary busy" data-act="stop"><span class="spinner"></span><span id="busyT">Composing…</span><span class="btn-sub">Tap to stop</span></button>`
   :`<button type="button" class="btn-primary" data-act="compose">${ICON.sparkle}<span>${sampleFn?"Compose 3 formulas":"Compose 3 drafts"}</span></button>`}
function pyramid(s){const share={top:0,heart:0,base:0};const tot=(s.ingredients||[]).reduce((a,x)=>a+(+x.pct||0),0)||1;(s.ingredients||[]).forEach(x=>share[x.role]=(share[x.role]||0)+(+x.pct||0)/tot*100);return share}
function pyrBar(sh){return`<span class="pyr"><i style="width:${sh.top}%;background:var(--top)"></i><i style="width:${sh.heart}%;background:var(--heart)"></i><i style="width:${sh.base}%;background:var(--base)"></i></span>`}
function shortName(n){return String(n).replace(/\s*\((?:Old Edition|house blend)\)/i,"")}
function draftCard(s,i){const O=ORGS[orgOf(s)];const chk=formulaChecks(s);const sh=pyramid(s);const tot=(s.ingredients||[]).reduce((a,x)=>a+(+x.pct||0),0)||1;
  const oils=[...(s.ingredients||[])].sort((a,z)=>z.pct-a.pct).slice(0,4).map(x=>`<span class="oil"><b>${Math.round(x.pct/tot*100)}%</b>${esc(shortName(BYID[x.id]?.n||x.id))}</span>`).join("");
  return`<button type="button" class="dcard lux" data-act="openDraft" data-i="${i}" style="--org:${O.accent}" aria-label="Open ${esc(s.name)}">
    <span class="lux-motif">${motifSVG((s.label||{}).motif||O.motif)}</span>
    <span class="dcard-top"><span class="chip-org">${esc(O.short)}</span><span class="chip-ghost">${esc(alignOf(s))}</span><span class="dcard-n">${i+1}/${state.suggestions.length}</span></span>
    <span class="dcard-name">${esc(s.name)}</span>
    <span class="dcard-tag">${esc(s.tagline||"")}</span>
    <span class="dcard-oils">${oils}</span>
    ${pyrBar(sh)}
    <span class="dcard-foot"><span class="${chk.clashes.length?"warn":"ok"}">${chk.clashes.length?"Clash risk":"Classic pairings"}</span><span class="open">View formula ${ICON.chev}</span></span>
  </button>`}
function renderDrafts(){const el=$("#drafts");if(!el)return;
  if(state.busy){el.innerHTML=`<div class="carousel">${[0,1,2].map(()=>`<div class="dcard lux skeleton"><span class="sk w40"></span><span class="sk w70 tall"></span><span class="sk w55"></span><span class="sk w90"></span><span class="sk w80"></span></div>`).join("")}</div><p class="sec-f center" id="busyNote">Claude is composing three formulas from your inventory…</p>`;return}
  const err=state.draftErr?`<div class="group callout warn"><div class="pad-s"><b>${esc(state.draftErr)}</b><div class="btn-row"><button type="button" class="btn-tinted" data-act="compose">Try again</button><button type="button" class="btn-tinted" data-act="offline">Offline drafts</button></div></div></div>`:"";
  if(!state.suggestions.length){el.innerHTML=err+`<div class="empty-card"><b>No drafts yet</b><span>Set the brief below and tap Compose.</span></div>`;return}
  const src=state.source==="claude"?"Composed by Claude":"Offline drafts";
  el.innerHTML=`${err}<div class="sec-row"><h2 class="sec-h">${src}</h2><span class="sec-meta">${esc(state.brief.season)} · ${esc(state.brief.occasion)} · ${state.brief.batch} mL</span></div>
   <div class="carousel" id="carousel">${state.suggestions.map(draftCard).join("")}</div>
   <div class="dots">${state.suggestions.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`;
  const car=$("#carousel");car.addEventListener("scroll",()=>{const w=car.firstElementChild?car.firstElementChild.getBoundingClientRect().width+12:1;const k=Math.round(car.scrollLeft/w);$$(".dots i",el).forEach((d,j)=>d.classList.toggle("on",j===k))},{passive:true})}

let runCtl=null,runTimer=null;
async function compose(){if(state.busy)return;haptic();
  const b=brief();state.brief=b;state.draftErr="";$("#scr-create").scrollTo({top:0,behavior:"smooth"});
  if(!sampleFn){state.shuffle++;state.suggestions=localSuggest(b);state.source="local";renderDrafts();
    toast(state.suggestions.length?"Three new drafts ready":"No suitable materials enabled. Check your inventory.",!state.suggestions.length);return}
  state.busy={t0:Date.now(),writing:false};runCtl=new AbortController();renderDrafts();renderCTA();
  runTimer=setInterval(()=>{const t=$("#busyT");if(t)t.textContent=`${state.busy.writing?"Writing":"Thinking"} · ${Math.round((Date.now()-state.busy.t0)/1000)}s`},1000);
  try{const res=await sampleFn.json(buildPrompt(b),{modelTier:"default",cache:false,signal:runCtl.signal,onText:()=>{if(state.busy)state.busy.writing=true}});
    const{out,dropped}=sanitize(res&&res.suggestions,b);if(!out.length)throw{code:"invalid_json"};
    state.suggestions=out;state.source="claude";
    toast(dropped.length?`Ready. Removed ${plural(dropped.length,"material")} not in your inventory.`:"Three formulas ready")}
  catch(err){const code=err&&err.code;
    if(code==="cancelled")toast("Stopped. Your previous drafts are unchanged.");
    else{if(code==="not_granted"||code==="sampling_disabled")sampleFn=null;state.draftErr=(ERR[code]||"Claude could not finish this time.")+(code?` (${code})`:"");toast(state.draftErr,true)}}
  finally{state.busy=null;clearInterval(runTimer);renderDrafts();renderCTA()}}
function liveBriefUpdate(){if(!state.suggestions.length||!state.brief)return;
  state.brief={...state.brief,batch:+state.batch,conc:+state.conc,dpgPct:dpgSel(),allowEO:!!state.allowEO,allowDiluted:!!state.allowDiluted,allowFinished:!!state.allowFinished};
  renderDrafts();sheets.forEach(sh=>sh.ctx&&sh.ctx.live&&redrawSheet(sh))}

// ---------- Label art ----------
function motifPath(m,a){const c=`fill="none" stroke="${a}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
  switch(m){
   case"crescent":return`<path d="M205 150a52 52 0 1 0 0 100a40 40 0 1 1 0-100z" fill="${a}"/>`;
   case"flame":return`<path d="M190 255c-34 0-50-26-44-52c6-24 30-32 30-62c22 18 26 36 20 54c14-6 20-18 18-30c20 22 26 42 18 60c-8 18-22 30-42 30z" fill="${a}"/>`;
   case"thorn":return`<path d="M190 255V145M190 220l-30-22M190 190l30-24M190 168l-22-18" ${c}/><path d="M160 198l-8 10M220 166l8 10" ${c}/>`;
   case"wave":return`<path d="M135 215c18-24 36-24 55 0s37 24 55 0M135 190c18-24 36-24 55 0s37 24 55 0M135 240c18-24 36-24 55 0s37 24 55 0" ${c}/>`;
   case"shard":return`<path d="M190 140l28 58l-28 58l-28-58z" fill="${a}"/><path d="M190 140v116" stroke="#0004" stroke-width="2"/>`;
   case"crown":return`<path d="M142 245l-6-70l32 28l22-46l22 46l32-28l-6 70z" fill="${a}"/>`;
   case"bolt":return`<path d="M204 140l-46 66h30l-14 50l48-70h-30z" fill="${a}"/>`;
   case"eye":return`<path d="M135 198c30-40 80-40 110 0c-30 40-80 40-110 0z" ${c}/><circle cx="190" cy="198" r="16" fill="${a}"/>`;
   case"shield":return`<path d="M190 140l52 18v38c0 32-22 50-52 62c-30-12-52-30-52-62v-38z" ${c}/><path d="M190 162v76M160 192h60" stroke="${a}" stroke-width="4"/>`;
   default:return`<circle cx="190" cy="198" r="52" ${c}/><path d="M190 146v104M138 198h104M153 161l74 74M227 161l-74 74" stroke="${a}" stroke-width="3"/>`;}}
function motifSVG(m){return`<svg viewBox="120 125 140 145" aria-hidden="true">${motifPath(m,"currentColor")}</svg>`}
let svgN=0;
function labelSVG(s,b){const O=ORGS[orgOf(s)];const id="l"+(++svgN);const lines=wrapName(s.name);const longest=Math.max(...lines.map(l=>l.length));
  const fs=Math.min(30,Math.floor(290/(longest*.72)));const notes=((s.label||{}).notes||[]).slice(0,4).map(x=>String(x).toUpperCase()).join(" · ");
  const ny=lines.length>1?[92,92+fs*1.1]:[106];
  const corner=(x,y,sx,sy)=>`<path d="M${x} ${y+sy*34}V${y}H${x+sx*34}M${x+sx*8} ${y+sy*20}V${y+sy*8}H${x+sx*20}" fill="none" stroke="url(#g${id})" stroke-width="1.6"/>`;
  return`<svg class="label-svg" viewBox="0 0 380 380" role="img" aria-label="Label preview for ${esc(s.name)}">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1d58e"/><stop offset=".5" stop-color="#c9a24a"/><stop offset="1" stop-color="#8f6c25"/></linearGradient>
  <radialGradient id="r${id}" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="${O.accent}" stop-opacity=".32"/><stop offset="1" stop-color="${O.accent}" stop-opacity="0"/></radialGradient></defs>
  <rect width="380" height="380" fill="#0d0c0b"/><rect width="380" height="380" fill="url(#r${id})"/>
  <rect x="14" y="14" width="352" height="352" fill="none" stroke="url(#g${id})" stroke-width="2"/><rect x="22" y="22" width="336" height="336" fill="none" stroke="url(#g${id})" stroke-width=".8" opacity=".7"/>
  ${corner(30,30,1,1)}${corner(350,30,-1,1)}${corner(30,350,1,-1)}${corner(350,350,-1,-1)}
  <text x="190" y="56" text-anchor="middle" fill="url(#g${id})" font-family="Didot,'Bodoni 72','Bodoni Moda',Georgia,serif" font-size="12" letter-spacing="6">AM PARFUMS</text>
  ${lines.map((l,k)=>`<text x="190" y="${ny[k]}" text-anchor="middle" fill="#f4e7c3" font-family="Didot,'Bodoni 72','Bodoni Moda',Georgia,serif" font-weight="700" font-size="${fs}" letter-spacing="1.5">${esc(l)}</text>`).join("")}
  <g transform="translate(190 210) scale(.62) translate(-190 -198)" opacity=".95">${motifPath((s.label||{}).motif||O.motif,`url(#g${id})`)}</g>
  <text x="190" y="290" text-anchor="middle" fill="#d9c08a" font-family="-apple-system,system-ui,sans-serif" font-size="${notes.length>34?9:10.5}" letter-spacing="1.6">${esc(notes)}</text>
  <path d="M150 304h80" stroke="url(#g${id})" stroke-width=".8"/>
  <text x="190" y="322" text-anchor="middle" fill="#f4e7c3" font-family="-apple-system,system-ui,sans-serif" font-size="11" letter-spacing="2">${esc(b.batch)} mL</text>
  <text x="190" y="346" text-anchor="middle" fill="url(#g${id})" font-family="Didot,'Bodoni 72','Bodoni Moda',Georgia,serif" font-size="10" letter-spacing="4.5">THE MERIDIAN FILES</text></svg>`}

// ---------- Formula detail ----------
function openFormula(ctx){return openSheet({title:"",headless:true,cls:"tall",render:formulaView,props:{ctx,tab:"recipe",done:new Set(),live:true}})}
const ctxBrief=ctx=>ctx.live?state.brief:ctx.b;
function formulaView(sh){const ctx=sh.ctx;const s=ctx.s,b=ctxBrief(ctx);const O=ORGS[orgOf(s)];
  const tabs=[["recipe","Recipe"],["story","Character"],["label","Label"],["notes","Analysis"]];
  const body={recipe:recipeTab,story:storyTab,label:labelTab,notes:analysisTab}[sh.tab](s,b,sh);
  return`<div class="fhero lux" style="--org:${O.accent}">
    <span class="lux-motif big">${motifSVG((s.label||{}).motif||O.motif)}</span>
    <span class="dcard-top"><span class="chip-org">${esc(O.short)}</span><span class="chip-ghost">${esc(alignOf(s))}</span></span>
    <h2 class="fhero-name">${esc(s.name)}</h2>
    <p class="dcard-tag">${esc(s.tagline||"")}</p>
    <span class="lock ${s.nameLocked?"on":""}">${s.nameLocked?ICON.seal+"Name approved":"Name pending approval"}</span>
  </div>
  <div class="pad sticky-seg">${seg("ftab",tabs,sh.tab,"ftab")}</div>
  <div class="tabbody">${body}</div>
  <div class="sheet-actions">
    <button type="button" class="act" data-act="fsave">${ICON.bookmark}<span>Save</span></button>
    <button type="button" class="act" data-act="fcopy">${ICON.copy}<span>Copy</span></button>
    ${s.nameLocked?`<button type="button" class="act primary" data-act="ftab" data-v="label">${ICON.seal}<span>Label brief</span></button>`
      :`<button type="button" class="act primary" data-act="flock">${ICON.seal}<span>Approve name</span></button>`}
  </div>`}
function recipeTab(s,b,sh){const c=compute(s,b);const u=state.units;
  const tot=c.ing.reduce((a,x)=>a+x.pct,0)||1;const ordered=[...c.ing].sort((a,z)=>ROLE_ORDER[z.role]-ROLE_ORDER[a.role]);
  const totG=c.ing.reduce((a,x)=>a+x.g,0)+c.eo.reduce((a,x)=>a+x.g,0)+c.dpgG+c.alcG;
  const prim=(drops,ml,g)=>u==="g"?`${f3(g)} g`:u==="ml"?`${f2(ml)} mL`:`${drops} drop${drops===1?"":"s"}`;
  const sec=(drops,ml,g)=>[u!=="drops"&&drops!=null?`${drops} dr`:null,u!=="ml"?`${f2(ml)} mL`:null,u!=="g"?`${f3(g)} g`:null].filter(Boolean).join(" · ");
  const steps=[];
  ordered.forEach(x=>{const d=Math.max(1,Math.round(x.drops));steps.push({role:x.role,label:x.role,name:x.mat.n,meta:`${Math.round(x.pct/tot*100)}% of oils · ${FORM_SHORT[x.mat.f]} · ${x.mat.s}`,why:x.purpose||"",p:prim(d,x.ml,x.g),q:sec(d,x.ml,x.g)})});
  c.eo.forEach(e=>steps.push({role:"eo",label:"EO",name:e.mat.n+" essential oil",meta:e.mat.s,why:e.purpose||"",p:`${e.drops} drop${e.drops>1?"s":""}`,q:`${f3(e.g)} g`}));
  if(c.dpgMl>0)steps.push({role:"carrier",label:"DPG",name:"Dipropylene glycol",meta:"After the oils, before alcohol. Swirl 30 s until clear.",why:"",p:u==="ml"?`${f2(c.dpgMl)} mL`:`${f3(c.dpgG)} g`,q:u==="ml"?`${f3(c.dpgG)} g`:`${f2(c.dpgMl)} mL`});
  if(c.alcMl>0)steps.push({role:"carrier",label:"Alcohol",name:"Perfumer's alcohol",meta:"Add last, cap and swirl gently.",why:"",p:u==="ml"?`${f2(c.alcMl)} mL`:`${f3(c.alcG)} g`,q:u==="ml"?`${f3(c.alcG)} g`:`${f2(c.alcMl)} mL`});
  const done=steps.filter((_,k)=>sh.done.has(k)).length;const r=c.dpgRec;const tone=r.pct>=2?"amber":r.pct>0?"blue":"green";
  const weak=c.ing.filter(x=>x.mat.f!=="FO");
  return`<div class="stats"><div><b>${b.batch} mL</b><span>Bottle</span></div><div><b>${b.conc>=100?"Oil":b.conc+"%"}</b><span>Strength</span></div><div><b>${f2(totG)} g</b><span>Total weight</span></div></div>
  <div class="group callout ${tone}"><div class="pad-s"><b>DPG · ${esc(r.level)}${r.pct?" · "+r.pct+"%":""}</b><p>${esc(r.reason)}</p>
    ${!c.dpgAuto&&+b.dpgPct!==r.pct?`<p class="muted">You set ${+b.dpgPct}%. This formula needs ${r.pct}%. Set DPG to Auto to follow it.</p>`:""}${r.warn?`<p class="warn-t">${esc(r.warn)}</p>`:""}</div></div>
  <div class="sec-row"><h3 class="sec-h">Add in this order</h3><span class="sec-meta">${done}/${steps.length}</span></div>
  <div class="pad-x">${seg("units",[["drops","Drops"],["g","Grams"],["ml","mL"]],u,"units")}</div>
  <div class="group steps">${steps.map((st,k)=>`<button type="button" class="step ${sh.done.has(k)?"done":""}" data-act="step" data-k="${k}" aria-pressed="${sh.done.has(k)}">
    <span class="step-check">${ICON.check}</span>
    <span class="step-main"><span class="step-top"><span class="role role-${st.role}">${esc(st.label)}</span><span class="step-name">${esc(st.name)}</span></span><span class="step-meta">${esc(st.meta)}</span>${st.why?`<span class="step-why">${esc(st.why)}</span>`:""}</span>
    <span class="step-amt"><b>${st.p}</b><small>${st.q}</small></span></button>`).join("")}</div>
  <p class="sec-f">Tap each step as you add it. Grams are the most precise target; drops assume 20 per mL, and thick oils make larger drops.</p>
  ${weak.length?`<div class="group callout amber"><div class="pad-s"><p>${weak.map(x=>esc(shortName(x.mat.n))).join(", ")} ${weak.length>1?"are":"is"} diluted, finished or unverified, so the true aromatic strength of this blend is unknown.</p></div></div>`:""}
  ${c.eoTooHigh?`<div class="group callout red"><div class="pad-s"><b>Too many essential oil drops</b><p>The drops exceed the fragrance allowance. Reduce them.</p></div></div>`:""}
  <h3 class="sec-h">How it unfolds</h3>
  <div class="group timeline">
    <div class="row tl"><i style="background:var(--top)"></i><span class="row-text"><span class="row-title">Opening</span><span class="row-sub">${esc(s.opening)}</span></span></div>
    <div class="row tl"><i style="background:var(--heart)"></i><span class="row-text"><span class="row-title">Heart</span><span class="row-sub">${esc(s.heart)}</span></span></div>
    <div class="row tl"><i style="background:var(--base)"></i><span class="row-text"><span class="row-title">Drydown</span><span class="row-sub">${esc(s.drydown)}</span></span></div>
  </div>
  <div class="group">
    <div class="row"><span class="row-title">Projection</span><span class="row-value wrap">${esc(s.projection)}</span></div>
    <div class="row"><span class="row-title">Longevity</span><span class="row-value wrap">${esc(s.longevity)}</span></div>
    <div class="row"><span class="row-title">Mature</span><span class="row-value wrap">${esc(s.maturation)}</span></div>
  </div>`}
function storyTab(s){const c=s.character||{};const O=ORGS[orgOf(s)];const cands=s.nameCandidates||[];
  const row=(k,v)=>v?`<div class="row kv"><span class="row-sub">${k}</span><span class="row-body">${esc(v)}</span></div>`:"";
  return`${!s.nameLocked&&cands.length?`<h3 class="sec-h">Choose a name</h3><div class="group">${cands.map((x,j)=>`<button type="button" class="row link cand" data-act="fcand" data-j="${j}" aria-pressed="${x.name===s.name}">
      <span class="radio"></span><span class="row-text"><span class="row-title serif">${esc(x.name)}${j===s.recommended?` <span class="star">Recommended</span>`:""}</span>${x.originality?`<span class="row-sub">Originality ${x.originality} · Impact ${x.impact} · Connection ${x.connection}${x.why?" · "+esc(x.why):""}</span>`:x.why?`<span class="row-sub">${esc(x.why)}</span>`:""}</span></button>`).join("")}</div>
    <div class="pad"><button type="button" class="btn-primary" data-act="flock">${ICON.seal}<span>Approve ${esc(s.name)}</span></button></div>
    <p class="sec-f">Approving locks the name and adds this formula to Batches.</p>`:""}
  <h3 class="sec-h">Companion card</h3>
  <div class="group org-card" style="--org:${O.accent}"><div class="pad-s"><b>${esc(O.name)}</b><span class="muted">${esc(O.align)} · “${esc(O.motto)}”</span></div></div>
  <div class="group">${c.powers&&c.powers.length?`<div class="row kv"><span class="row-sub">Powers</span><span class="row-body">${c.powers.map(esc).join("<br>")}</span></div>`:""}
    ${row("Alias",c.alias&&c.civilianName?`${c.alias} / ${c.civilianName}`:c.alias)}${row("Appearance",c.appearance)}${row("Costume",c.costume)}${row("Silhouette",c.silhouette)}${row("Origin",c.origin)}${row("Strengths",c.strengths)}${row("Weaknesses",c.weaknesses)}${row("Motivation",c.motivation)}${row("Connections",c.connections||c.connection)}</div>`}
function labelTab(s,b){const c=s.character||{};const O=ORGS[orgOf(s)];const L=s.label||{};const notes=(L.notes||[]).slice(0,4);
  const row=(k,v)=>v?`<div class="row kv"><span class="row-sub">${k}</span><span class="row-body">${esc(v)}</span></div>`:"";
  return`<div class="label-stage">${labelSVG(s,b)}<span class="label-cap">Preview · 30 × 30 mm</span></div>
  ${s.nameLocked?"":`<p class="sec-f center">Approve the name before you make the final label.</p>`}
  <h3 class="sec-h">Exact label text</h3>
  <div class="group"><ol class="label-lines"><li>${esc(String(s.name).toUpperCase())}</li><li>AM PARFUMS</li><li>${b.batch} mL</li><li>${notes.map(x=>esc(String(x).toUpperCase())).join(" · ")}${notes.length<4?` <em>needs ${4-notes.length} more</em>`:""}</li><li>THE MERIDIAN FILES</li></ol></div>
  <h3 class="sec-h">Art direction</h3>
  <div class="group">${row("Hero",`${c.alias||s.name} · ${O.name} · ${alignOf(s)}`)}${row("Pose",c.pose)}${row("Setting",c.setting)}${row("Insignia",c.insignia)}${row("Palette",(c.palette||O.name+" colors")+", with black and gold Art Deco framing")}${row("Direction",L.art)}
    ${row("Style","1990s hand-inked comic, bold outlines, controlled halftone, character dominant. No bottles or botanicals.")}${row("Print","30 × 30 mm square, 354 px PNG at 300 DPI, 2 mm safe margin, brightened for HP DeskJet 3755 vinyl.")}</div>
  <div class="pad"><button type="button" class="btn-tinted wide" data-act="flabel">${ICON.copy}<span>Copy label brief</span></button></div>`}
function analysisTab(s){const c=formulaChecks(s);const ok=!c.clashes.length;const L=s.lens||{};
  const notes=[];if(c.n>5)notes.push(`${c.n} oils: blends of finished fragrance oils get muddy past 4 or 5.`);if(c.lead<.35)notes.push("No clear lead oil, so the blend may read flat. Give one oil 40% or more.");if(c.noRef.length)notes.push(`No reference notes for ${c.noRef.join(", ")}; judged by family only.`);
  const list=(arr,cls)=>arr.map(x=>`<div class="row"><span class="dot ${cls}"></span><span class="row-body">${esc(x)}</span></div>`).join("");
  const lens=[["bisch","Bisch","Boldness"],["kurkdjian","Kurkdjian","Refinement"],["cavallier","Cavallier","Radiance"],["ropion","Ropion","Structure"],["morillas","Morillas","Wearability"],["cresp","Cresp","Sensuality"]].filter(([k])=>L[k]);
  return`<div class="group callout ${ok?"green":"red"}"><div class="pad-s"><b>${ok?(c.neutral.length<=1?"Every pair is a classic accord pairing":"No known clashes; some pairs are untested"):"Contains a clash-prone pairing"}</b><p class="muted">${c.proven.length} proven · ${c.neutral.length} untested · ${plural(c.clashes.length,"clash").replace("clashs","clashes")}</p></div></div>
  ${s.identity?`<p class="lede">${esc(s.identity)}</p>`:""}
  ${c.proven.length?`<h3 class="sec-h">Why it works</h3><div class="group">${list(c.proven,"ok")}</div>`:""}
  ${c.clashes.length?`<h3 class="sec-h">Watch</h3><div class="group">${list(c.clashes,"bad")}</div>`:""}
  ${c.neutral.length?`<h3 class="sec-h">Untested pairs</h3><div class="group">${list(c.neutral,"mid")}</div>`:""}
  ${notes.length?`<div class="group">${list(notes,"mid")}</div>`:""}
  ${lens.length?`<h3 class="sec-h">Six perfumer lenses</h3><div class="lens">${lens.map(([k,n,r])=>`<div><b>${n}</b><span class="muted">${r}</span><p>${esc(L[k])}</p></div>`).join("")}</div>`:""}
  ${s.refinement?`<h3 class="sec-h">Refinement</h3><div class="group"><div class="pad-s"><p>${esc(s.refinement)}</p></div></div>`:""}
  <p class="sec-f">Based on the published notes of each oil's inspiration, classic accord pairings, your own pairings and your batch verdicts. A test batch is the real proof.</p>`}
function saveFormula(ctx){const v=loadSaved();v.unshift({s:ctx.s,b:ctxBrief(ctx),src:ctx.source||state.source,at:Date.now()});storeSaved(v.slice(0,30));toast(`Saved ${ctx.s.name}`);haptic();if(curTab==="studio")renderStudio()}
function lockName(sh){const s=sh.ctx.s;s.nameLocked=true;if(!s.batchId){const x=newBatch(s,ctxBrief(sh.ctx),sh.ctx.source);s.batchId=x.id;bPut(x)}haptic();toast(`${s.name} approved · added to Batches`);sh.draw();if(sh.ctx.live)renderDrafts()}

// ---------- Batches ----------
function ring(pct,label,cls=""){const r=17,c=2*Math.PI*r;return`<span class="ring ${cls}"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="${r}" class="ring-bg"/><circle cx="20" cy="20" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}"/></svg><b>${label}</b></span>`}
function batchRing(x){const st=bStage(x);if(st==="approved")return ring(0,"—","idle");if(st==="maturing")return ring(matPct(x),daysLeft(x)+"d","mat");if(st==="ready")return ring(100,ICON.check,"ready");return ring(100,ICON.check,"done")}
function renderBatches(){const el=$("#scr-batches .content");
  if(!B.ready){el.innerHTML=screenHead("Batches")+`<p class="sec-f center">Loading…</p>`;return}
  const groups=[["ready","Ready to test"],["maturing","Maturing"],["approved","Approved, not mixed"],["done","Completed"]];
  el.innerHTML=screenHead("Batches")+(B.list.length?groups.map(([k,t])=>{const xs=B.list.filter(x=>bStage(x)===k);return xs.length?`<h2 class="sec-h">${t}<span class="count">${xs.length}</span></h2><div class="group">${xs.map(x=>{const O=ORGS[(x.s.character||{}).org]||ORGS.nightcourt;const b=x.brief||{};
      const sub=k==="maturing"?`Ready ${fmtDate(x.mixedAt+x.days*MS_DAY)}`:k==="approved"?"Tap when you have mixed it":k==="ready"?`Matured ${x.days} days · record your notes`:esc(x.verdict);
      return`<button type="button" class="row link batch" data-act="openBatch" data-id="${esc(x.id)}">${batchRing(x)}<span class="row-text"><span class="row-title serif">${esc(x.name)}</span><span class="row-sub">${esc(O.short)} · ${b.batch||"?"} mL · ${sub}</span></span>${ICON.chev}</button>`}).join("")}</div>`:""}).join("")
      +`<p class="sec-f center">${B.db?"Synced to your Claude account.":"Saved on this device. Export a backup from Studio to keep a copy."}</p>`
    :`<div class="empty-card big">${ICON.timer}<b>No batches yet</b><span>Approve a formula's name and it lands here. Mark it mixed to start the maturation countdown, then record test notes and a verdict.</span><button type="button" class="btn-tinted" data-act="tab" data-v="create">Go to Atelier</button></div>`)}
function openBatch(id){openSheet({title:"Batch",render:batchView,props:{batchId:id,live:true}})}
function batchView(sh){const x=B.list.find(y=>y.id===sh.batchId);if(!x)return`<p class="sec-f center">This batch was removed.</p>`;
  const st=bStage(x);const O=ORGS[(x.s.character||{}).org]||ORGS.nightcourt;const b=x.brief||{};
  const steps=[["Approved",true],["Mixed",!!x.mixedAt],["Matured",st==="ready"||st==="done"],["Verdict",!!x.verdict]];
  let h=`<div class="bhero">${batchRing(x)}<div><h2 class="serif">${esc(x.name)}</h2><p class="muted">${esc(O.name)} · ${b.batch||"?"} mL · ${+b.conc>=100?"oil only":(b.conc||"?")+"%"} · approved ${fmtDate(x.approvedAt)}</p></div></div>
  <ol class="track">${steps.map(([l,d],i)=>`<li class="${d?"done":(steps[i-1]&&steps[i-1][1]?"now":"")}"><span></span>${l}</li>`).join("")}</ol>`;
  if(st==="approved")h+=`<h3 class="sec-h">Mix it</h3><div class="group">
    <label class="row"><span class="row-title">Mixed on</span><input type="date" class="row-input" id="mix-date" value="${todayISO()}"></label>
    <label class="row"><span class="row-title">Mature for</span><input type="number" inputmode="numeric" min="1" max="120" class="row-input num" id="mix-days" value="${x.days}"><span class="row-unit">days</span></label></div>
    <div class="pad"><button type="button" class="btn-primary" data-act="bmix">${ICON.flask}<span>Mark as mixed</span></button></div>`;
  if(x.mixedAt){const end=x.mixedAt+x.days*MS_DAY;
    h+=st==="maturing"?`<div class="group callout blue"><div class="pad-s"><b>Ready in ${plural(daysLeft(x),"day")}</b><p class="muted">${fmtDate(end)} · mixed ${fmtDate(x.mixedAt)}</p><span class="bar"><i style="width:${matPct(x)}%"></i></span><p>Keep it capped somewhere cool and dark. Swirl gently every few days.</p><button type="button" class="btn-tinted" data-act="bearly">It's ready early</button></div></div>`
      :`<div class="group callout green"><div class="pad-s"><b>${st==="done"?"Matured":"Ready to test"}</b><p class="muted">Mixed ${fmtDate(x.mixedAt)} · ${x.days} day maturation</p></div></div>`;
    h+=`<h3 class="sec-h">Test notes</h3><div class="group">${[["m15","15 minutes","Opening"],["h1","1 hour","Heart"],["h4","4 hours","Drydown"]].map(([k,l,s])=>`<label class="row stack"><span class="row-title">${l} <span class="muted">· ${s}</span></span><textarea class="field-area inset" rows="2" data-bnote="${k}" placeholder="What do you smell? Projection, harshness, balance">${esc((x.notes||{})[k]||"")}</textarea></label>`).join("")}</div>`;
    const sc=x.scores;const hasNotes=Object.values(x.notes||{}).some(v=>String(v).trim());
    if(sc)h+=`<h3 class="sec-h">Claude's read</h3><div class="stats four">${[["Liking",sc.liking],["Projection",sc.projection],["Longevity",sc.longevity],["Smoothness",sc.smoothness]].map(([l,v])=>`<div><b>${v}<small>/5</small></b><span>${l}</span></div>`).join("")}</div>
      <div class="group"><div class="pad-s">${sc.summary?`<p>${esc(sc.summary)}</p>`:""}${sc.issues.length?`<p class="warn-t">${sc.issues.map(esc).join(" · ")}</p>`:""}${sc.suggestion?`<p><b>Next time:</b> ${esc(sc.suggestion)}</p>`:""}</div></div>`;
    if(hasNotes&&sampleFn)h+=`<div class="pad"><button type="button" class="btn-tinted wide" data-act="bscore">${ICON.sparkle}<span>${sc?"Re-score my notes":"Score my notes with Claude"}</span></button></div>`;
    if(st!=="maturing")h+=`<h3 class="sec-h">Verdict</h3><div class="pad-x">${seg("verdict",[["Make it"],["Revise it"],["Skip it"]],x.verdict,"bverdict")}</div><p class="sec-f">Verdicts teach the composer which pairings work for you. Tap again to clear.</p>`}
  h+=`<h3 class="sec-h">Formula</h3><div class="group">${linkRow("bview","View formula","",ICON.flask)}${linkRow("bcopy","Copy recipe","",ICON.copy)}${linkRow("blabel","Copy label brief","",ICON.copy)}
    ${x.mixedAt?`<button type="button" class="row link" data-act="bunmix"><span class="row-title">Undo mixed</span></button>`:""}
    <button type="button" class="row link danger" data-act="bdel"><span class="row-title">Remove batch</span></button></div>`;
  return h}
async function scoreBatch(x,btn){if(!sampleFn)return;btn.disabled=true;btn.innerHTML=`<span class="spinner"></span><span>Reading your notes…</span>`;
  try{const r=await sampleFn.json(scorePrompt(x),{modelTier:"quick",cache:false});const n=v=>Math.min(5,Math.max(1,Math.round(+v||3)));
    await bPut({...x,scores:{liking:n(r.liking),projection:n(r.projection),longevity:n(r.longevity),smoothness:n(r.smoothness),issues:(Array.isArray(r.issues)?r.issues:[]).slice(0,4).map(String),suggestion:String(r.suggestion||""),summary:String(r.summary||""),at:Date.now()}})}
  catch(err){btn.disabled=false;btn.textContent=`Could not score${err&&err.code?` (${err.code})`:""}. Try again`}}

// ---------- Library ----------
function renderLibrary(){const el=$("#scr-library .content");
  el.innerHTML=screenHead("Library")+`<div class="pad-x"><label class="search">${ICON.search}<input type="search" id="libSearch" placeholder="Search oils or notes" value="${esc(LIB.q)}" autocomplete="off"></label></div><div id="libList"></div>`;
  $("#libSearch").addEventListener("input",e=>{LIB.q=e.target.value;renderLibraryList()});renderLibraryList()}
function renderLibraryList(){const el=$("#libList");if(!el)return;
  if(!LIB.ready){el.innerHTML=`<p class="sec-f center">Loading…</p>`;return}
  const st=libStats();const missing=st.all-st.drafted;const q=LIB.q.toLowerCase();
  const list=libOils().filter(m=>{const e=LIB.map[m.id]||{};const f=LIB.filter;if(f==="review"&&(!(e.notes||[]).length||e.confirmed))return false;if(f==="confirmed"&&!e.confirmed)return false;if(f==="missing"&&(e.notes||[]).length)return false;return!q||(m.n+" "+m.s+" "+(e.notes||[]).join(" ")).toLowerCase().includes(q)});
  const pct=st.all?Math.round(st.confirmed/st.all*100):0;
  el.innerHTML=`<div class="group progress-card"><div class="pad-s"><div class="pc-row"><div><b>${st.confirmed}</b><span>confirmed by you</span></div><div><b>${st.drafted}</b><span>drafted</span></div><div><b>${st.all}</b><span>oils</span></div></div><span class="bar"><i style="width:${pct}%"></i></span>
    ${sampleFn?`<button type="button" class="btn-tinted wide" data-act="libDraft" ${LIB.running?"disabled":""}>${LIB.running?`<span class="spinner"></span><span>${esc(LIB.msg||"Drafting…")}</span>`:`${ICON.sparkle}<span>${missing?(missing===st.all?"Have Claude draft my library":`Draft the remaining ${missing}`):"Redraft unconfirmed oils"}</span>`}</button>${LIB.running?`<button type="button" class="btn-plain" data-act="libStop">Stop</button>`:""}`:`<p class="muted">Rate strength and notes by hand as you smell each oil. Claude drafting is available when the Atelier is opened inside Claude.</p>`}
    ${!LIB.running&&LIB.msg?`<p class="muted">${esc(LIB.msg)}</p>`:""}</div></div>
  <div class="pad-x">${seg("libfilter",[["review","To review"],["missing","Not drafted"],["confirmed","Confirmed"],["all","All"]],LIB.filter,"lfil")}</div>
  ${list.length?`<div class="group">${list.slice(0,300).map(libRow).join("")}</div>`:`<p class="sec-f center">${LIB.filter==="review"&&!st.drafted?"Nothing to review yet. Switch to All to rate oils by hand.":"No oils in this view."}</p>`}
  <p class="sec-f">Strength changes how much of an oil formulas use: weak oils get more, strong oils less.</p>`}
function libRow(m){const e=LIB.map[m.id]||{};const strn=e.myStrength||e.strength||"";
  return`<button type="button" class="row link lib" data-act="openOil" data-id="${esc(m.id)}"><span class="fam fam-${m.fam}"></span><span class="row-text"><span class="row-title">${esc(m.n)}</span><span class="row-sub">${(e.notes||[]).length?esc(e.notes.join(", ")):esc(m.s+" · "+FORM_SHORT[m.f])}</span></span>${strn?`<span class="pill">${esc(strn)}</span>`:""}${e.confirmed?`<span class="tick">${ICON.check}</span>`:""}${ICON.chev}</button>`}
function openOil(id){openSheet({title:"Oil",render:oilView,props:{oilId:id,live:true}})}
function oilView(sh){const m=BYID[sh.oilId];const e=LIB.map[m.id]||{};const st=e.myStrength||e.strength||"";
  return`<div class="pad"><span class="fam-chip fam-${m.fam}">${esc(FAM_SHORT[m.fam])}</span><h2 class="serif title-2">${esc(m.n)}</h2><p class="muted">${esc(m.s)} · ${esc(FORM[m.f]||m.f)}</p></div>
  ${(e.notes||[]).length?`<h3 class="sec-h">What you should smell</h3><div class="pad-x notes-chips">${e.notes.map(n=>`<span>${esc(n)}</span>`).join("")}</div>${e.character?`<p class="sec-f">${esc(e.character)}</p>`:""}
    <p class="sec-f">${e.confirmed?"Confirmed by you.":`AI estimate · ${esc(e.confidence||"medium")} confidence${e.longevity?" · "+esc(e.longevity)+" longevity":""}`}</p>`:""}
  ${REF[m.id]?`<h3 class="sec-h">Inspiration pyramid</h3><div class="group"><div class="pad-s"><p>${esc(REF[m.id])}</p></div></div>`:m.notes?`<h3 class="sec-h">Supplier notes</h3><div class="group"><div class="pad-s"><p>${esc(m.notes)}</p></div></div>`:""}
  <h3 class="sec-h">Strength on your blotter</h3><div class="pad-x">${seg("strength",[["weak","Weak"],["medium","Medium"],["strong","Strong"]],st,"lstr")}</div>
  ${e.myStrength&&e.strength&&e.myStrength!==e.strength?`<p class="sec-f">Claude guessed ${esc(e.strength)}.</p>`:""}
  <h3 class="sec-h">Your notes</h3><div class="group"><textarea class="field-area" rows="3" data-lnote="${esc(m.id)}" placeholder="What you smell">${esc(e.myNotes||"")}</textarea></div>
  <div class="pad"><button type="button" class="${e.confirmed?"btn-tinted wide":"btn-primary"}" data-act="lconf">${ICON.check}<span>${e.confirmed?"Unconfirm":"Confirm by smell"}</span></button></div>`}
async function draftLibrary(){if(!sampleFn||LIB.running)return;const st=libStats();const onlyMissing=st.all-st.drafted>0;
  const todo=libOils().filter(m=>{const e=LIB.map[m.id];return onlyMissing?!(e&&(e.notes||[]).length):!(e&&e.confirmed)});if(!todo.length)return;
  LIB.running=true;LIB.ctl=new AbortController();const N=25;let done=0,errs=0;
  try{for(let i=0;i<todo.length;i+=N){const chunk=todo.slice(i,i+N);LIB.msg=`Drafting ${i+1}–${Math.min(i+N,todo.length)} of ${todo.length}…`;renderLibraryList();
      const res=await sampleFn.json(libPrompt(chunk),{modelTier:"default",cache:false,signal:LIB.ctl.signal});
      const arr=Array.isArray(res)?res:Array.isArray(res&&res.oils)?res.oils:[];const ids=new Set(chunk.map(m=>m.id));
      for(const r of arr){if(!r||!ids.has(r.id))continue;const old=LIB.map[r.id]||{};const pick=(v,ok,d)=>ok.includes(String(v).toLowerCase())?String(v).toLowerCase():d;
        await libPut(r.id,{...old,notes:(Array.isArray(r.notes)?r.notes:[]).map(x=>String(x).toLowerCase().slice(0,30)).filter(Boolean).slice(0,6),character:String(r.character||"").slice(0,90),strength:pick(r.strength,["weak","medium","strong"],"medium"),longevity:pick(r.longevity,["short","medium","long"],""),confidence:pick(r.confidence,["low","medium","high"],"medium"),draftedAt:Date.now(),source:"AI estimate"});done++}
      if(arr.length<chunk.length)errs+=chunk.length-arr.length}
    LIB.msg=`Done. Claude drafted ${plural(done,"oil")}${errs?`; ${errs} came back empty, run it again to fill them`:""}.`}
  catch(err){const code=err&&err.code;LIB.msg=code==="cancelled"?`Stopped after ${plural(done,"oil")}.`:`Stopped after ${plural(done,"oil")}: ${ERR[code]||"Claude could not finish"}.`}
  finally{LIB.running=false;renderLibraryList();updateBadges()}}

// ---------- Studio ----------
function renderStudio(){const el=$("#scr-studio .content");const saved=loadSaved();
  el.innerHTML=screenHead("Studio")+`
  <div class="group profile"><div class="pad-s"><span class="mono-mark">AM</span><div><b class="serif">AM PARFUMS</b><span class="muted">${plural(inventoryCount(),"material")} · ${plural(B.list.length,"batch").replace("batchs","batches")} · ${saved.length} saved</span></div></div></div>
  <h2 class="sec-h">Your work</h2><div class="group">${linkRow("savedList","Saved formulas",saved.length||"None",ICON.bookmark)}${linkRow("tab","Batches",B.list.length||"None",ICON.timer,'data-v="batches"')}</div>
  <h2 class="sec-h">Inventory</h2><div class="group">${linkRow("inventory","Manage materials",inventoryCount()+" on hand",ICON.flask)}${linkRow("roster","Names to avoid",rosterNames().length||"None",ICON.person)}</div>
  <h2 class="sec-h">Backup</h2><div class="group">${linkRow("export","Export backup","",ICON.share)}${linkRow("import","Import backup","",ICON.download)}</div>
  <p class="sec-f">Backups use the same format as Atelier 3.2, so you can move your formulas, batches and library over from the old page.</p>
  <h2 class="sec-h">About</h2><div class="group">${linkRow("about","Method & safety notes","",ICON.info)}<div class="row"><span class="row-icon">${ICON.cloud}</span><span class="row-title">Claude</span><span class="row-value">${sampleFn?"Connected":"Offline drafts"}</span></div><div class="row"><span class="row-title">Version</span><span class="row-value">Atelier 4.0</span></div></div>`}
function openSaved(){openSheet({title:"Saved formulas",render:()=>{const v=loadSaved();return v.length?`<div class="group">${v.map((x,i)=>`<div class="row swipe"><button type="button" class="row-text plain" data-act="openSaved" data-i="${i}"><span class="row-title serif">${esc(x.s.name)}</span><span class="row-sub">${esc(x.b.season)} · ${esc(x.b.occasion)} · ${x.b.batch} mL · ${fmtDate(x.at||Date.now())}</span></button><button type="button" class="icon-btn danger" data-act="delSaved" data-i="${i}" aria-label="Remove ${esc(x.s.name)}">${ICON.trash}</button></div>`).join("")}</div>`:`<div class="empty-card">${ICON.bookmark}<b>Nothing saved yet</b><span>Tap Save on any formula to keep it here, on this device.</span></div>`}})}
function openInventory(){const sh=openSheet({title:"Inventory",render:()=>`<div class="pad-x"><label class="search">${ICON.search}<input type="search" id="invSearch" placeholder="Search by name or maker" autocomplete="off"></label></div>
  <p class="sec-f"><span id="invCount2">${inventoryCount()}</span> of ${INV.length} available. Switch off anything you have run out of.</p><div id="invList"></div>
  <h3 class="sec-h">Add a material</h3><div class="group">
   <label class="row"><span class="row-title">Name</span><input class="row-input" id="newMatName" placeholder="Iris fragrance oil"></label>
   <label class="row"><span class="row-title">Supplier</span><input class="row-input" id="newMatSupplier" placeholder="Supplier"></label>
   ${selectRowLocal("newMatForm","Type",[["FO","Fragrance oil"],["PO","Perfume oil"],["RO","Roll-on"],["BO","Body oil"],["FX","Finished perfume"],["MIX","Form unknown"]])}
   ${selectRowLocal("newMatFamily","Family",Object.entries(FAM_SHORT))}
  </div><div class="pad"><button type="button" class="btn-tinted wide" data-act="addMaterial">${ICON.plus}<span>Add to inventory</span></button></div>`,
  mount:s=>{const draw=()=>{const q=($("#invSearch",s.body).value||"").toLowerCase().trim();const ms=INV.filter(x=>[x.n,x.s,x.notes,x.id].join(" ").toLowerCase().includes(q)).slice(0,250);
    $("#invList",s.body).innerHTML=ms.length?`<div class="group">${ms.map(x=>`<label class="row"><span class="fam fam-${x.fam}"></span><span class="row-text"><span class="row-title">${esc(x.n)}</span><span class="row-sub">${esc(x.s)} · ${esc(FORM_SHORT[x.f])}</span></span><input type="checkbox" class="switch" data-material="${esc(x.id)}" ${excluded.has(x.id)?"":"checked"}></label>`).join("")}</div>`:`<p class="sec-f center">No materials match.</p>`};
    $("#invSearch",s.body).addEventListener("input",draw);draw()}});return sh}
function selectRowLocal(id,title,opts){return`<label class="row"><span class="row-title">${title}</span><span class="row-value">${esc(opts[0][1])}</span>${ICON.chev}<select class="row-select" id="${id}" data-local="1">${opts.map(([v,l])=>`<option value="${esc(v)}">${esc(l)}</option>`).join("")}</select></label>`}
function openRoster(){openSheet({title:"Names to avoid",render:()=>`<p class="sec-f">Your existing fragrances, Meridian Files characters and saved formula names are protected automatically. Add any other names here, one per line.</p>
  <div class="group"><textarea class="field-area" rows="10" id="rosterField" placeholder="One name per line">${esc(state.roster)}</textarea></div>
  <h3 class="sec-h">Always protected</h3><div class="pad-x notes-chips">${EXISTING.map(e=>`<span>${esc(e[0])}</span>`).join("")}</div>`,
  mount:s=>$("#rosterField",s.body).addEventListener("input",e=>{state.roster=e.target.value.slice(0,20000);store.setRaw(RKEY,state.roster)}),
  onClose:()=>{if(curTab==="create")renderCreate();if(curTab==="studio")renderStudio()}})}
function openAbout(){openSheet({title:"Method & safety",render:()=>`<div class="pad prose">
  <p>Ratios are calculated by <b>mass</b>. Bottle volume, material density and essential oil drop sizes are estimates. Drop counts assume 20 drops per mL; for precise batches, weigh on your 0.001 g scale.</p>
  <p>The fragrance material percentage is <b>not</b> a verified active perfume concentration when ingredient dilution is unknown.</p>
  <p>Confirm supplier usage limits, phototoxicity and compatibility before skin application. Performance, ingredient harmony and maturation guidance are untested predictions.</p>
  <p>The six perfumer lenses are creative interpretations, not endorsements. Label artwork is created in your label app from the label brief.</p>
  <p class="muted">Offline drafts come from a rule-based engine using each oil's reference notes, classic accord pairings, your stated pairings and your batch verdicts. When the Atelier is opened inside Claude, Claude composes the formulas and characters instead.</p></div>`})}

// ---------- Backup ----------
function createBackup(){return{app:"AM PARFUMS Atelier",version:3,exported:new Date().toISOString(),saved:loadSaved(),batches:B.list,library:LIB.map,roster:state.roster,excluded:[...excluded],customMaterials:INV.filter(x=>/^U[0-9]+$/.test(x.id)),prefs:brief()}}
async function exportBackup(){const name="AM_PARFUMS_Atelier_backup.json";const blob=new Blob([JSON.stringify(createBackup(),null,2)],{type:"application/json"});
  try{if(downloadsFn){await downloadsFn.save({filename:name,data:blob});toast("Backup saved");return}
    const file=new File([blob],name,{type:"application/json"});
    if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:"Atelier backup"});return}
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);toast("Backup saved")}
  catch(e){if(e&&e.name==="AbortError")return;toast("Backup was not saved.",true)}}
async function importBackup(f){
  try{const obj=JSON.parse(await f.text());if(obj.app!=="AM PARFUMS Atelier"||!Array.isArray(obj.saved)||!Array.isArray(obj.excluded)||!Array.isArray(obj.customMaterials))throw Error("Unsupported backup");
   for(const x of obj.customMaterials.filter(x=>x&&/^U[0-9]+$/.test(x.id)&&FORM[x.f]&&FAM[x.fam]&&typeof x.n==="string").slice(0,300)){if(!BYID[x.id]){const clean={id:x.id,n:x.n.slice(0,100),s:String(x.s||"User added").slice(0,70),f:x.f,fam:x.fam,st:"F",notes:"Restored user material"};INV.push(clean);BYID[clean.id]=clean}}
   excluded.clear();obj.excluded.filter(x=>typeof x==="string"&&BYID[x]).forEach(x=>excluded.add(x));
   state.roster=String(obj.roster||"").slice(0,20000);store.setRaw(RKEY,state.roster);
   storeSaved(obj.saved.filter(x=>x&&x.s&&x.b&&Array.isArray(x.s.ingredients)).slice(0,30));
   if(obj.library&&typeof obj.library==="object"&&!Array.isArray(obj.library))for(const[id,v]of Object.entries(obj.library))if(BYID[id]&&v&&typeof v==="object"&&!(LIB.map[id]&&LIB.map[id].confirmed))await libPut(id,{notes:(Array.isArray(v.notes)?v.notes:[]).map(String).slice(0,6),character:String(v.character||""),strength:String(v.strength||""),longevity:String(v.longevity||""),confidence:String(v.confidence||""),myNotes:String(v.myNotes||""),myStrength:String(v.myStrength||""),confirmed:!!v.confirmed,source:"restored"});
   const have=new Set(B.list.map(x=>x.id));for(const x of(Array.isArray(obj.batches)?obj.batches:[]).filter(x=>x&&typeof x.id==="string"&&/^b[a-z0-9]+$/.test(x.id)&&x.s&&Array.isArray(x.s.ingredients)&&!have.has(x.id)).slice(0,500))await bPut(x);
   saveInventory();refresh();renderStudio();toast("Backup imported. Formulas, batches, library and inventory restored.")}
  catch(err){toast("Import failed: that file is not an Atelier backup.",true)}}

// ---------- Events ----------
const actions={
  tab:el=>showTab(el.dataset.v),
  seg:el=>{const k=el.dataset.key;state[k]=el.dataset.v;savePrefs();el.parentElement.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b===el)));haptic()},
  compose:()=>compose(),
  stop:()=>runCtl&&runCtl.abort(),
  offline:()=>{state.shuffle++;state.brief=brief();state.suggestions=localSuggest(state.brief);state.source="local";state.draftErr="";renderDrafts()},
  copyBrief:()=>copyText(buildPrompt(brief()),"AI brief copied. Paste it into Claude."),
  openDraft:el=>openFormula({s:state.suggestions[+el.dataset.i],live:true,source:state.source}),
  closeSheet:el=>closeSheet(topSheet(el)),
  ftab:el=>{const sh=topSheet(el);sh.tab=el.dataset.v;sh.draw();sh.body.scrollTo({top:0})},
  units:el=>{state.units=el.dataset.v;savePrefs();redrawSheet(topSheet(el))},
  step:el=>{const sh=topSheet(el);const k=+el.dataset.k;sh.done.has(k)?sh.done.delete(k):sh.done.add(k);haptic();sh.draw()},
  fcand:el=>{const sh=topSheet(el);const s=sh.ctx.s;s.name=s.nameCandidates[+el.dataset.j].name;haptic();sh.draw();if(sh.ctx.live)renderDrafts()},
  flock:el=>lockName(topSheet(el)),
  fsave:el=>saveFormula(topSheet(el).ctx),
  fcopy:el=>{const c=topSheet(el).ctx;copyText(asText(c.s,ctxBrief(c)),"Recipe copied")},
  flabel:el=>{const c=topSheet(el).ctx;copyText(labelBriefText(c.s,ctxBrief(c)),"Label brief copied")},
  openBatch:el=>openBatch(el.dataset.id),
  bmix:el=>{const sh=topSheet(el);const x=B.list.find(y=>y.id===sh.batchId);const v=$("#mix-date",sh.body).value||todayISO();const[y,m,d]=v.split("-").map(Number);const days=Math.min(120,Math.max(1,Math.round(+$("#mix-days",sh.body).value||x.days)));
    const at=new Date(y,m-1,d,12).getTime();bPut({...x,mixedAt:at,days,readyEarly:false});haptic();toast(`Mixed. Ready ${fmtDate(at+days*MS_DAY)}`)},
  bearly:el=>{const x=B.list.find(y=>y.id===topSheet(el).batchId);bPut({...x,readyEarly:true})},
  bunmix:el=>{const x=B.list.find(y=>y.id===topSheet(el).batchId);bPut({...x,mixedAt:null,readyEarly:false,verdict:""})},
  bverdict:el=>{const x=B.list.find(y=>y.id===topSheet(el).batchId);const v=el.dataset.v;haptic();bPut({...x,verdict:x.verdict===v?"":v})},
  bscore:el=>scoreBatch(B.list.find(y=>y.id===topSheet(el).batchId),el),
  bview:el=>{const x=B.list.find(y=>y.id===topSheet(el).batchId);openFormula({s:{...x.s,nameLocked:true},b:{...brief(),...x.brief},source:x.source||"claude"})},
  bcopy:el=>{const x=B.list.find(y=>y.id===topSheet(el).batchId);const s={...x.s,nameLocked:true};const b={...brief(),...x.brief};
    copyText(`${asText(s,b)}\n\nBATCH STATUS: ${x.verdict||STAGE[bStage(x)]}${x.mixedAt?`\nMixed ${fmtDate(x.mixedAt)}; ready ${fmtDate(x.mixedAt+x.days*MS_DAY)}`:""}${Object.values(x.notes||{}).some(Boolean)?`\nNotes: 15 min: ${x.notes.m15||""} | 1 hr: ${x.notes.h1||""} | 4 hr: ${x.notes.h4||""}`:""}`,"Recipe copied")},
  blabel:el=>{const x=B.list.find(y=>y.id===topSheet(el).batchId);copyText(labelBriefText({...x.s,nameLocked:true},{...brief(),...x.brief}),"Label brief copied")},
  bdel:el=>{const sh=topSheet(el);const x=B.list.find(y=>y.id===sh.batchId);if(x&&confirm(`Remove ${x.name}? Its notes and verdict will be deleted.`)){closeSheet(sh);bDel(x.id)}},
  lfil:el=>{LIB.filter=el.dataset.v;renderLibraryList()},
  libDraft:()=>draftLibrary(),
  libStop:()=>LIB.ctl&&LIB.ctl.abort(),
  openOil:el=>openOil(el.dataset.id),
  lstr:el=>{const sh=topSheet(el);const id=sh.oilId;const old=LIB.map[id]||{};const v=el.dataset.v;haptic();libPut(id,{...old,myStrength:old.myStrength===v?"":v}).then(refresh)},
  lconf:el=>{const sh=topSheet(el);const id=sh.oilId;const old=LIB.map[id]||{};haptic();libPut(id,{...old,confirmed:!old.confirmed,confirmedAt:old.confirmed?null:Date.now()}).then(()=>{refresh();if(!old.confirmed)toast("Confirmed")})},
  savedList:()=>openSaved(),
  openSaved:el=>{const x=loadSaved()[+el.dataset.i];if(x)openFormula({s:x.s,b:{...brief(),...x.b},source:x.src})},
  delSaved:el=>{const v=loadSaved();const x=v[+el.dataset.i];if(x&&confirm(`Remove ${x.s.name} from saved formulas?`)){v.splice(+el.dataset.i,1);storeSaved(v);redrawSheet(topSheet(el));renderStudio()}},
  inventory:()=>openInventory(),
  roster:()=>openRoster(),
  about:()=>openAbout(),
  export:()=>exportBackup(),
  import:()=>$("#backupFile").click(),
  addMaterial:el=>{const sh=topSheet(el);const name=$("#newMatName",sh.body).value.trim();if(!name){toast("Enter a material name first.",true);return}
    const x=addMaterial({name,supplier:$("#newMatSupplier",sh.body).value,form:$("#newMatForm",sh.body).value,fam:$("#newMatFamily",sh.body).value});toast(`Added ${x.n}`);sh.draw()},
};
document.addEventListener("click",e=>{const el=e.target.closest("[data-act]");if(!el||el.disabled)return;const fn=actions[el.dataset.act];if(fn){e.preventDefault();fn(el,e)}});
document.addEventListener("change",e=>{const t=e.target;
  if(t.dataset.material){t.checked?excluded.delete(t.dataset.material):excluded.add(t.dataset.material);saveInventory();const c=$("#invCount2");if(c)c.textContent=inventoryCount();const c2=$("#invCount");if(c2)c2.textContent=inventoryCount();return}
  if(t.classList.contains("row-select")){const v=t.parentElement.querySelector(".row-value");if(v)v.textContent=t.options[t.selectedIndex].text}
  if(t.dataset.key&&!t.dataset.local){const k=t.dataset.key;state[k]=t.type==="checkbox"?t.checked:t.value;if(k==="batch"||k==="conc")state[k]=+t.value;savePrefs();if(k!=="concept")liveBriefUpdate();if(t.type==="checkbox")haptic()}
  if(t.dataset.bnote){const sh=topSheet(t);const x=B.list.find(y=>y.id===sh.batchId);const k=t.dataset.bnote;if(x&&((x.notes||{})[k]||"")!==t.value)bPut({...x,notes:{...(x.notes||{}),[k]:t.value.slice(0,2000)}})}
  if(t.dataset.lnote){const id=t.dataset.lnote;const old=LIB.map[id]||{};if((old.myNotes||"")!==t.value)libPut(id,{...old,myNotes:t.value.slice(0,300)}).then(refresh)}
  if(t.id==="backupFile"&&t.files&&t.files[0]){importBackup(t.files[0]).finally(()=>t.value="")}});
document.addEventListener("input",e=>{const t=e.target;if(t.dataset.key==="concept"){state.concept=t.value;savePrefs()}});
$$(".tab").forEach(t=>t.addEventListener("click",()=>{if(t.dataset.tab===curTab){$(`#scr-${curTab}`).scrollTo({top:0,behavior:"smooth"});return}showTab(t.dataset.tab);haptic()}));
$$(".screen").forEach(s=>s.addEventListener("scroll",()=>s.classList.toggle("scrolled",s.scrollTop>36),{passive:true}));
document.addEventListener("visibilitychange",()=>{if(!document.hidden)refresh()});

// ---------- Start ----------
(async()=>{
  state.brief=brief();state.suggestions=localSuggest(state.brief);state.source="local";
  showTab(location.hash==="#batches"?"batches":location.hash==="#library"?"library":"create");
  await initClaude();initData();renderCTA();updateBadges();if(curTab!=="create")renderTab(curTab);
  if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("sw.js").catch(()=>{});
})();
