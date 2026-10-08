const app = document.getElementById('app');

const aboutParagraphs = [
  "I'm Eli, 25, based in Phoenix. I studied entrepreneurship at ASU and have spent the past three years working in project management and operations. My interests lie more in design, technology, business, and problems that require a degree of independent thinking.",
  "I founded Seedcore in 2024, shortly after graduating. It's evolved considerably since, and remains my primary focus outside of work. I have a broad interest in art, film, writing, and the creative process in general."
];

const seedcoreParagraphs = [
  "Seedcore started in 2024 and has evolved considerably since. Its current focus is simple: helping early-stage solo founders get better guidance, research, and support without the traditional consulting model.",
  "It is meant to be a meaningful alternative to the clutter of information out there. Designed for the beginning business, made to overcome the difficulty of the early stages."
];

const pendingItems = new Set(['Projects', 'Skills', 'Contact']);

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
    ['Three rings', 'three-rings.svg'],
    ['TikTok', 'tiktok.svg']
  ].map(([label, icon]) =>
    '<span class="social-tile" title="' + label + ' link coming soon"><img src="/assets/' + icon + '" alt="" /></span>'
  ).join('');

  const menu = ['Seedcore', 'About', 'Projects', 'Skills', 'Contact'].map((item) => {
    const icon = '<img src="/assets/circle-dot.svg" alt="" />';
    if (pendingItems.has(item)) {
      return '<span class="menu-row is-pending" aria-disabled="true" title="' + item + ' is coming soon"><span>' + item + '</span>' + icon + '</span>';
    }
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
  const bottom = isSeedcore
    ? '<img class="seedcore-logo" src="/assets/seedcore-mark.png" alt="" />' +
      '<h2 class="detail-title">Seedcore</h2>' +
      '<p class="detail-subtitle">Advisement &amp; intelligence for early-stage solo founders</p>' +
      '<a class="seedcore-button" href="https://seedcore.co" target="_blank" rel="noopener noreferrer">Visit website <span class="arrow" aria-hidden="true">›</span></a>'
    : '<h2 class="detail-title">About</h2>' +
      '<p class="detail-subtitle">25 | Working @ Kaeko Engineering. Based in the Phoenix area.</p>';

  return '<aside class="detail-sidebar surface">' +
    '<div class="detail-top"><a class="back-button" href="/" data-route aria-label="Back to home"><img src="/assets/back.svg" alt="" /></a>' +
      '<span class="detail-tag">' + view + '</span></div>' +
    '<div class="detail-bottom">' + bottom + '</div>' +
  '</aside>';
}

function paragraphs(items) {
  return items.map((item) => '<p class="detail-copy reveal-words">' + escapeText(item) + '</p>').join('');
}

function detail(view) {
  const isSeedcore = view === 'seedcore';
  const content = isSeedcore
    ? '<div class="detail-column seedcore-column"><h1>seedcore.co</h1>' +
      paragraphs(seedcoreParagraphs) +
      '<span class="essay-link" aria-disabled="true" title="Essay link coming soon">Read our essay <span class="arrow" aria-hidden="true">›</span></span></div>'
    : '<div class="detail-column about-column"><img class="about-portrait" src="/assets/eli-halftone.png" alt="Portrait of Eli Cottrell" />' +
      paragraphs(aboutParagraphs) + '</div>';

  return '<main class="app-view detail-view ' + (isSeedcore ? 'seedcore-view' : 'about-view') + ' is-active">' +
    detailSidebar(view) +
    '<section class="detail-main" aria-label="' + (isSeedcore ? 'Seedcore' : 'About Eli Cottrell') + '">' +
      content + footer() +
    '</section>' +
  '</main>';
}

function currentView() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  if (path === '/about' || window.location.hash === '#about') return 'about';
  if (path === '/seedcore' || window.location.hash === '#seedcore') return 'seedcore';
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
    : (view === 'about' ? 'About' : 'Seedcore') + ' — Eli Cottrell';
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
render();
