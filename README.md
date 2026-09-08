# Resume Web — offline + GitHub Pages ready

Plain HTML/CSS/JS. No build, no CDN, no backend. Double-click to run offline.

## Run offline
1. Open `index.html` directly in a browser, **or**
2. `python3 -m http.server 8000` then visit http://localhost:8000

All paths are relative (`./css/...`, `./js/...`), fonts are system fonts.

## Edit content
- `index.html` — name, hero, about, experience, skills, education, contact
- `js/data.js` — projects + blog posts (placeholder data included)
- `css/style.css` — colors via `:root` vars
- `assets/Alex-Carter-Resume.txt` — plain-text resume download

## Print to PDF
Click **Print / PDF** → Destination: Save as PDF. Print CSS hides nav/buttons and formats a clean 1–2 page resume.

## Deploy to GitHub Pages
1. `git init && git add -A && git commit -m "resume site"`
2. Create repo on GitHub, e.g. `resume-web`
3. `git remote add origin git@github.com:<you>/resume-web.git && git push -u origin main`
4. Repo → Settings → Pages → Source: **GitHub Actions**
5. Push to `main` triggers `.github/workflows/deploy.yml` → live URL

Files included for Pages: `.nojekyll`, `404.html`, relative asset paths.

## Structure
```
index.html
css/style.css
js/data.js
js/main.js
assets/favicon.svg
assets/Alex-Carter-Resume.txt
404.html
.nojekyll
.github/workflows/deploy.yml
```
