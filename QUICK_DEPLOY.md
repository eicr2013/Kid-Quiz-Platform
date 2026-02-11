# ⚡ Quick Deployment Commands

## Step 1: Push to GitHub (First Time)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Kids Math Quiz"

# Add your GitHub repository (get this URL from github.com after creating repo)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New" → "Project" (or "Import Git Repository")
4. Select your repository
5. Click "Install" (connects GitHub to Vercel)
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Click "Deploy"

**Done! Your app will be live at `https://your-app.vercel.app`**

---

## Future Updates (After Changes)

```bash
# Save changes
git add .
git commit -m "Description of what you changed"
git push
```

Vercel will auto-deploy in 2-3 minutes!

---

## Troubleshooting

**If git push fails:**
```bash
git pull origin main --rebase
git push
```

**If build fails on Vercel:**
- Check build logs
- Verify environment variables
- Test `npm run build` locally first

---

## Environment Variables (Copy from .env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://aoeznitplgeyeymocueg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZXpuaXRwbGdleWV5bW9jdWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjQzNTUsImV4cCI6MjA4NjQwMDM1NX0.sExevIumlxdwuyrnUGpAMmi5TsOkbkway2xSoRtwtR0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZXpuaXRwbGdleWV5bW9jdWVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyNDM1NSwiZXhwIjoyMDg2NDAwMzU1fQ.6-X7KWdnbJi4xi2m4XpOrzOyvIcyQYFs_Mgw6T6oeWw
```

---

## 🎉 That's it!

Full guide: See `DEPLOYMENT_GUIDE.md`
