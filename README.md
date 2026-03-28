# 🌿 Isabelle DEBORDE Énergéticienne

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React: 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite: 7.3.1](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)

A modern single-page React website for a professional energy therapist.  
This project is designed for easy reuse — ideal for cloning and adapting to similar websites.

## 📑 Table of Contents

- [💻 Installation](#-installation)
- [📂 Project Structure](#️-project-structure)
- [🪄 Customization Guide](#-customization-guide-for-cloning-or-adapting)
- [🚢 Deployment](#-deployment)
- [🧱 Tech Stack](#-tech-stack)
- [🗺️ Roadmap & Future Evolutions](#-roadmap--future-evolutions)
- [📜 License](#-license)

## 💻 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/florentdeborde/energeticienne.git
   cd energeticienne
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run application:**
   ```bash
   npm run dev
   ```
The site will be available at http://localhost:5173

## 📂 Project Structure

| Folder / File      | Description                               |
| ------------------ | ----------------------------------------- |
| `/src/components/` | Reusable UI components                    |
| `/src/config/`     | Configuration files (including menu.js)   |
| `/src/locales/`    | Language translations                     |
| `/src/pages/`      | Page-level components (Home, Legal, etc.) |
| `/src/utils/`      | Helper and utility functions              |
| `/public/`         | Static assets (sitemap, favicon, images)  |

The `menu.js` file defines all navigation items — including internal section anchors (#target) and standalone pages.

## 🪄 Customization Guide (for cloning or adapting)
When duplicating this project for another practitioner or website, you’ll mainly need to update:

| File / Folder                               | What to update                                               |
| ------------------------------------------- | ------------------------------------------------------------ |
| `/public/favicon.ico`, `.svg`, `-96x96.png` | Update all favicon formats to match the new logo             |
| `/public/apple-touch-icon.png`              | Update the high-resolution icon (180x180) for iOS devices    |
| `/public/web-app-manifest-*.png`            | Update the PWA icons (192px and 512px) for mobile install    |
| `/public/site.webmanifest`                  | Update site name, short_name, and paths to manifest icons    |
| `/public/index.html`                        | Update metadata (title, description), and icon link tags     |
| `/public/og-image.png`                      | Update image and social sharing in index.html                |
| `/public/images/`                           | Update site images (logo, ...)                               |
| `/public/sitemap.xml` & `robots.txt`        | Update domain URL and crawl rules for SEO                    |
| `/src/locales/`                             | Update translations for other languages (i18n)               |
| `/src/pages/`                               | Customize page content, layouts, and components              |
| `/src/config.js`                            | Update global parameters and API endpoints                   |
| `/package.json`                             | Update project identity (name, version, author)              |
| `/README.md`                                | Project-specific documentation and badges                    |

## 🚢 Deployment
This project is optimized for static deployment.  
You can preview or host it using Vercel, Netlify, or any static hosting provider.  
Some environment variables may be implemented and are checked through the `parameters.js` configuration file.

## 🧱 Tech Stack
- **React 19** (`react`, `react-dom`) — Core framework
- **React Router 7** (`react-router-dom`) — Routing
- **Vite 7** — Next-generation frontend build tool & dev server
- **Material UI v6** — UI components & styling
- **i18next** — Internationalization
- **Lucide React** — Icon library

## 🗺️ Roadmap & Future Evolutions
To make this project even more robust, the following improvements are planned:
- **⚡ Performance & SEO**: Improve Lighthouse scores by further optimizing image loading and refining meta tags.
- **🧪 Automated Testing**: Implement E2E and integration tests using Playwright or Cypress to ensure the menu logic and scroll behavior are always stable.
- **📘 TypeScript Migration**: Full conversion of the project's logic (especially the menu calculation and configuration layers) to TypeScript for better type safety and developer experience.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.