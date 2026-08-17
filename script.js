/* ======================================================================
   ICONS — minimal inline SVG set, single style, reused across sidebar/UI
====================================================================== */
const ICON = {
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  animal:'<circle cx="12" cy="13" r="6"/><path d="M8 8 6 4M16 8l2-4"/><circle cx="9.5" cy="12.5" r=".6" fill="currentColor"/><circle cx="14.5" cy="12.5" r=".6" fill="currentColor"/>',
  facility:'<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
  feed:'<path d="M12 21c-4-1-7-5-7-10 5 0 9 3 10 7"/><path d="M12 21c4-1 7-5 7-10-5 0-9 3-10 7"/><path d="M12 21V9"/>',
  train:'<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/>',
  jobs:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
  people:'<circle cx="8.5" cy="8" r="3"/><circle cx="16" cy="9" r="2.4"/><path d="M2.5 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M14.5 14.2c2.6.4 4.5 2.6 4.5 5.3"/>',
  farm:'<path d="M12 21V10"/><path d="M12 10c0-4-3-6-7-6 0 4 3 7 7 7Z"/><path d="M12 13c0-3.5 2.6-5.5 6-5.5 0 3.5-2.6 6-6 6Z"/>',
  finance:'<path d="M3 21h18"/><path d="M5 21V10l7-6 7 6v11"/><path d="M9 21v-6h6v6"/>',
  time:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  analytics:'<path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/>',
  scale:'<path d="M12 3v18"/><path d="M5 8h14"/><path d="M5 8 2 15a3 3 0 0 0 6 0L5 8Z"/><path d="M19 8l-3 7a3 3 0 0 0 6 0l-3-7Z"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4A8.6 8.6 0 0 1 8 19l-5 1 1.5-4.4A8.4 8.4 0 1 1 21 11.5Z"/>',
  users:'<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.2 3.2 0 0 1 0 6.3"/><path d="M17.5 14.2a6.5 6.5 0 0 1 4 5.8"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z"/>',
  bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 8v.01M12 11v5"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  clockin:'<path d="M12 22a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"/><path d="M12 10v4l2.5 1.5"/><path d="M9 2h6"/>'
};
function svg(key, size=17){ return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[key]||''}</svg>`; }

/* ======================================================================
   MOCK DATA LAYER
   NOTE: everything below lives in memory only for this in-browser demo
   (no server, no database). See the closing notes in chat for how to
   replace this with a real backend before going to production.
====================================================================== */
let USERS = [
  {username:'admin', password:'admin123', role:'admin', name:'Grace Nakato', question:'Name of the farm\u2019s founder?', answer:'milc'},
  {username:'manager', password:'manager123', role:'manager', name:'Peter Okello', question:'First crop grown on the farm?', answer:'maize'},
  {username:'accountant', password:'acc123', role:'accountant', name:'Sarah Namuli', question:'Farm\u2019s nearest town?', answer:'mukono'},
  {username:'worker', password:'worker123', role:'worker', name:'James Otieno', question:'Name of your first animal?', answer:'bella'},
];
const ROLE_LABEL = {admin:'Administrator', manager:'Farm Manager', accountant:'Accountant', worker:'Farm Worker'};

// module registry — single source of truth for sidebar + access control
const MODULES = [
  {id:'dashboard', label:'Dashboard', icon:'dashboard', roles:['admin','manager','accountant','worker'], group:'Overview'},
  {id:'jobs', label:'Jobs & Tasks', icon:'jobs', roles:['admin','manager','worker'], group:'Operations', full:true},
  {id:'animal', label:'Animal', icon:'animal', roles:['admin','manager','worker'], group:'Operations', full:true},
  {id:'facility', label:'Facility', icon:'facility', roles:['admin','manager'], group:'Operations'},
  {id:'feed', label:'Feed', icon:'feed', roles:['admin','manager'], group:'Operations'},
  {id:'farm', label:'Farm', icon:'farm', roles:['admin','manager','worker'], group:'Operations'},
  {id:'train', label:'Train Track', icon:'train', roles:['admin','manager'], group:'Operations'},
  {id:'scale', label:'Scale', icon:'scale', roles:['admin','accountant'], group:'Operations'},
  {id:'time', label:'Time', icon:'time', roles:['admin','manager','accountant','worker'], group:'Workforce', full:true},
  {id:'people', label:'People', icon:'people', roles:['admin','manager'], group:'Workforce', full:true},
  {id:'finance', label:'Finance', icon:'finance', roles:['admin','accountant'], group:'Workforce', full:true},
  {id:'analytics', label:'Analytics', icon:'analytics', roles:['admin','manager','accountant'], group:'Workforce'},
  {id:'chat', label:'Chat', icon:'chat', roles:['admin','manager','accountant','worker'], group:'Workforce', full:true},
  {id:'users', label:'Users & Roles', icon:'users', roles:['admin'], group:'Admin', full:true},
  {id:'settings', label:'Settings', icon:'settings', roles:['admin'], group:'Admin'},
];

let JOBS = [
  {id:1, title:'Move dairy herd to east paddock', assignee:'James Otieno', due:'Today', status:'open', priority:'high'},
  {id:2, title:'Repair fence — north boundary', assignee:'James Otieno', due:'Tomorrow', status:'open', priority:'medium'},
  {id:3, title:'Restock mineral licks, barn 2', assignee:'Unassigned', due:'Fri', status:'open', priority:'low'},
  {id:4, title:'Vaccinate calves (batch 12)', assignee:'James Otieno', due:'Mon', status:'done', priority:'high'},
];
let ANIMALS = [
  {tag:'UG-0142', type:'Dairy cow', breed:'Friesian', status:'Healthy', weight:'480 kg', location:'Paddock A'},
  {tag:'UG-0143', type:'Dairy cow', breed:'Ankole', status:'Under watch', weight:'410 kg', location:'Barn 2'},
  {tag:'UG-0144', type:'Calf', breed:'Friesian', status:'Healthy', weight:'92 kg', location:'Nursery'},
  {tag:'UG-0145', type:'Dairy cow', breed:'Jersey', status:'Healthy', weight:'395 kg', location:'Paddock A'},
];
let TIME_LOG = [
  {name:'James Otieno', date:'Jul 14', in:'6:02 AM', out:'—', hours:'in progress'},
  {name:'James Otieno', date:'Jul 13', in:'6:10 AM', out:'4:45 PM', hours:'10h 35m'},
  {name:'Peter Okello', date:'Jul 13', in:'7:00 AM', out:'5:30 PM', hours:'10h 30m'},
];
let CLOCKED_IN = false;
let TRANSACTIONS = [
  {date:'Jul 12', desc:'Milk sale — Mukono Dairy Co-op', type:'Income', amount:2450000},
  {date:'Jul 10', desc:'Feed supplier invoice #2291', type:'Expense', amount:-860000},
  {date:'Jul 9', desc:'Veterinary services', type:'Expense', amount:-210000},
  {date:'Jul 7', desc:'Livestock sale — 2 head', type:'Income', amount:1800000},
  {date:'Jul 3', desc:'Worker payroll — June', type:'Expense', amount:-1340000},
];
let STAFF = [
  {name:'Grace Nakato', role:'Administrator', dept:'Management', status:'Active'},
  {name:'Peter Okello', role:'Farm Manager', dept:'Operations', status:'Active'},
  {name:'Sarah Namuli', role:'Accountant', dept:'Finance', status:'Active'},
  {name:'James Otieno', role:'Farm Worker', dept:'Livestock', status:'Active'},
  {name:'Moses Kato', role:'Farm Worker', dept:'Crops', status:'On leave'},
];
let CHAT_CHANNELS = ['General', 'Livestock team', 'Maintenance', 'Management'];
let CHAT_MSGS = {
  'General':[
    {from:'Peter Okello', me:false, text:'Morning all — vet visit confirmed for 2pm today.', time:'7:12 AM'},
    {from:'James Otieno', me:false, text:'Noted, herd will be in barn 2 by then.', time:'7:15 AM'},
  ],
  'Livestock team':[
    {from:'Sarah Namuli', me:false, text:'Feed invoice looks higher than last month, can someone confirm quantities?', time:'8:02 AM'},
  ],
  'Maintenance':[], 'Management':[]
};
let activeChannel = 'General';

/* ======================================================================
   SESSION / AUTH
====================================================================== */
let session = null; // {username, role, name}
let resetTarget = null; // username being reset
let resetCode = null;

function goTo(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  if(view==='reset'){
    document.getElementById('resetStep1').classList.remove('hidden');
    document.getElementById('resetStep2').classList.add('hidden');
    document.getElementById('resetStep3').classList.add('hidden');
    setStepDots(1);
    document.getElementById('resetError1').style.display='none';
    document.getElementById('resetUser').value='';
  }
}
function setStepDots(n){
  for(let i=1;i<=3;i++){
    const el = document.getElementById('stepDot'+i);
    el.classList.remove('active','done');
    if(i<n) el.classList.add('done');
    if(i===n) el.classList.add('active');
  }
}
function showErr(id, msg){
  const el = document.getElementById(id);
  el.textContent = msg; el.style.display='block';
}
function hideErr(id){ document.getElementById(id).style.display='none'; }

function handleLogin(){
  const u = document.getElementById('loginUser').value.trim().toLowerCase();
  const p = document.getElementById('loginPass').value;
  hideErr('loginError');
  const user = USERS.find(x=>x.username===u);
  if(!user || user.password!==p){
    showErr('loginError','Username or password is incorrect. Try again or reset your password.');
    return;
  }
  session = {username:user.username, role:user.role, name:user.name};
  enterApp();
}
function handleLogout(){
  session = null;
  document.getElementById('shell').classList.add('hidden');
  document.getElementById('loginUser').value='';
  document.getElementById('loginPass').value='';
  goTo('login');
}

function resetStepOne(){
  const u = document.getElementById('resetUser').value.trim().toLowerCase();
  hideErr('resetError1');
  const user = USERS.find(x=>x.username===u);
  if(!user){ showErr('resetError1','No account found with that username.'); return; }
  resetTarget = user.username;
  document.getElementById('resetQuestionText').textContent = user.question;
  document.getElementById('resetAnswer').value='';
  resetCode = Math.floor(1000+Math.random()*9000);
  document.getElementById('resetCodeHint').textContent = `Simulated verification code (would normally be emailed/SMS'd): ${resetCode}`;
  document.getElementById('resetStep1').classList.add('hidden');
  document.getElementById('resetStep2').classList.remove('hidden');
  setStepDots(2);
}
function resetStepTwo(){
  hideErr('resetError2');
  const ans = document.getElementById('resetAnswer').value.trim().toLowerCase();
  const user = USERS.find(x=>x.username===resetTarget);
  if(ans !== user.answer){
    showErr('resetError2','That answer doesn\u2019t match our records. Please try again.');
    return;
  }
  document.getElementById('resetStep2').classList.add('hidden');
  document.getElementById('resetStep3').classList.remove('hidden');
  document.getElementById('newPass1').value=''; document.getElementById('newPass2').value='';
  setStepDots(3);
}
function resetStepThree(){
  hideErr('resetError3');
  const p1 = document.getElementById('newPass1').value;
  const p2 = document.getElementById('newPass2').value;
  if(p1.length<6){ showErr('resetError3','Password must be at least 6 characters.'); return; }
  if(p1!==p2){ showErr('resetError3','Passwords do not match.'); return; }
  const user = USERS.find(x=>x.username===resetTarget);
  user.password = p1;
  document.getElementById('loginUser').value = user.username;
  document.getElementById('loginPass').value = '';
  goTo('login');
  showErr('loginError','');
  document.getElementById('loginError').style.display='none';
  const info = document.createElement('div');
  showToastLikeMessage('Password updated. Sign in with your new password.');
}
function showToastLikeMessage(msg){
  const el = document.getElementById('loginError');
  el.className='form-msg info'; el.textContent=msg; el.style.display='block';
}

/* ======================================================================
   APP SHELL RENDER
====================================================================== */
function enterApp(){
  document.getElementById('view-login').classList.remove('active');
  document.getElementById('view-reset').classList.remove('active');
  document.getElementById('shell').classList.remove('hidden');
  document.getElementById('sideAvatar').textContent = initials(session.name);
  document.getElementById('sideName').textContent = session.name;
  document.getElementById('sideRole').textContent = ROLE_LABEL[session.role];
  buildNav();
  buildPages();
  navigateTo('dashboard');
  tickClock();
  setInterval(tickClock, 1000*30);
}
function initials(name){
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}
function tickClock(){
  const d = new Date();
  document.getElementById('clockPill').textContent = d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById('datePill').textContent = d.toLocaleDateString([], {weekday:'short', month:'short', day:'numeric'});
}

function accessibleModules(){
  return MODULES.filter(m=>m.roles.includes(session.role));
}
function buildNav(){
  const mods = accessibleModules();
  const groups = [...new Set(mods.map(m=>m.group))];
  let html = '';
  groups.forEach(g=>{
    html += `<div class="nav-group-label">${g}</div>`;
    mods.filter(m=>m.group===g).forEach(m=>{
      html += `<div class="nav-item" id="nav-${m.id}" onclick="navigateTo('${m.id}')">${svg(m.icon)}<span>${m.label}</span></div>`;
    });
  });
  document.getElementById('navScroll').innerHTML = html;
}
function buildPages(){
  const content = document.getElementById('content');
  let html = '';
  accessibleModules().forEach(m=>{
    html += `<section class="page" id="page-${m.id}"></section>`;
  });
  content.innerHTML = html;
  accessibleModules().forEach(m=>{
    const el = document.getElementById('page-'+m.id);
    el.innerHTML = renderPage(m);
  });
}
function navigateTo(id){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const navEl = document.getElementById('nav-'+id);
  if(navEl) navEl.classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pageEl = document.getElementById('page-'+id);
  if(pageEl) pageEl.classList.add('active');
  const mod = MODULES.find(m=>m.id===id);
  document.getElementById('pageTitle').textContent = mod ? mod.label : 'Dashboard';
  if(id==='jobs') refreshJobs();
  if(id==='animal') refreshAnimals();
  if(id==='time') refreshTime();
  if(id==='finance') refreshFinance();
  if(id==='people') refreshStaff();
  if(id==='chat') refreshChat();
  if(id==='users') refreshUsers();
}

/* ======================================================================
   PAGE RENDERERS
====================================================================== */
function renderPage(mod){
  switch(mod.id){
    case 'dashboard': return renderDashboard();
    case 'jobs': return renderJobs();
    case 'animal': return renderAnimal();
    case 'time': return renderTime();
    case 'finance': return renderFinance();
    case 'people': return renderPeople();
    case 'chat': return renderChat();
    case 'users': return renderUsers();
    default: return renderPlaceholder(mod);
  }
}

function renderPlaceholder(mod){
  const roadmap = {
    facility:'Planned: barn &amp; equipment registry, maintenance scheduling, and downtime alerts tied to Jobs.',
    feed:'Planned: feed inventory, ration planning per herd group, and automatic reorder points.',
    farm:'Planned: field/plot mapping, planting &amp; harvest calendar, yield history.',
    train:'Planned: worker certifications, onboarding checklists, and skills tracking per role.',
    scale:'Planned: weigh-in records for produce and livestock, linked directly to Finance for accurate invoicing.',
    analytics:'Planned: cross-module reporting — production, cost per litre/animal, and labour efficiency in one view.',
    settings:'Planned: farm profile, notification rules, and integration settings.',
  };
  return `
  <div class="toolbar"><div><h2>${mod.label}</h2><div class="desc">This module is on the roadmap and will plug into the same live data as the rest of Farm Manager.</div></div></div>
  <div class="empty-state">
    <div class="icon-badge">${svg(mod.icon,20)}</div>
    <h3>${mod.label} is coming soon</h3>
    <p>There's nothing to show here yet. Once built, this module will connect with Jobs, Time, and Finance the same way the ONE ecosystem is designed — one entry updates everywhere it matters.</p>
    <div class="roadmap">${roadmap[mod.id]||'Planned: full module coming soon.'}</div>
  </div>`;
}

function accessBanner(text){
  return `<div class="access-banner">${svg('info',15)}<span>${text}</span></div>`;
}

/* ---------- DASHBOARD (role aware) ---------- */
function renderDashboard(){
  const r = session.role;
  let stats, chartLabel, chartData, feed;

  if(r==='admin'){
    stats = [
      {label:'Total livestock', val:'214', icon:'animal', delta:'+3 this week', dir:'up'},
      {label:'Open jobs', val:JOBS.filter(j=>j.status==='open').length, icon:'jobs', delta:'2 due today', dir:'flat'},
      {label:'Staff active', val:STAFF.filter(s=>s.status==='Active').length, icon:'people', delta:'1 on leave', dir:'flat'},
      {label:'Net this month', val:formatUGX(netTotal()), icon:'finance', delta:netTotal()>=0?'Positive':'Negative', dir:netTotal()>=0?'up':'down'},
    ];
  } else if(r==='manager'){
    stats = [
      {label:'Open jobs', val:JOBS.filter(j=>j.status==='open').length, icon:'jobs', delta:'2 due today', dir:'flat'},
      {label:'Livestock under watch', val:ANIMALS.filter(a=>a.status==='Under watch').length, icon:'animal', delta:'Review needed', dir:'down'},
      {label:'Staff on shift', val:'6', icon:'people', delta:'of 7 total', dir:'flat'},
      {label:'Feed stock', val:'Adequate', icon:'feed', delta:'12 days runway', dir:'up'},
    ];
  } else if(r==='accountant'){
    stats = [
      {label:'Income (MTD)', val:formatUGX(sumByType('Income')), icon:'finance', delta:'+2 sales logged', dir:'up'},
      {label:'Expenses (MTD)', val:formatUGX(Math.abs(sumByType('Expense'))), icon:'scale', delta:'Feed + payroll', dir:'down'},
      {label:'Net (MTD)', val:formatUGX(netTotal()), icon:'analytics', delta:netTotal()>=0?'On target':'Below target', dir:netTotal()>=0?'up':'down'},
      {label:'Pending invoices', val:'1', icon:'time', delta:'Due Fri', dir:'flat'},
    ];
  } else {
    stats = [
      {label:'My open tasks', val:JOBS.filter(j=>j.assignee===session.name && j.status==='open').length, icon:'jobs', delta:'1 high priority', dir:'flat'},
      {label:'Hours this week', val:'32.5h', icon:'time', delta:'On track', dir:'up'},
      {label:'Clock status', val:CLOCKED_IN?'Clocked in':'Clocked out', icon:'clockin', delta:CLOCKED_IN?'Since 6:02 AM':'Tap Time to start', dir:'flat'},
      {label:'Animals in my care', val:ANIMALS.length, icon:'animal', delta:'Paddock A · Barn 2', dir:'flat'},
    ];
  }

  chartLabel = r==='accountant' ? 'Income vs expense (last 5 entries)' : 'Jobs completed — last 7 days';
  chartData = r==='accountant'
    ? TRANSACTIONS.slice(0,5).reverse().map(t=>({label:t.date, v:Math.abs(t.amount)/30000}))
    : [4,6,3,7,5,8,6].map((v,i)=>({label:['M','T','W','T','F','S','S'][i], v:v*10}));
  const maxV = Math.max(...chartData.map(d=>d.v));

  feed = recentActivity(r);

  return `
  <div class="grid cols-4" style="margin-bottom:16px;">
    ${stats.map(s=>`
      <div class="stat-card">
        <div class="label">${svg(s.icon,15)} ${s.label}</div>
        <div class="value">${s.val}</div>
        <div class="delta ${s.dir}">${s.delta}</div>
      </div>`).join('')}
  </div>
  <div class="grid cols-2">
    <div class="card">
      <div class="card-head"><h3>${chartLabel}</h3><span class="muted">Live</span></div>
      <div class="bar-chart">
        ${chartData.map(d=>`<div class="bar-col"><div class="bar" style="height:${Math.max(6,(d.v/maxV)*100)}%"></div><div class="bar-label">${d.label}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Recent activity</h3></div>
      ${feed.map(f=>`
        <div class="list-row">
          <div class="list-icon">${svg(f.icon,15)}</div>
          <div class="list-main"><div class="t">${f.t}</div><div class="s">${f.s}</div></div>
          <span class="tag ${f.tag}">${f.tagText}</span>
        </div>`).join('')}
    </div>
  </div>`;
}
function formatUGX(n){ return 'UGX ' + Math.round(n).toLocaleString(); }
function sumByType(t){ return TRANSACTIONS.filter(x=>x.type===t).reduce((a,b)=>a+b.amount,0); }
function netTotal(){ return TRANSACTIONS.reduce((a,b)=>a+b.amount,0); }
function recentActivity(r){
  const all = [
    {icon:'animal', t:'Weight recorded — UG-0142', s:'Logged by James Otieno · 2h ago', tag:'green', tagText:'Animal', roles:['admin','manager','worker']},
    {icon:'jobs', t:'Vaccination job marked done', s:'Batch 12 calves · 4h ago', tag:'green', tagText:'Jobs', roles:['admin','manager','worker']},
    {icon:'finance', t:'Milk sale recorded', s:'Mukono Dairy Co-op · UGX 2,450,000', tag:'green', tagText:'Finance', roles:['admin','accountant']},
    {icon:'time', t:'James Otieno clocked in', s:'6:02 AM today', tag:'gray', tagText:'Time', roles:['admin','manager','accountant','worker']},
    {icon:'people', t:'Moses Kato marked on leave', s:'Approved by Peter Okello', tag:'warn', tagText:'People', roles:['admin','manager']},
    {icon:'finance', t:'Feed invoice #2291 paid', s:'UGX 860,000 · 2 days ago', tag:'red', tagText:'Expense', roles:['admin','accountant']},
  ];
  return all.filter(a=>a.roles.includes(r)).slice(0,5);
}

/* ---------- JOBS ---------- */
function renderJobs(){
  const canAssign = session.role!=='worker';
  return `
  <div class="toolbar">
    <div><h2>Jobs &amp; Tasks</h2><div class="desc">${canAssign?'Assign and track work across the team.':'Tasks assigned to you.'}</div></div>
  </div>
  ${canAssign?`
  <div class="inline-form">
    <input id="jobTitle" placeholder="New task title" style="min-width:240px;">
    <input id="jobAssignee" placeholder="Assign to (name)">
    <select id="jobPriority"><option value="low">Low priority</option><option value="medium">Medium priority</option><option value="high">High priority</option></select>
    <button class="btn-sm primary" onclick="addJob()">${svg('plus',13)} Add task</button>
  </div>`:''}
  <div class="card"><div id="jobsList"></div></div>`;
}
function refreshJobs(){
  const list = document.getElementById('jobsList');
  if(!list) return;
  let jobs = JOBS;
  if(session.role==='worker') jobs = jobs.filter(j=>j.assignee===session.name);
  if(jobs.length===0){ list.innerHTML = emptyRow('No tasks assigned to you right now.'); return; }
  list.innerHTML = jobs.map(j=>`
    <div class="list-row">
      <div class="list-icon">${svg('jobs',15)}</div>
      <div class="list-main">
        <div class="t">${j.title}</div>
        <div class="s">Assigned to ${j.assignee} · Due ${j.due}</div>
      </div>
      <span class="tag ${j.priority==='high'?'red':j.priority==='medium'?'warn':'gray'}">${j.priority}</span>
      ${j.status==='open' ? `<button class="btn-sm" onclick="completeJob(${j.id})">${svg('check',13)} Mark done</button>` : `<span class="tag green">Done</span>`}
    </div>`).join('');
}
function addJob(){
  const t = document.getElementById('jobTitle').value.trim();
  const a = document.getElementById('jobAssignee').value.trim() || 'Unassigned';
  const p = document.getElementById('jobPriority').value;
  if(!t) return;
  JOBS.unshift({id:Date.now(), title:t, assignee:a, due:'This week', status:'open', priority:p});
  document.getElementById('jobTitle').value=''; document.getElementById('jobAssignee').value='';
  refreshJobs();
}
function completeJob(id){
  const j = JOBS.find(x=>x.id===id);
  if(j) j.status='done';
  refreshJobs();
}
function emptyRow(text){ return `<div class="list-row"><div class="list-main"><div class="s">${text}</div></div></div>`; }

/* ---------- ANIMAL ---------- */
function renderAnimal(){
  const canEdit = session.role!=='worker';
  return `
  <div class="toolbar"><div><h2>Animal</h2><div class="desc">Herd records — health, weight, and location.</div></div></div>
  ${!canEdit?accessBanner('You can view and log field updates. Editing herd records is limited to Managers and Admins.'):''}
  ${canEdit?`
  <div class="inline-form">
    <input id="aTag" placeholder="Tag (e.g. UG-0146)" style="width:140px;">
    <input id="aType" placeholder="Type (e.g. Dairy cow)">
    <input id="aBreed" placeholder="Breed">
    <input id="aLoc" placeholder="Location">
    <button class="btn-sm primary" onclick="addAnimal()">${svg('plus',13)} Add record</button>
  </div>`:''}
  <div class="card">
    <table>
      <thead><tr><th>Tag</th><th>Type</th><th>Breed</th><th>Status</th><th>Weight</th><th>Location</th></tr></thead>
      <tbody id="animalRows"></tbody>
    </table>
  </div>`;
}
function refreshAnimals(){
  const el = document.getElementById('animalRows');
  if(!el) return;
  el.innerHTML = ANIMALS.map(a=>`
    <tr>
      <td style="font-family:var(--font-mono);color:var(--text-muted);">${a.tag}</td>
      <td>${a.type}</td><td>${a.breed}</td>
      <td><span class="tag ${a.status==='Healthy'?'green':'warn'}">${a.status}</span></td>
      <td>${a.weight}</td><td>${a.location}</td>
    </tr>`).join('');
}
function addAnimal(){
  const tag = document.getElementById('aTag').value.trim();
  if(!tag) return;
  ANIMALS.unshift({tag, type:document.getElementById('aType').value||'—', breed:document.getElementById('aBreed').value||'—', status:'Healthy', weight:'—', location:document.getElementById('aLoc').value||'—'});
  ['aTag','aType','aBreed','aLoc'].forEach(id=>document.getElementById(id).value='');
  refreshAnimals();
}

/* ---------- TIME ---------- */
function renderTime(){
  return `
  <div class="toolbar"><div><h2>Time</h2><div class="desc">Clock in/out and view attendance history.</div></div></div>
  <div class="grid cols-2">
    <div class="card">
      <div class="card-head"><h3>Attendance log</h3></div>
      <table>
        <thead><tr><th>Name</th><th>Date</th><th>In</th><th>Out</th><th>Hours</th></tr></thead>
        <tbody id="timeRows"></tbody>
      </table>
    </div>
    <div class="card" style="text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;">
      ${svg('clockin', 34)}
      <div style="font-family:var(--font-mono); font-size:13px; color:var(--text-muted);" id="clockStatusText">You are clocked out</div>
      <button class="btn-primary" style="width:auto; padding:11px 26px;" id="clockBtn" onclick="toggleClock()">Clock in</button>
    </div>
  </div>`;
}
function refreshTime(){
  const el = document.getElementById('timeRows');
  if(!el) return;
  el.innerHTML = TIME_LOG.map(t=>`<tr><td>${t.name}</td><td>${t.date}</td><td>${t.in}</td><td>${t.out}</td><td>${t.hours}</td></tr>`).join('');
  const btn = document.getElementById('clockBtn');
  const status = document.getElementById('clockStatusText');
  if(btn){
    btn.textContent = CLOCKED_IN ? 'Clock out' : 'Clock in';
    status.textContent = CLOCKED_IN ? 'You are clocked in since 6:02 AM' : 'You are clocked out';
  }
}
function toggleClock(){
  CLOCKED_IN = !CLOCKED_IN;
  if(CLOCKED_IN){
    TIME_LOG.unshift({name:session.name, date:'Today', in:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), out:'—', hours:'in progress'});
  } else if(TIME_LOG[0] && TIME_LOG[0].out==='—'){
    TIME_LOG[0].out = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    TIME_LOG[0].hours = 'complete';
  }
  refreshTime();
}

/* ---------- FINANCE (accountant + admin) ---------- */
function renderFinance(){
  return `
  <div class="toolbar"><div><h2>Finance</h2><div class="desc">Income, expenses, and net position.</div></div></div>
  <div class="grid cols-3" style="margin-bottom:16px;">
    <div class="stat-card"><div class="label">${svg('finance',15)} Income (MTD)</div><div class="value">${formatUGX(sumByType('Income'))}</div></div>
    <div class="stat-card"><div class="label">${svg('scale',15)} Expenses (MTD)</div><div class="value">${formatUGX(Math.abs(sumByType('Expense')))}</div></div>
    <div class="stat-card"><div class="label">${svg('analytics',15)} Net (MTD)</div><div class="value">${formatUGX(netTotal())}</div></div>
  </div>
  <div class="inline-form">
    <input id="tDesc" placeholder="Description" style="min-width:220px;">
    <select id="tType"><option value="Income">Income</option><option value="Expense">Expense</option></select>
    <input id="tAmount" type="number" placeholder="Amount (UGX)">
    <button class="btn-sm primary" onclick="addTransaction()">${svg('plus',13)} Record entry</button>
  </div>
  <div class="card">
    <table>
      <thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Amount</th></tr></thead>
      <tbody id="finRows"></tbody>
    </table>
  </div>`;
}
function refreshFinance(){
  const el = document.getElementById('finRows');
  if(!el) return;
  el.innerHTML = TRANSACTIONS.map(t=>`
    <tr><td>${t.date}</td><td>${t.desc}</td>
    <td><span class="tag ${t.type==='Income'?'green':'red'}">${t.type}</span></td>
    <td style="font-family:var(--font-mono);">${t.amount<0?'-':''}${formatUGX(Math.abs(t.amount))}</td></tr>`).join('');
}
function addTransaction(){
  const desc = document.getElementById('tDesc').value.trim();
  const type = document.getElementById('tType').value;
  let amt = parseFloat(document.getElementById('tAmount').value);
  if(!desc || isNaN(amt)) return;
  if(type==='Expense') amt = -Math.abs(amt);
  TRANSACTIONS.unshift({date:'Today', desc, type, amount:amt});
  document.getElementById('tDesc').value=''; document.getElementById('tAmount').value='';
  refreshFinance();
}

/* ---------- PEOPLE (manager + admin) ---------- */
function renderPeople(){
  return `
  <div class="toolbar"><div><h2>People</h2><div class="desc">Staff directory and status.</div></div></div>
  <div class="card">
    <table>
      <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Status</th></tr></thead>
      <tbody id="staffRows"></tbody>
    </table>
  </div>`;
}
function refreshStaff(){
  const el = document.getElementById('staffRows');
  if(!el) return;
  el.innerHTML = STAFF.map(s=>`<tr><td>${s.name}</td><td>${s.role}</td><td>${s.dept}</td><td><span class="tag ${s.status==='Active'?'green':'warn'}">${s.status}</span></td></tr>`).join('');
}

/* ---------- CHAT ---------- */
function renderChat(){
  return `
  <div class="toolbar"><div><h2>Chat</h2><div class="desc">Talk to your team without leaving Farm Manager.</div></div></div>
  <div class="card">
    <div class="chat-wrap">
      <div class="chat-channels" id="chatChannels"></div>
      <div class="chat-main">
        <div class="chat-msgs" id="chatMsgs"></div>
        <div class="chat-input">
          <input id="chatInput" placeholder="Message the team..." onkeydown="if(event.key==='Enter')sendChat()">
          <button class="btn-sm primary" onclick="sendChat()">Send</button>
        </div>
      </div>
    </div>
  </div>`;
}
function refreshChat(){
  const chEl = document.getElementById('chatChannels');
  if(!chEl) return;
  chEl.innerHTML = CHAT_CHANNELS.map(c=>`<div class="chat-channel ${c===activeChannel?'active':''}" onclick="setChannel('${c}')">${c}</div>`).join('');
  const msgs = CHAT_MSGS[activeChannel]||[];
  const msgEl = document.getElementById('chatMsgs');
  msgEl.innerHTML = msgs.length ? msgs.map(m=>`
    <div class="msg ${m.me?'me':''}">
      <div class="avatar" style="width:26px;height:26px;font-size:10px;">${initials(m.from)}</div>
      <div><div class="b">${m.text}</div><div class="meta">${m.me?'You':m.from} · ${m.time}</div></div>
    </div>`).join('') : `<div style="color:var(--text-faint); font-size:13px; margin:auto;">No messages yet in ${activeChannel}. Say hello.</div>`;
  msgEl.scrollTop = msgEl.scrollHeight;
}
function setChannel(c){ activeChannel = c; refreshChat(); }
function sendChat(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if(!text) return;
  if(!CHAT_MSGS[activeChannel]) CHAT_MSGS[activeChannel]=[];
  CHAT_MSGS[activeChannel].push({from:session.name, me:true, text, time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})});
  input.value='';
  refreshChat();
}

/* ---------- USERS & ROLES (admin only) ---------- */
function renderUsers(){
  return `
  <div class="toolbar"><div><h2>Users &amp; Roles</h2><div class="desc">Every account and what part of Farm Manager it can reach.</div></div></div>
  <div class="inline-form">
    <input id="uName" placeholder="Full name" style="min-width:180px;">
    <input id="uUser" placeholder="Username">
    <input id="uPass" placeholder="Temporary password">
    <select id="uRole"><option value="worker">Farm Worker</option><option value="manager">Farm Manager</option><option value="accountant">Accountant</option><option value="admin">Administrator</option></select>
    <button class="btn-sm primary" onclick="addUser()">${svg('plus',13)} Create user</button>
  </div>
  <div class="card">
    <table>
      <thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Modules accessible</th></tr></thead>
      <tbody id="userRows"></tbody>
    </table>
  </div>`;
}
function refreshUsers(){
  const el = document.getElementById('userRows');
  if(!el) return;
  el.innerHTML = USERS.map(u=>{
    const modCount = MODULES.filter(m=>m.roles.includes(u.role)).length;
    return `<tr><td>${u.name}</td><td style="font-family:var(--font-mono);color:var(--text-muted);">${u.username}</td><td><span class="tag green">${ROLE_LABEL[u.role]}</span></td><td>${modCount} of ${MODULES.length} modules</td></tr>`;
  }).join('');
}
function addUser(){
  const name = document.getElementById('uName').value.trim();
  const uname = document.getElementById('uUser').value.trim().toLowerCase();
  const pass = document.getElementById('uPass').value;
  const role = document.getElementById('uRole').value;
  if(!name || !uname || !pass) return;
  if(USERS.find(u=>u.username===uname)){ alert('That username already exists.'); return; }
  USERS.push({username:uname, password:pass, role, name, question:'Set during first login', answer:''});
  ['uName','uUser','uPass'].forEach(id=>document.getElementById(id).value='');
  refreshUsers();
}

/* ======================================================================
   HUB GRAPHIC (login screen decorative network)
====================================================================== */
(function buildHub(){
  const wrap = document.getElementById('hubGraphic');
  const nodeIcons = ['animal','facility','feed','train','jobs','people','farm','finance','time'];
  const positions = [
    [10,10],[50,2],[90,10],
    [2,50],[98,50],
    [10,90],[50,98],[90,90],[50,50]
  ];
  nodeIcons.forEach((icon,i)=>{
    const [x,y] = positions[i]===undefined ? [50,50] : positions[i];
  });
  const angleStep = 360/ (nodeIcons.length);
  nodeIcons.forEach((icon,i)=>{
    const angle = (angleStep*i - 90) * Math.PI/180;
    const radius = 42; // percent
    const cx = 50 + radius*Math.cos(angle);
    const cy = 50 + radius*Math.sin(angle);
    const node = document.createElement('div');
    node.className='hub-node';
    node.style.left = `calc(${cx}% - 26px)`;
    node.style.top = `calc(${cy}% - 26px)`;
    node.style.animationDelay = (i*0.3)+'s';
    node.innerHTML = svg(icon, 20);
    wrap.appendChild(node);
  });
  const center = document.createElement('div');
  center.className='hub-center';
  center.textContent='FM';
  wrap.appendChild(center);
})();

/* keyboard: Enter submits login */
document.addEventListener('keydown', e=>{
  if(e.key==='Enter'){
    if(document.getElementById('view-login').classList.contains('active')) handleLogin();
  }
});
