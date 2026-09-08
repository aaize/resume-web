/* Sample resume — preloaded on first run. Edit or replace. */
window.SAMPLE_RESUME = {
  basics: {
    name: "Alex Carter",
    title: "Full-Stack Developer",
    email: "alex.carter@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
    summary: "Full-stack developer with 5+ years shipping TypeScript/React/Node apps. Offline-first, accessible, performance-obsessed. Open to remote roles."
  },
  experience: [
    {
      id: "e1", role: "Senior Full-Stack Developer", company: "Acme Corp",
      start: "2022", end: "Present", location: "Remote",
      bullets: "Led dashboard migration to React, cutting load 62%\nBuilt offline PWA for 20k+ field workers\nMentored 4 engineers, added e2e tests"
    },
    {
      id: "e2", role: "Frontend Developer", company: "Beta Labs",
      start: "2020", end: "2022", location: "SF",
      bullets: "Shipped customer portal, 50k MAU, 99.9% uptime\nBuilt design system used by 3 products"
    }
  ],
  education: [
    { id: "d1", school: "State University", degree: "B.S. Computer Science", start: "2014", end: "2018", notes: "GPA 3.7" }
  ],
  skills: "TypeScript, React, Node.js, PostgreSQL, Docker, Git, Accessibility, AWS",
  projects: [
    { id: "p1", name: "Offline Inventory PWA", stack: "React · IndexedDB", link: "", desc: "Field app with offline sync and barcode scan." },
    { id: "p2", name: "Dev Metrics CLI", stack: "Node.js", link: "", desc: "CI reporter for bundle size and coverage." }
  ],
  custom: [
    { id: "c1", title: "Certifications", items: "AWS Certified Developer Associate (2023)" },
    { id: "c2", title: "Languages", items: "English (native)\nSpanish (B2)" }
  ],
  settings: { template: "modern", accent: "#2563eb", scale: 100 }
};

window.BLANK_RESUME = {
  basics: { name: "", title: "", email: "", phone: "", location: "", website: "", linkedin: "", github: "", summary: "" },
  experience: [], education: [], skills: "", projects: [], custom: [],
  settings: { template: "modern", accent: "#2563eb", scale: 100 }
};
