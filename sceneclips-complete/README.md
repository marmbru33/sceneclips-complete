# SceneClips - Complete Setup Guide for Beginners

## What You Have Here
This is your complete SceneClips project - ready to deploy! All 8 files are here and configured correctly.

---

## STEP 1: Install Required Software

### 1. Install Node.js (Required)
- Go to: https://nodejs.org/
- Download the "LTS" version (recommended for most users)
- Install it (just click Next, Next, Next)
- **Restart your computer after installing**

### 2. Install Git (Required for GitHub)
- Go to: https://git-scm.com/downloads
- Download for your operating system
- Install it (default settings are fine)

### 3. Install GitHub Desktop (Makes everything easier)
- Go to: https://desktop.github.com/
- Download and install
- Sign up for a GitHub account when it asks (it's free)

### 4. Install VS Code (Optional but helpful)
- Go to: https://code.visualstudio.com/
- Download and install
- You can edit files with any text editor, but VS Code is best

---

## STEP 2: Verify Everything Works

Open Terminal (Mac) or Command Prompt (Windows) and type these commands one at a time:

```bash
node --version
```
Should show something like: v20.x.x or v18.x.x

```bash
npm --version
```
Should show something like: 10.x.x or 9.x.x

```bash
git --version
```
Should show something like: git version 2.x.x

If ALL THREE work, you're ready! If not, restart your computer and try again.

---

## STEP 3: Upload to GitHub (Using GitHub Desktop - EASIEST WAY)

1. **Open GitHub Desktop**
   
2. **Add this folder as a repository:**
   - File → Add Local Repository
   - Click "Choose..." and select this `sceneclips-complete` folder
   - It will say "This directory does not appear to be a Git repository"
   - Click **"Create a Repository"**

3. **Configure the repository:**
   - Repository name: `sceneclips`
   - Description: "Find movie/TV moments instantly"
   - Keep Git Ignore: None
   - License: None
   - Click **"Create Repository"**

4. **Publish to GitHub:**
   - Click the big blue **"Publish repository"** button
   - UNCHECK "Keep this code private" (we want it public so Vercel can access it)
   - Click **"Publish Repository"**

5. **Done!** Your code is now on GitHub. You should see it at: github.com/YOUR-USERNAME/sceneclips

---

## STEP 4: Deploy to Vercel (Make it Live!)

1. **Go to Vercel:**
   - Open your browser
   - Go to: https://vercel.com/signup
   
2. **Sign up with GitHub:**
   - Click **"Continue with GitHub"**
   - Authorize Vercel to access your GitHub

3. **Import your project:**
   - You'll see your dashboard
   - Click **"Add New..."** → **"Project"**
   - Find `sceneclips` in the list
   - Click **"Import"**

4. **Configure (Vercel does this automatically!):**
   - Framework Preset: **Vite** (should auto-detect)
   - Build Command: `npm run build` (already filled in)
   - Output Directory: `dist` (already filled in)
   - Click **"Deploy"**

5. **Wait 2-3 minutes:**
   - Watch the build logs (it's installing packages and building your site)
   - When you see **"Congratulations!"** → IT'S LIVE! 🎉

6. **Visit your site:**
   - Click the **"Visit"** button or the domain name shown
   - Your URL will be something like: `sceneclips-xyz123.vercel.app`
   - Share this URL with anyone!

---

## STEP 5: Test Your Live Site

1. Open the Vercel URL on your phone
2. Search for "gladiator" or "freedom"
3. Click "Copy Link" on a clip
4. Text it to yourself
5. Click the link in iMessage - it should jump to the exact moment!

---

## Common Issues & Solutions

### "Command not found: node" or "npm"
- **Solution:** Node.js didn't install correctly. Uninstall and reinstall from nodejs.org

### Build failed - "Cannot find module 'react'"
- **Solution:** Your package.json might have an error. Re-download this folder and try again.

### "This directory does not appear to be a Git repository"
- **Solution:** This is normal! Just click "Create a Repository" in GitHub Desktop

### Site loads but shows blank page
- **Solution:** Open browser console (F12), check for errors. Usually means App.jsx has an issue.

### Vercel deployment stuck or failed
- **Solution:** Check the build logs. Usually it's a typo in one of the config files.

---

## Making Updates Later

Once it's deployed, updating is SUPER easy:

1. Edit files on your computer
2. In GitHub Desktop:
   - You'll see your changes listed
   - Write a summary like "Added 10 new clips"
   - Click **"Commit to main"**
   - Click **"Push origin"**
3. Vercel automatically rebuilds and deploys in 2 minutes
4. Your site is updated!

---

## Optional: Custom Domain

Want `sceneclips.com` instead of the Vercel URL?

1. Buy domain from **Namecheap** or **GoDaddy** (~$12/year)
2. In Vercel: Project Settings → Domains
3. Add your domain
4. Follow Vercel's DNS instructions
5. Wait 10-30 minutes for DNS to update
6. Done!

---

## Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the exact error message
3. Ask me (Claude) for help - I can debug with you!

**You're ready to launch SceneClips! 🚀**

Just follow the steps above and you'll have a live website in about 30 minutes.
