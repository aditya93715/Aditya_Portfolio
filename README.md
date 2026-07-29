# Ashwood Girls' School — Frontend Clone

A responsive, animated recreation of a private-school marketing site: a full-screen hero
banner and a two-panel "mega menu" where clicking a category on the left instantly
cross-fades new links into the red panel on the right — built with **React + Vite +
Tailwind CSS v4 + Framer Motion**.

## What's inside

```
korowa-clone/
├── index.html                 # page shell, Google Fonts (Fraunces + Inter)
├── vite.config.js             # Vite + @tailwindcss/vite plugin
├── package.json
└── src/
    ├── main.jsx                # React entry point
    ├── index.css                # Tailwind import + design tokens (@theme)
    ├── App.jsx                  # page composition + menu open/close state
    ├── data/
    │   └── menuData.js          # ⭐ edit this to change every menu label/link
    └── components/
        ├── Header.jsx           # logo, Tour/Enquire buttons, Menu toggle
        ├── Hero.jsx              # full-screen banner + scholarship card
        ├── MegaMenu.jsx          # the animated two-panel navigation overlay
        ├── Highlights.jsx        # card grid preview of the six categories
        └── Footer.jsx
```

## Run it (Ubuntu)

```bash
# 1. Node.js 18+ is required — install it if you don't have it:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. From inside the project folder:
npm install
npm run dev
# open the printed local URL, e.g. http://localhost:5173
```

Build a production bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally to check it
```

## How the menu works

- `Header.jsx` renders the fixed top bar. Its **Menu** button toggles `menuOpen` state
  in `App.jsx`.
- `MegaMenu.jsx` is a full-screen overlay (`AnimatePresence` handles enter/exit). It has:
  - **Left panel** (cream): the list of categories (`About`, `Learn`, `Co-curricular`…).
    Clicking one sets `active` state.
  - **Right panel** (crimson): re-renders with a cross-fade (`key={active}` inside
    `AnimatePresence mode="wait"`) whenever `active` changes, pulling its links straight
    from `menuData.js`.
  - A **Quick Links** box that stays constant across every category, plus a live
    **search** field that filters the currently visible links.
  - On small screens the left list becomes an accordion — tapping a category expands
    its links inline instead of using a second panel.
- Everything is data-driven: to add/rename a category or its links, edit
  `src/data/menuData.js` only — no component code needs to change.

## Customizing

- **Colors / fonts** — edit the `@theme` block at the top of `src/index.css`
  (`--color-crimson`, `--color-cream`, `--font-display`, etc.).
- **Hero photo** — `Hero.jsx` currently paints a generative SVG/gradient forest scene so
  the project has zero external image dependencies. Drop your own photo in `public/`
  and swap the commented `<img>` line in `Hero.jsx` for a real photograph.
- **School name / address / phone** — `src/data/menuData.js` → `schoolInfo`.

## Accessibility & responsiveness

- Menu is a labeled `dialog` with `Escape`-to-close and focus-visible states.
- `prefers-reduced-motion` is respected globally (see bottom of `index.css`).
- Layout is fluid from ~360px phones up through ultra-wide desktop; the mega-menu
  collapses from a two-column split to a stacked accordion under the `lg` breakpoint.
