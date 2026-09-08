/* Template renderers — pure functions, no deps. */
(function () {
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function lines(s) {
    return String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);
  }
  function contactLine(b) {
    return [b.email, b.phone, b.location, b.website, b.linkedin, b.github]
      .filter(Boolean).map(esc).join(" · ");
  }

  function expHTML(exp) {
    return exp.map((e) => (
      "<div class='item'><div class='item-head'><span>" + esc(e.role) +
      (e.company ? " — " + esc(e.company) : "") + "</span><span>" +
      esc([e.start, e.end].filter(Boolean).join(" – ")) + "</span></div>" +
      (e.location ? "<div class='muted'>" + esc(e.location) + "</div>" : "") +
      "<ul>" + lines(e.bullets).map((b) => "<li>" + esc(b) + "</li>").join("") + "</ul></div>"
    )).join("");
  }
  function eduHTML(edu) {
    return edu.map((e) => (
      "<div class='item'><div class='item-head'><span>" + esc(e.degree) +
      (e.school ? " — " + esc(e.school) : "") + "</span><span>" +
      esc([e.start, e.end].filter(Boolean).join(" – ")) + "</span></div>" +
      (e.notes ? "<div>" + esc(e.notes) + "</div>" : "") + "</div>"
    )).join("");
  }
  function projHTML(projects) {
    return projects.map((p) => (
      "<div class='item'><div class='item-head'><span>" + esc(p.name) + "</span>" +
      (p.stack ? "<span class='muted'>" + esc(p.stack) + "</span>" : "") + "</div>" +
      (p.desc ? "<div>" + esc(p.desc) + "</div>" : "") +
      (p.link ? "<div><a href='" + esc(p.link) + "'>" + esc(p.link) + "</a></div>" : "") + "</div>"
    )).join("");
  }
  function customHTML(custom) {
    return custom.map((c) =>
      "<h2>" + esc(c.title) + "</h2><ul>" +
      lines(c.items).map((i) => "<li>" + esc(i) + "</li>").join("") + "</ul>"
    ).join("");
  }

  function modern(s) {
    return "<div class='rv rv-modern'>" +
      "<div class='side'><h1 class='name'>" + esc(s.basics.name) + "</h1>" +
      "<div class='title'>" + esc(s.basics.title) + "</div>" +
      "<h2>Contact</h2><p>" + contactLine(s.basics).split(" · ").join("<br>") + "</p>" +
      "<h2>Skills</h2><p>" + esc(s.skills) + "</p>" +
      (s.education.length ? "<h2>Education</h2>" + eduHTML(s.education) : "") +
      "</div><div class='main'>" +
      (s.basics.summary ? "<h2>Summary</h2><p>" + esc(s.basics.summary) + "</p>" : "") +
      (s.experience.length ? "<h2>Experience</h2>" + expHTML(s.experience) : "") +
      (s.projects.length ? "<h2>Projects</h2>" + projHTML(s.projects) : "") +
      customHTML(s.custom) +
      "</div></div>";
  }

  function minimal(s) {
    return "<div class='rv rv-minimal'>" +
      "<h1 class='name'>" + esc(s.basics.name) + "</h1>" +
      "<div><strong>" + esc(s.basics.title) + "</strong></div>" +
      "<div class='contact'>" + esc(contactLine(s.basics)) + "</div>" +
      (s.basics.summary ? "<h2>Summary</h2><p>" + esc(s.basics.summary) + "</p>" : "") +
      (s.experience.length ? "<h2>Experience</h2>" + expHTML(s.experience) : "") +
      (s.projects.length ? "<h2>Projects</h2>" + projHTML(s.projects) : "") +
      (s.education.length ? "<h2>Education</h2>" + eduHTML(s.education) : "") +
      (s.skills ? "<h2>Skills</h2><p>" + esc(s.skills) + "</p>" : "") +
      customHTML(s.custom) + "</div>";
  }

  function classic(s) {
    return "<div class='rv rv-classic'><div class='center'>" +
      "<h1 class='name'>" + esc(s.basics.name) + "</h1>" +
      "<div>" + esc(s.basics.title) + "</div>" +
      "<div>" + esc(contactLine(s.basics)) + "</div></div>" +
      (s.basics.summary ? "<h2>Professional Summary</h2><p>" + esc(s.basics.summary) + "</p>" : "") +
      (s.experience.length ? "<h2>Work Experience</h2>" + expHTML(s.experience) : "") +
      (s.education.length ? "<h2>Education</h2>" + eduHTML(s.education) : "") +
      (s.skills ? "<h2>Skills</h2><p>" + esc(s.skills) + "</p>" : "") +
      (s.projects.length ? "<h2>Projects</h2>" + projHTML(s.projects) : "") +
      customHTML(s.custom) + "</div>";
  }

  window.RENDERERS = { modern, minimal, classic };
})();
