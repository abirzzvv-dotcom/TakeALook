const profile = {
  username: "Abirz",
  handle: "abirrrzzzz",
  initials: "AB",
  avatar: "https://cdn.discordapp.com/attachments/1488144355301527657/1489211915178606673/Picsart_26-04-02_16-35-56-615.png?ex=69cf982c&is=69ce46ac&hm=b1fb6b45e8bfa55d7c1e253e5aeab4f2d7e2ea639a6bffa796cfd0e035d71180&",
  tagline: "i lowknetanyahuinely shit",
  bio: "hi mate",
  description: "purely for looking fuckass but cool, but you definitely CAN use the projects",
  status: "online"
};

const badges = [
  { id: "meadow",  name: "Last Meadow Online", description: "Level 67 Reached — Discord April Fools 2026", accent: "#23a55a", ext: "png" },
  { id: "nitro",   name: "Discord Nitro",      description: "Subscriber since Apr 1, grand 2026\uD83E\uDD1E",  accent: "#5662f6", ext: "svg" },
  { id: "booster", name: "Server Booster",     description: "Server boosting since Apr 1st, 2026",            accent: "#ff73fa", ext: "svg" },
  { id: "questt",   name: "Quest Completed",    description: "Completed a Quest",                               accent: "#f9a825", ext: "png" }
];

const projects = [
  {
    id: "music-selfbot",
    name: "music selfbot",
    description: "you need NOTHING, and i mean NOTHING to run this, except for your token EXCEPT its not finished yet is it...",
    details: [
      "plays music directly in voice channels via selfbot",
      "no bot token needed, just your user token",
      "supports youtube, soundcloud and more",
      "queue system with skip, pause, stop commands",
      "zero external dependencies beyond audio libs"
    ],
    link: "https://www.google.com/search?q=i+wonder+what+curiousity+brings+you+here",
    language: "Node JS",
    langColor: "#68a063",
    tags: ["NodeJS", "Selfbot", "Discord", "Music"]
  }
];

const ongoing = [
  {
    id: "server-info-selfbot",
    name: "server info selfbot",
    description: "basically no fucking permissions, BUT you can see stuff like role permissions, hierarchy and stuff.",
    details: [
      "lists all roles and their permission flags",
      "shows channel permission overrides per role",
      "displays full server hierarchy tree",
      "no admin perms needed, runs on user token",
      "currently working on member audit log scraping"
    ],
    link: "https://www.google.com/search?q=not+done+yet+brochacho",
    language: "Node JS",
    langColor: "#68a063",
    tags: ["Selfbot", "File", "NodeJS", "Server"],
    progress: 60
  }
];

function loadData() { return Promise.resolve(); }

const MAX = 65;
const clip = s => s.length > MAX ? s.slice(0, MAX) + '\u2026' : s;
const $ = id => document.getElementById(id);

const ghIcon = `<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style="display:block;flex-shrink:0"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>GitHub`;

let activeTab = 'projects';

function render() {
  const dotColor = { online: '#3ba55c', idle: '#faa81a', dnd: '#ed4245' }[profile.status] || '#747f8d';

  $('uname').textContent = profile.username;
  $('handle').textContent = '@' + profile.handle;
  $('tagline').textContent = profile.tagline;
  $('bioName').textContent = profile.bio;
  $('bioDesc').textContent = profile.description;

  const dot = $('statusDot');
  dot.style.background = dotColor;
  dot.style.boxShadow = `0 0 8px ${dotColor}99`;

  const img = new Image();
  img.src = profile.avatar;
  img.onload = () => {
    const ai = $('avatarImg');
    ai.innerHTML = '';
    ai.appendChild(img);
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;border-radius:50%';
  };
  img.onerror = () => { $('avatarInitials').textContent = profile.initials; };
  $('avatarInitials').textContent = profile.initials;

  renderBadges();
  renderTabs();
  renderList();
}

function renderBadges() {
  const row = $('badgesRow');
  row.innerHTML = '<span class="badges-label">Badges</span>';
  badges.forEach((b, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'badge-wrap';
    wrap.style.setProperty('--glow', `0 0 12px ${b.accent}99`);

    const icon = document.createElement('div');
    icon.className = 'badge-icon';

    const im = document.createElement('img');
    im.src = `./${b.id}.${b.ext}`;
    im.alt = b.name;
    icon.appendChild(im);

    let popup = null;
    icon.onclick = () => {
      icon.classList.add('shaking');
      setTimeout(() => icon.classList.remove('shaking'), 450);
      if (popup) { popup.remove(); popup = null; return; }
      popup = mkPopup(b, icon);
      document.body.appendChild(popup);
      const close = e => {
        if (!wrap.contains(e.target)) { popup?.remove(); popup = null; document.removeEventListener('mousedown', close); }
      };
      setTimeout(() => document.addEventListener('mousedown', close), 10);
    };

    wrap.appendChild(icon);
    row.appendChild(wrap);
    setTimeout(() => wrap.classList.add('in'), i * 90 + 250);
  });
}

function mkPopup(b, anchor) {
  const p = document.createElement('div');
  p.className = 'badge-popup';
  p.style.setProperty('--accent-light', b.accent + '55');
  p.style.setProperty('--accent-dim', b.accent + '22');
  p.innerHTML = `
    <div class="badge-popup-top">
      <div class="badge-popup-icon"><img src="./${b.id}.${b.ext}" alt="${b.name}" /></div>
      <div class="badge-popup-name">${b.name}</div>
    </div>
    <div class="badge-popup-desc">${b.description}</div>
    <div class="badge-popup-bar" style="background:linear-gradient(90deg,${b.accent}99,transparent)"></div>
    <div class="badge-popup-arrow"></div>
  `;
  if (anchor) {
    const rect = anchor.getBoundingClientRect();
    p.style.left = (rect.left + rect.width / 2) + 'px';
    p.style.top = rect.top + 'px';
  }
  return p;
}

function renderTabs() {
  const tabs = $('tabs');
  tabs.innerHTML = '';
  [['projects', 'Projects', projects.length], ['ongoing', 'Ongoing', ongoing.length]].forEach(([id, label, n]) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (activeTab === id ? ' active' : '');
    btn.innerHTML = `${label} <span class="tab-count">${n}</span>`;
    btn.onclick = () => { activeTab = id; renderTabs(); renderList(); };
    tabs.appendChild(btn);
  });
}

function renderList() {
  const list = $('list');
  list.innerHTML = '';
  const items = activeTab === 'projects' ? projects : ongoing;
  if (!items.length) {
    list.innerHTML = `<div class="empty">nothing here yet</div>`;
    return;
  }
  items.forEach((p, i) => {
    const el = mkCard(p, activeTab === 'ongoing');
    list.appendChild(el);
    setTimeout(() => el.classList.add('in'), i * 70 + 30);
    if (activeTab === 'ongoing' && p.progress != null) {
      setTimeout(() => {
        const fill = el.querySelector('.progress-fill');
        if (fill) fill.style.width = p.progress + '%';
      }, i * 70 + 200);
    }
  });
}

function mkCard(p, isOngoing) {
  const el = document.createElement('div');
  el.className = 'proj' + (isOngoing ? ' ongoing' : '');

  const langDot = `<span class="lang-dot" style="background:${p.langColor};box-shadow:0 0 5px ${p.langColor}66"></span>`;
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const progress = isOngoing && p.progress != null ? `
    <div class="progress-wrap">
      <div class="progress-head">
        <span class="progress-label">Progress</span>
        <span class="progress-pct">${p.progress}%</span>
      </div>
      <div class="progress-bg"><div class="progress-fill"></div></div>
    </div>
  ` : '';

  el.innerHTML = `
    <div class="proj-top-bar"></div>
    <div class="proj-head">
      <span class="proj-name">${p.name}</span>
      <a class="proj-gh-link" href="${p.link}" target="_blank" rel="noopener noreferrer" title="View on GitHub">${ghIcon}</a>
    </div>
    <div class="proj-desc">${clip(p.description)}</div>
    ${progress}
    <div class="proj-meta">
      <div class="lang-wrap">${langDot}<span class="lang-name">${p.language}</span></div>
      ${tags}
    </div>
  `;

  if (p.details && p.details.length > 0) {
    const chevron = `<svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
    const detailItems = p.details.map(d => `<div class="proj-detail-item"><span class="proj-detail-bullet"></span><span>${d}</span></div>`).join('');

    const btn = document.createElement('button');
    btn.className = 'proj-expand-btn';
    btn.innerHTML = `<span>details</span>${chevron}`;

    const box = document.createElement('div');
    box.className = 'proj-details';
    box.innerHTML = `<div class="proj-details-inner">${detailItems}</div>`;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = box.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.querySelector('span').textContent = open ? 'hide' : 'details';
    });

    el.appendChild(btn);
    el.appendChild(box);
  }

  return el;
}

loadData().then(render).catch(() => {
  document.body.innerHTML = '<div style="color:#72767d;display:flex;align-items:center;justify-content:center;height:100vh;font-family:Inter,sans-serif">failed to load profile data</div>';
});
