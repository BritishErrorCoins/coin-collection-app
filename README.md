 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index e904aafdff06f6ed9bc493df425045101aee7c91..a0ee54b70d5ca74e59166383fd9d1f0ef6eb6590 100644
--- a/README.md
+++ b/README.md
@@ -44,28 +44,26 @@ npm run build
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
-=======
-# coin-collection-app
 
 
EOF
)