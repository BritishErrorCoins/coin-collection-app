
# Coin Collection App

A personal coin collection tracker built with React and Tailwind CSS. Track owned coins, mark sold coins, calculate profit/loss, and see which coins you're missing from a full dataset.

## 📦 Features

- ✅ Collection tracking with editable fields
- ✅ Sold coins with profit/loss display
- ✅ Missing coin checklist
- ✅ Manual dataset update prompt
- ✅ All prices formatted as £xx.xx
- ✅ Fully mobile-responsive

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/coin-collection-app.git
cd coin-collection-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## 🛠 Tech Stack

- React 18
- Vite
- Tailwind CSS
- lucide-react icons
- LocalStorage for persistence

## 📂 Project Structure

- `src/pages/` — Core views: Collection, Sold, Missing
- `src/utils/` — Utility functions like `formatPrice`
- `UpdatePrompt.jsx` — Dataset update alert system

## ✅ Deployment

You can deploy to Vercel, Netlify, or your preferred provider. A `vercel.json` file is recommended for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

© 2025 Coin Collection App. All rights reserved.
=======
# coin-collection-app

