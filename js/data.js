/* EDIT ME: placeholder portfolio data. All local, works offline. */
window.SITE_DATA = {
  projects: [
    {
      title: "Offline Inventory PWA",
      type: "web",
      stack: "React · IndexedDB · Workbox",
      desc: "Field inventory app with full offline sync, barcode scan, and conflict resolution.",
      demo: "#projects",
      code: "#projects"
    },
    {
      title: "Dev Metrics CLI",
      type: "tool",
      stack: "Node.js · Commander",
      desc: "Zero-config CLI to report bundle size, test coverage, and deploy previews in CI.",
      demo: "#projects",
      code: "#projects"
    },
    {
      title: "Accessible UI Kit",
      type: "oss",
      stack: "HTML · CSS · Web Components",
      desc: "12 dependency-free components, WCAG 2.2 AA, 3kb gzipped per component.",
      demo: "#projects",
      code: "#projects"
    },
    {
      title: "Realtime Chat Starter",
      type: "web",
      stack: "Node · WebSocket · Postgres",
      desc: "Template for rooms, presence, typing indicators, and message history.",
      demo: "#projects",
      code: "#projects"
    },
    {
      title: "Dotfiles + Scripts",
      type: "tool",
      stack: "Bash · Git",
      desc: "My personal productivity scripts for backups, image optimize, and git shortcuts.",
      demo: "#projects",
      code: "#projects"
    },
    {
      title: "Markdown Blog Engine",
      type: "oss",
      stack: "Vanilla JS",
      desc: "File-based 5kb blog renderer — the same idea powering the Blog section below.",
      demo: "#blog",
      code: "#blog"
    }
  ],
  posts: [
    {
      title: "Why I ship offline-first static sites",
      date: "2026-06-12",
      excerpt: "No build step means double-click to preview, easy backup on USB, and trivial hosting anywhere.",
      url: "#blog"
    },
    {
      title: "Print CSS trick for perfect resume PDFs",
      date: "2026-05-03",
      excerpt: "One @media print block, hide nav/footer, expand links. Then File → Print → Save as PDF.",
      url: "#blog"
    },
    {
      title: "My minimal deploy checklist for GitHub Pages",
      date: "2026-03-18",
      excerpt: "Relative paths, .nojekyll, test with python http.server, then push to main.",
      url: "#blog"
    }
  ]
};
