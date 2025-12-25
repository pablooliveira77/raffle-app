# Deployment Guide

## Vercel Deployment (Recommended)

1. **Push to Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Environment Variables** (if needed in future):
   - No environment variables required for the current version
   - All data is stored in IndexedDB (client-side)

## Build Locally

```bash
npm run build
npm start
```

The app will be available at `http://localhost:3000`.

## Static Export (Optional)

If you want to export as static HTML:

1. Update `next.config.ts`:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
   };
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Deploy the `out/` directory to any static hosting (Netlify, GitHub Pages, etc.)

## Performance Tips

- The app uses IndexedDB for storage (no network requests)
- All pages are pre-rendered at build time
- Dark mode uses `class` strategy (no flash)
- Images and assets are optimized by Next.js

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

IndexedDB is supported in all modern browsers.
