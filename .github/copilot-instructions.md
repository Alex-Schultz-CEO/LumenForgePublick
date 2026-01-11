# LumenForge v1.0.1 - Copilot Instructions

## Project Overview
**LumenForge** is a web design and development agency website with two main sections:
- **Root**: Main landing page (`index.html`) with Russian content and hero animations
- **Protocols-v3-main**: Services/protocols section with contact forms (`Contactt.php`, `Protocols.html`)

The site emphasizes smooth animations and parallax effects using **GSAP** library with responsive design supporting both desktop (1100px+) and mobile viewports.

## Architecture & Key Components

### Frontend Structure
- **index.html** (493 lines): Main landing page with header, marquee animations, hero section
- **Protocols-v3-main/Contactt.php**: Contact form page (uses PHP for backend handling)
- **Protocols-v3-main/Protocols.html**: Services listing page
- **js/script.js** (787 lines): GSAP parallax animations, DOM manipulations, scroll/mouse events
- **Protocols-v3-main/js/app.js**: Additional animations for Protocols section
- **css/style.css** (2066 lines): Main stylesheet with CSS variables, responsive utilities
- **Protocols-v3-main/css/main.css**: Secondary stylesheet for Protocols pages

### Animation Framework
The project heavily uses **GSAP** (GreenSock Animation Platform):
- `gsap.min.js`, `ScrollTrigger.min.js`, `ScrollSmoother.min.js` in `Protocols-v3-main/libs/gsap/`
- Desktop (width ≥1100px): Mouse-based parallax with `mousemove` event listener
- Mobile (width <1100px): Scroll-based parallax with `scroll` event listener
- Timeline-based animations with `ease: "power3.ease"` for consistency

### Design System
**CSS Variables** (`style.css`):
```css
--main-color: Dynamic (site background color)
--contrast-sec: hsl(5, 70%, 60%) /* Peach/coral accent */
--contrast-main: hsl(180, 60%, 70%) /* Cyan accent */
--sec-color: #161616 /* Dark text */
--grey: #356066 /* Secondary */
--offset: max(14px, 1vw) /* Responsive spacing */
```

**Typography**:
- Body: "Jost" (weight 500) - main text
- Titles: "Tektur" (weight 800) - `.title` class and `<h1>`, `<h2>`

**Color Classes**: `.text-black`, `.text-peach` for semantic color application

## Developer Workflows

### File Organization Patterns
- **Responsive Assets**: Duplicate stylesheets (e.g., `css/style.css` and `Protocols-v3-main/css/main.css`) manage section-specific styles
- **Navigation**: Links use relative paths (`href="Protocols-v3-main/Protocols.html"`, `href="../index.html"`)
- **Favicons**: Consistent manifest + multi-format icons in `img/` folder

### Common Tasks

**Adding Animations**:
1. Reference GSAP in `<script>` tags (defer loading pattern used)
2. Use `gsap.timeline()` with defaults for consistency
3. Respect breakpoint: detect `window.innerWidth < 1100` for mobile animations

**Modifying Styles**:
1. Update CSS variables in `style.css` for global changes
2. Add responsive utilities using `--offset` variable
3. Font changes: edit `@import` URL or font-family declarations with "Jost"/"Tektur" fallbacks

**Form Handling**:
- Contact forms in `Contactt.php` use POST (check `send-mail.php` for backend implementation)
- Inline onclick handlers used for menu toggle: `document.body.classList.toggle('close__menu')`

## Key Conventions & Patterns

### Class Naming
- **Components**: `header__menu`, `firstscreen__logo`, `marquee__track` (BEM-like with double underscores)
- **Utilities**: `.title`, `.text-black`, `.text-peach`, `.close__menu`
- **State**: Menu toggle uses `close__menu` class on body (visibility controlled via CSS)

### DOM Manipulation
- Inline event handlers preferred (`onclick="..."`) - see menu toggle button
- Event listeners use `DOMContentLoaded` (not just `addEventListener`)
- Global GSAP config: `gsap.ticker.lagSmoothing(0)`, `gsap.ticker.fps(60)`

### Responsive Design
```javascript
// Desktop (1100px+): Use mousemove + requestAnimationFrame
if (window.innerWidth < 1100) { /* mobile: scroll-based */ }
else { /* desktop: mousemove parallax */ }
```

## Integration Points & External Dependencies

### Frontend Libraries
- **GSAP 3.x** with plugins: ScrollTrigger, ScrollSmoother (optimize animation performance)
- **Font Awesome 6.5.2** (CDN) for icons (`fa-bars-staggered`, `fa-xmark`)
- **Google Fonts**: Jost, Tektur (imported in CSS)

### Backend
- **PHP**: `Contactt.php` and `send-mail.php` for form submissions
- **Manifest**: WebApp support via `site.webmanifest`

### Important: File Paths
- Root refers to main `index.html` as entry point
- Protocols section in subdirectory - uses relative paths (`../` for parent access)
- `python/` folder visible but no clear entry point identified

## Critical Debugging Tips

1. **Parallax not working**: Check `window.innerWidth` breakpoint; desktop requires mousemove listener
2. **Animations stuttering**: GSAP ticker settings (`lagSmoothing`, `fps`) in `script.js` line 2-3
3. **Menu toggle**: Class toggle on body + Font Awesome icon class toggle (lines 24-25 of index.html)
4. **Styling inconsistencies**: Check both `css/style.css` AND `Protocols-v3-main/css/main.css` for conflicts

---
*Last updated: 2026-01-11*
