/* Plain JS, no deps. Works via file:// and http:// */
(function () {
  const data = window.SITE_DATA || { projects: [], posts: [] };

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a,button')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Print
  document.getElementById('printBtn').addEventListener('click', () => window.print());

  // Offline badge
  const badge = document.getElementById('offlineBadge');
  function updateOnline() {
    badge.hidden = navigator.onLine;
  }
  window.addEventListener('online', updateOnline);
  window.addEventListener('offline', updateOnline);
  updateOnline();

  // Projects
  const grid = document.getElementById('projectGrid');
  function renderProjects(filter = 'all') {
    grid.innerHTML = '';
    data.projects
      .filter((p) => filter === 'all' || p.type === filter)
      .forEach((p) => {
        const el = document.createElement('article');
        el.className = 'card';
        el.innerHTML =
          '<h3></h3>' +
          '<div class="meta-row"><span></span></div>' +
          '<p></p>' +
          '<div class="links"><a>Demo</a><a>Code</a></div>';
        el.querySelector('h3').textContent = p.title;
        el.querySelector('.meta-row span').textContent = p.type + ' · ' + p.stack;
        el.querySelector('p').textContent = p.desc;
        const links = el.querySelectorAll('.links a');
        links[0].href = p.demo;
        links[1].href = p.code;
        grid.appendChild(el);
      });
    if (!grid.children.length) {
      grid.innerHTML = '<p class="muted">No projects in this category yet.</p>';
    }
  }
  renderProjects();
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  // Blog
  const list = document.getElementById('postList');
  data.posts.forEach((post) => {
    const el = document.createElement('article');
    el.className = 'post';
    const h = document.createElement('h3');
    const a = document.createElement('a');
    a.href = post.url;
    a.textContent = post.title;
    h.appendChild(a);
    const t = document.createElement('time');
    t.dateTime = post.date;
    t.textContent = post.date;
    const p = document.createElement('p');
    p.textContent = post.excerpt;
    el.append(h, t, p);
    list.appendChild(el);
  });

  // Contact form: offline-safe — saves locally + opens mailto
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill name, valid email, and message.';
      form.reportValidity();
      return;
    }
    const fd = new FormData(form);
    const entry = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message'),
      at: new Date().toISOString()
    };
    try {
      const key = 'resume-contact-messages';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(entry);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {}
    const subject = encodeURIComponent('Portfolio contact from ' + entry.name);
    const body = encodeURIComponent(entry.message + '\n\n— ' + entry.name + ' (' + entry.email + ')');
    window.location.href = 'mailto:alex.carter@example.com?subject=' + subject + '&body=' + body;
    status.textContent = 'Saved locally. Opening your email app…';
    form.reset();
  });
})();
