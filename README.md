# FINKI Hub Homepage

The unofficial student platform for the Faculty of Computer Science and Engineering (FINKI) in Skopje. Built with **Solid.js** and **Vite** for speed and simplicity.

## Features

- 🌍 **Multi-language support** - English and Macedonian translations
- 🎨 **Dark/Light theme** - Toggle between light and dark modes
- ⚡ **Lightning fast** - Built with Solid.js and Vite
- 📱 **Fully responsive** - Mobile-first design with Tailwind CSS
- 🎯 **Static SPA** - Client-side routing, deployable anywhere

## Tech Stack

- **Framework**: [Solid.js](https://solidjs.com) - Lightweight reactive UI library
- **Build Tool**: [Vite](https://vitejs.dev) - Next generation frontend tooling
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Icons**: [Font Awesome](https://fontawesome.com) - Icon library
- **Language**: [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build for Production

```bash
npm run build
```

The build artifacts will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Hero section with CTAs
│   ├── About.tsx       # Features section
│   ├── Github.tsx      # GitHub contribution section
│   ├── FAQ.tsx         # FAQ section
│   ├── Footer.tsx      # Footer
│   └── FontAwesomeIcon.tsx  # Icon wrapper
├── services/           # Business logic
│   ├── languageService.ts   # i18n management
│   └── themeService.ts      # Theme management
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── index.css          # Global styles

public/
└── i18n/              # Translation files
    ├── en.json        # English translations
    └── mk.json        # Macedonian translations
```

## Deployment

### Cloudflare Pages

This project is set up for automatic deployment to Cloudflare Pages via GitHub Actions.

**Requirements:**

1. GitHub repository secrets:

   - `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages edit permission
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

2. The workflow will automatically:
   - Build the project on push to `main`
   - Deploy to Cloudflare Pages

See `.github/workflows/deploy.yml` for workflow details.

### Other Platforms

For other hosting platforms, simply deploy the contents of the `dist` folder:

- **Netlify**: Drop `dist` folder
- **Vercel**: Connect GitHub repo and set build command to `npm run build`
- **GitHub Pages**: Deploy `dist` folder to `gh-pages` branch

## Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |

## Internationalization (i18n)

Translations are stored in JSON files in `public/i18n/`:

- `en.json` - English
- `mk.json` - Македонски

To add a new translation, use the `t()` function from `languageService`:

```typescript
const { t } = createLanguageService();

<h1>{t('HEADER.TITLE')}</h1>;
```

## Theme Management

The app supports light and dark modes. Theme preference is stored in localStorage.

```typescript
const { theme, toggleTheme } = createThemeService();

<button onClick={toggleTheme}>Toggle Theme</button>;
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is unlicensed. See LICENSE file for details.

## Resources

- [FINKI Hub Discord](https://discord.com/invite/finki-studenti-810997107376914444)
- [Study Materials](https://snimki.finki-hub.com/)
- [GitHub Organization](https://github.com/finki-hub)
