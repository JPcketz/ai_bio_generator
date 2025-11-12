# AI Bio Generator - Deployment Guide

This guide will help you deploy your AI Bio Generator to **GitHub Pages** or **Netlify** for free within minutes.

## 🚀 Quick Deployment Options

### Option 1: GitHub Pages (Recommended for Beginners)

**Prerequisites:**
- GitHub account (free)
- Git installed on your laptop

**Steps:**

1. **Create a GitHub Repository**
   ```bash
   # Navigate to your project folder
   cd ai_bio_generator
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: AI Bio Generator"
   
   # Create a new repository on GitHub (via web interface)
   # Then connect and push:
   git remote add origin https://github.com/YOUR-USERNAME/ai-bio-generator.git
   git branch -M main
   git push -u origin main
   ```

2. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   
3. **Create GitHub Actions Workflow**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '22'
             
         - name: Install pnpm
           run: npm install -g pnpm
           
         - name: Install dependencies
           run: pnpm install
           working-directory: ./client
           
         - name: Build
           run: pnpm build
           working-directory: ./client
           env:
             VITE_APP_TITLE: "AI Bio Generator"
             
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./client/dist
   ```

4. **Push and Deploy**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push
   ```

5. **Access Your Site**
   - Your site will be live at: `https://YOUR-USERNAME.github.io/ai-bio-generator/`
   - Check the Actions tab to monitor deployment progress

---

### Option 2: Netlify (Easiest, One-Click Deploy)

**Prerequisites:**
- Netlify account (free, sign up at netlify.com)

**Steps:**

1. **Prepare Build Settings**
   
   Create `netlify.toml` in project root:
   ```toml
   [build]
     base = "client"
     command = "pnpm build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify CLI** (fastest method)
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   cd client
   pnpm build
   netlify deploy --prod --dir=dist
   ```

3. **OR Deploy via Netlify Web Interface**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Base directory**: `client`
     - **Build command**: `pnpm build`
     - **Publish directory**: `client/dist`
   - Click "Deploy site"

4. **Access Your Site**
   - Netlify will provide a URL like: `https://random-name-12345.netlify.app`
   - You can customize this in Site Settings → Domain Management

---

## 💰 Monetization Setup (Post-Deployment)

### 1. Google AdSense

**Steps:**
1. Apply for Google AdSense at [adsense.google.com](https://adsense.google.com)
2. Add your deployed site URL during application
3. Wait for approval (typically 1-2 weeks)
4. Once approved, generate ad code
5. Replace the placeholder in `client/src/pages/Home.tsx`:
   ```tsx
   {/* Replace this section with your AdSense code */}
   <div className="bg-muted/50 rounded px-4 py-2 border border-border">
     <p className="text-sm">Google AdSense Banner (728x90) - Pending Approval</p>
   </div>
   ```

**Expected Revenue:**
- 1,000 visitors/day = $5-15/day
- 10,000 visitors/day = $50-150/day

### 2. A-Ads Crypto Ad Network

**Steps:**
1. Sign up at [a-ads.com](https://a-ads.com)
2. Create a new ad unit (300x250 recommended)
3. Copy the ad code
4. Replace the placeholder in `client/src/pages/Home.tsx`:
   ```tsx
   {/* Replace with actual A-Ads code */}
   <div className="text-sm text-muted-foreground">
     <p className="font-semibold mb-2">A-Ads Crypto Network (300x250)</p>
   </div>
   ```

**Benefits:**
- No approval needed (instant activation)
- Crypto payments (Bitcoin)
- Works alongside AdSense

### 3. Gumroad Affiliate Link

**Current Setup:**
- The app already includes a Gumroad link for "Premium Bio Templates"
- **Action Required**: Create your own Gumroad product or replace with affiliate link

**Steps to Create Your Product:**
1. Sign up at [gumroad.com](https://gumroad.com)
2. Create a product: "Premium Bio Templates" ($9.99 suggested)
3. Include 100+ bio templates in a PDF or Notion doc
4. Update the link in `client/src/pages/Home.tsx`:
   ```tsx
   <a
     href="YOUR-GUMROAD-LINK-HERE"
     target="_blank"
     rel="noopener noreferrer"
   >
   ```

**Expected Revenue:**
- 1% conversion rate at 1,000 visitors/day = 10 sales/day = $99/day
- 0.5% conversion rate at 10,000 visitors/day = 50 sales/day = $499/day

---

## 📈 Traffic Generation (First 48 Hours)

### 1. Social Media Sharing
- Post on Twitter/X with hashtags: #biomaker #socialmedia #contentcreator
- Share on Reddit: r/Entrepreneur, r/SideProject, r/InternetIsBeautiful
- Post on LinkedIn with a case study angle
- Create a TikTok showing the tool in action

### 2. Product Hunt Launch
- Submit to [Product Hunt](https://producthunt.com)
- Best launch day: Tuesday-Thursday
- Prepare a catchy tagline: "Generate viral social media bios in seconds with AI"

### 3. Indie Hackers
- Post on [Indie Hackers](https://indiehackers.com)
- Share your revenue journey

### 4. SEO Optimization
- The app already includes meta tags
- Add more keywords to the title and description
- Create blog content around "how to write a bio"

---

## 🔧 Post-Deployment Customization

### Update Site Title and Branding
Edit `client/src/const.ts`:
```typescript
export const APP_TITLE = "AI Bio Generator";
export const APP_LOGO = "/logo.png"; // Add your logo to client/public/
```

### Add Custom Domain (Optional)
- **GitHub Pages**: Settings → Pages → Custom domain
- **Netlify**: Site Settings → Domain Management → Add custom domain

### Analytics Setup
The app already includes Umami analytics integration. To use it:
1. Sign up for free analytics (Umami, Plausible, or Google Analytics)
2. Add tracking code to `client/index.html`

---

## 📊 Success Metrics

**Week 1 Goals:**
- 1,000 unique visitors
- 100 bio generations
- 1-2 premium template sales

**Month 1 Goals:**
- 10,000 unique visitors
- 5,000 bio generations
- $100-500 in revenue

**Revenue Breakdown:**
- AdSense: $50-200/month
- A-Ads: $20-50/month
- Gumroad: $100-500/month
- **Total**: $170-750/month

---

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
cd client
rm -rf node_modules dist
pnpm install
pnpm build
```

### Deployment Not Working
- Check build logs in GitHub Actions or Netlify
- Ensure all environment variables are set
- Verify `package.json` scripts are correct

### Ads Not Showing
- AdSense requires approval (1-2 weeks)
- A-Ads works immediately but needs proper code integration
- Check browser ad blockers during testing

---

## 📝 License & Attribution

This project is open-source. Feel free to:
- Use it for commercial purposes
- Modify and customize
- Share with others

**Optional Attribution:**
If you found this helpful, consider linking back or sharing on social media!

---

## 🎉 You're Ready to Launch!

Deploy your app, set up monetization, and start driving traffic. Good luck! 🚀
