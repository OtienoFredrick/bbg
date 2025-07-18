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

## 🚨 **TROUBLESHOOTING 404 ERRORS**

### **Common Causes & Solutions:**

#### **1. Repository Not Public**
- ❌ **Problem**: Private repos need GitHub Pro for Pages
- ✅ **Solution**: Go to Settings → Change visibility to **Public**

#### **2. Wrong Branch Selected**
- ❌ **Problem**: Pages trying to deploy from wrong branch
- ✅ **Solution**: In Pages settings, ensure **main** branch is selected

#### **3. Files Not in Root Directory**
- ❌ **Problem**: HTML files in subfolder instead of root
- ✅ **Solution**: Ensure `index.html` is in the repository root, not in a subfolder

#### **4. Case Sensitivity Issues**
- ❌ **Problem**: File named `Index.html` instead of `index.html`
- ✅ **Solution**: Rename to exactly `index.html` (lowercase)

#### **5. Pages Not Enabled Yet**
- ❌ **Problem**: GitHub Pages deployment still in progress
- ✅ **Solution**: Wait 5-10 minutes, then check again

#### **6. DNS Propagation (Custom Domains)**
- ❌ **Problem**: Custom domain not propagated yet
- ✅ **Solution**: Use the default `.github.io` URL first

### **Step-by-Step Fix:**

1. **Check Repository Status:**
   ```
   ✅ Repository is PUBLIC
   ✅ Files are uploaded to main branch
   ✅ index.html exists in root directory
   ```

2. **Verify Pages Settings:**
   - Go to your repo → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main" 
   - Folder: "/ (root)"

3. **Check Build Status:**
   - Go to your repo → Actions tab
   - Look for "pages build and deployment" workflow
   - Should show green checkmark ✅

4. **Test the URL:**
   - Wait 5-10 minutes after enabling
   - Try: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
   - Try incognito/private browsing mode

### **Quick Debug Commands:**

```bash
# Check if files are properly committed:
git status
git log --oneline

# Check remote repository:
git remote -v

# Push any missing changes:
git add .
git commit -m "Fix deployment"
git push origin main
```

### **Still Getting 404?**

1. **Double-check the exact URL format:**
   ```
   https://[YOUR_GITHUB_USERNAME].github.io/[YOUR_REPO_NAME]
   ```

2. **Verify your file structure looks like this:**
   ```
   your-repo/
   ├── index.html          ← Must be in root!
   ├── about.html
   ├── blog.html
   ├── style.css
   └── posts/
   ```

3. **Check GitHub Pages status:**
   - Settings → Pages → should show: "Your site is live at..."

4. **Try alternative URL (if repo is named username.github.io):**
   ```
   https://YOUR_USERNAME.github.io
   ```

## Alternative Free Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment  
- **Firebase Hosting**: Google's hosting service
- **Surge.sh**: Simple static site hosting
