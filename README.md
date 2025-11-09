# InstaCheck

InstaCheck is a responsive web app that compares follower and following lists for any public Instagram profile. It highlights who doesn’t follow back, who you don’t follow back, and your mutual connections — wrapped in a modern, mobile-friendly UI.

## Features

- 🔍 Search any public username (mock data for now, pluggable with Instagram Graph API)
- ⚖️ Instant comparison of followers vs following
- 📊 Summary cards for followers, following, and mutual counts
- 👥 Detailed lists with profile avatars and quick links to Instagram
- 🌓 Dark / light mode toggle with persistence
- 💫 Smooth, responsive layout with TailwindCSS styling
- 🚀 GitHub Pages–ready deployment configuration (`npm run deploy`)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view the app in development mode.

## Mock Data

Mock data lives in `src/mock/mockData.ts`. Replace `fetchInstagramData` in `src/api/fetchInstagramData.ts` with an API call when you’re ready to connect to the Instagram Graph API.

## Deployment

This project is configured for GitHub Pages. Update the `homepage` field in `package.json` if you know your repository URL, then run:

```bash
npm run deploy
```

The script builds the app and publishes the `dist` folder with `gh-pages`.

## Future Enhancements

- Instagram OAuth login for real follower data
- Local storage caching and offline mode
- CSV / PDF export of comparison results
- Animated transitions between result sections

