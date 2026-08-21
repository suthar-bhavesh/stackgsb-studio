# StackGSB Studio — Website

## Setup Instructions

### Requirements
- Node.js 18+ (download from https://nodejs.org)
- npm (comes with Node.js)

### Steps

1. **Rename config files** (one-time setup):
   - Rename `package.standalone.json` → `package.json`
   - Rename `vite.standalone.config.ts` → `vite.config.ts`
   - Rename `tsconfig.standalone.json` → `tsconfig.json`

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```
   Open http://localhost:5173 in your browser.

4. **Build for production:**
   ```
   npm run build
   ```
   Output goes to the `dist/` folder — upload this to any web host.

## Project Structure

```
src/
├── assets/               ← logo and images
├── components/
│   ├── ui/               ← shadcn/ui base components
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── work.tsx
│   ├── process.tsx
│   ├── tech-stack.tsx
│   ├── cta.tsx
│   └── footer.tsx
├── pages/
│   ├── home.tsx          ← main landing page
│   └── not-found.tsx
├── hooks/
├── lib/
├── App.tsx
├── main.tsx
└── index.css             ← global styles & theme
```

## Customization

- **Logo**: Replace `src/assets/stackgsb_logo_transparent.png`
- **Colors**: Edit CSS variables in `src/index.css` (`:root` block)
- **Content**: Edit text directly in each component file under `src/components/`
- **Fonts**: Change the Google Fonts `@import` at the top of `src/index.css`
