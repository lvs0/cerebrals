import { useState, useEffect } from "react";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap'); *{box-sizing:border-box;margin:0;padding:0} :root{--teal:#00e5c8;--violet:#9b5de5;--pink:#f15bb5;--amber:#ffd166;--cyan:#06b6d4;--bg:#050810;--g0:rgba(255,255,255,0.04);--gb:rgba(255,255,255,0.08);--text:#e8eaf0;--muted:#6b7280} body{background:var(--bg);color:var(--text);font-family:'DM Mono',monospace;-webkit-font-smoothing:antialiased} .app{min-height:100vh;position:relative;overflow-x:hidden} .bg-fx{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 80% 60% at 15% 5%,rgba(0,229,200,.06) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 85% 85%,rgba(155,93,229,.08) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(241,91,181,.03) 0%,transparent 70%),#050810} .noise{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")} .grid-bg{position:fixed;inset:0;z-index:1;pointer-events:none;background-image:linear-gradient(rgba(0,229,200,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,200,.025) 1px,transparent 1px);background-size:60px 60px} .wrap{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:40px 20px 80px} .hdr{text-align:center;margin-bottom:44px;animation:fd .8s ease both} .logo-row{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px} .logo-orb{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--violet));display:flex;align-items:center;justify-content:center;box-shadow:0 0 24px rgba(0,229,200,.4),0 0 48px rgba(0,229,200,.1);animation:orb 3s ease-in-out infinite} @keyframes orb{0%,100%{box-shadow:0 0 24px rgba(0,229,200,.4),0 0 48px rgba(0,229,200,.1)}50%{box-shadow:0 0 36px rgba(0,229,200,.6),0 0 72px rgba(0,229,200,.2)}} .logo-txt{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;background:linear-gradient(135deg,var(--teal) 0%,#fff 50%,var(--violet) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text} .tagline{font-family:'Cormorant Garamond',serif;font-size:14px;font-style:italic;color:var(--muted);letter-spacing:.08em;margin-bottom:10px} .src-row{display:flex;justify-content:center;gap:7px;flex-wrap:wrap} .sbadge{font-size:10px;padding:2px 9px;border-radius:20px;letter-spacing:.1em;border:1px solid;text-transform:uppercase} .sb-teal{border-color:rgba(0,229,200,.25);color:var(--teal)} .sb-viol{border-color:rgba(155,93,229,.25);color:var(--violet)} .sb-cyan{border-color:rgba(6,182,212,.25);color:var(--cyan)} .sb-amb{border-color:rgba(255,209,102,.25);color:var(--amber)} .sb-pink{border-color:rgba(241,91,181,.25);color:var(--pink)} .mode-tabs{display:flex;gap:4px;background:var(--g0);border:1px solid var(--gb);border-radius:12px;padding:4px;width:fit-content;margin:0 auto 28px;animation:fu .8s .1s ease both} .mtab{padding:8px 22px;border-radius:8px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;border:none;background:transparent;color:var(--muted);transition:all .25s} .mtab.on{background:linear-gradient(135deg,rgba(0,229,200,.15),rgba(155,93,229,.15));color:var(--text);border:1px solid rgba(0,229,200,.2)} .sz{animation:fu .8s .2s ease both;margin-bottom:14px} .srow{display:flex;gap:10px;align-items:center} .cmp-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px} @media(max-width:640px){.cmp-inputs{grid-template-columns:1fr}} .sinp{flex:1;padding:16px 20px;background:var(--g0);border:1px solid var(--gb);border-radius:12px;font-family:'DM Mono',monospace;font-size:13px;color:var(--text);outline:none;transition:border-color .3s,box-shadow .3s;backdrop-filter:blur(20px)} .sinp::placeholder{color:var(--muted)} .sinp:focus{border-color:rgba(0,229,200,.4);box-shadow:0 0 0 1px rgba(0,229,200,.12),0 8px 32px rgba(0,0,0,.4)} .sbtn{padding:16px 22px;background:linear-gradient(135deg,var(--teal),var(--violet));border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;color:#050810;white-space:nowrap;transition:opacity .2s,transform .2s} .sbtn:hover{opacity:.85;transform:scale(1.02)} .sbtn:disabled{opacity:.35;cursor:not-allowed;transform:none} .qtags{display:flex;flex-wrap:wrap;gap:7px;animation:fu .8s .3s ease both;margin-bottom:32px} .qtag{padding:4px 11px;border:1px solid var(--gb);border-radius:20px;font-size:11px;letter-spacing:.04em;color:var(--muted);cursor:pointer;transition:all .2s;background:var(--g0)} .qtag:hover{border-color:rgba(0,229,200,.3);color:var(--teal);background:rgba(0,229,200,.06)} .exp-bar{display:flex;justify-content:flex-end;margin-bottom:16px} .exp-btn{padding:8px 18px;background:rgba(255,209,102,.08);border:1px solid rgba(255,209,102,.2);border-radius:8px;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--amber);cursor:pointer;transition:all .2s} .exp-btn:hover{background:rgba(255,209,102,.14);border-color:rgba(255,209,102,.35)} .loader{text-align:center;padding:50px 0;animation:fi .4s ease} .scanner{width:72px;height:72px;margin:0 auto 20px;position:relative} .sr{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(0,229,200,.2);animation:srr 2s ease-in-out infinite} .sr:nth-child(2){inset:10px;animation-delay:.3s} .sr:nth-child(3){inset:20px;animation-delay:.6s} @keyframes srr{0%,100%{border-color:rgba(0,229,200,.2);transform:scale(1)}50%{border-color:rgba(0,229,200,.6);transform:scale(1.06)}} .sd{position:absolute;inset:32px;border-radius:50%;background:var(--teal);box-shadow:0 0 12px var(--teal);animation:dp 1s ease-in-out infinite} @keyframes dp{0%,100%{opacity:1}50%{opacity:.2}} .steps{display:flex;flex-direction:column;gap:7px;margin-top:16px} .step{font-size:11px;letter-spacing:.1em;text-transform:uppercase;transition:color .4s} .step.done{color:rgba(0,229,200,.4)}.step.active{color:var(--teal)}.step.pending{color:var(--muted)} .rw{animation:fu .6s ease both} .cmp-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px} @media(max-width:700px){.cmp-grid{grid-template-columns:1fr}} .rh{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px} .rq{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--teal)} .rm{font-size:10px;color:var(--muted)} .panel{background:var(--g0);border:1px solid var(--gb);border-radius:14px;backdrop-filter:blur(20px);margin-bottom:12px;overflow:hidden;transition:border-color .3s} .panel:hover{border-color:rgba(255,255,255,.11)} .ph{display:flex;align-items:center;gap:9px;padding:14px 18px;border-bottom:1px solid var(--gb);cursor:pointer;user-select:none} .pdot{width:7px;height:7px;border-radius:50%;flex-shrink:0} .ptitle{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;flex:1} .pcnt{font-size:10px;color:var(--muted)} .pchev{font-size:10px;color:var(--muted);transition:transform .3s} .pchev.open{transform:rotate(180deg)} .pb{padding:18px;display:none} .pb.open{display:block} .ss{margin-bottom:18px} .ss-t{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px;color:var(--teal)} .stxt{font-size:12px;line-height:1.8;color:rgba(232,234,240,.82)} .piste{margin-bottom:9px;padding-left:11px;border-left:2px solid rgba(0,229,200,.2)} .piste-n{color:var(--teal);font-weight:500;font-size:12px} .piste-s{color:rgba(155,93,229,.8);font-size:10px;margin-left:7px;font-family:'DM Mono',monospace} .piste-d{font-size:11px;color:rgba(232,234,240,.65);margin-top:3px;line-height:1.6} .bm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px} .bmc{padding:10px 12px;background:rgba(0,229,200,.04);border:1px solid rgba(0,229,200,.12);border-radius:9px} .bm-n{font-family:'DM Mono',monospace;font-size:11px;font-weight:500;color:var(--teal);margin-bottom:3px} .bm-r{font-size:10px;color:var(--muted);line-height:1.4} .tri{padding:12px 0;border-bottom:1px solid var(--gb)} .tri:last-child{border-bottom:none} .tri-t{font-size:12px;color:var(--text);margin-bottom:6px;line-height:1.5} .tbadges{display:flex;gap:7px;flex-wrap:wrap} .tb{font-size:10px;letter-spacing:.04em;padding:2px 7px;border-radius:4px;font-family:'DM Mono',monospace} .tb-ph{background:rgba(155,93,229,.12);color:var(--violet);border:1px solid rgba(155,93,229,.2)} .tb-st{background:rgba(0,229,200,.08);color:var(--teal);border:1px solid rgba(0,229,200,.18)} .tb-id{background:rgba(241,91,181,.08);color:var(--pink);border:1px solid rgba(241,91,181,.18)} .tcga-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px;margin-bottom:14px} .tcgac{padding:11px 13px;background:rgba(6,182,212,.04);border:1px solid rgba(6,182,212,.12);border-radius:9px} .tcga-id{font-family:'DM Mono',monospace;font-size:11px;color:var(--cyan);margin-bottom:3px;font-weight:500} .tcga-nm{font-size:11px;color:rgba(232,234,240,.8);margin-bottom:5px;line-height:1.4} .tcga-st{display:flex;gap:8px} .tcga-s{font-size:10px;color:var(--muted)} .tcga-s span{color:var(--cyan);font-weight:500} .genes{display:flex;flex-wrap:wrap;gap:6px} .gchip{padding:3px 9px;background:rgba(6,182,212,.08);border:1px solid rgba(6,182,212,.18);border-radius:6px;font-family:'DM Mono',monospace;font-size:11px;color:var(--cyan)} .geo-item{padding:10px 0;border-bottom:1px solid var(--gb)} .geo-item:last-child{border-bottom:none} .geo-t{font-size:12px;color:var(--text);margin-bottom:4px;line-height:1.5} .geo-m{display:flex;gap:10px;flex-wrap:wrap} .geo-b{font-size:10px;color:var(--muted);font-family:'Cormorant Garamond',serif;font-style:italic} .srci{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--gb);align-items:flex-start} .srci:last-child{border-bottom:none} .src-n{font-size:10px;color:var(--muted);flex-shrink:0;margin-top:2px} .src-t{font-size:12px;color:rgba(232,234,240,.8);line-height:1.5} .src-j{font-size:10px;color:var(--muted);margin-top:2px;font-style:italic;font-family:'Cormorant Garamond',serif} .err{padding:14px 18px;background:rgba(241,91,181,.06);border:1px solid rgba(241,91,181,.2);border-radius:10px;font-size:12px;color:var(--pink);text-align:center} .empty{text-align:center;padding:56px 0;animation:fi .5s ease both} .empty-i{font-size:36px;margin-bottom:14px;opacity:.25} .empty-t{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px} .empty-s{font-size:12px;color:rgba(107,114,128,.65);font-family:'Cormorant Garamond',serif;font-style:italic} .disc{margin-top:32px;padding:12px 16px;background:rgba(255,209,102,.04);border:1px solid rgba(255,209,102,.1);border-radius:8px;font-size:10px;color:rgba(255,209,102,.45);text-align:center;line-height:1.7;letter-spacing:.03em} .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px} .stat-card{background:var(--g0);border:1px solid var(--gb);border-radius:12px;padding:16px;text-align:center;transition:border-color .3s} .stat-card:hover{border-color:rgba(0,229,200,.2)} .stat-val{font-family:'Syne',sans-serif;font-size:24px;font-weight:700;color:var(--teal);margin-bottom:4px} .stat-lbl{font-size:10px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase} .api-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(0,229,200,.08);border:1px solid rgba(0,229,200,.2);border-radius:20px;font-size:10px;color:var(--teal);margin-bottom:20px} .api-badge.offline{background:rgba(241,91,181,.08);border-color:rgba(241,91,181,.2);color:var(--pink)} @keyframes fd{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}} @keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}} @keyframes fi{from{opacity:0}to{opacity:1}} @media print{ .bg-fx,.noise,.grid-bg,.mode-tabs,.qtags,.sz,.exp-bar,.stats-row{display:none!important} .app,.wrap{background:white!important;color:#111!important;padding:0!important} .panel{border:1px solid #ddd!important;background:white!important;margin-bottom:10px!important;break-inside:avoid} .ph{background:#f5f5f5!important;border-bottom:1px solid #ddd!important} .pb{display:block!important} .logo-txt{-webkit-text-fill-color:#111!important;background:none!important} *{backdrop-filter:none!important;box-shadow:none!important} }`;

const QUICK = ["Cancer poumon NSCLC","Glioblastome GBM","Leucémie LMA","Cancer sein HER2+","Mélanome métastatique","Pancréas PDAC","Cancer colorectal","Lymphome DLBCL"];
const STEPS = ["PubMed · articles récents","ClinicalTrials · essais actifs","TCGA/GDC · génomique","GEO · expression datasets","Synthèse IA oncologie"];

// Local synthesis fallback when API fails
function generateLocalSynthesis(query: string, {articles,trials,gdcData,geoData}: {
  articles: any[];
  trials: any[];
  gdcData: {projects: any[]; genes: any[]};
  geoData: any[];
}) {
  const titles = articles.map(a => a.title).join(" ").toLowerCase();
  const hasImmuno = titles.includes("immunotherapy") || titles.includes("checkpoint") || titles.includes("pd-1") || titles.includes("pd-l1");
  const hasTargeted = titles.includes("targeted") || titles.includes("inhibitor") || titles.includes("egfr") || titles.includes("alk");
  const hasChemo = titles.includes("chemotherapy") || titles.includes("platinum");
  
  const mechanisms = hasImmuno 
    ? "Immunothérapie et checkpoints immunitaires (PD-1/PD-L1) identifiés comme mécanismes clés dans la littérature récente."
    : hasTargeted
    ? "Thérapies ciblées sur voies de signalisation cellulaire (EGFR, ALK, ROS1)."
    : "Mécanismes moléculaires hétérogènes nécessitant analyse génomique approfondie.";
  
  const treatment_pistes = [
    ...(hasImmuno ? [{name: "Immunothérapie", description: "Anti-PD-1/PD-L1", stage: "Approuvé"}] : []),
    ...(hasTargeted ? [{name: "Thérapie ciblée", description: "Inhibition de voies oncogéniques", stage: "Phase II/III"}] : []),
    {name: "Chimiothérapie", description: "Agents cytotoxiques standards", stage: "Approuvé"},
    ...(trials.length > 0 ? [{name: "Essais cliniques", description: `${trials.length} essais en recrutement actif`, stage: "Recrutement"}] : []),
  ].slice(0, 6);
  
  const biomarkers = gdcData.genes.slice(0, 8).map((g, i) => ({
    name: g.symbol,
    role: i < 3 ? "Oncogène / Cible thérapeutique majeure" : "Marqueur pronostique potentiel"
  }));
  
  const totalCases = gdcData.projects.reduce((acc, p) => acc + p.cases, 0);
  
  return {
    overview: `Analyse de ${query}. ${articles.length} articles scientifiques, ${trials.length} essais cliniques, ${gdcData.projects.length} projets TCGA et ${geoData.length} datasets GEO identifiés.`,
    mechanisms,
    treatment_pistes,
    biomarkers: biomarkers.length > 0 ? biomarkers : [{name: "BRCA1", role: "Marqueur génomique"}, {name: "TP53", role: "Tumor suppressor"}],
    genomic_insights: totalCases > 0 
      ? `${totalCases.toLocaleString()} cas analysés dans TCGA. Gènes clés: ${gdcData.genes.slice(0,5).map(g=>g.symbol).join(", ")}. Données d'expression disponibles sur ${geoData.length} cohortes GEO.`
      : `Données génomiques TCGA limitées pour cette pathologie. ${geoData.length} datasets GEO disponibles pour analyse d'expression.`,
    emerging: trials.length > 3 
      ? "Activité de recherche élevée — nouvelles approches thérapeutiques en développement actif."
      : "Recherche active sur combinaisons thérapeutiques et résistance aux traitements."
  };
}

async function fetchPubMed(term: string) {
  try {
    const r = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term+" cancer treatment therapy")}&retmax=8&retmode=json&sort=relevance`);
    const d = await r.json();
    const ids = d.esearchresult?.idlist || [];
    if (!ids.length) return [];
    const s = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`);
    const sd = await s.json();
    return ids.map(id => { const doc=sd.result?.[id]; return doc?{id,title:doc.title||"",journal:doc.fulljournalname||doc.source||"",year:doc.pubdate?.split(" ")[0]||"",authors:doc.authors?.slice(0,2).map((a:any)=>a.name).join(", ")||""}:null; }).filter(Boolean);
  } catch { return []; }
}

async function fetchTrials(term: string) {
  try {
    const r = await fetch(`https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(term)}&pageSize=6&filter.overallStatus=RECRUITING`);
    const d = await r.json();
    return (d.studies||[]).map((s:any)=>({nctId:s.protocolSection?.identificationModule?.nctId||"",title:s.protocolSection?.identificationModule?.briefTitle||"",phase:s.protocolSection?.designModule?.phases?.[0]||"N/A",status:s.protocolSection?.statusModule?.overallStatus||""}));
  } catch { return []; }
}

async function fetchGDC(term: string) {
  try {
    const [pRes,gRes] = await Promise.all([
      fetch(`https://api.gdc.cancer.gov/projects?q=${encodeURIComponent(term)}&size=4&fields=project_id,name,primary_site,disease_type,summary.case_count,summary.file_count`),
      fetch(`https://api.gdc.cancer.gov/genes?q=${encodeURIComponent(term)}&size=10&fields=gene_id,symbol,name,biotype`)
    ]);
    const [pData,gData] = await Promise.all([pRes.json(),gRes.json()]);
    const projects = (pData.data?.hits||[]).map((p:any)=>({id:p.project_id||"",name:p.name||"",site:Array.isArray(p.primary_site)?p.primary_site[0]||"":p.primary_site||"",cases:p.summary?.case_count||0,files:p.summary?.file_count||0}));
    const genes = (gData.data?.hits||[]).filter((g:any)=>g.biotype==="protein_coding").slice(0,8).map((g:any)=>({symbol:g.symbol||"",name:g.name||""}));
    return {projects,genes};
  } catch { return {projects:[],genes:[]}; }
}

async function fetchGEO(term: string) {
  try {
    const r = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gds&term=${encodeURIComponent(term)}+cancer+expression&retmax=6&retmode=json&sort=relevance`);
    const d = await r.json();
    const ids = d.esearchresult?.idlist||[];
    if (!ids.length) return [];
    const s = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&id=${ids.join(",")}&retmode=json`);
    const sd = await s.json();
    return ids.map((id:any)=>{const doc=sd.result?.[id];return doc?{id,title:doc.title||"",organism:doc.organism||"",samples:doc.n_samples||0,type:doc.gdstype||""}:null;}).filter(Boolean);
  } catch { return []; }
}

async function runSynthesis(query: string, {articles,trials,gdcData,geoData}: {
  articles: any[];
  trials: any[];
  gdcData: {projects: any[]; genes: any[]};
  geoData: any[];
}) {
  // Fallback if no API key
  if (!GROQ_API_KEY) {
    console.log("[Cerebrals] No API key, using local synthesis");
    return generateLocalSynthesis(query, {articles,trials,gdcData,geoData});
  }

  const artCtx  = articles.slice(0,6).map((a,i)=>`[${i+1}] "${a.title}" — ${a.journal} (${a.year})`).join("\n");
  const trCtx   = trials.slice(0,4).map(t=>`- ${t.title} (${t.phase})`).join("\n");
  const gdcCtx  = gdcData.projects.length?`TCGA PROJECTS: ${gdcData.projects.map(p=>`${p.id} (${p.cases} cases)`).join(", ")}`:"";
  const genesCtx= gdcData.genes.length?`PROTEIN-CODING GENES: ${gdcData.genes.map(g=>g.symbol).join(", ")}`:"";
  const geoCtx  = geoData.slice(0,3).map(g=>`- ${g.title} (${g.samples} samples, ${g.organism})`).join("\n");

  const prompt  = `You are an expert molecular oncology research assistant. Analyze this pathology integrating all sources.

PATHOLOGY: ${query}
PUBMED:
${artCtx||"—"}
TRIALS:
${trCtx||"—"}
${gdcCtx}
${genesCtx}
GEO:
${geoCtx||"—"}

Respond ONLY in strict JSON, no markdown, no backticks:
{"overview":"General synthesis 2-3 sentences","mechanisms":"Molecular mechanisms and pathways 2-3 sentences","treatment_pistes":[{"name":"Name","description":"Short desc","stage":"Preclinical|Phase I|Phase II|Phase III|Approved"}],"biomarkers":[{"name":"Biomarker","role":"Short role"}],"genomic_insights":"TCGA/GEO genomic insights 2-3 sentences","emerging":"Emerging trends 2 sentences"}
Include 5-7 treatment tracks, 6-10 biomarkers. Valid JSON only. French language preferred.`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an expert molecular oncology research assistant. Respond only in valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1200
      })
    });

    if (!res.ok) {
      console.warn("[Cerebrals] Groq API failed, using local fallback");
      return generateLocalSynthesis(query, {articles,trials,gdcData,geoData});
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    let cleanText = text.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(cleanText);
  } catch (error) {
    console.warn("[Cerebrals] Synthesis error, using local fallback:", error);
    return generateLocalSynthesis(query, {articles,trials,gdcData,geoData});
  }
}

async function analyzeQuery(query: string, onStep: (step: number) => void) {
  onStep(0);
  const [articles,trials] = await Promise.all([fetchPubMed(query),fetchTrials(query)]);
  onStep(1);
  const [gdcData,geoData] = await Promise.all([fetchGDC(query),fetchGEO(query)]);
  onStep(2); await new Promise(r=>setTimeout(r,200));
  onStep(3); await new Promise(r=>setTimeout(r,150));
  onStep(4);
  const synthesis = await runSynthesis(query,{articles,trials,gdcData,geoData});
  return {query,articles,trials,gdcData,geoData,synthesis,ts:Date.now()};
}

interface PanelProps {
  title: string;
  color: string;
  count?: string;
  open?: boolean;
  children: React.ReactNode;
}

function Panel({title,color,count,children,open:init=true}: PanelProps) {
  const [open,setOpen] = useState(init);
  return (
    <div className="panel">
      <div className="ph" onClick={()=>setOpen(o=>!o)}>
        <div className="pdot" style={{background:color,boxShadow:`0 0 7px ${color}`}}/>
        <span className="ptitle" style={{color}}>{title}</span>
        {count!=null&&<span className="pcnt">{count}</span>}
        <span className={`pchev${open?" open":""}`}>▼</span>
      </div>
      <div className={`pb${open?" open":""}`}>{children}</div>
    </div>
  );
}

function Loader({step}: {step: number}) {
  return (
    <div className="loader">
      <div className="scanner"><div className="sr"/><div className="sr"/><div className="sr"/><div className="sd"/></div>
      <div className="steps">
        {STEPS.map((s,i)=> (
          <span key={i} className={`step ${i<step?"done":i===step?"active":"pending"}`}>
            {i<step?"✓":i===step?"▶":"○"} {s}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ResultData {
  query: string;
  articles: any[];
  trials: any[];
  gdcData: {projects: any[]; genes: any[]};
  geoData: any[];
  synthesis: any;
  ts: number;
}

function StatsRow({data}: {data: ResultData}) {
  const totalCases = data.gdcData.projects.reduce((acc, p) => acc + p.cases, 0);
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-val">{data.articles.length}</div>
        <div className="stat-lbl">Articles</div>
      </div>
      <div className="stat-card">
        <div className="stat-val">{data.trials.length}</div>
        <div className="stat-lbl">Essais</div>
      </div>
      <div className="stat-card">
        <div className="stat-val">{totalCases > 0 ? (totalCases / 1000).toFixed(1) + "K" : "—"}</div>
        <div className="stat-lbl">Cas TCGA</div>
      </div>
      <div className="stat-card">
        <div className="stat-val">{data.gdcData.genes.length}</div>
        <div className="stat-lbl">Gènes</div>
      </div>
    </div>
  );
}

function ResultView({data, useLocal}: {data: ResultData; useLocal?: boolean}) {
  const {query,articles,trials,gdcData,geoData,synthesis,ts} = data;
  const total = articles.length+trials.length+gdcData.projects.length+geoData.length;
  return (
    <div>
      <div className="rh">
        <span className="rq">// {query}</span>
        <span className="rm">{total} sources · {new Date(ts).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
      
      {useLocal && (
        <div className="api-badge offline">
          <span>●</span> Mode offline — synthèse locale
        </div>
      )}
      
      <StatsRow data={data} />

      <Panel title="Synthèse IA" color="var(--teal)">
        {synthesis.overview&&<div className="ss"><div className="ss-t">Vue d'ensemble</div><p className="stxt">{synthesis.overview}</p></div>}
        {synthesis.mechanisms&&<div className="ss"><div className="ss-t">Mécanismes moléculaires</div><p className="stxt">{synthesis.mechanisms}</p></div>}
        {synthesis.genomic_insights&&<div className="ss"><div className="ss-t">Insights génomiques · TCGA/GEO</div><p className="stxt" style={{color:"rgba(6,182,212,.85)"}}>{synthesis.genomic_insights}</p></div>}
        {synthesis.treatment_pistes?.length>0&&<div className="ss"><div className="ss-t">Pistes thérapeutiques</div>{synthesis.treatment_pistes.map((p: any,i: number)=><div key={i} className="piste"><span className="piste-n">{p.name}</span><span className="piste-s">[{p.stage}]</span><p className="piste-d">{p.description}</p></div>)}</div>}
        {synthesis.emerging&&<div className="ss"><div className="ss-t">Tendances émergentes</div><p className="stxt" style={{fontStyle:"italic",color:"rgba(232,234,240,.65)"}}>{synthesis.emerging}</p></div>}
      </Panel>

      {synthesis.biomarkers?.length>0&&(
        <Panel title="Biomarqueurs" color="var(--violet)" count={`${synthesis.biomarkers.length} identifiés`}>
          <div className="bm-grid">{synthesis.biomarkers.map((b: any,i: number)=><div key={i} className="bmc"><div className="bm-n">{b.name}</div><div className="bm-r">{b.role}</div></div>)}</div>
        </Panel>
      )}

      {(gdcData.projects.length>0||gdcData.genes.length>0)&&(
        <Panel title="TCGA · GDC" color="var(--cyan)" count={`${gdcData.projects.length} projets`}>
          {gdcData.projects.length>0&&<><div className="ss-t" style={{marginBottom:10}}>Projets TCGA</div><div className="tcga-grid">{gdcData.projects.map((p: any,i: number)=><div key={i} className="tcgac"><div className="tcga-id">{p.id}</div><div className="tcga-nm">{p.name}</div><div className="tcga-st"><span className="tcga-s">Cas: <span>{p.cases.toLocaleString()}</span></span><span className="tcga-s">Fichiers: <span>{p.files.toLocaleString()}</span></span></div></div>)}</div></>}
          {gdcData.genes.length>0&&<div style={{marginTop:gdcData.projects.length?14:0}}><div className="ss-t" style={{marginBottom:8}}>Gènes associés · protéines codantes</div><div className="genes">{gdcData.genes.map((g: any,i: number)=><span key={i} className="gchip" title={g.name}>{g.symbol}</span>)}</div></div>}
        </Panel>
      )}

      {trials.length>0&&(
        <Panel title="Essais cliniques" color="var(--pink)" count={`${trials.length} en recrutement`}>
          {trials.map((t: any,i: number)=><div key={i} className="tri"><div className="tri-t">{t.title}</div><div className="tbadges"><span className="tb tb-ph">{t.phase}</span><span className="tb tb-st">{t.status}</span>{t.nctId&&<span className="tb tb-id">{t.nctId}</span>}</div></div>)}
        </Panel>
      )}

      {geoData.length>0&&(
        <Panel title="GEO · Datasets d'expression" color="var(--amber)" count={`${geoData.length} datasets`} open={false}>
          {geoData.map((g: any,i: number)=><div key={i} className="geo-item"><div className="geo-t">{g.title}</div><div className="geo-m">{g.samples>0&&<span className="geo-b">{g.samples} échantillons</span>}{g.organism&&<span className="geo-b">{g.organism}</span>}{g.type&&<span className="geo-b">{g.type}</span>}</div></div>)}
        </Panel>
      )}

      {articles.length>0&&(
        <Panel title="Sources PubMed" color="rgba(232,234,240,.5)" count={`${articles.length} articles`} open={false}>
          {articles.map((a: any,i: number)=><div key={i} className="srci"><span className="src-n">[{i+1}]</span><div><div className="src-t">{a.title}</div><div className="src-j">{a.journal}{a.year?` · ${a.year}`:""}{a.authors?` · ${a.authors}`:""}</div></div></div>)}
        </Panel>
      )}
    </div>
  );
}

export default function Celebrals() {
  const [mode, setMode] = useState("single");
  const [medocs, setMedocs] = useState<any[]>([]);
  const [query,setQuery]     = useState("");
  const [loading,setLoading] = useState(false);
  const [step,setStep]       = useState(0);
  const [result,setResult]   = useState<ResultData | null>(null);
  const [err,setErr]         = useState<string | null>(null);
  const [useLocal,setUseLocal] = useState(false);
  const [qA,setQA]           = useState("");
  const [qB,setQB]           = useState("");
  const [loadA,setLoadA]     = useState(false);
  const [loadB,setLoadB]     = useState(false);
  const [stepA,setStepA]     = useState(0);
  const [stepB,setStepB]     = useState(0);
  const [resA,setResA]       = useState<ResultData | null>(null);
  const [resB,setResB]       = useState<ResultData | null>(null);
  const [errA,setErrA]       = useState<string | null>(null);
  const [errB,setErrB]       = useState<string | null>(null);

  // Check API key on mount
  useEffect(() => {
    if (!GROQ_API_KEY) {
      setUseLocal(true);
    }
  }, []);

  async function handleSingle() {
    const q=query.trim(); if(!q||loading) return;
    setLoading(true); setErr(null); setResult(null); setStep(0);
    try { 
      const res = await analyzeQuery(q,setStep);
      setResult(res);
    }
    catch(e) { 
      console.error(e); 
      setErr("Erreur lors de l'analyse. Réessayer."); 
    }
    finally { setLoading(false); }
  }

  async function handleCompare() {
    const a=qA.trim(),b=qB.trim(); if(!a||!b) return;
    setLoadA(true); setLoadB(true); setErrA(null); setErrB(null); setResA(null); setResB(null); setStepA(0); setStepB(0);
    await Promise.all([
      analyzeQuery(a,setStepA).then(setResA).catch(e=>{console.error(e);setErrA("Erreur.");}).finally(()=>setLoadA(false)),
      analyzeQuery(b,setStepB).then(setResB).catch(e=>{console.error(e);setErrB("Erreur.");}).finally(()=>setLoadB(false)),
    ]);
  }

  const hasRes = mode==="single"?!!result:(!!resA||!!resB);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="bg-fx"/><div className="noise"/><div className="grid-bg"/>
        <div className="wrap">

          <header className="hdr">
            <div className="logo-row">
              <div className="logo-orb">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="2.5" fill="#050810"/>
                  <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="#050810" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="8" cy="8" r="6" stroke="#050810" strokeWidth="1.2" opacity=".4"/>
                </svg>
              </div>
              <span className="logo-txt">Cerebrals</span>
            </div>
            <p className="tagline">Biomedical Research Engine · Oncology Intelligence</p>
            <div className="src-row">
              <a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer" className="sbadge sb-teal">PubMed</a>
              <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="sbadge sb-viol">ClinicalTrials</a>
              <a href="https://portal.gdc.cancer.gov" target="_blank" rel="noopener noreferrer" className="sbadge sb-cyan">TCGA · GDC</a>
              <a href="https://www.ncbi.nlm.nih.gov/geo" target="_blank" rel="noopener noreferrer" className="sbadge sb-amb">GEO</a>
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="sbadge sb-pink">Groq AI</a>
            </div>
          </header>

          <div className="mode-tabs">
            <button className={`mtab${mode==="single"?" on":""}`} onClick={()=>setMode("single")}>Analyse</button>
            <button className={`mtab${mode==="compare"?" on":""}`} onClick={()=>setMode("compare")}>Comparaison</button>
            <button className={`mtab${mode==="medocs"?" on":""}`} onClick={()=>setMode("medocs")}>Médocs</button>
            <button className={`mtab${mode==="enquete"?" on":""}`} onClick={()=>setMode("enquete")}>Enquête</button>
            <button className={`mtab${mode==="traitement"?" on":""}`} onClick={()=>setMode("traitement")}>Traitement</button>
            <button className={`mtab${mode==="showroom"?" on":""}`} onClick={()=>setMode("showroom")}>Showroom</button>
            <button className={`mtab${mode==="routine"?" on":""}`} onClick={()=>setMode("routine")}>Routine</button>
            <button className={`mtab${mode==="faq"?" on":""}`} onClick={()=>setMode("faq")}>FAQ</button>
            <button className={`mtab${mode==="chat"?" on":""}`} onClick={()=>setMode("chat")}>Chat</button>
          </div>

          <div className="sz">
            {mode==="single"?(
              <div className="srow">
                <input className="sinp" placeholder="Ex: cancer du poumon NSCLC, glioblastome GBM…" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSingle()}/>
                <button className="sbtn" onClick={handleSingle} disabled={loading||!query.trim()}>{loading?"…":"Analyser →"}</button>
              </div>
            ):(
              <>
                <div className="cmp-inputs">
                  <input className="sinp" placeholder="Pathologie A · Ex: NSCLC…" value={qA} onChange={e=>setQA(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleCompare()}/>
                  <input className="sinp" placeholder="Pathologie B · Ex: SCLC…" value={qB} onChange={e=>setQB(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleCompare()}/>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <button className="sbtn" onClick={handleCompare} disabled={loadA||loadB||!qA.trim()||!qB.trim()}>{(loadA||loadB)?"Analyse en cours…":"Comparer →"}</button>
                </div>
              </>
            )}
          </div>

          <div className="qtags">
            {QUICK.map(q=> (
              <span key={q} className="qtag" onClick={()=>mode==="single"?setQuery(q):(qA?setQB(q):setQA(q))}>{q}</span>
            ))}
          </div>

          {hasRes&&<div className="exp-bar"><button className="exp-btn" onClick={()=>window.print()}>⬇ Exporter PDF</button></div>}

          {mode==="single"&&(
            <div>
              {loading&&<Loader step={step}/>}
              {err&&<div className="err">{err}</div>}
              {!loading&&!result&&!err&&(
                <div className="empty">
                  <div className="empty-i">◎</div>
                  <div className="empty-t">Entrez une pathologie oncologique</div>
                  <div className="empty-s">PubMed · ClinicalTrials · TCGA/GDC · GEO · Synthèse Groq AI</div>
                </div>
              )}
              {result&&!loading&&<div className="rw"><ResultView data={result} useLocal={useLocal}/><div className="disc">⚠ Outil de recherche académique uniquement. Ne constitue pas un avis médical. Sources : PubMed/NCBI · ClinicalTrials.gov · TCGA/GDC · GEO · Groq AI.</div></div>}
            </div>
          )}

          {mode==="compare"&&(
            <div>
              {!loadA&&!loadB&&!resA&&!resB&&!errA&&!errB&&(
                <div className="empty">
                  <div className="empty-i">⊕</div>
                  <div className="empty-t">Comparez deux pathologies</div>
                  <div className="empty-s">Analyse parallèle · 5 sources · Synthèse comparative side-by-side</div>
                </div>
              )}
              {(loadA||loadB||resA||resB||errA||errB)&&(
                <div className="cmp-grid">
                  <div>{loadA&&<Loader step={stepA}/>}{errA&&<div className="err">{errA}</div>}{resA&&!loadA&&<ResultView data={resA} useLocal={useLocal}/>}</div>
                  <div>{loadB&&<Loader step={stepB}/>}{errB&&<div className="err">{errB}</div>}{resB&&!loadB&&<ResultView data={resB} useLocal={useLocal}/>}</div>
                </div>
              )}
              {(resA||resB)&&!loadA&&!loadB&&<div className="disc">⚠ Outil de recherche académique. Sources : PubMed · ClinicalTrials · TCGA/GDC · GEO · Groq AI.</div>}
            </div>
          )}

          {(mode==="medocs"||mode==="enquete"||mode==="traitement"||mode==="showroom"||mode==="routine"||mode==="faq"||mode==="chat")&&(
            <div style={{textAlign:"center",padding:"60px 0"}}>
              <div style={{fontSize:"36px",marginBottom:"14px",opacity:0.25}}>◆</div>
              <div style={{fontFamily:"Syne",fontSize:"13px",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--muted)",marginBottom:"6px"}}>{mode} — Coming soon</div>
              <div style={{fontSize:"12px",color:"rgba(107,114,128,.65)",fontStyle:"italic"}}>Cette section sera implémentée bientôt</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
