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
| File / Folder                               | What to update                                                     |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `/public/images/site`                       | Update files (logo and images) according to new site               |
| `/public/favicon.ico` and `/public/xxx.png` | Update icons                                                       |
| `/public/index.html`                        | Update content, banner bg and title                                |
| `/public/manifest.json`                     | Update name and shortname                                          |
| `/public/sitemap.xml`                       | Update all URLs and anchors with the new domain                    |
| `/src/config/menu.js`                       | Menu structure and internal section anchors                        |
| `/src/config/parameters.js`                 | Parameters                                                         |
| `/src/locales/`                             | Translations for other languages                                   |
| `/src/pages`                                | Update pages                                                       |
| `/src/App.js`                               | Update pages                                                       |
| `/package.json`                             | Project name and version                                           |
| `/README.md`                                | Update project name                                                |
| `/vercel.json`                              | Configure caching headers for JS/CSS/images (only if using Vercel) |

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