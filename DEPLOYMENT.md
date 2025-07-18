# Deploying to GitHub Pages

## Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it something like `fredrick-writes-blog`
3. Make it **public** (required for free GitHub Pages)

## Step 2: Upload Your Files
```bash
# In your blog directory, run these commands:
git init
git add .
git commit -m "Initial blog setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

Your blog will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Alternative Free Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google's hosting service
- **Surge.sh**: Simple static site hosting
