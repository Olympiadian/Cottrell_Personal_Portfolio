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
const allViews = new Set(['home', ...views]);
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
    return '<button class="menu-row" type="button" data-view="' + item.toLowerCase() + '"><span>' + item + '</span>' + icon + '</button>';
  }).join('');

  return '<main class="app-view home-view is-active">' +
    '<div class="home-left">' +
      '<section class="home-card surface primary-card" aria-labelledby="home-name">' +
        '<p class="home-intro">Currently in semi-conductor project management. Focused on other things.</p>' +
        '<div class="home-identity"><h1 id="home-name">Eli Cottrell</h1><p>Creative Technologist</p></div>' +
      '</section>' +
      '<div class="social-row transition-secondary" aria-label="Social links coming soon">' + social + '</div>' +
    '</div>' +
    '<section class="home-main transition-secondary" aria-label="Portfolio navigation">' +
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

  return '<aside class="detail-sidebar surface primary-card">' +
    '<div class="detail-top"><button class="back-button" type="button" data-view="home" aria-label="Back to home"><img src="/assets/back.svg" alt="" /></button>' +
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
    '<section class="detail-main transition-secondary" aria-label="' + (isSeedcore ? 'Seedcore' : isAbout ? 'About Eli Cottrell' : view[0].toUpperCase() + view.slice(1)) + '">' +
      content + footer() +
    '</section>' +
  '</main>';
}

function initialView() {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const route = path.slice(1);
  if (views.has(route)) return route;
  return 'home';
}

let activeView = initialView();
let transitionInProgress = false;
let queuedView = null;

if (window.location.pathname !== '/' || window.location.hash) {
  history.replaceState({}, '', '/');
}

function render(view) {
  app.innerHTML = view === 'home' ? home() : detail(view);
  document.body.dataset.view = view;
  document.title = view === 'home'
    ? 'Eli Cottrell — Creative Technologist'
    : view[0].toUpperCase() + view.slice(1) + ' — Eli Cottrell';
}

function afterAnimation(element, callback, fallbackDuration = 1200) {
  if (!element) {
    callback();
    return;
  }

  let completed = false;
  const finish = () => {
    if (completed) return;
    completed = true;
    element.removeEventListener('animationend', handleAnimationEnd);
    callback();
  };
  const handleAnimationEnd = (event) => {
    if (event.target === element) finish();
  };

  element.addEventListener('animationend', handleAnimationEnd);
  window.setTimeout(finish, fallbackDuration);
}

function changeView(nextView) {
  if (!allViews.has(nextView) || nextView === activeView) return;
  if (transitionInProgress) {
    queuedView = nextView;
    return;
  }

  transitionInProgress = true;
  const outgoingView = app.firstElementChild.cloneNode(true);
  outgoingView.classList.add('transition-ghost-view');
  outgoingView.setAttribute('aria-hidden', 'true');
  outgoingView.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  document.body.append(outgoingView);

  const outgoingCard = outgoingView.querySelector('.primary-card');
  outgoingCard?.classList.remove('card-enter');
  outgoingCard?.classList.add('card-exit');
  outgoingView.querySelectorAll('.transition-secondary').forEach((element) => {
    element.classList.remove('secondary-enter');
    element.classList.add('secondary-exit');
  });

  activeView = nextView;
  render(activeView);
  window.scrollTo({ top: 0, behavior: 'instant' });

  const incomingCard = app.querySelector('.primary-card');
  const incomingSecondary = app.querySelectorAll('.transition-secondary');
  incomingCard?.classList.add('card-pending');
  incomingSecondary.forEach((element) => element.classList.add('secondary-pending'));

  afterAnimation(outgoingCard, () => {
    outgoingView.remove();
    incomingCard?.classList.remove('card-pending');
    incomingCard?.classList.add('card-enter');
    incomingSecondary.forEach((element) => {
      element.classList.remove('secondary-pending');
      element.classList.add('secondary-enter');
    });

    afterAnimation(incomingCard, () => {
      incomingCard.classList.remove('card-enter');
      incomingSecondary.forEach((element) => element.classList.remove('secondary-enter'));
      transitionInProgress = false;
      if (queuedView && queuedView !== activeView) {
        const pendingView = queuedView;
        queuedView = null;
        changeView(pendingView);
      } else {
        queuedView = null;
      }
    });
  });
}

document.addEventListener('click', (event) => {
  const control = event.target.closest('[data-view]');
  if (!control) return;
  changeView(control.dataset.view);
});

document.addEventListener('submit', (event) => {
  if (!event.target.matches('[data-contact-form]')) return;
  event.preventDefault();
  event.target.querySelector('.form-feedback').textContent = 'This form is not connected yet. Please check back soon.';
});
render(activeView);
