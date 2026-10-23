"use strict";
// AM PARFUMS Atelier formula engine. Pure logic and persistence helpers; the interface lives in app.js.

const FAM={FR:"Fresh / Blue / Aquatic",CL:"Clean / Musk / Soft Woods",CT:"Citrus / Tea / Light Aromatic",GR:"Green / Dry Woods / Vetiver",RF:"Rose / Floral",FT:"Fruit / Cherry / Apple / Plum",WA:"Warm Amber / Spice / Tobacco / Leather",SW:"Sweet / Gourmand / Vanilla / Coffee"};
const FAM_SHORT={FR:"Fresh",CL:"Clean musk",CT:"Citrus & tea",GR:"Green woods",RF:"Rose & floral",FT:"Fruit",WA:"Amber & spice",SW:"Gourmand"};
const FORM={FO:"fragrance oil · assay unknown",PO:"perfume oil · dilution unknown",RO:"roll-on · dilution unknown",MIX:"form unverified",BO:"body oil · dilution unknown",FX:"finished perfume · dilution unknown"};
const FORM_SHORT={FO:"Fragrance oil",PO:"Perfume oil",RO:"Roll-on",MIX:"Unverified",BO:"Body oil",FX:"Finished perfume",EO:"Essential oil"};
// Density estimates for planning only. Users must calibrate before precision production.
const DENS={FO:.98,PO:.96,RO:.93,MIX:.95,BO:.92,FX:.85,EO:.90,DPG:1.02,ALC:.789};
const DROPS_PER_ML=20;

const INV=[...RAW.split("\n"),...COLLRAW.split("\n")].map(l=>{const[id,n,s,f,fam,st,notes]=l.split("|");return{id,n,s,f,fam,st,notes:notes||""}});
const EO=EORAW.split("\n").map(l=>{const[id,n,g,sup]=l.split("|");return{id,n,g,s:sup||"HANOLLY",f:"EO"}});
const BYID=Object.fromEntries([...INV,...EO].map(x=>[x.id,x]));
const COLLECTION_SIZE=INV.filter(x=>/^B/.test(x.id)).length;

// ---------- Storage ----------
const store={
  get(k,d){try{const v=JSON.parse(localStorage.getItem(k)||"null");return v??d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}},
  raw(k){try{return localStorage.getItem(k)||""}catch(e){return""}},
  setRaw(k,v){try{localStorage.setItem(k,v)}catch(e){}}
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));

const USER_INV_KEY="amparfums.atelier.customMaterials.v2";
const EXCLUDE_KEY="amparfums.atelier.excluded.v2";
const RKEY="amparfums.atelier.roster";
const KEY="amparfums.atelier.saved";
const BKEY="amparfums.atelier.batches.v1";
const LKEY="amparfums.atelier.library.v1";
const PREFS_KEY="amparfums.atelier.prefs.v1";

for(const x of [].concat(store.get(USER_INV_KEY,[]))){if(x&&/^U[0-9]+$/.test(x.id)&&!BYID[x.id]&&FORM[x.f]&&FAM[x.fam]){INV.push(x);BYID[x.id]=x}}
const excluded=new Set(store.get(EXCLUDE_KEY,[]));
function saveInventory(){const a=store.set(USER_INV_KEY,INV.filter(x=>/^U[0-9]+$/.test(x.id)));const b=store.set(EXCLUDE_KEY,[...excluded]);return a&&b}
function inventoryCount(){return INV.filter(x=>x.st==="F"&&!excluded.has(x.id)).length}
function addMaterial({name,supplier,form,fam}){
  const id="U"+(Math.max(0,...INV.filter(x=>/^U[0-9]+$/.test(x.id)).map(x=>+x.id.slice(1)))+1).toString().padStart(4,"0");
  const x={id,n:name.slice(0,100),s:(supplier||"User added").trim().slice(0,70),f:form,fam,st:"F",notes:"User supplied"};
  INV.push(x);BYID[id]=x;saveInventory();return x}

// ---------- State ----------
const PREF_FIELDS=["season","intensity","occasion","concept","batch","conc","dpg","allowEO","allowDiluted","allowFinished","units"];
const state={season:"Fall",intensity:"Moderate",occasion:"Evening",concept:"",batch:10,conc:20,dpg:"auto",allowEO:false,allowDiluted:true,allowFinished:false,units:"drops",
  roster:store.raw(RKEY),suggestions:[],source:"local",shuffle:0,brief:null,busy:null,draftErr:""};
{const p=store.get(PREFS_KEY,{});for(const k of PREF_FIELDS)if(p&&p[k]!==undefined)state[k]=p[k]}
function savePrefs(){const p={};for(const k of PREF_FIELDS)p[k]=state[k];store.set(PREFS_KEY,p)}
function dpgSel(){return state.dpg==="auto"?"auto":+state.dpg}
function brief(){return{season:state.season,intensity:state.intensity,occasion:state.occasion,concept:String(state.concept||"").trim(),batch:+state.batch,conc:+state.conc,dpgPct:dpgSel(),allowEO:!!state.allowEO,allowDiluted:!!state.allowDiluted,allowFinished:!!state.allowFinished,ordered:true,avoid:avoidList()}}
function rosterNames(){return String(state.roster||"").split(/[\n,]+/).map(x=>x.trim()).filter(Boolean)}
function avoidList(){const saved=loadSaved().map(x=>x.s.name);return[...new Set([...rosterNames(),...saved])].slice(0,200)}
const usable=b=>INV.filter(x=>x.st==="F"&&!excluded.has(x.id)&&(x.f==="FX"?!!b.allowFinished:(b.allowDiluted||x.f==="FO")));

function loadSaved(){const v=store.get(KEY,[]);return Array.isArray(v)?v:[]}
function storeSaved(v){store.set(KEY,v)}

// Batches and scent library live here so the engine can learn from them; app.js syncs them.
const B={list:[],db:null,ready:false};
const LIB={map:{},db:null,ready:false,filter:"review",q:"",running:false,ctl:null,msg:""};

// ---------- Math ----------
const f3=n=>(Math.round(n*1000)/1000).toFixed(3);
const f2=n=>(Math.round(n*100)/100).toFixed(2);
// Decides per formula whether DPG is needed, from what is actually in it.
const HEAVY=/oud|amber|vanilla|tobacco|benzoin|resin|leather|tonka|labdanum|myrrh|balsam|caramel|honey|coffee|cacao|incense|patchouli|sandalwood|frankincense|oakmoss/i;
function dpgAdvice(sg,b){
  // DPG only when it does real work: dissolving a large share of thick, resinous material in alcohol.
  const conc=+b.conc||20;
  if(conc>=100)return{pct:0,level:"Not needed",reason:"Pure oil blend with no alcohol, so there is nothing for DPG to bridge.",warn:""};
  const items=(sg.ingredients||[]).map(i=>({m:BYID[i.id],w:+i.pct||0})).filter(x=>x.m);
  const tot=items.reduce((a,x)=>a+x.w,0)||1;
  const share=f=>items.filter(x=>f(x.m)).reduce((a,x)=>a+x.w,0)/tot;
  const pc=x=>Math.round(x*100)+"%";
  const carrier=share(m=>m.f==="RO"||m.f==="BO"||m.f==="MIX");
  const warn=carrier>=.15?`${pc(carrier)} of the oil is roll-on, body oil or unverified form. If those sit in a carrier oil they can cloud in alcohol, and DPG will not fix that. Use fewer of them in alcohol blends, or chill the finished blend overnight and filter off any haze.`:"";
  if(share(m=>m.f==="FX")>=.999)return{pct:0,level:"Not needed",reason:"Every material is already a finished alcohol based perfume.",warn};
  const heavy=share(m=>m.f!=="FX"&&(m.fam==="WA"||m.fam==="SW"||HEAVY.test(m.n+" "+m.notes)));
  if(heavy>=.5)return{pct:conc>=25?3:2,level:"Needed",reason:`${pc(heavy)} of the oil is thick or resinous (amber, vanilla, oud, tobacco, leather). DPG helps it dissolve fully in alcohol and keeps the blend clear.`,warn};
  if(heavy>=.35&&conc>=25)return{pct:1,level:"Recommended",reason:`${pc(heavy)} of the oil is resinous and the strength is high (${conc}%), so a little DPG helps it stay dissolved.`,warn};
  return{pct:0,level:"Not needed",reason:heavy>0?`Only ${pc(heavy)} of the oil is resinous; it will dissolve in alcohol on its own.`:"Light fragrance oils dissolve cleanly in alcohol at this strength.",warn};
}
function compute(sg,b){
  const Bv=Math.max(1,+b.batch||10), conc=Math.min(1,Math.max(0,+b.conc/100||.2));
  // DPG displaces alcohol, not aromatic material. No DPG in 100% aromatic oil mode.
  const dpgRec=dpgAdvice(sg,b);const dpgUse=b.dpgPct==="auto"?dpgRec.pct:+b.dpgPct;
  const dpgFrac=conc===1?0:Math.min(.05,Math.max(0,dpgUse/100||0));
  const tot=(sg.ingredients||[]).reduce((a,i)=>a+(+i.pct||0),0)||1;
  const items=(sg.ingredients||[]).filter(i=>BYID[i.id]).map(i=>({...i,mat:BYID[i.id],share:(+i.pct||0)/tot}));
  const eo=(b.allowEO?sg.essentialOils||[]:[]).filter(e=>BYID[e.id]).map(e=>({...e,mat:BYID[e.id],drops:Math.max(0,Math.round(+e.drops||0))}));
  const eoGrams=eo.reduce((a,e)=>a+e.drops/DROPS_PER_ML*DENS.EO,0);
  const avgOilVolPerGram=items.reduce((a,i)=>a+i.share/DENS[i.mat.f],0)||1/DENS.FO;
  // Mass derived from the estimated additive volumes; 1 mL target is approximate.
  const den=conc*avgOilVolPerGram+dpgFrac/DENS.DPG+(1-conc-dpgFrac)/DENS.ALC;
  let totalMass=(Bv-eoGrams*(1/DENS.EO-avgOilVolPerGram))/den;
  totalMass=Math.max(.001,totalMass);
  // If EO exceeds the budget, do not make a negative ingredient row.
  const fragranceMass=totalMass*conc, eoTooHigh=eoGrams>fragranceMass+1e-9;
  const oilMass=Math.max(0,fragranceMass-eoGrams);
  const ing=items.map(i=>{const g=oilMass*i.share;return{...i,g,ml:g/DENS[i.mat.f],drops:g/DENS[i.mat.f]*DROPS_PER_ML}});
  const eoRows=eo.map(e=>({...e,g:e.drops/DROPS_PER_ML*DENS.EO,ml:e.drops/DROPS_PER_ML}));
  const dpgG=totalMass*dpgFrac,alcG=totalMass*(1-conc-dpgFrac);
  const estMl=ing.reduce((a,x)=>a+x.ml,0)+eoRows.reduce((a,x)=>a+x.ml,0)+dpgG/DENS.DPG+alcG/DENS.ALC;
  const diluted=ing.some(x=>x.mat.f!=="FO");
  return{dpgRec,dpgAuto:b.dpgPct==="auto",ing,eo:eoRows,dpgG,dpgMl:dpgG/DENS.DPG,alcG,alcMl:alcG/DENS.ALC,B:Bv,estMl,totalMass,fragranceMass,conc,eoTooHigh,diluted};
}

// ---------- Local draft engine (works without Claude) ----------
const PLAN={
  Spring:{top:["CT","FR"],heart:["RF","GR"],base:["CL","GR"],eo:["E04","E17","E11"]},
  Summer:{top:["CT","FR"],heart:["FR","GR"],base:["CL","GR"],eo:["E02","E05","E08"]},
  Fall:{top:["FT","CT"],heart:["WA","RF"],base:["GR","WA"],eo:["E21","E19","E18"]},
  Winter:{top:["FT","CT"],heart:["WA","SW"],base:["SW","WA"],eo:["E20","E22","E24"]},
  Everyday:{top:["CT","FR"],heart:["CL","GR"],base:["GR","CL"],eo:["E07","E04","E18"]}};
const POWER={FR:"summons tide pressure and storm surge",CL:"fades into any crowd unseen",CT:"throws blinding bursts of light",GR:"binds enemies with root and thorn",RF:"bends loyalty with a thorned charm",FT:"spreads a sweet venom that dulls the senses",WA:"leaves ember trails that ignite on command",SW:"exhales a sugared smoke that slows time"};
const ORGS={
  aegis:{name:"The Aegis Order",short:"Aegis Order",align:"Heroes",motto:"Power Exists to Protect.",accent:"#9db4d9",motif:"shield"},
  nightcourt:{name:"Night Court",short:"Night Court",align:"Antiheroes",motto:"Justice Has No Curfew.",accent:"#b9607f",motif:"crescent"},
  blackcrown:{name:"The Black Crown",short:"Black Crown",align:"Supervillains",motto:"Power Is Never Given. It Is Taken.",accent:"#d0473a",motif:"crown"},
  unbound:{name:"The Unbound",short:"The Unbound",align:"Rogues and wildcards",motto:"No Masters. No Chains.",accent:"#3cc2b5",motif:"bolt"}};
const CANDA={FR:["Riptide","Undertow","Stormglass","Tidal"],CL:["Ghost","Halo","Pale","Silent"],CT:["Solar","Flare","Zenith","Glint"],GR:["Thorn","Root","Briarwood","Grove"],RF:["Briar","Oxblood","Velvet","Thorned"],FT:["Nightshade","Venom","Plum","Bitterfruit"],WA:["Ember","Ash","Brimstone","Ironsmoke"],SW:["Honeytrap","Sugar","Molten","Velvet"]};
const CANDN=["Regent","Wraith","Marshal","Sentinel","Reaper","Saint","Tyrant","Courier","Oracle","Rook"];
const FAMLABEL={FR:{m:"wave"},CL:{m:"sigil"},CT:{m:"bolt"},GR:{m:"thorn"},RF:{m:"thorn"},FT:{m:"shard"},WA:{m:"flame"},SW:{m:"crown"}};
const NOTEWORD={FR:"Marine",CL:"Musk",CT:"Bergamot",GR:"Vetiver",RF:"Rose",FT:"Dark Fruit",WA:"Amber",SW:"Vanilla"};
const MOTIFS=["crescent","flame","thorn","wave","shard","crown","bolt","eye","sigil","shield"];
function rng(seed){let s=seed>>>0||1;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function hash(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function weightOf(m){if(m.fam==="WA"||m.fam==="SW"||HEAVY.test(m.n+" "+m.notes))return"heavy";if(m.fam==="CT"||m.fam==="FR")return"light";return"mid"}
// Mood words mapped to the materials that actually carry them.
const MOOD=[
 [/smok|\bash\b|fire|burn|campfire/,/smok|incens|encens|olibanum|frankincense|oud|leather|tobacco|birch|cade|guaiac|black tea|ink mark|jazz club|zalama/i,"smoky",/smok|incens|encens|birch|cade|olibanum|ombre leather|black tea/i],
 [/leather|suede/,/leather|suede|ombre|zalama|london men|tuscan/i,"leather"],
 [/incense|church|resin/,/incens|encens|olibanum|frankincense|myrrh|benzoin|ink mark/i,"incense"],
 [/tobacco|cigar/,/tobacco|jazz club|red tobacco|london men/i,"tobacco"],
 [/\boud|agar/,/\boud\b|agarwood/i,"oud"],
 [/\brose/,/\brose\b|roses\b|delina|delila/i,"rose"],
 [/vanilla/,/vanilla|tonka|vanille|boozah/i,"vanilla"],
 [/coffee|espresso/,/coffee|new york nights|black opium|blk opi/i,"coffee"],
 [/cherry/,/cherry/i,"cherry"],
 [/\btea\b/,/\btea\b/i,"tea"],
 [/citrus|lemon|orange|bergamot|grapefruit/,/lemon|orange|bergamot|grapefruit|mandarin|citrus|day-time|imagin/i,"citrus"],
 [/marine|aquatic|ocean|\bsea\b|\brain\b|water/,/\brain\b|water|\bsea\b|marine|aquatic|pacific|ocean/i,"aquatic"],
 [/musk|clean|soap|linen/,/musk|linen|laundry|bubble bath|soap|724/i,"clean musk"],
 [/vetiver|green|grass/,/vetiver|green|sage|new challenge/i,"green vetiver"],
 [/wood|cedar|sandal/,/wood|cedar|sandal|santal|bal d/i,"woody"],
 [/spic|pepper|cinnamon|cardamom/,/spic|pepper|cinnamon|cardamom|clove|london men/i,"spicy"],
 [/sweet|caramel|honey|gourmand/,/caramel|honey|sugar|gourmand|boozah|angel/i,"sweet"],
 [/fruit|apple|plum|berry|peach|pear|fig/,/apple|plum|berry|peach|pear|fig|aventus|mushkila/i,"fruity"],
 [/floral|jasmine|flower|mimosa/,/jasmine|floral|mimosa|ylang|koko/i,"floral"]];
function moodMatches(concept,pool){const t=(concept||"").toLowerCase();const hits=[];const themes=[];const byTheme=[];
  for(const[k,re,label,core]of MOOD){if(!k.test(t))continue;themes.push(label);
    const ms=pool.filter(m=>re.test(m.n+" "+m.notes)).map(m=>({m,sc:(core&&core.test(m.n+" "+m.notes)?2:1)+(m.f==="FO"?.5:0)})).sort((a,z)=>z.sc-a.sc).map(x=>x.m);
    byTheme.push(ms);for(const m of ms)if(!hits.includes(m))hits.push(m)}
  return{themes,hits,byTheme}}
// ---------- Pairing knowledge: reference notes, proven accord pairings, your stated pairings and your batch verdicts ----------
const ACC_RE={citrus:/bergamot|lemon|grapefruit|mandarin|orange(?! blossom)|citron|lime|yuzu|citrus|petitgrain/,aromatic:/lavender|sage|rosemary|mint|juniper|geranium|basil|artemisia|herb/,aquatic:/\bsea\b|marine|water|\brain\b|aquatic|calone|ozonic|salt/,
 green:/green|violet leaf|fig leaf|cucumber|galbanum|leaf/,tea:/\btea\b|mate/,rose:/\brose\b|roses\b|rosewood/,floral:/jasmine|orange blossom|neroli|gardenia|tuberose|magnolia|ylang|lily|freesia|peony|mimosa|osmanthus|carnation|flower|floral/,
 fruity:/apple|pear|pineapple|cherry|plum|berry|peach|currant|lychee|melon|\bfig\b|cranberry|apricot|rhubarb|fruit/,spicy:/pepper|cinnamon|cardamom|clove|nutmeg|saffron|ginger|coriander|spice|pimento/,
 woody:/cedar|sandal|santal|vetiver|guaiac|wood|cashmere|cypress|papyrus|amyris|\bfir\b|oak\b/,amber:/amber|ambroxan|labdanum|ambergris|benzoin|tonka/,musk:/musk|ambrette|cashmeran|laundry/,
 vanilla:/vanilla|tonka|coumarin|praline|caramel|honey|marshmallow|sugar|kulfi/,gourmand:/coffee|cacao|chocolate|caramel|praline|\brum\b|cognac|brandy|almond|kulfi|coconut|whisky|liquor|honey/,
 smoky:/smok|incense|olibanum|birch|frankincense|styrax/,leather:/leather|suede/,tobacco:/tobacco/,oud:/\boud\b|agarwood/,resin:/incense|olibanum|myrrh|benzoin|labdanum|balsam|styrax|elemi|resin/,
 powdery:/iris|orris|violet|heliotrope|aldehyde|powder/,mossy:/oakmoss|\bmoss\b|patchouli/};
const GOOD=new Set(["citrus aromatic","citrus woody","citrus musk","citrus tea","citrus aquatic","citrus amber","citrus spicy","citrus floral","citrus green","citrus mossy","aromatic woody","aromatic amber","aromatic vanilla","aromatic musk","aromatic spicy","aromatic aquatic","aromatic leather",
 "aquatic musk","aquatic woody","aquatic green","green woody","green floral","green musk","tea musk","tea woody","tea floral","tea smoky",
 "rose oud","rose leather","rose woody","rose spicy","rose fruity","rose musk","rose amber","rose vanilla","rose resin","rose powdery","rose mossy","rose citrus",
 "floral vanilla","floral musk","floral amber","floral woody","floral fruity","floral powdery","fruity woody","fruity amber","fruity musk","fruity vanilla","fruity mossy","fruity spicy","fruity gourmand",
 "spicy amber","spicy woody","spicy vanilla","spicy tobacco","spicy leather","spicy oud","spicy resin","spicy gourmand","woody amber","woody musk","woody oud","woody leather","woody vanilla","woody smoky","woody mossy","woody powdery","woody resin",
 "amber vanilla","amber resin","amber musk","amber oud","amber tobacco","amber leather","vanilla tobacco","vanilla gourmand","vanilla oud","vanilla resin","vanilla musk","vanilla smoky","vanilla powdery",
 "leather oud","leather tobacco","leather smoky","leather powdery","leather resin","smoky resin","smoky oud","tobacco gourmand","oud resin","powdery musk","mossy amber"]);
const BAD=new Set(["aquatic gourmand","aquatic oud","aquatic tobacco","aquatic leather","aquatic vanilla","aquatic resin","aquatic smoky","green gourmand","tea gourmand","aquatic fruity","green tobacco","citrus oud"]);
const ACC_PRI=["oud","leather","smoky","tobacco","rose","gourmand","vanilla","resin","tea","aquatic","fruity","powdery","mossy","green","spicy","floral","aromatic","citrus","amber","woody","musk"];
const pairKey=(a,b)=>[a,b].sort().join(" ");
// AJ's own stated pairings (house blend notes, master inventory).
const AJ_PAIRS={P20:["P06","P03","P04","P14","W24","T04","R02","R06"],G12:["T02","T07","T08","T10","T04","T09","P06","W24","W13"],S11:["W24","W14","P03","P04","P14","S05","S06","W13"],W24:["P06","P03","P04","P14","P20","G12","S11","W13","S05"]};
const ajPair=(a,b)=>(AJ_PAIRS[a]||[]).includes(b)||(AJ_PAIRS[b]||[]).includes(a);
const accCache={};
function accords(m){if(accCache[m.id])return accCache[m.id];const t=(m.n+" "+(m.notes||"")+" "+(REF[m.id]||"")+" "+libText(m)).toLowerCase();const a=new Set(Object.keys(ACC_RE).filter(k=>ACC_RE[k].test(t)));
  if(!a.size)a.add({FR:"aquatic",CL:"musk",CT:"citrus",GR:"woody",RF:"rose",FT:"fruity",WA:"amber",SW:"vanilla"}[m.fam]);return accCache[m.id]=a}
function pairInfo(m1,m2){let good=[],bad=[];const pri=k=>Math.min(...k.split(" ").map(x=>ACC_PRI.indexOf(x)));for(const a of accords(m1))for(const b of accords(m2)){if(a===b)continue;const k=pairKey(a,b);if(GOOD.has(k)&&!good.includes(k))good.push(k);if(BAD.has(k)&&!bad.includes(k))bad.push(k)}
  const aj=ajPair(m1.id,m2.id);const hist=batchPairScore(m1.id,m2.id);
  const shared=[...accords(m1)].filter(a=>accords(m2).has(a));
  good.sort((x,y)=>pri(x)-pri(y));return{score:Math.min(good.length,4)+(shared.length?1:0)-3*bad.length+(aj?4:0)+hist,good,bad,aj,hist,shared}}
// Learn from your own batches: Make it = proven, Skip it = avoid.
function batchPairScore(a,b){let s=0;for(const x of B.list){if((!x.verdict&&!x.scores)||!x.s)continue;const ids=(x.s.ingredients||[]).map(i=>i.id);if(!ids.includes(a)||!ids.includes(b))continue;s+=x.verdict==="Make it"?3:x.verdict==="Skip it"?-4:x.verdict?-1:0;if(x.scores){s+=x.scores.liking>=4?2:x.scores.liking<=2?-3:0}}return s}
const OCC={Office:{good:["CT","FR","CL","GR","T"],bad:["SW","WA"],heavyCap:.35},"Daytime casual":{good:["FR","CT","FT","CL"],bad:["SW"],heavyCap:.4},Evening:{good:["WA","RF","GR","SW"],bad:[],heavyCap:.8},"Date night":{good:["SW","WA","RF","FT"],bad:["FR"],heavyCap:.85},"Special event":{good:["WA","RF","GR"],bad:[],heavyCap:.8},Any:{good:[],bad:[],heavyCap:.8}};
const SEAS={Summer:{good:["FR","CT","GR","CL"],bad:["SW","WA"]},Spring:{good:["RF","GR","CT","FT"],bad:[]},Fall:{good:["WA","FT","GR","RF"],bad:["FR"]},Winter:{good:["WA","SW","RF"],bad:["FR","CT"]},Everyday:{good:["CT","FR","GR","CL"],bad:[]}};
function fitScore(m,b){const o=OCC[b.occasion]||OCC.Any,se=SEAS[b.season]||SEAS.Everyday;let s=0;if(o.good.includes(m.fam))s+=2;if(o.bad.includes(m.fam))s-=3;if(se.good.includes(m.fam))s+=2;if(se.bad.includes(m.fam))s-=3;if(m.f==="FO")s+=1;if(REF[m.id]||m.notes)s+=1;return s}
const BOOST={bold:["W03","W16","W20","W21","W23","F02","F19","F24","G04"],soft:["C07","C02","R08","C04","C06","C05"]};
const EO_FOR=[["smoky","E20"],["resin","E20"],["woody","E18"],["rose","E16"],["citrus","E04"],["vanilla","E24"],["gourmand","E25"],["aromatic","E07"],["mossy","E21"],["floral","E14"]];
let LOCAL_USED=new Set();
function localSuggest(b){
  const pool=usable(b).filter(x=>x.f!=="FX"||b.allowFinished);const out=[];LOCAL_USED=new Set();
  const r=rng(hash(JSON.stringify({...b,avoid:0}))+state.shuffle*7919);const p=PLAN[b.season]||PLAN.Everyday;
  const MM=moodMatches(b.concept,pool);const moodIds=new Set(MM.hits.map(m=>m.id));
  const nameKey=m=>{const norm=t=>t.toLowerCase().replace(/\b(mfk|tf|tom ford|pdm|creed|ysl|lv|louis vuitton|exclusif|old edition|house blend|style)\b/g," ").replace(/delila/g,"delina").replace(/\bimagine\b/g,"imagination").replace(/\bavent\b/g,"aventus").replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim();const insp=norm((m.n.match(/\(([^)]*)\)/)||[])[1]||"");return insp.length>3?insp:norm(m.n.replace(/\(.*?\)/g,""))};
  const usedLeads=new Set();
  const choose=(cands,score,n=4)=>{const sc=cands.map(m=>({m,s:score(m)+r()*.6})).sort((a,z)=>z.s-a.s);return sc.slice(0,n).length?sc[0].m:null};
  const bold=/^Bold/.test(b.intensity),soft=/^Soft/.test(b.intensity);
  for(let k=0;k<3;k++){
    const keys=new Set();
    // 1 Lead: the oil that defines the scent (your mood first, then occasion and season fit).
    const leadC=pool.filter(m=>!usedLeads.has(nameKey(m))&&m.fam!=="CL");
    const themesOf=m=>new Set(MM.byTheme.map((t,ti)=>t.includes(m)?ti:-1).filter(x=>x>=0));const nT=MM.byTheme.length;
    const lead=choose(leadC,m=>(nT?(MM.byTheme[k%nT].slice(0,4).includes(m)?10:moodIds.has(m.id)?5:0):0)+fitScore(m,b)*1.2+(k===1&&weightOf(m)!=="heavy"?.5:0)+(k===2&&weightOf(m)==="heavy"?.5:0));
    if(!lead)continue;usedLeads.add(nameKey(lead));keys.add(nameKey(lead));
    // 2 Support: the best proven pairing with the lead, adding a second dimension.
    const supC=pool.filter(m=>m.id!==lead.id&&!keys.has(nameKey(m)));
    const sup=choose(supC,m=>{const pi=pairInfo(lead,m);const newDim=[...accords(m)].some(a=>!accords(lead).has(a))?1:0;const cov=[...themesOf(m)].some(t=>!themesOf(lead).has(t))?8:0;return pi.score*2+newDim+cov+(moodIds.has(m.id)?3:0)+fitScore(m,b)*.6-(pi.bad.length?20:0)});
    if(!sup)continue;keys.add(nameKey(sup));
    // 3 Accent: contrast in weight (light lift over a heavy lead, or an anchor under a light lead), compatible with both.
    const leadHeavy=weightOf(lead)==="heavy"||weightOf(sup)==="heavy";
    const accC=pool.filter(m=>![lead.id,sup.id].includes(m.id)&&!keys.has(nameKey(m))&&(leadHeavy?weightOf(m)!=="heavy":weightOf(m)!=="light"));
    const covered=new Set([...themesOf(lead),...themesOf(sup)]);const acc=choose(accC,m=>{const a=pairInfo(lead,m),c=pairInfo(sup,m);return a.score+c.score+([...themesOf(m)].some(t=>!covered.has(t))?7:0)+(moodIds.has(m.id)?2:0)+fitScore(m,b)*.6-((a.bad.length+c.bad.length)?20:0)});
    const parts=[[lead,"lead"],[sup,"support"]];if(acc){parts.push([acc,"accent"]);keys.add(nameKey(acc))}
    // 4 Optional booster for projection, or musk for a soft skin scent.
    if(bold||soft){const bc=pool.filter(m=>(bold?BOOST.bold:BOOST.soft).includes(m.id)&&!parts.some(([x])=>x.id===m.id)&&!keys.has(nameKey(m)));
      const bo=choose(bc,m=>parts.reduce((s,[x])=>s+pairInfo(x,m).score,0)-(parts.some(([x])=>pairInfo(x,m).bad.length)?20:0));if(bo)parts.push([bo,bold?"booster":"skin musk"])}
    const PCT=parts.length===4?{lead:45,support:25,accent:20,booster:10,"skin musk":10}:parts.length===3?{lead:50,support:30,accent:20}:{lead:60,support:40};
    // Occasion cap on heavy material.
    const cap=(OCC[b.occasion]||OCC.Any).heavyCap;
    let ing=parts.map(([m,role])=>({id:m.id,mat:m,pct:PCT[role]*(STR_F[libStrength(m)]||1),slot:role}));
    {const t=ing.reduce((a,i)=>a+i.pct,0);let acc2=0;ing.forEach((i,ix)=>{i.pct=ix===ing.length-1?100-acc2:Math.round(i.pct/t*100);acc2+=i.pct})}
    const heavyPct=ing.filter(i=>weightOf(i.mat)==="heavy").reduce((s,i)=>s+i.pct,0)/100;
    if(heavyPct>cap){const scale=cap/heavyPct;let freed=0;ing.forEach(i=>{if(weightOf(i.mat)==="heavy"){const np=Math.round(i.pct*scale);freed+=i.pct-np;i.pct=np}});const light=ing.filter(i=>weightOf(i.mat)!=="heavy");light.forEach(i=>i.pct+=Math.round(freed/light.length))}
    const tierOf=m=>weightOf(m)==="light"?"top":weightOf(m)==="heavy"?"base":"heart";
    const pairs=[];for(let x=0;x<ing.length;x++)for(let y=x+1;y<ing.length;y++){const pi=pairInfo(ing[x].mat,ing[y].mat);pairs.push({a:ing[x].mat,b:ing[y].mat,...pi})}
    const why=(i)=>{const accs=[...accords(i.mat)].sort((x,y)=>ACC_PRI.indexOf(x)-ACC_PRI.indexOf(y)).slice(0,3).join(", ");if(i.slot==="lead")return`Lead: defines the scent (${accs})${moodIds.has(i.id)?"; matches your mood":""}`;
      const pl=pairs.find(q=>(q.a===i.mat||q.b===i.mat)&&(q.a===ing[0].mat||q.b===ing[0].mat));const via=pl?(pl.aj?"one of your own stated pairings":pl.good.length?"proven pairing: "+pl.good.slice(0,2).join("; "):pl.shared.length?"shares "+pl.shared.slice(0,2).join(", "):"neutral pairing"):"";
      return`${i.slot[0].toUpperCase()+i.slot.slice(1)}: ${i.slot==="accent"?(leadHeavy?(weightOf(i.mat)==="light"?"lifts the opening":"brightens the heart"):"anchors the drydown"):i.slot==="booster"?"amber woods for projection":i.slot==="skin musk"?"keeps it close and soft":"adds "+accs} (${via})`};
    ing=ing.map(i=>({id:i.id,mat:i.mat,pct:i.pct,role:tierOf(i.mat),purpose:why(i)}));
    const clashes=pairs.filter(q=>q.bad.length);const proven=pairs.filter(q=>q.aj||q.good.length||q.hist>0);
    const eoMap=Object.fromEntries(EO_FOR);const eoKey=ACC_PRI.find(x=>accords(lead).has(x)&&eoMap[x]);const eoAcc=b.allowEO&&eoKey?eoMap[eoKey]:null;const drops=eoAcc?Math.max(1,Math.round(b.batch/10)):0;
    const accList=m=>[...accords(m)].sort((x,y)=>ACC_PRI.indexOf(x)-ACC_PRI.indexOf(y)).slice(0,3).join(", ");
    const topI=ing.filter(i=>i.role==="top"),heartI=ing.filter(i=>i.role==="heart"),baseI=ing.filter(i=>i.role==="base");
    const sx={name:"",tagline:`${b.season} ${b.occasion==="Any"?"wear":b.occasion.toLowerCase()} · ${parts.length} oil blend`,
      identity:`Lead ${lead.n} (${accList(lead)}) with ${sup.n}${acc?` and ${acc.n}`:""}. ${b.concept?(MM.hits.length?`Built around ${MM.themes.join(" and ")} from your mood. `:`None of your oils clearly match "${b.concept}", so this follows the season and occasion. `):""}${clashes.length?"Warning: contains a clash-prone pairing.":`Every pair shares a classic accord pairing${proven.some(q=>q.aj)?", including your own stated pairings":""}.`}`,
      lens:{bisch:"One dominant lead gives a clear signature",kurkdjian:"Support chosen for the smoothest proven pairing",cavallier:leadHeavy?"Light accent lifts the opening":"Bright lead keeps it airy",ropion:"Three tier structure from each oil's real weight",morillas:"Few oils, so it stays clean and wearable",cresp:[...accords(lead)].some(a=>a==="vanilla"||a==="gourmand")?"Gourmand warmth comes from the lead":"Kept dry, no added sweetness"},
      ingredients:ing,essentialOils:drops?[{id:eoAcc,drops,purpose:"Reinforces the lead's main accord; check supplier skin limits"}]:[],dpgPct:b.dpgPct,
      opening:topI.length?`${topI.map(i=>accList(i.mat)).join("; ")} from ${topI.map(i=>i.mat.n).join(" and ")}.`:`The lead's own opening: ${(REF[lead.id]||accList(lead)).split(";")[0]}.`,
      heart:heartI.length?`${heartI.map(i=>accList(i.mat)).join("; ")}.`:`${(REF[lead.id]||"").split(";")[1]||accList(lead)}.`,
      drydown:baseI.length?`${baseI.map(i=>accList(i.mat)).join("; ")}.`:`${(REF[lead.id]||"").split(";")[2]||accList(lead)}.`,
      projection:bold?"Strong, amber woods booster":soft?"Close to skin":"Moderate",longevity:baseI.length?"Long; heavy base materials":"Moderate; light materials fade faster",maturation:b.conc>=100?"3 days":"14 days",
      refinement:`Rule based draft from reference notes and known pairings, not bench tested. Mix a 5 mL test first; if the lead dominates too much, move 5% to the support.`};
    Object.assign(sx,localIdentity(b,k,ing,p));out.push(sx)}
  return out}
function localIdentity(b,k,ing,p){
  const keys=["nightcourt","blackcrown","aegis","unbound"];const org=keys[(k+state.shuffle)%4];const align={nightcourt:"Antihero",blackcrown:"Villain",aegis:"Hero",unbound:"Wildcard"}[org];
  const tf=ing[0]?.mat?.fam||p.top[0],bf=ing[ing.length-1]?.mat?.fam||p.base[0];
  const taken=new Set([...EXISTING.map(e=>e[0]),...avoidList().map(x=>x.toUpperCase())]);const cands=[];
  [...CANDA[tf],...CANDA[bf]].forEach((w,i)=>{const nm=`${w} ${CANDN[(i*3+k*5+state.shuffle)%CANDN.length]}`;if(cands.length<5&&!taken.has(nm.toUpperCase())&&!LOCAL_USED.has(nm)&&!LOCAL_USED.has("w:"+w)&&!cands.some(c=>c.name===nm))cands.push({name:nm,originality:6,impact:6,connection:6,why:"Draft from ingredient families"})});
  const notePool=[];ing.forEach(x=>{const nn=(x.mat.notes||"").split(/[;,]/)[0].trim();if(nn&&!/user|finished|body oil|restored/i.test(nn))notePool.push(nn.replace(/^\w/,c=>c.toUpperCase()));notePool.push(NOTEWORD[x.mat.fam])});
  const FILL={FR:"Marine",CL:"Musk",CT:"Bergamot",GR:"Cedar",RF:"Rose",FT:"Plum",WA:"Amber",SW:"Tonka"};ing.forEach(x=>notePool.push(FILL[x.mat.fam]));["Musk","Cedar","Amber","Bergamot"].forEach(x=>notePool.push(x));
  const notes=notePool.filter((v,i,a)=>v&&a.indexOf(v)===i).slice(0,4);
  cands.forEach(c=>LOCAL_USED.add(c.name));LOCAL_USED.add("w:"+(cands[0]?.name||"").split(" ")[0]);const nm=cands[0]?.name||`Atelier Draft ${k+1}`;
  const costume={FR:"sleek armor with flowing panels",CL:"layered tactical armor",CT:"light armor with a long open coat",GR:"rugged armor with bark like plating",RF:"long coat with a thorned high collar",FT:"lacquered segmented armor",WA:"heavy armor with glowing seams",SW:"hooded cloak over fitted armor"}[bf];
  const pal={aegis:"Navy, silver, white, radiant gold",nightcourt:"Black, burgundy, gunmetal, deep violet",blackcrown:"Obsidian, crimson, antique gold, dark bronze",unbound:"Electric violet, teal, burnt orange, metallic"}[org];
  return{name:nm,nameCandidates:cands,recommended:0,nameLocked:false,
    label:{motif:FAMLABEL[bf].m,tagline:`${b.season} operative`,notes,art:`Black and gold collectible comic label art: ${nm} in a dynamic action pose, ${costume} in ${pal.toLowerCase()}, ${ORGS[org].name} insignia, dramatic rim light, premium perfume label composition`},
    character:{alignment:align,org,powers:[POWER[tf],POWER[bf]].filter((v,i,a)=>v&&a.indexOf(v)===i),appearance:"Draft appearance; generate with Claude for an original design.",costume:`${costume} in ${pal.toLowerCase()}`,silhouette:"",origin:`Forged in a ${b.season.toLowerCase()} assignment gone wrong.`,strengths:"",weaknesses:"",motivation:"",connections:"",alias:nm,civilianName:"",insignia:`${ORGS[org].name} insignia`,pose:"Dynamic mid leap action pose",setting:"Meridian City rooftops at night",palette:pal}};
}

// ---------- Claude prompt ----------
const FRAMEWORK=`AM PARFUMS SIX MASTER PERFUMERS CREATIVE FRAMEWORK
1 Quentin Bisch (primary, 30%): boldness, power, originality, striking contrasts, recognizable identity, never generic.
2 Francis Kurkdjian (20%): refinement, precision, balance, smooth transitions, richness without heaviness, luxurious cohesion.
3 Jacques Cavallier-Belletrud (20%): radiance, luminous freshness, sparkling openings, transparency and lift, modern elegance.
4 Dominique Ropion (15%): structure, clear foundations, depth, controlled intensity, strong link between opening, heart, base.
5 Alberto Morillas (10%): wearability, versatility, clean execution, no sharpness, presence balanced with comfort.
6 Olivier Cresp (5%): sensuality, gourmand warmth (vanilla, coffee, amber, caramel, fruit) without excess sweetness.
RULES: Evaluate the whole inventory before choosing. Do not infer actual aromatic percentages from fragrance oil, roll-on, body oil or finished perfume product types. If as-supplied material dilution is unknown, clearly state that exact active aromatic concentration cannot be calculated. Never compensate for unknown dilution by blindly adding more. Define the scent identity first. Adjust emphasis to the concept; percentages are not rigid. Only include materials that genuinely improve the fragrance. Prioritize originality, sophistication, balance, projection, longevity. Use essential oils only if user opted in, and give exact whole drop counts alongside estimated mass; require IFRA/SDS or supplier use-limit confirmation for skin products before production. Explain each ingredient's purpose. Predict opening, heart, drydown, projection, longevity, and say they are predictions. Critically review before presenting. Do not make simple copies of existing perfumes. Every formula needs a distinctive identity and memorable signature. Use concise technical language and clearly distinguish hypotheses from measurements.

THE MERIDIAN FILES (official universe): Every AM PARFUMS fragrance is an original comic book character in Meridian City. The fragrance inspires the character; the character's actions and motivation determine moral alignment; alignment helps determine the organization. Scent never decides alignment by itself (a fresh scent is not automatically a hero, a dark scent not automatically a villain, a rose can be a dangerous villain, smoke can be a courageous protector, sweetness can be a manipulator).
ORGANIZATIONS:
aegis = THE AEGIS ORDER, heroes, motto "Power Exists to Protect." Courageous, honorable, disciplined, protective, self sacrificing. Visual: navy, silver, white, radiant gold, futuristic practical armor.
nightcourt = NIGHT COURT, antiheroes, motto "Justice Has No Curfew." Mysterious, independent, calculating, dangerous, morally complex, fiercely protective of innocents. Visual: black, burgundy, gunmetal, deep violet, shadow tactical armor, gothic urban.
blackcrown = THE BLACK CROWN, supervillains, motto "Power Is Never Given. It Is Taken." Ambitious, ruthless, charismatic, manipulative, intimidating. Visual: obsidian, crimson, antique gold, dark bronze, regal armor, dark crowns.
unbound = THE UNBOUND, rogues and wildcards, motto "No Masters. No Chains." Independent, unpredictable, rebellious, resourceful. Visual: electric violet, teal, burnt orange, metallic accents, asymmetrical armor.
CHARACTER must have: unique name, distinct moral alignment, original appearance, unique costume and recognizable silhouette, powers inspired by the fragrance, meaningful origin, personality strengths and weaknesses, clear motivation, organization, connections to existing characters. Do not repeat existing designs, powers, appearances or personalities.
NAMING RULES: bold, original, memorable; reflects the fragrance and character; fits Meridian City; sophisticated enough for a premium niche perfume; prefer one or two words; avoid repetitive terms and recycled patterns (do not lean on the same words across candidates); never duplicate existing fragrances, characters, or published comic characters (Marvel, DC, Image or others), and never reuse a perfume's real name. Generate FIVE candidates, score each, and recommend the strongest; the user approves before it is locked. Every name works as both a character identity and a premium fragrance name.
LABEL BRIEF (the user creates the artwork in another app, so describe it, do not draw it): the character is the centerpiece in a dynamic action pose with a setting that supports their story; black and gold Art Deco framing; 1990s hand inked comic style; organization colors and insignia; the label text is exactly five elements: fragrance name, AM PARFUMS, batch volume in mL, four defining scent notes, THE MERIDIAN FILES. Notes must be real materials or accords present in the formula; never invent ingredients. Character biographies stay on the companion card.`;
function pairingContext(){const aj=Object.entries(AJ_PAIRS).map(([a,l])=>`${BYID[a]?.n}: ${l.map(x=>BYID[x]?.n).filter(Boolean).join(", ")}`).join("\n");
  const hist=B.list.filter(x=>(x.verdict||x.scores)&&x.s).slice(0,20).map(x=>`${(x.verdict||"TESTED").toUpperCase()}${x.scores?` (liking ${x.scores.liking}/5, projection ${x.scores.projection}, longevity ${x.scores.longevity}, smoothness ${x.scores.smoothness}${x.scores.issues.length?"; issues: "+x.scores.issues.join(", "):""})`:""}: ${(x.s.ingredients||[]).map(i=>`${BYID[i.id]?.n||i.id} ${Math.round(i.pct)}%`).join(" + ")}${Object.values(x.notes||{}).some(Boolean)?` (notes: ${[x.notes.m15,x.notes.h1,x.notes.h4].filter(Boolean).join(" / ")})`:""}`).join("\n");
  return`STRENGTH: weak oils need a larger share and strong oils a smaller share than their role suggests.\nAJ'S OWN STATED PAIRINGS (trusted, prefer these):\n${aj}\n${hist?`AJ'S TESTED BATCHES (real results; repeat what was MADE, avoid what was SKIPPED):\n${hist}\n`:""}`}
function invText(b){
  return usable(b).map(x=>`${x.id} | ${x.n} | ${x.s} | ${x.f} (${FORM[x.f]}; actual aromatic concentration unknown) | ${FAM[x.fam]}${x.notes?" | notes: "+x.notes:""}${REF[x.id]?" | inspiration notes: "+REF[x.id]:""}${LIB.map[x.id]?` | AJ library (${LIB.map[x.id].confirmed?"confirmed by smell":"AI estimate"}): ${[LIB.map[x.id].myNotes,(LIB.map[x.id].notes||[]).join(", ")].filter(Boolean).join("; ")}${libStrength(x)?", strength "+libStrength(x):""}`:""}`).join("\n")+"\n\nESSENTIAL OILS (use in drops; HANOLLY unless noted):\n"+EO.map(e=>`${e.id} | ${e.n} | ${e.g}`).join("\n");
}
function buildPrompt(b){
  return `You are the formulator for AM PARFUMS, a custom blend house. Follow this framework exactly.

${FRAMEWORK}

BRIEF
Season or wear: ${b.season}${b.season==="Everyday"?" (versatile, all season, office safe unless the occasion says otherwise)":""}
Occasion: ${b.occasion}
Projection wanted: ${b.intensity}
Concept: ${b.concept||"Open. Create something original that fits the season and occasion."}
Approximate bottle fill: ${b.batch} mL. Supplied fragrance products allocated ${b.conc}% by MASS (w/w), not a guaranteed perfume-active concentration.
Optional Plant Guru DPG: ${b.conc>=100?0:(b.dpgPct==="auto"?"decided by the app for each formula":b.dpgPct+"% of batch by MASS")}. Essential oils allowed: ${b.allowEO?"Yes, only if they help":"No"}. Include mixed/diluted products: ${b.allowDiluted?"Yes, but identify their uncertain fragrance strength":"No, fragrance oils only"}. Finished perfumes from the collection: ${b.allowFinished?"Yes; they are alcohol based finished sprays of unknown concentration, so use them sparingly as accents and account for the alcohol they add":"No"}.
Provide ratios by mass. The app estimates total batch weight from assumed densities; actual bottle fill must be verified and topped up by weight.

INVENTORY (use ONLY these IDs; supplier products cannot be assumed 100% active):
${invText(b)}

TASK
Create 3 distinct formulas that differ in character from each other, and give the three characters clearly different identities, and use at least two different organizations across the three. Each formula uses 3 to 5 distinct available perfume materials (these are finished fragrance oils, so more than 5 turns muddy). One lead oil carries 40 to 60% of the oil portion and defines the scent; the rest support or contrast it. Use the inspiration notes to reason about each oil, and only pair oils whose accords are known to work together (for example rose with oud or leather, tobacco with vanilla, citrus with vetiver or musk, lavender with tonka). Avoid clash-prone pairs: aquatic or marine with gourmand, oud, tobacco, leather, resin or heavy vanilla; green or tea with gourmand; citrus with oud. Respect the occasion: Office and Daytime casual keep heavy amber, gourmand and leather material under 35 to 40% of the oil; Date night and Evening may go darker. Respect the season the same way. Give each material a "pct" equal to its share by mass of the supplied fragrance-material allocation, with all pct values summing to 100. Essential oils: ${b.allowEO?"0 to 2 drops total unless reliable maximum permitted levels and material details are established":"exactly zero; no essentialOils"}. Do not use cinnamon, clove, expressed citrus, or other sensitizing/phototoxic material automatically. dpgPct must be ${b.conc>=100||b.dpgPct==="auto"?0:b.dpgPct}; the app sets DPG itself. The app computes approximate mass and nominal volume. If the supplied-products dilution is unknown, don't label concentration as verified extrait/EDP. Distinguish top/heart/base as compositional roles, not scientifically verified release timings.

${pairingContext()}
EXISTING MERIDIAN FILES CHARACTERS (never reuse or closely resemble; you may reference them as rivals, allies or history in connections):
${EXISTING.map(e=>e[0]+" ("+e[1]+")").join("\n")}
${b.avoid.length?"Also taken: "+b.avoid.join(", "):""}

Reply with only JSON:
{"suggestions":[{"nameCandidates":[{"name":"","originality":9,"impact":8,"connection":9,"why":"short"}],"recommended":0,"tagline":"one line","identity":"2 sentences on the scent identity and signature","lens":{"bisch":"","kurkdjian":"","cavallier":"","ropion":"","morillas":"","cresp":""},"ingredients":[{"id":"W13","role":"top|heart|base","pct":20,"purpose":"short"}],"essentialOils":[{"id":"E20","drops":2,"purpose":"short"}],"dpgPct":2,"opening":"","heart":"","drydown":"","projection":"","longevity":"","maturation":"","refinement":"one line from your critical review","character":{"alignment":"Hero|Antihero|Villain|Wildcard","org":"aegis|nightcourt|blackcrown|unbound","powers":["2 or 3 powers drawn from the ingredients"],"appearance":"one sentence","costume":"one sentence with colors","silhouette":"one sentence on the recognizable shape","origin":"2 sentence origin story","strengths":"short","weaknesses":"short","motivation":"one sentence","connections":"one sentence linking to an existing character or organization","alias":"superhero alias (may equal the fragrance name)","civilianName":"original civilian name","insignia":"one sentence","pose":"one sentence describing a dynamic action pose","setting":"one sentence describing the environment in Meridian City","palette":"4 to 5 named colors coordinated with the organization"},"label":{"notes":["note 1","note 2","note 3","note 4"],"art":"two sentences of label art direction for an illustrator: composition, lighting, how the powers are shown"}}]}
nameCandidates holds exactly 5 entries scored 1 to 10; recommended is the index of the strongest.
label.notes holds exactly four defining scent notes as short material words (e.g. Vetiver, Leather), drawn from the formula, never perfume names.
Each lens value is under 15 words saying how that perfumer's philosophy shaped this formula.`;
}
function sanitize(list,b){
  const ok=new Set(usable(b).map(x=>x.id));const dropped=[];
  const out=(Array.isArray(list)?list:[]).map(s=>{
    const ing=(Array.isArray(s.ingredients)?s.ingredients:[]).filter(i=>{const good=i&&ok.has(i.id)&&Number.isFinite(+i.pct)&&+i.pct>0;if(!good)dropped.push(i?.id||"unknown");return good}).map(i=>({...i,pct:+i.pct,role:["top","heart","base"].includes(i.role)?i.role:"heart"}));
    const eo=(b.allowEO&&Array.isArray(s.essentialOils)?s.essentialOils:[]).filter(e=>e&&BYID[e.id]&&BYID[e.id].f==="EO"&&Number.isFinite(+e.drops)&&+e.drops>0).map(e=>({...e,drops:Math.min(2,Math.round(+e.drops))})).filter(e=>!["E19","E22","E02","E03","E04"].includes(e.id)).slice(0,2);
    const ch=s.character||{};const alRaw=String(ch.alignment||ch.allegiance||"").toLowerCase();const align=/anti/.test(alRaw)?"Antihero":/villain/.test(alRaw)?"Villain":/wild|rogue/.test(alRaw)?"Wildcard":/hero/.test(alRaw)?"Hero":"Antihero";
    const org=ORGS[ch.org]?ch.org:{Hero:"aegis",Antihero:"nightcourt",Villain:"blackcrown",Wildcard:"unbound"}[align];
    const taken=new Set([...EXISTING.map(e=>e[0].toUpperCase()),...EXISTING.flatMap(e=>e[1].toUpperCase().split(";").map(x=>x.trim())),...b.avoid.map(x=>x.toUpperCase())]);
    const recName=(Array.isArray(s.nameCandidates)&&s.nameCandidates[+s.recommended||0]||{}).name;
    let cands=(Array.isArray(s.nameCandidates)?s.nameCandidates:[]).filter(c=>c&&c.name&&!taken.has(String(c.name).toUpperCase())).slice(0,5).map(c=>({name:String(c.name),originality:+c.originality||0,impact:+c.impact||0,connection:+c.connection||0,why:String(c.why||"")}));
    if(!cands.length&&s.name)cands=[{name:String(s.name),originality:0,impact:0,connection:0,why:""}];
    if(!cands.length)cands=[{name:"Unnamed Draft",originality:0,impact:0,connection:0,why:"Claude returned no usable name; regenerate for candidates"}];
    let rec=cands.findIndex(c=>c.name===recName);
    if(rec<0){const sc=c=>c.originality+c.impact+c.connection;rec=cands.reduce((bi,c,i)=>sc(c)>sc(cands[bi])?i:bi,0)}
    const lb=s.label||{};const fb=FAMLABEL[(BYID[ing[ing.length-1]?.id]||{}).fam]||FAMLABEL.WA;
    const label={motif:MOTIFS.includes(lb.motif)?lb.motif:fb.m,tagline:String(lb.tagline||"").slice(0,40),notes:(Array.isArray(lb.notes)?lb.notes:[]).slice(0,4).map(String),art:String(lb.art||"")};
    const str=v=>v==null?"":String(v);
    return{...s,name:cands[rec].name,nameCandidates:cands,recommended:rec,nameLocked:false,label,ingredients:ing,essentialOils:eo,lens:s.lens||{},
      character:{alignment:align,org,powers:Array.isArray(ch.powers)?ch.powers.map(String):[],appearance:str(ch.appearance),costume:str(ch.costume),silhouette:str(ch.silhouette),origin:str(ch.origin),strengths:str(ch.strengths),weaknesses:str(ch.weaknesses),motivation:str(ch.motivation),connections:str(ch.connections),alias:str(ch.alias),civilianName:str(ch.civilianName),insignia:str(ch.insignia),pose:str(ch.pose),setting:str(ch.setting),palette:str(ch.palette)}};
  }).filter(s=>s&&s.ingredients.length>=2);
  return{out,dropped};
}

// ---------- Checks and text exports ----------
const ROLE_ORDER={top:0,heart:1,base:2};
// Checks every formula, Claude's or offline, against the same pairing rules.
function formulaChecks(s){const ing=(s.ingredients||[]).map(i=>BYID[i.id]).filter(Boolean);const proven=[],clashes=[],neutral=[];
  for(let x=0;x<ing.length;x++)for(let y=x+1;y<ing.length;y++){const pi=pairInfo(ing[x],ing[y]);const lab=`${ing[x].n} + ${ing[y].n}`;
    if(pi.bad.length)clashes.push(`${lab}: ${pi.bad.join("; ")} can clash`);else if(pi.aj)proven.push(`${lab}: your own stated pairing`);else if(pi.hist>0)proven.push(`${lab}: worked in your batches`);else if(pi.hist<0)clashes.push(`${lab}: you skipped a batch with this pair`);else if(pi.good.length)proven.push(`${lab}: ${pi.good.slice(0,2).join("; ")}`);else neutral.push(lab)}
  const noRef=ing.filter(m=>!REF[m.id]&&!m.notes).map(m=>m.n);const lead=Math.max(0,...(s.ingredients||[]).map(i=>+i.pct||0))/((s.ingredients||[]).reduce((a,i)=>a+(+i.pct||0),0)||1);
  return{proven,clashes,neutral,noRef,n:ing.length,lead}}
function wrapName(n){const w=String(n).toUpperCase().split(/\s+/);if(w.length<2||n.length<11)return[w.join(" ")];let best=[w.join(" ")],bd=1e9;for(let k=1;k<w.length;k++){const a=w.slice(0,k).join(" "),z=w.slice(k).join(" ");const d=Math.abs(a.length-z.length);if(d<bd){bd=d;best=[a,z]}}return best}
function orgOf(s){const c=s.character||{};return ORGS[c.org]?c.org:"nightcourt"}
function alignOf(s){const c=s.character||{};return c.alignment||c.allegiance||"Antihero"}
function labelBriefText(s,b){const c=s.character||{};const O=ORGS[orgOf(s)];const L=s.label||{};const notes=(L.notes||[]).slice(0,4);
  const lines=[
`AM PARFUMS · THE MERIDIAN FILES · LABEL BRIEF`,
`Fragrance: ${s.name}${s.nameLocked?"":" (name pending approval)"}`,
`Character: ${c.alias||s.name}${c.civilianName?" / "+c.civilianName:""} · ${O.name} · ${alignOf(s)}`,
``,
`EXACT LABEL TEXT (these five elements only, proofread exactly):`,
`1. ${String(s.name).toUpperCase()}`,
`2. AM PARFUMS`,
`3. ${b.batch} mL`,
`4. ${notes.map(x=>x.toUpperCase()).join(" · ")}${notes.length<4?"  (needs "+(4-notes.length)+" more verified note"+(4-notes.length===1?"":"s")+")":""}`,
`5. THE MERIDIAN FILES`,
``,
`CHARACTER ART (centerpiece, full color):`,
c.costume?`Costume: ${c.costume}`:null,
c.silhouette?`Silhouette: ${c.silhouette}`:null,
c.insignia?`Insignia: ${c.insignia}`:null,
c.powers&&c.powers.length?`Powers shown: ${c.powers.join("; ")}`:null,
c.pose?`Pose: ${c.pose}`:null,
c.setting?`Setting: ${c.setting}`:null,
`Palette: ${c.palette||O.name+" colors"}, with black and gold framing`,
L.art?`Direction: ${L.art}`:null,
``,
`STYLE: Black and gold luxury Art Deco frame. Authentic 1990s hand inked superhero comic art: bold outlines, dramatic shadows, sophisticated highlights, controlled halftone. Cinematic perspective and energetic action; the character dominates. Elegant typography harmonized with the art.`,
`AVOID: bottles, botanicals or ingredient collages replacing the character; static headshots; sexualized or impractical costumes; ornamental clutter; muddy dark on dark detail.`,
``,
`PRINT: 30 mm × 30 mm perfect square. SVG width="30mm" height="30mm"; PNG 354 × 354 px at 300 DPI with density metadata. Keep text and key art 2 mm inside the edge. All text legible at actual size. Brighten artwork for darker inkjet output on printable vinyl (HP DeskJet 3755).`];
  return lines.filter(x=>x!==null).join("\n")}
function asText(s,b){const c=compute(s,b);const LB="\n\n"+labelBriefText(s,b);
  let t=`AM PARFUMS · ${s.name}\n${s.tagline}\n${b.season} · ${b.occasion} · ${b.batch} mL approximate bottle target · ${b.conc}% supplied fragrance materials by mass (NOT verified active perfume %)\nBatch target ${f3(c.totalMass)} g\n\n`;
  t+="ADD IN THIS ORDER\n";[...c.ing].sort((a,z)=>({base:0,heart:1,top:2})[a.role]-({base:0,heart:1,top:2})[z.role]).forEach(x=>{const d=Math.max(1,Math.round(x.drops));t+=`${x.role.toUpperCase()}  ${x.mat.n} (${x.mat.s}, ${FORM[x.mat.f]}): ${d} drop${d>1?"s":""} · ${f3(x.ml)} mL · ${f3(x.g)} g\n`});
  c.eo.forEach(e=>t+=`EO  ${e.mat.n}: ${e.drops} drop${e.drops>1?"s":""} · approx. ${f3(e.g)} g · ${f3(e.ml)} mL\n`);
  t+=`DPG ${c.dpgRec.level}${c.dpgRec.pct?" ("+c.dpgRec.pct+"%)":""}: ${c.dpgRec.reason}\n`;
  if(c.dpgRec.warn)t+=`Note: ${c.dpgRec.warn}\n`;
  if(c.dpgMl>0)t+=`DPG: ${f3(c.dpgG)} g · approx. ${f3(c.dpgMl)} mL\n`;
  if(c.alcMl>0)t+=`Perfumer's alcohol: ${f3(c.alcG)} g · approx. ${f3(c.alcMl)} mL\n`;
  if(s.character){const ch=s.character;const O=ORGS[orgOf(s)];t+=`\nTHE MERIDIAN FILES · ${O.name} · ${alignOf(s)}${s.nameLocked?"":" · name pending approval"}\nPowers: ${(ch.powers||[]).join("; ")}\n`;[["Appearance",ch.appearance],["Costume",ch.costume],["Silhouette",ch.silhouette],["Origin",ch.origin],["Strengths",ch.strengths],["Weaknesses",ch.weaknesses],["Motivation",ch.motivation],["Connections",ch.connections]].forEach(([k,v])=>{if(v)t+=`${k}: ${v}\n`})}
  t+=`\nOpening: ${s.opening}\nHeart: ${s.heart}\nDrydown: ${s.drydown}\nMature: ${s.maturation}`;return t+LB}

// ---------- Batches ----------
const MS_DAY=864e5;
function matDays(s,b){if(+b.conc>=100)return 3;const m=String(s.maturation||"").match(/(\d+)\s*(day|week|month)/i);
  if(m){const n=+m[1],u=m[2].toLowerCase(),d=u.startsWith("week")?n*7:u.startsWith("month")?n*30:n;if(d>=1&&d<=120)return d}return 14}
function slimSugg(s){return JSON.parse(JSON.stringify({...s,nameLocked:true,
  ingredients:(s.ingredients||[]).map(i=>({id:i.id,role:i.role,pct:+i.pct,purpose:i.purpose||""})),
  essentialOils:(s.essentialOils||[]).map(e=>({id:e.id,drops:+e.drops,purpose:e.purpose||""}))}))}
function bStage(x){if(x.verdict)return"done";if(!x.mixedAt)return"approved";const t=new Date();t.setHours(23,59,59,0);return(x.readyEarly||t.getTime()>=x.mixedAt+x.days*MS_DAY)?"ready":"maturing"}
const STAGE={approved:"Not mixed",maturing:"Maturing",ready:"Ready to test",done:"Completed"};
const fmtDate=t=>new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const todayISO=()=>{const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
function newBatch(sg,b,source){const{avoid,...br}=b;return{id:"b"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:sg.name,approvedAt:Date.now(),
  brief:br,s:slimSugg(sg),days:matDays(sg,b),mixedAt:null,readyEarly:false,notes:{m15:"",h1:"",h4:""},verdict:"",source:source||state.source}}
function daysLeft(x){const sod=t=>{const d=new Date(t);d.setHours(0,0,0,0);return d.getTime()};return Math.max(0,Math.round((sod(x.mixedAt+x.days*MS_DAY)-sod(Date.now()))/MS_DAY))}
function matPct(x){return x.mixedAt?Math.min(100,Math.max(0,(Date.now()-x.mixedAt)/(x.days*MS_DAY)*100)):0}
function scorePrompt(x){const recipe=(x.s.ingredients||[]).map(i=>`${BYID[i.id]?.n||i.id} ${Math.round(i.pct)}%`).join(" + ");
  return`Score this test batch of a home perfumer's blend from their own notes. Formula: ${recipe}. Strength ${x.brief?.conc||"?"}%, mixed ${x.mixedAt?fmtDate(x.mixedAt):"?"}.
Notes at 15 minutes: ${x.notes?.m15||"none"}
Notes at 1 hour: ${x.notes?.h1||"none"}
Notes at 4 hours: ${x.notes?.h4||"none"}
Judge only from what the notes say; use 3 when the notes say nothing about a score. Do not use dashes. Reply with only JSON: {"liking":1-5,"projection":1-5,"longevity":1-5,"smoothness":1-5,"issues":["short phrase"],"suggestion":"one sentence on what to change next time","summary":"one sentence"}`}

// ---------- Scent library ----------
function libChanged(){for(const k in accCache)delete accCache[k]}
const libOils=()=>INV.filter(x=>x.f!=="FX");
function libText(m){const e=LIB.map[m.id];return e?`${e.myNotes||""} ${(e.notes||[]).join(", ")}`:""}
function libStrength(m){const e=LIB.map[m.id];return e?(e.myStrength||e.strength||""):""}
const STR_F={weak:1.3,medium:1,strong:.75};
function libStats(){const all=libOils();const d=all.filter(m=>LIB.map[m.id]&&(LIB.map[m.id].notes||[]).length).length;const c=all.filter(m=>LIB.map[m.id]&&LIB.map[m.id].confirmed).length;return{all:all.length,drafted:d,confirmed:c}}
function libPrompt(chunk){return`You are helping a home perfumer build a scent library of the fragrance oils they own. They are supplier oils inspired by designer fragrances, plus a few house blends and simple single-note oils. For each oil, estimate from published information: the inspiration's note pyramid, what clone oils of that fragrance typically smell like, and the supplier type and form. Be honest; if you are unsure, give low confidence. Strength means how strongly the oil is likely to smell in a blend compared with a typical undiluted fragrance oil: roll-ons, body oils and unverified mixes are often diluted (weak); undiluted oils are medium; dense amber, woody, oud, leather and gourmand oils are often strong. Do not use dashes.
Reply with only a JSON array, one entry per id, same ids:
[{"id":"W29","notes":["leather","cardamom","jasmine"],"character":"under 12 words","strength":"weak|medium|strong","longevity":"short|medium|long","confidence":"low|medium|high"}]
notes: 3 to 6 short lowercase notes you expect to actually smell.
OILS (id | name | supplier | form | family | known notes):
${chunk.map(m=>`${m.id} | ${m.n} | ${m.s} | ${m.f} | ${FAM[m.fam]}${m.notes?" | supplier notes: "+m.notes:""}${REF[m.id]?" | inspiration notes: "+REF[m.id]:""}`).join("\n")}`}

const ERR={not_granted:"Claude access was declined. Allow it from the page menu, or use offline drafts.",sampling_disabled:"Claude is not available on this account right now.",rate_limited:"Usage limit reached for now. Try again later.",invalid_json:"Claude's reply could not be read. Try again.",refused:"Claude declined that brief. Try rewording the concept.",session_expired:"Sign in again to use Claude."};
