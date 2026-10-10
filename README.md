# Snehashish Ganguly — Interactive Digital World

A static portfolio website built with HTML, CSS, and JavaScript. It has no build step or server-side dependencies.

## Project files

Keep this structure when copying or uploading the site:

```text
.
├── index.html
├── style.css
├── responsive.css
├── script.js
├── README.md
└── assets/
    └── Snehashish_Ganguly_Resume.pdf
```

The stylesheet, scripts, and resume use relative paths. Keep the PDF's folder and filename (including capitalization) unchanged.

## Run locally

1. Download or clone the repository.
2. Open `index.html` in a browser, or serve the project folder with a local static web server (for example, the VS Code Live Server extension).
3. Check the welcome screen, project cards, resume viewer/download, and contact form.

The Three.js scene and Google Fonts are loaded from CDNs. If Three.js cannot load, the portfolio uses its canvas starfield fallback; the other sections remain available. Google Fonts fall back to local system fonts when offline.

## Deploy with GitHub Pages

1. Push the complete project structure to the repository's `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/(root)` folder, then save.
4. Wait for the Pages deployment to finish and open the published URL shown in the Pages settings.

This site is plain static HTML/CSS/JavaScript, so do not add a build command or change the framework. Other static hosts can deploy the same project folder with `index.html` as the entry point.

## Push to GitHub from PowerShell

Run these commands from this project folder. Replace the placeholder values with your GitHub account and repository name:

```powershell
git init
git branch -M main
git add index.html style.css responsive.css script.js README.md assets/Snehashish_Ganguly_Resume.pdf
git commit -m "Prepare portfolio for deployment"
git remote add origin https://github.com/<USERNAME>/<REPOSITORY>.git
git push -u origin main
```

If `origin` is already configured, skip `git remote add origin ...`.

## Privacy before publishing

The entry screen is a welcome screen, not account authentication; it does not request passwords or store visitor data. The contact form opens the visitor's email app and does not send or store form submissions. No API keys or credentials are needed for this site. The portfolio intentionally displays a contact email and includes a resume PDF; review the PDF and displayed contact details to make sure you want them public before deploying.
