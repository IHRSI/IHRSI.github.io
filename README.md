<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Cinzel&weight=700&size=45&pause=1000&color=3AAFA9&center=true&vCenter=true&width=800&height=120&lines=The+Expedition;Hiten+Raj+Singh's+Portfolio;Ascend+to+the+Summit" alt="Typing SVG" />
  
  <p align="center">
    <strong>A cinematic, narrative-driven portfolio built with pure web technologies.</strong>
  </p>

  <div>
    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
    <img src="https://img.shields.io/badge/formspree-%23E74C3C.svg?style=for-the-badge&logo=formspree&logoColor=white" alt="Formspree" />
  </div>
</div>

---

## 🧭 The Journey (Architecture)

This project rejects the standard "grid of links" approach in favor of a narrative journey. As you scroll, you ascend a mountain—progressing from Base Camp all the way to the Summit, encountering different facets of my professional life along the way.

- 🏕️ **Base Camp (Hero)**: The starting point. Features a dynamic radar sweep, altitude logging, and a cinematic fog reveal.
- 🌌 **Aurora Moment (About)**: A deep dive into identity, featuring a glassmorphism Bento Grid layout for terminal logs and field notes.
- 🏔️ **Zermatt (Tech Stack)**: A structured showcase of technical proficiencies, utilizing organic, staggered CSS transforms for skill chips.
- 🌊 **Pipeline (Projects)**: A logbook of engineering achievements featuring interactive, hover-responsive project cards.
- ☁️ **Interlaken (Achievements)**: Highlights competitive milestones via 3D flip-cards embedded in a parallax cloudscape.
- 📚 **Library (Education)**: Academic history presented as an interactive 3D bookshelf.
- 🗺️ **Victoria Falls (Leadership)**: A record of community and leadership roles presented as field journal streams.
- 🚩 **The Summit (Contact)**: The final destination at 8,848m. Features a working transmission terminal and a celebratory confetti engine.

## 🛠️ Tech Stack & Engineering Philosophy

This project was built with a strict **"Vanilla Only"** philosophy. No heavy frameworks, no bloated libraries—just the raw power of the modern web platform.

### 🎨 Advanced CSS Architecture
* **Extensive Keyframe Animations**: The environment is brought to life using highly customized `@keyframes` (aurora drifts, radar spins, floating weather particles, wave physics, and 3D flip transitions).
* **CSS Custom Properties (Variables)**: Used extensively for a seamless **Day/Night Theme Toggle** without needing JavaScript to swap out massive style blocks.
* **Modern Layouts**: Advanced CSS Grid (like the Bento UI) and Flexbox ensure responsive, adaptive layouts across all devices.

### ⚡ Vanilla JavaScript (ES6+)
* **Custom Physics Cursor**: A custom-built trailing ring cursor (`requestAnimationFrame`) that reacts to velocity, dynamically changing its shape and rotation based on mouse movement.
* **Dynamic Section Logging**: An expedition log that updates in real-time based on scroll depth, powered by lightweight `IntersectionObserver` logic.
* **Particle Engine**: A custom DOM-based particle system generating distinct weather effects (snow, dust, stars) based on the active section.

### 📬 Formspree Integration
* The Summit contact form is fully functional, using an asynchronous `fetch` request to **Formspree**. 
* It intercepts the default submission behavior, triggers a celebratory Confetti Engine, and provides real-time transmission feedback directly in the terminal interface.

## ✨ Interactive Effects & Mechanics

To elevate the user experience, the portfolio is packed with meticulously crafted micro-interactions and cinematic effects:

* 🖱️ **The Navigator's Custom Cursor**: A custom dual-layer physics cursor that is fully **section-aware**. While the `requestAnimationFrame` loop handles velocity-stretching and rotation, the cursor physically morphs its CSS identity based on altitude.
* 🧗 **Expedition Sidebar (Nav)**: A dynamic right-side navigation track. As you scroll, a glowing "carabiner" slides down the track, dynamically snapping to the active section's waypoint dot using `IntersectionObserver`.
* 🌫️ **Cinematic Fog & Parallax**: The Base Camp hero section features multi-layered CSS fog that drifts infinitely. Background mountain elements utilize subtle CSS transforms to create a sense of deep parallax.
* 🌌 **3D Aurora Tilt**: The glassmorphic bio card in the About section tracks the user's mouse coordinates, calculating a perspective `rotateX` and `rotateY` tilt in real-time for a stunning 3D glass effect.
* ❄️ **Section-Aware Particle Engine**: A lightweight JavaScript engine that destroys and spawns different CSS-animated DOM particles depending on your altitude (drifting snow at Base Camp, twinkling stars at the Summit).
* 🔄 **3D Flip Mechanics**: Utilizes advanced CSS `transform-style: preserve-3d` and `backface-visibility: hidden` to create interactive, flipping logbook cards and bookshelf items.
* 📡 **Radar & Beacons**: Uses staggered `@keyframes` to create a sweeping radar effect and pulsing red beacons that add life to the terminal interfaces.

## 🚀 Getting Started

Because this project is built with raw web technologies, running it locally is incredibly simple. No `npm install` or build steps required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IHRSI/portfolio.git
   ```
2. **Launch a local server:**
   To view the project properly (and prevent CORS issues with local fonts/assets), spin up a simple HTTP server in the project directory.
   
   *Using Python:*
   ```bash
   python -m http.server 8000
   ```
   *Using Node.js:*
   ```bash
   npx http-server
   ```
3. **Open your browser:**
   Navigate to `http://localhost:8000` to begin the expedition.

## 📐 Design System

The visual identity is built on a foundation of restraint and professionalism:
- **Typography**: A curated blend of *Cinzel* (for cinematic headers), *Inter* (for highly readable body text), and *IBM Plex Mono* (for terminal/technical data).
- **Color Palette**: Adaptive deep teals, ambers, and slate grays that invert smoothly during the Day/Night transition.

---
<div align="center">
  <sub>Crafted and engineered by Hiten Raj Singh. &copy; HRS</sub>
</div>
