# Resume Builder — offline + GitHub Pages ready

Plain HTML/CSS/JS. No build, no CDN, no server. Your data never leaves the device.

## Run offline
- Double-click `index.html`, **or**
- `python3 -m http.server 8000` → http://localhost:8000

## Use
1. Fill form on the left, live preview on the right
2. Switch Template: Modern / Minimal / Classic-ATS
3. Autosaves to `localStorage`. Use **Export JSON** to back up, **Import** to restore
4. **Print / PDF** → Save as PDF. Only the resume prints; Classic template is most ATS-friendly

## Edit / extend
- `index.html` — form fields + toolbar
- `js/sample.js` — sample + blank data
- `js/templates.js` — `modern/minimal/classic` renderers (pure functions)
- `js/app.js` — state, bindings, import/export
- `css/style.css` — `:root` accent, `@media print` rules

## Deploy to GitHub Pages
1. `git init && git add -A && git commit -m "resume builder"`
2. Push to GitHub `main`
3. Settings → Pages → Source: **GitHub Actions**
4. Push triggers `.github/workflows/deploy.yml`

```
index.html
css/style.css
js/sample.js, js/templates.js, js/app.js
assets/favicon.svg
404.html, .nojekyll
.github/workflows/deploy.yml
```
