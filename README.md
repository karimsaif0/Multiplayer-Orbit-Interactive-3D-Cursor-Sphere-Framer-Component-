<div align="center">

# 🌀 Multiplayer Orbit
### Interactive 3D Cursor Sphere for Framer

**A world of cursors. One interactive orbit.**

An expressive, interactive cursor universe built with React, TypeScript, and the Canvas 2D API for Framer.

[**🌐 Live Demo**](https://multiplayerorbitcursor.framer.website/) · [**🐦 Follow Karim on X**](https://x.com/karimsaif0) · [**✉️ Get Support**](mailto:karimsaif010@gmail.com)

![Framer](https://img.shields.io/badge/Framer-Code%20Component-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-149ECA?style=for-the-badge&logo=react&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas-2D-151515?style=for-the-badge)
![Made with love](https://img.shields.io/badge/Made%20with-%F0%9F%92%9B-ffcf55?style=for-the-badge)

</div>

---

## ✨ Overview

**Multiplayer Orbit** turns a collection of colorful, labeled cursors into a dynamic, 3D-inspired sphere. The cursor cloud drifts and spins organically, reacts to mouse movement through spring-like magnetic forces, and can be grabbed and spun with drag momentum.

Designed for memorable landing pages, creative portfolios, collaboration experiences, and interactive product presentations.

### 🔴 Try the live experience

**[multiplayerorbitcursor.framer.website](https://multiplayerorbitcursor.framer.website/)**

Move your pointer through the orbit and drag the sphere to interact.

## 🚀 Highlights

| Feature | Description |
| --- | --- |
| 🌐 3D-inspired cursor sphere | Named cursors distributed across a rotating spherical formation |
| 🧲 Magnetic bow wave | Neighboring cursors gently move away from pointer motion |
| 👆 Drag & throw | Spin the orbit manually with momentum and easing |
| 🎭 Phrased motion | Transitions between slow drift, quick rotation, and settling |
| ✨ Depth blur | Adjustable soft-focus effect creates visual depth |
| 🎯 Cursor attention | Nearby labels become more visible and responsive |
| 🖱️ Personalized visitor cursor | Edit your name and color, or hide the custom pointer |
| 💜 Breathing ring | Animated ring with adjustable color, visibility, and scale |
| 🎨 Ambient washes | Subtle violet and cyan light behind the cursor sphere |
| 👥 Custom cast | Supply up to 60 comma-separated labels |
| 📐 Responsive | Scales relative to the available component dimensions |
| ⚡ Motion-aware | Includes reduced-motion handling and static SVG rendering |
| 🛑 Lifecycle-aware | Stops the animation when offscreen or when the tab is hidden |
| 🖥️ Pixel budget | Caps device pixel ratio and Canvas resolution |

## 🎛️ Customization

All **16 property controls** are available in Framer:

| Group | Controls |
| --- | --- |
| Appearance | Background, Ring Color, Show Ring, Ring Size, Sphere Size, Cursor Size, Color Wash |
| Motion | Spin Speed, Phrased Spin, Depth Blur |
| Interaction | Attention, Bow Wave, Show You |
| Personalization | Your Label, Your Color, Names |
| Quality | Pixel Ratio |

The **Names** control accepts comma-separated names (up to 60). Leaving it empty uses the colorful 26-person default cast.

## 🧩 Installation in Framer

1. Open your **Framer project**.
2. Go to **Assets → Code → New Code File**.
3. Name the file `KarimSaifMultiplayerOrbit.tsx`.
4. Copy the full source from **[KarimSaifMultiplayerOrbit.tsx](./KarimSaifMultiplayerOrbit.tsx)**.
5. Paste it into the new Framer code file and save.
6. Drag the component onto your canvas and customize it using the Property Controls.
7. Check it in **Preview**, on a **published page**, and on mobile.

> **Note:** This is a Framer code component, not a standalone React application. Framer supplies the `framer` module used in the source. The repository contains the component source rather than a separately runnable build system.

## 🧠 How it works

- **Fibonacci-sphere distribution** spreads cursor labels over a sphere.
- **Rotational projection** animates their 3D-inspired positions in a 2D Canvas.
- **Spring dynamics** create magnetic reactions to pointer movement.
- **Depth sorting and opacity** keep the sphere visually layered.
- **Canvas rendering** draws arrows, name badges, lighting, shadows, and blur.
- **Framer rendering hooks** enable static rendering and reduced-motion handling.

## 🎯 Great for

Creative studios · Collaboration products · Community websites · SaaS landing pages · Product showcases · Interactive hero sections · Design portfolios · Experimental motion design

## ⚙️ Technical details

- React + TypeScript / TSX
- Framer Property Controls
- HTML Canvas 2D + SVG static fallback
- `requestAnimationFrame` rendering with fixed-step simulation
- `IntersectionObserver` and `ResizeObserver`
- Pointer Events, capture handling, and touch-friendly vertical scrolling
- No external animation package required

## 💛 Creator & support

**Made with 💛 by Karim Saif**

- **Live preview:** https://multiplayerorbitcursor.framer.website/
- **X / Twitter:** https://x.com/karimsaif0
- **Email:** [karimsaif010@gmail.com](mailto:karimsaif010@gmail.com)

Have an idea, issue, or suggestion? Reach out by email or on X.

---

<div align="center">

**Bring your interfaces to life, one interaction at a time.** 🌀

[Live Preview](https://multiplayerorbitcursor.framer.website/) · [Source Code](./KarimSaifMultiplayerOrbit.tsx) · [Contact](mailto:karimsaif010@gmail.com)

</div>
