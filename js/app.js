/* Resume builder state + bindings. Works via file:// — localStorage + JSON file. */
(function () {
  const KEY = "resume-builder-v1";
  const uid = () => "id" + Math.random().toString(36).slice(2, 8);

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return clone(window.SAMPLE_RESUME);
  }
  let state = load();
  if (!state.settings) state.settings = { template: "modern", accent: "#2563eb", scale: 100 };

  const $ = (s) => document.querySelector(s);
  const preview = $("#preview"), status = $("#saveStatus");
  const tplSel = $("#templateSelect"), accent = $("#accentInput"),
        scale = $("#scaleInput"), scaleVal = $("#scaleVal"),
        skillsInput = $("#skillsInput");

  let saveT;
  function save() {
    status.textContent = "Saving…";
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(state)); status.textContent = "Saved locally ✓ " + new Date().toLocaleTimeString(); }
      catch { status.textContent = "Save failed (private mode?) — Export JSON to back up"; }
    }, 300);
  }

  function esc(s) {
    return String(s ?? "").replace(/"/g, "&quot;");
  }

  function renderPreview() {
    document.documentElement.style.setProperty("--accent", state.settings.accent || "#2563eb");
    document.documentElement.style.setProperty("--scale", (state.settings.scale || 100) + "%");
    const fn = window.RENDERERS[state.settings.template] || window.RENDERERS.modern;
    preview.innerHTML = fn(state);
    if (!state.basics.name && !state.experience.length) {
      preview.insertAdjacentHTML("afterbegin", "<p class='muted no-print' style='margin-top:0'>← Fill the form to see your resume. Nothing leaves your device.</p>");
    }
  }

  function entryShell(title, inner, id, kind) {
    return "<div class='entry' data-kind='" + kind + "' data-id='" + id + "'>" +
      "<div class='entry-head'><span>" + title + "</span>" +
      "<button class='btn btn-danger btn-small' data-del='" + id + "' type='button'>Remove</button></div>" +
      inner + "</div>";
  }
  const inp = (k, id, field, val, ph) =>
    "<label>" + k + "<input data-id='" + id + "' data-field='" + field + "' value=\"" + esc(val) + "\" placeholder=\"" + esc(ph || "") + "\" /></label>";
  const area = (id, field, val, ph, rows) =>
    "<label class='block'>" + field + "<textarea data-id='" + id + "' data-afield='" + field + "' rows='" + (rows || 3) + "' placeholder=\"" + esc(ph || "") + "\">" +
    esc(val) + "</textarea></label>";

  function renderForm() {
    // basics
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const path = el.dataset.bind.split(".");
      el.value = state[path[0]][path[1]] || "";
    });
    skillsInput.value = state.skills || "";
    tplSel.value = state.settings.template;
    accent.value = state.settings.accent;
    scale.value = state.settings.scale;
    scaleVal.textContent = state.settings.scale + "%";

    $("#expCount").textContent = "(" + state.experience.length + ")";
    $("#eduCount").textContent = "(" + state.education.length + ")";
    $("#customCount").textContent = "(" + state.custom.length + ")";

    $("#expList").innerHTML = state.experience.map((e) => entryShell(esc(e.role || e.company || "Role"),
      "<div class='grid2'>" + inp("Role", e.id, "role", e.role, "Senior Dev") + inp("Company", e.id, "company", e.company, "Acme") +
      inp("Start", e.id, "start", e.start, "2022") + inp("End", e.id, "end", e.end, "Present") + "</div>" +
      inp("Location", e.id, "location", e.location, "Remote") +
      "<label class='block'>Bullets (one per line)<textarea data-id='" + e.id + "' data-afield='bullets' rows='3'>" + esc(e.bullets) + "</textarea></label>",
      e.id, "experience")).join("");

    $("#eduList").innerHTML = state.education.map((e) => entryShell(esc(e.degree || e.school || "Degree"),
      "<div class='grid2'>" + inp("School", e.id, "school", e.school) + inp("Degree", e.id, "degree", e.degree) +
      inp("Start", e.id, "start", e.start) + inp("End", e.id, "end", e.end) + "</div>" +
      inp("Notes", e.id, "notes", e.notes, "GPA, honors"),
      e.id, "education")).join("");

    $("#projList").innerHTML = state.projects.map((p) => entryShell(esc(p.name || "Project"),
      "<div class='grid2'>" + inp("Name", p.id, "name", p.name) + inp("Stack", p.id, "stack", p.stack) + "</div>" +
      inp("Link", p.id, "link", p.link, "https://…") +
      "<label class='block'>Description<textarea data-id='" + p.id + "' data-afield='desc' rows='2'>" + esc(p.desc) + "</textarea></label>",
      p.id, "project")).join("");

    $("#customList").innerHTML = state.custom.map((c) => entryShell(esc(c.title || "Section"),
      inp("Title", c.id, "title", c.title, "Certifications") +
      "<label class='block'>Items (one per line)<textarea data-id='" + c.id + "' data-afield='items' rows='3'>" + esc(c.items) + "</textarea></label>",
      c.id, "custom")).join("");
  }

  function findList(kind) {
    return kind === "experience" ? state.experience : kind === "education" ? state.education
      : kind === "project" ? state.projects : state.custom;
  }

  // events: basics + skills + style
  document.querySelectorAll("[data-bind]").forEach((el) => {
    el.addEventListener("input", () => {
      const [g, f] = el.dataset.bind.split(".");
      state[g][f] = el.value;
      save(); renderPreview();
    });
  });
  skillsInput.addEventListener("input", () => { state.skills = skillsInput.value; save(); renderPreview(); });
  tplSel.addEventListener("change", () => { state.settings.template = tplSel.value; save(); renderPreview(); });
  accent.addEventListener("input", () => { state.settings.accent = accent.value; save(); renderPreview(); });
  scale.addEventListener("input", () => { state.settings.scale = +scale.value; scaleVal.textContent = scale.value + "%"; save(); renderPreview(); });

  // dynamic lists (delegated)
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (!t.dataset || !t.dataset.id) return;
    const entry = t.closest(".entry");
    if (!entry) return;
    const list = findList(entry.dataset.kind);
    const item = list.find((x) => x.id === t.dataset.id);
    if (!item) return;
    if (t.dataset.field) item[t.dataset.field] = t.value;
    if (t.dataset.afield) item[t.dataset.afield] = t.value;
    save(); renderPreview();
  });
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const k = add.dataset.add;
      if (k === "experience") state.experience.push({ id: uid(), role: "", company: "", start: "", end: "", location: "", bullets: "" });
      if (k === "education") state.education.push({ id: uid(), school: "", degree: "", start: "", end: "", notes: "" });
      if (k === "project") state.projects.push({ id: uid(), name: "", stack: "", link: "", desc: "" });
      if (k === "custom") state.custom.push({ id: uid(), title: "", items: "" });
      save(); renderForm(); renderPreview();
      return;
    }
    const del = e.target.closest("[data-del]");
    if (del) {
      const entry = del.closest(".entry");
      const list = findList(entry.dataset.kind);
      const i = list.findIndex((x) => x.id === del.dataset.del);
      if (i > -1) list.splice(i, 1);
      save(); renderForm(); renderPreview();
    }
  });

  // toolbar
  $("#btnPrint").addEventListener("click", () => window.print());
  $("#btnNew").addEventListener("click", () => {
    if (!confirm("Start blank? Export JSON first if you want to keep current.")) return;
    state = clone(window.BLANK_RESUME);
    save(); renderForm(); renderPreview();
  });
  $("#btnSample").addEventListener("click", () => {
    if (!confirm("Load sample data? Current edits will be replaced.")) return;
    state = clone(window.SAMPLE_RESUME);
    save(); renderForm(); renderPreview();
  });
  $("#btnExport").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (state.basics.name || "resume").replace(/\s+/g, "-").toLowerCase() + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  const fileInput = $("#fileImport");
  $("#btnImport").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const f = fileInput.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        if (!obj.basics) throw new Error("bad file");
        state = obj;
        save(); renderForm(); renderPreview();
      } catch { alert("Invalid resume JSON file."); }
    };
    r.readAsText(f);
    fileInput.value = "";
  });

  renderForm();
  renderPreview();
})();
