# Deployment Guide for KaramcharHR

This project is set up as a standard Next.js application. You can host it live on the web for free using **Vercel** (the creators of Next.js) or **Netlify**.

---

## Step 1: Initialize Git & Push to GitHub

We have already initialized Git and created your initial commit locally. To upload it to GitHub:

1. Go to [GitHub](https://github.com) and sign in.
2. Click the **"New"** button to create a new repository.
3. Name your repository (e.g., `karamcharhr`) and keep it Public or Private. Do **NOT** initialize it with a README, `.gitignore`, or License (as we already have them).
4. Copy the repository URL (e.g., `https://github.com/your-username/karamcharhr.git`).
5. Open your terminal in the project folder and run:
   ```bash
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   git push -u origin main
   ```

---

## Step 2: Deploy to Vercel (Recommended)

Vercel is the easiest and most powerful hosting platform for Next.js, offering automatic SSL, global CDN, and free hosting.

1. Go to [Vercel](https://vercel.com) and sign up with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Import your `karamcharhr` repository from the list.
4. Keep the default settings (Vercel automatically detects Next.js configurations).
5. Click **"Deploy"**.
6. Within 1 minute, your site will be live on a free `.vercel.app` domain!

---

## Step 3: Link your Custom Domain (`karamcharhr.online`)

To map your custom domain:

1. Inside your Vercel Dashboard, go to your project.
2. Navigate to **Settings** > **Domains**.
3. Enter `karamcharhr.online` (and `www.karamcharhr.online`) and click **Add**.
4. Vercel will provide the DNS records (Nameservers or A/CNAME records) you need to update at your domain registrar (e.g., GoDaddy, Namecheap, Hostinger).
5. Once DNS propagates (usually within a few minutes), your website will be live at `https://karamcharhr.online` with a free SSL certificate!
