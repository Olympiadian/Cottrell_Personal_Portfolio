const app = document.getElementById('app');

const aboutParagraphs = [
  "I'm Eli, 25, based in Phoenix. I studied entrepreneurship at ASU and have spent the past three years working in project management and operations. My interests lie more in design, technology, business, and problems that require a degree of independent thinking.",
  "I founded Seedcore in 2024, shortly after graduating. It's evolved considerably since, and remains my primary focus outside of work. I have a broad interest in art, film, writing, and the creative process in general."
];

const seedcoreParagraphs = [
  "Seedcore started in 2024 and has evolved considerably since. Its current focus is simple: helping early-stage solo founders get better guidance, research, and support without the traditional consulting model.",
  "It is meant to be a meaningful alternative to the clutter of information out there. Designed for the beginning business, made to overcome the difficulty of the early stages."
];

const views = new Set(['seedcore', 'about', 'projects', 'skills', 'contact']);
const detailSubtitles = {
  about: '25 | Working @ Kaeko Engineering. Based in the Phoenix area.',
  projects: "A mix of recent things I've built that are worth exploring.",
  skills: 'Design-forward, production capable, artistic developer. Contains a slight bias towards style.',
  contact: 'Reach out to me.'
};

function escapeText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function footer() {
  return '<footer class="footer-links" aria-label="Additional links coming soon"><span>website.txt</span><span>resume.pdf</span></footer>';
}

function home() {
  const social = [
    ['Twitter', 'twitter.svg'],
    ['Email', 'mail.svg'],
    ['GitHub', 'github.svg'],
    ['Instagram', 'instagram.svg'],
    ['Letterboxd', 'letterboxd-logo.svg'],
    ['TikTok', 'tiktok.svg']
  ].map(([label, icon]) =>
    '<span class="social-tile" title="' + label + ' link coming soon"><img src="/assets/' + icon + '" alt="" /></span>'
  ).join('');

  const menu = ['Seedcore', 'About', 'Projects', 'Skills', 'Contact'].map((item) => {
    const icon = '<img src="/assets/circle-dot.svg" alt="" />';
    return '<a class="menu-row" href="/' + item.toLowerCase() + '" data-route><span>' + item + '</span>' + icon + '</a>';
  }).join('');

  return '<main class="app-view home-view is-active">' +
    '<div class="home-left">' +
      '<section class="home-card surface" aria-labelledby="home-name">' +
        '<p class="home-intro">Currently in semi-conductor project management. Focused on other things.</p>' +
        '<div class="home-identity"><h1 id="home-name">Eli Cottrell</h1><p>Creative Technologist</p></div>' +
      '</section>' +
      '<div class="social-row" aria-label="Social links coming soon">' + social + '</div>' +
    '</div>' +
    '<section class="home-main" aria-label="Portfolio navigation">' +
      '<nav class="menu">' + menu + '</nav>' + footer() +
    '</section>' +
  '</main>';
}

function detailSidebar(view) {
  const isSeedcore = view === 'seedcore';
  const title = view[0].toUpperCase() + view.slice(1);
  const bottom = isSeedcore
    ? '<img class="seedcore-logo" src="/assets/seedcore-mark.png" alt="" />' +
      '<h2 class="detail-title">Seedcore</h2>' +
      '<p class="detail-subtitle">Advisement &amp; intelligence for early-stage solo founders</p>' +
      '<a class="seedcore-button" href="https://seedcore.co" target="_blank" rel="noopener noreferrer">Visit website <span class="arrow" aria-hidden="true">›</span></a>'
    : '<h2 class="detail-title">' + title + '</h2>' +
      '<p class="detail-subtitle">' + escapeText(detailSubtitles[view]) + '</p>';

  return '<aside class="detail-sidebar surface">' +
    '<div class="detail-top"><a class="back-button" href="/" data-route aria-label="Back to home"><img src="/assets/back.svg" alt="" /></a>' +
      '<span class="detail-tag">' + view + '</span></div>' +
    '<div class="detail-bottom">' + bottom + '</div>' +
  '</aside>';
}

function paragraphs(items) {
  return items.map((item) => '<p class="detail-copy reveal-words">' + escapeText(item) + '</p>').join('');
}

function projectsContent() {
  return '<div class="detail-column projects-column"><div class="project-list" aria-label="Projects">' +
    ["Ellie's Closet", 'Seedcore Intelligence', 'Moss', 'DeskTek'].map((name) =>
      '<div class="project-row"><span>' + escapeText(name) + '</span><img src="/assets/back.svg" alt="" /></div>'
    ).join('') + '</div></div>';
}

function skillsContent() {
  return '<div class="detail-column skills-column"><div class="skills-grid" aria-label="Skills">' +
    ['design', 'detail', 'research', 'operations', 'product', 'growth'].map((name) =>
      '<div class="skill-tile">' + name + '</div>'
    ).join('') + '</div></div>';
}

function contactContent() {
  return '<div class="detail-column contact-column"><form class="contact-form" data-contact-form>' +
    '<label>Name<input type="text" name="Name" autocomplete="name" required /></label>' +
    '<label>Email<input type="email" name="Email" autocomplete="email" required /></label>' +
    '<label>Subject<textarea name="Subject" required></textarea></label>' +
    '<button type="submit">Submit</button>' +
    '<p class="form-feedback" role="status" aria-live="polite"></p>' +
    '</form></div>';
}

function detail(view) {
  const isSeedcore = view === 'seedcore';
  const isAbout = view === 'about';
  const content = isSeedcore
    ? '<div class="detail-column seedcore-column"><h1>seedcore.co</h1>' +
      paragraphs(seedcoreParagraphs) +
      '<span class="essay-link" aria-disabled="true" title="Essay link coming soon">Read our essay <span class="arrow" aria-hidden="true">›</span></span></div>'
    : isAbout
      ? '<div class="detail-column about-column"><img class="about-portrait" src="/assets/eli-halftone.png" alt="Portrait of Eli Cottrell" />' +
        paragraphs(aboutParagraphs) + '</div>'
      : view === 'projects' ? projectsContent()
      : view === 'skills' ? skillsContent()
      : contactContent();

  return '<main class="app-view detail-view ' + view + '-view is-active">' +
    detailSidebar(view) +
    '<section class="detail-main" aria-label="' + (isSeedcore ? 'Seedcore' : isAbout ? 'About Eli Cottrell' : view[0].toUpperCase() + view.slice(1)) + '">' +
      content + footer() +
    '</section>' +
  '</main>';
}

function currentView() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const route = path.slice(1);
  if (views.has(route)) return route;
  const hashRoute = window.location.hash.slice(1).toLowerCase();
  if (views.has(hashRoute)) return hashRoute;
  return 'home';
}

function animateWords() {
  document.querySelectorAll('.reveal-words').forEach((element) => {
    const original = element.textContent;
    element.setAttribute('aria-label', original);
    element.textContent = '';
    let index = 0;
    original.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        element.append(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = 'word';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--delay', Math.min(90 + index * 16, 720) + 'ms');
      span.textContent = part;
      element.append(span);
      index += 1;
    });
  });
}

function render() {
  const view = currentView();
  app.innerHTML = view === 'home' ? home() : detail(view);
  document.body.dataset.view = view;
  document.title = view === 'home'
    ? 'Eli Cottrell — Creative Technologist'
    : view[0].toUpperCase() + view.slice(1) + ' — Eli Cottrell';
  animateWords();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-route]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const path = new URL(link.href).pathname;
  if (window.location.pathname !== path) history.pushState({}, '', path);
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
});

window.addEventListener('popstate', render);
document.addEventListener('submit', (event) => {
  if (!event.target.matches('[data-contact-form]')) return;
  event.preventDefault();
  event.target.querySelector('.form-feedback').textContent = 'This form is not connected yet. Please check back soon.';
});
render();
