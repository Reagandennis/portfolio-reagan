# Renoch — Portfolio

An editorial, type-led portfolio for a software engineer. No build step, no
dependencies — three files plus SVG assets. Open `index.html` and it runs.

**Art direction:** warm paper + espresso ink + a single vermilion accent ·
Fraunces (display) / Space Grotesk (UI) / JetBrains Mono (meta) · strict grid,
hairline rules, generous whitespace.

**Craft details:** custom lerped cursor, project rows with cursor-following
cover previews, masked type reveals on load, magnetic buttons, light/dark mode
(remembers your choice), full responsive + reduced-motion + keyboard support.

```
portfolio/
├── index.html      ← content + structure (edit your text here)
├── styles.css      ← all styling + the color/type tokens at the top
├── script.js       ← cursor, previews, reveals, theme, magnetics
└── assets/
    ├── favicon.svg
    ├── avatar.svg      ← editorial portrait placeholder — swap for a real photo
    ├── og-image.svg    ← social share preview
    ├── work-01..04.svg ← the cover images shown when you hover a project
    └── resume.pdf      ← replace with your real CV
```

## ✏️ What to personalize

Everything is marked with a `✏️ EDIT` comment in `index.html`. The main spots:

| Section   | What to update                                                      |
|-----------|--------------------------------------------------------------------|
| `<head>`  | Page title, meta description, social preview text                  |
| Hero      | Your headline statement (the word in `<em>` gets the accent)       |
| Work      | Project name, description, year/stack, link, and `data-cover` image |
| About     | Your statement, bio paragraphs, and the three figures              |
| Stack     | The six items under each of the three columns                      |
| Experience| Role / company / years rows                                       |
| Contact   | Your email + social links                                          |

**Replace the portrait:** drop a photo into `assets/` and point the About
`<img src>` at it (e.g. `assets/me.jpg`). The accent frame around it is CSS, so
any image looks intentional.

**Replace the project covers:** swap the four `assets/work-0X.svg` files (any
image works — a real screenshot is ideal) or repoint each `data-cover`.

## 🎨 Change the look

Open `styles.css` — the `:root` block at the top holds every color and font.
Change `--accent` and the whole site re-tints. Dark mode lives in the
`[data-theme="dark"]` block right below. To pick a different mood, the easiest
levers are `--paper`, `--ink`, and `--accent`.

## 👀 Preview locally

```bash
cd portfolio
python3 -m http.server 5173
# open http://localhost:5173
```

## 🚀 Deploy (all free)

Netlify / Vercel / Cloudflare Pages — drag the folder in or connect a repo, no
build command. GitHub Pages — push and enable Pages on the branch root.
