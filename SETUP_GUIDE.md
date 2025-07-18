# 🚀 Automated Blog Setup Guide

## What We've Built

Your new automated blog system with:
- ✅ **Login protection** - Only you can write
- ✅ **Plain text writing** - No HTML needed
- ✅ **Instant publishing** - Posts go live immediately
- ✅ **Auto-archiving** - Posts archive after 24 hours
- ✅ **Dynamic loading** - Homepage shows recent posts automatically

## 📋 Setup Steps

### 1. Create Supabase Database (Free)

1. **Go to [supabase.com](https://supabase.com)** and create free account
2. **Create new project**
3. **Go to SQL Editor** and run this query:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  plain_content TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP DEFAULT NOW(),
  archived_at TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we handle auth in functions)
CREATE POLICY "Allow all operations" ON posts FOR ALL USING (true);
```

4. **Get your credentials:**
   - Go to Settings → API
   - Copy `Project URL` and `anon public key`

### 2. Deploy to Netlify

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add automated blog system"
git push
```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Connect your GitHub repo
   - Deploy!

3. **Add Environment Variables:**
   - In Netlify: Site settings → Environment variables
   - Add these:
     ```
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ADMIN_PASSWORD=fredrick2025
     JWT_SECRET=your-secret-key-here
     ```

### 3. Set Up Auto-Archiving

1. **In Netlify:** Site settings → Functions → Scheduled functions
2. **Add new scheduled function:**
   - Function: `archive-posts`
   - Schedule: `0 0 * * *` (runs daily at midnight)

## 🎯 How to Use Your New Blog

### Writing Posts:
1. **Go to yoursite.com/write.html**
2. **Login** with password: `fredrick2025`
3. **Write naturally** - no HTML needed!
4. **Click "Publish Instantly"** - post goes live immediately

### Your Workflow:
```
Write → Publish → Automatic archiving after 24h
```

### Features:
- **Homepage** automatically shows your 3 most recent posts
- **Posts older than 24h** automatically move to archive
- **Mobile-friendly** writing interface
- **Secure** - only you can write with password

## 🔧 Customization

### Change Password:
- Update `ADMIN_PASSWORD` in Netlify environment variables

### Change Archive Time:
- Modify the hours in `functions/archive-posts.js` (currently 24 hours)

### Styling:
- Edit `style.css` to change appearance

## 🎉 You're Done!

Your automated blog system is ready! You can now:
- ✅ Write posts instantly without git/HTML
- ✅ Have posts auto-archive after 24 hours  
- ✅ Write securely with login protection
- ✅ Use plain language (no formatting needed)

**Next:** Go to `/write.html` and create your first automated post! 🚀
