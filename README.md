# Siamuddin — Portfolio Website

A dark, futuristic, fully hand-coded portfolio website — built from scratch with **vanilla HTML, CSS and JavaScript**. No frameworks, no libraries, no templates. Just pure front-end code.

**Live site:** https://siamuddin.github.io/portfolio/

---

## What This Is

This is my personal developer portfolio. I built it to:
- Show the projects I've built while learning through [The Odin Project](https://www.theodinproject.com/)
- Document my learning journey from zero to full-stack
- Practise real HTML/CSS/JS skills by building something I'll actually use
- Have a professional online presence as I grow as a developer

---

## Pages

The site has **7 pages**, each in its own HTML file:

| Page | File | What It Does |
|------|------|--------------|
| Home | `index.html` | Landing page — hero, featured projects, skills snapshot, CTA |
| About | `pages/about.html` | Bio, code window, values, fun facts |
| Skills | `pages/skills.html` | Animated skill bars, tools grid, learning roadmap |
| Projects | `pages/projects.html` | All projects with filter tabs (All / Web / Automation) |
| Journey | `pages/journey.html` | Visual timeline of my learning path |
| Blog | `pages/blog.html` | Devlog articles about learning to code |
| Contact | `pages/contact.html` | Contact form + direct links |
| Uses | `pages/uses.html` | Tools and software I use every day |

---

## File Structure

```
portfolio/
│
├── index.html              ← Homepage (root level)
│
├── pages/                  ← All other pages live here
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── journey.html
│   ├── blog.html
│   ├── contact.html
│   └── uses.html
│
├── css/
│   └── style.css           ← ONE shared stylesheet for every page
│
├── js/
│   └── main.js             ← ONE shared JavaScript file for every page
│
└── README.md               ← You are here
```

**Why this structure?**

Instead of copying the same CSS into every page, there is one `style.css` file shared by all pages. This means:
- Change a colour once → updates everywhere
- Fix a bug once → fixed everywhere
- Pages are small and easy to read

---

## How It Works — Key Concepts Explained

### CSS Variables
In `css/style.css`, colours and sizes are stored as "variables":
```css
:root {
  --cyan: #4dd9ff;    /* define once */
  --bg:   #07090f;
}

/* Use anywhere: */
.my-element { color: var(--cyan); }
```
Change `--cyan` in one place → the whole site updates instantly.

---

### Shared Stylesheet & JS
Every HTML file has these two lines in the `<head>`:
```html
<!-- From root: -->
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

<!-- From inside /pages/ (one level up with ../): -->
<link rel="stylesheet" href="../css/style.css">
<script src="../js/main.js"></script>
```
The `../` means "go up one folder level". Pages inside `/pages/` need this because they're one level deeper than the root.

---

### Scroll Animations
Elements start invisible and slide up when they scroll into view:
```html
<!-- Add this class to any element you want to animate: -->
<div class="reveal">I will fade in when scrolled to</div>

<!-- Stagger multiple elements with delay classes: -->
<div class="reveal reveal-delay-1">Appears slightly later</div>
<div class="reveal reveal-delay-2">Appears even later</div>
```
The JavaScript in `main.js` uses `IntersectionObserver` to watch for when elements enter the viewport, then adds the `visible` class which triggers the CSS transition.

---

### Custom Cursor
The custom cursor consists of two HTML elements placed at the top of every `<body>`:
```html
<div class="cursor"></div>       <!-- small dot — snaps instantly -->
<div class="cursor-ring"></div>  <!-- larger ring — lags behind smoothly -->
```
JavaScript tracks the mouse position and moves these elements. The ring uses "lerp" (linear interpolation) to create the smooth trailing effect.

---

### Mobile Navigation
On small screens (under 900px):
- Desktop nav links are hidden with CSS
- A hamburger icon is shown instead
- Clicking it opens a full-screen menu overlay
- JavaScript handles the open/close toggle and animates the hamburger into an ×

---

### Contact Form
The form in `contact.html` uses [Formspree](https://formspree.io) — a free service that receives form submissions and forwards them to your email.

**To activate it:**
1. Go to [formspree.io](https://formspree.io) and sign up for free
2. Create a new form — you'll get a URL like `https://formspree.io/f/XXXXXXXX`
3. Open `pages/contact.html` and find this line:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your real ID from Formspree
5. Done — form submissions now go to your email

---

### Skill Bars Animation
In `skills.html`, each progress bar looks like this:
```html
<div class="skill-bar-track">
  <div class="skill-bar-fill" data-width="75"></div>
</div>
```
The bar starts at `width: 0%`. When it scrolls into view, JavaScript reads the `data-width="75"` value and sets `width: 75%`. The CSS `transition` property animates it smoothly.

---

### Project Filter (Projects Page)
Each project card has a `data-category` attribute:
```html
<div class="proj-card" data-category="automation">
<div class="proj-card" data-category="odin web">
```
When a filter button is clicked, JavaScript shows only cards where the category matches. "All" shows everything.

---

## Design Choices

| Choice | Reason |
|--------|--------|
| **Dark theme** | Easier on eyes, looks professional, suits a tech portfolio |
| **Bebas Neue** | Tall, cinematic display font — memorable and bold |
| **Outfit** | Clean, modern body font — readable and tall x-height |
| **JetBrains Mono** | Designed specifically for code — used in code windows |
| **Cyan + Mint accent** | Cool, futuristic feel without being generic purple |
| **Clipped corners** | Gives buttons a technical/cyberpunk feel without being cheesy |
| **Custom cursor** | Distinctive interaction detail that people remember |
| **Grid background** | Subtle depth on hero sections — feels architectural |

---

## How to Run Locally

No build step, no install, no terminal commands needed. Just:

1. Download or clone this repository
2. Open `index.html` in your browser
3. That's it

```bash
git clone https://gitlab.com/siamuddin/siamuddin.gitlab.io
cd siamuddin.gitlab.io
# Open index.html in your browser
```

Or if you have VS Code with the **Live Server** extension:
- Right-click `index.html` → "Open with Live Server"
- It will auto-refresh when you save changes

---

## How to Deploy to GitLab Pages

This site is deployed for free using GitLab Pages.

**Step 1** — Create a repository named exactly: `siamuddin.gitlab.io`

**Step 2** — Add a `.gitlab-ci.yml` file to the root:
```yaml
# This file tells GitLab how to deploy the site.
# "pages" is a special GitLab job name — it triggers Pages deployment.
pages:
  stage: deploy
  script:
    - mkdir public          # GitLab Pages serves from a folder called "public"
    - cp -r . public/       # copy all our files into it
    - rm -rf public/public  # remove the copy of itself
  artifacts:
    paths:
      - public              # tell GitLab what to publish
  only:
    - main                  # only deploy from the main branch
```

**Step 3** — Push your code. Wait ~2 minutes.

**Step 4** — Visit `https://siamuddin.github.io/portfolio/` 🎉

---

## How to Update

### Add a new project
1. Open `pages/projects.html`
2. Copy an existing `.proj-card` div
3. Update the title, description, tags, and links
4. Add a `data-category` attribute so the filter works

### Write a new blog post
1. Open `pages/blog.html`
2. Copy an existing `.blog-card` div
3. Update the content

### Change a colour
1. Open `css/style.css`
2. Find the `:root` block at the top
3. Change the value of any `--variable`
4. It updates everywhere automatically

### Add a page
1. Copy `pages/uses.html` as a template (it's the simplest page)
2. Rename it and update the content
3. Add a link to it in the nav in `css/style.css`... wait, the nav is in each HTML file
4. Add the link in the `<nav>` section of every page (and in `index.html`)

---

## Technologies Used

| Technology | What It Does |
|------------|-------------|
| HTML5 | Page structure and content |
| CSS3 | Styling, animations, layout |
| JavaScript (Vanilla) | Interactivity — cursor, menus, scroll animations |
| CSS Custom Properties | Shared design tokens (colours, spacing) |
| CSS Grid & Flexbox | Page layouts |
| CSS Transitions & Animations | Smooth effects |
| IntersectionObserver API | Scroll-triggered animations |
| Fetch API | Contact form submission |
| Google Fonts | Bebas Neue, Outfit, JetBrains Mono |
| GitLab Pages | Free static site hosting |
| Formspree | Free contact form backend |

**No frameworks. No npm. No build step. Just files.**

---

## Author

**Siamuddin**
Learning Full-Stack Development through [The Odin Project](https://www.theodinproject.com/)

- 🌐 Portfolio: https://siamuddin.github.io/portfolio/
- 📧 Email: shelve-clock-corny@duck.com
- 🐙 GitHub: https://github.com/siamuddin
- 🦊 GitLab: https://gitlab.com/siamuddin

---

## License

Feel free to look at the code, learn from it, and use it as inspiration. If you copy it directly, please change the content to your own. Don't pretend to be me.

---

*Built with HTML, CSS & stubbornness.*
