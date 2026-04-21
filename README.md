# WielerWaas

Website for the WielerWaas cycling group, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## 🚀 Project Structure

```text
/
├── public/
│   ├── clubs/
│   ├── sponsors/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── models/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── templates/
├── astro.config.mjs
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ☁️ Daily Cloudflare Rebuild

This project includes a scheduled GitHub Action in `.github/workflows/daily-rebuild.yml` that triggers a Cloudflare Pages deployment every day.

Setup steps:

1. In Cloudflare Pages, open your project and create a **Deploy Hook**.
2. In GitHub, open your repository settings and add a secret named `CLOUDFLARE_DEPLOY_HOOK` with the deploy hook URL as value.
3. The workflow runs daily at `03:00 UTC` and can also be run manually from the **Actions** tab.
