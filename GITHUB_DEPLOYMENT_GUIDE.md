# Unpacking My Library - GitHub Deployment Guide

## 🚀 Quick Deploy (5 minutes)

### Option 1: Deploy with GitHub Pages (FASTEST - Live Today)

#### Step 1: Create a GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `unpacking-my-library` (or any name)
3. Initialize with a README ✓
4. Click "Create repository"

#### Step 2: Set Up Your Local Project
```bash
# Clone the repo you just created
git clone https://github.com/YOUR_USERNAME/unpacking-my-library.git
cd unpacking-my-library

# Copy all the files from the outputs folder into this directory
# You should have:
# - library_dashboard.jsx
# - package.json
# - App.jsx
# - index.jsx
# - index.css
# - index.html
```

#### Step 3: Install Dependencies
```bash
npm install
```

#### Step 4: Test Locally
```bash
npm run dev
# Open http://localhost:5173 in your browser
```

#### Step 5: Build for Production
```bash
npm run build
```

#### Step 6: Deploy to GitHub Pages
```bash
# If not already done:
npm install --save-dev gh-pages

# Update your package.json scripts to:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist",

# Then deploy:
npm run deploy
```

#### Step 7: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub
2. Settings → Pages
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)
4. Click Save

✅ **Your site is now live at:** `https://YOUR_USERNAME.github.io/unpacking-my-library/`

---

### Option 2: Deploy with Vercel (EASIEST - One-Click)

1. Go to https://vercel.com
2. Click "New Project"
3. Connect your GitHub account
4. Select your `unpacking-my-library` repository
5. Keep defaults and click "Deploy"
6. Done! Your site is live at `https://unpacking-my-library-YOUR_USERNAME.vercel.app`

---

### Option 3: Deploy with Netlify (ALSO EASY)

1. Go to https://netlify.com
2. Click "New site from Git"
3. Connect GitHub, select repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"
7. Site is live at the URL Netlify provides!

---

## 📁 Project Structure

```
unpacking-my-library/
├── index.html              # Entry point
├── index.jsx              # React entry
├── App.jsx                # Main app wrapper
├── library_dashboard.jsx   # The dashboard component
├── index.css              # Global styles
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite config
└── README.md              # This file
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js 16+ (download from https://nodejs.org)
- Git (download from https://git-scm.com)

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

---

## 🔑 API Keys

The dashboard uses the **Google Books API** (free tier).

**Current API Key:** Included in `library_dashboard.jsx`

**Limits:** 1,000 requests/day (free tier - plenty for this use case)

### To use your own API key (optional):
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable "Books API"
4. Create an API key
5. Replace this line in `library_dashboard.jsx`:
```javascript
const GOOGLE_BOOKS_API_KEY = 'YOUR_API_KEY_HERE';
```

---

## ✨ Features

✅ **Search & Filter**
- Search by artist, book title, author, country, or year
- Filter by top 10 most frequent authors
- Filter by artist country of origin

✅ **Dashboard Stats**
- Total number of artists (120)
- Total number of books (~470)
- Dynamic counters

✅ **Top Authors**
- Interactive top 10 most frequently cited authors
- Click any author to filter books by that author

✅ **Book Summaries**
- Hover over any book title
- See automatic summary from Google Books API
- Learn more about each book

✅ **Responsive Design**
- Works on desktop, tablet, and mobile
- Dark theme (great for museums/galleries!)

---

## 📊 Data Source

Data combined from two Excel spreadsheets:
- `artists_table.xlsx` - 120 artists with birth year & country
- `artists_reading_list__1_.xlsx` - ~470 books with artist, title, author, year

**Note:** Data is embedded in the component. To update it:
1. Export updated data as CSV
2. Convert to JavaScript objects
3. Replace `rawBooksData` in `library_dashboard.jsx`

---

## 🎨 Customization

### Change Colors
In `library_dashboard.jsx`, these color classes control the theme:
- `bg-slate-*` - Dark backgrounds
- `text-amber-*` - Accent colors (book titles, highlights)
- Change "amber" to "blue", "green", "pink", etc. throughout

### Add More Books
Edit the `rawBooksData` array in `library_dashboard.jsx`:
```javascript
const rawBooksData = [
  {"artist": "NAME", "book": "TITLE", "author": "AUTHOR", "year": 2020, "country": "COUNTRY"},
  // ... more books
];
```

### Change Sidebar Stats
Modify the stats cards in the Grid section:
```javascript
<div className="text-4xl font-bold text-amber-400">
  {uniqueArtists.length} {/* Change this */}
</div>
```

---

## 🐛 Troubleshooting

### Site won't load after deployment
- Check that GitHub Pages is enabled in repo settings
- Make sure build completed successfully (`npm run build`)
- Clear browser cache (Ctrl+Shift+Delete)

### Book summaries not showing
- Check browser console for API errors
- Verify API key is correct
- Check if daily API limit exceeded

### Styling looks broken
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Rebuild: `npm run build`

---

## 📝 Next Steps

1. **Customize** - Edit colors, add your own data
2. **Share** - Give people the live URL
3. **Enhance** - Add more features (sorting, favorites, etc.)
4. **Archive** - This becomes a permanent online exhibition!

---

## 🔗 Resources

- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Google Books API:** https://developers.google.com/books
- **GitHub Pages:** https://pages.github.com

---

## 📬 Support

Questions? Issues?
- Check the GitHub Issues tab
- Review the code comments
- Test locally with `npm run dev` first

---

**Made for the "Unpacking My Library" project - 2017 Venice Biennale**
*Curated by Christine Macel • Stirling Pavilion, Giardini*