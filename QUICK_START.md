# ⚡ Quick Start - Get Live in 5 Minutes

## The Fastest Way: Deploy on Vercel

### Step 1: Create GitHub Repository
```bash
# Option A: Using GitHub CLI
gh repo create unpacking-my-library --public --source=. --remote=origin --push

# Option B: Using GitHub Web
# 1. Go to https://github.com/new
# 2. Create repo named "unpacking-my-library"
# 3. Follow the instructions to push local code
```

### Step 2: Connect to Vercel
1. Go to **https://vercel.com**
2. Click "**New Project**"
3. Choose "**Import Git Repository**"
4. Paste your GitHub repo URL
5. Click "**Import**"
6. Leave all settings as default
7. Click "**Deploy**"

**✅ Done! Your site is live in ~1 minute**

Your URL will be: `https://unpacking-my-library-yourname.vercel.app`

---

## Alternative: GitHub Pages (Also Easy)

### Step 1: Update package.json
Change the base URL in `vite.config.js` if needed:
```javascript
export default defineConfig({
  base: '/unpacking-my-library/', // If repo name is unpacking-my-library
})
```

### Step 2: Deploy
```bash
npm install
npm run build
npm run deploy
```

**✅ Your site is at:** `https://your-github-username.github.io/unpacking-my-library/`

---

## Alternative: Deploy on Netlify

### Step 1: Connect Netlify
1. Go to **https://netlify.com**
2. Click "**New site from Git**"
3. Select GitHub and your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "**Deploy site**"

**✅ Your site is live with auto-updates on every push**

---

## Testing Locally First (Optional but Recommended)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
# Press Ctrl+C to stop
```

---

## What You Get

✅ **Fully searchable dashboard** - Find any artist, book, or author instantly
✅ **Book summaries** - Hover over titles to see descriptions
✅ **Top authors** - See the 10 most frequently cited authors  
✅ **Live statistics** - Real-time counters of artists and books
✅ **Mobile responsive** - Works on phones, tablets, and desktops
✅ **Free hosting** - All options above are completely free

---

## Troubleshooting

### Site shows 404
- Make sure build completed: `npm run build`
- Check that `dist` folder exists
- For GitHub Pages: verify settings in repo → Settings → Pages

### Book summaries aren't loading
- Check browser console for errors (F12)
- Google Books API has 1000 requests/day limit
- Try a different book title

### Can't install dependencies
```bash
# Clear cache and try again
rm -rf node_modules package-lock.json
npm install
```

### Need to update the book data?
Edit `library_dashboard.jsx` and replace the `rawBooksData` array with your data.

---

## Next Steps

After deploying:

1. **Share the link** - Give people your live URL
2. **Customize** - Change colors, add more books, enhance features
3. **Promote** - Use in museum displays, research presentations, exhibitions
4. **Archive** - This becomes a permanent digital exhibition!

---

## Questions?

Check the detailed guides:
- 📖 **[Full Deployment Guide](./GITHUB_DEPLOYMENT_GUIDE.md)**
- 📚 **[Complete README](./README.md)**
- 💻 **[View the Code](./library_dashboard.jsx)**

---

**That's it! Your "Unpacking My Library" dashboard is now online! 🚀**