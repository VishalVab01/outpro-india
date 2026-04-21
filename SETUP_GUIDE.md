# 🚀 Complete Setup Guide for Beginners
# Outpro.India — Step by Step from Zero to Live

---

## WHAT YOU NEED BEFORE STARTING
- A computer with internet
- A free GitHub account → https://github.com
- A free MongoDB Atlas account → https://mongodb.com/atlas
- A free Vercel account → https://vercel.com
- (Optional) A Gmail account for email notifications

This whole process takes about 30–45 minutes. Follow each step carefully.

---

## STEP 1 — Install Node.js on your computer

1. Go to https://nodejs.org
2. Download the **LTS** version (the left button)
3. Install it (just click Next → Next → Finish)
4. To verify, open **Terminal** (Mac/Linux) or **Command Prompt** (Windows)
   and type: `node --version`
   You should see something like: `v20.11.0`

---

## STEP 2 — Download and run the project locally

1. **Unzip** the `outpro-india.zip` file you downloaded
2. Open Terminal / Command Prompt
3. Navigate to the project folder:
   ```
   cd path/to/outpro-india-final
   ```
   (On Windows: `cd C:\Users\YourName\Downloads\outpro-india-final`)

4. Install dependencies:
   ```
   npm install
   ```
   Wait for it to finish (1–2 minutes).

5. Try running it (it will fail until you set up MongoDB — that's okay):
   ```
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

---

## STEP 3 — Set up MongoDB Atlas (your database)

MongoDB Atlas is a FREE cloud database. Here's how:

1. Go to https://mongodb.com/atlas and click **"Try Free"**
2. Sign up with your email
3. When asked "What type of deployment?", choose **"M0 Free"** (the free tier)
4. Choose a cloud provider: **AWS** and region closest to you (e.g., Mumbai)
5. Name your cluster anything, e.g., `Cluster0`, and click **"Create Deployment"**

### Create a database user:
6. In the popup, set a **username** and **password** — WRITE THESE DOWN!
   Example: username = `outpro_user`, password = `MyPassword123`
7. Click **"Create Database User"**
8. Click **"Choose a connection method"**

### Allow connections from anywhere:
9. Click **"Network Access"** in the left sidebar
10. Click **"Add IP Address"**
11. Click **"Allow Access from Anywhere"** → **"Confirm"**
    (This is needed for Vercel to connect)

### Get your connection string:
12. Click **"Database"** in the left sidebar
13. Click **"Connect"** on your cluster
14. Choose **"Drivers"**
15. Select Driver: **Node.js**
16. Copy the connection string — it looks like:
    ```
    mongodb+srv://outpro_user:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
    ```
17. Replace `<password>` with your actual password
18. Add `/outpro` before the `?` — like this:
    ```
    mongodb+srv://outpro_user:MyPassword123@cluster0.abc123.mongodb.net/outpro?retryWrites=true&w=majority
    ```
    ✅ This is your `MONGODB_URI`

---

## STEP 4 — Configure your .env.local file

1. Open the project folder in VS Code (or any text editor)
2. Open the file called `.env.local`
3. Replace `YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx` with your actual MongoDB URI:

```
MONGODB_URI=mongodb+srv://outpro_user:MyPassword123@cluster0.abc123.mongodb.net/outpro?retryWrites=true&w=majority
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Save the file
5. In your terminal, stop the server (press Ctrl+C) and restart:
   ```
   npm run dev
   ```
6. Open http://localhost:3000 — your site is now connected to the database! ✅

---

## STEP 5 — Seed your database with sample data

This fills your database with sample portfolio projects and testimonials.

1. Open your browser and go to:
   ```
   http://localhost:3000/api/seed
   ```
2. You should see:
   ```json
   {"success":true,"message":"Database seeded successfully!","seeded":{"portfolio":6,"testimonials":3}}
   ```
3. ✅ Done! Your site now shows real data from the database.

---

## STEP 6 — (Optional) Set up Email Notifications

When someone fills the contact form, you can get an email notification.

### Create a Gmail App Password:
1. Go to your Google Account → https://myaccount.google.com
2. Click **"Security"**
3. Enable **"2-Step Verification"** if not already on
4. Search for **"App passwords"** in the search bar
5. Select App: **"Mail"**, Device: **"Other"** → type "Outpro Website"
6. Click **"Generate"** — you'll get a 16-character password like: `abcd efgh ijkl mnop`
7. Copy it (remove spaces): `abcdefghijklmnop`

### Add to .env.local:
```
EMAIL_USER=your.gmail@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_TO=where_you_want_notifications@gmail.com
```

Restart the server (`Ctrl+C` then `npm run dev`).
Now when someone submits the contact form, you'll get an email! ✅

---

## STEP 7 — Deploy to Vercel (make it live on the internet)

### First, push to GitHub:
1. Go to https://github.com and create a new repository
   - Name: `outpro-india`
   - Make it **Private** (recommended)
   - Don't add README (we have one)
2. Install Git if you don't have it: https://git-scm.com
3. In your terminal, inside the project folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/outpro-india.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Deploy on Vercel:
4. Go to https://vercel.com and click **"Sign Up"** → **"Continue with GitHub"**
5. Click **"Add New Project"**
6. Find your `outpro-india` repository and click **"Import"**
7. Vercel auto-detects Next.js — click **"Deploy"**
8. ❗ WAIT — before it finishes, add environment variables:

### Add environment variables on Vercel:
9. Go to your project → **"Settings"** → **"Environment Variables"**
10. Add these one by one:

| Name | Value |
|------|-------|
| `MONGODB_URI` | your full MongoDB URI |
| `EMAIL_USER` | your Gmail (if set up) |
| `EMAIL_PASS` | your App Password (if set up) |
| `EMAIL_TO` | notification email (if set up) |
| `NEXT_PUBLIC_SITE_URL` | https://your-project.vercel.app |

11. After adding all variables, go to **"Deployments"** and click **"Redeploy"**
12. Wait ~1 minute → your site is LIVE! 🎉

### Seed the live database:
13. Go to `https://your-project.vercel.app/api/seed`
14. You'll see the success message → database is seeded!

---

## STEP 8 — Access your Admin Dashboard

Go to: `https://your-project.vercel.app/admin`

From the admin dashboard you can:
- ✅ View all contact form submissions
- ✅ Mark messages as "read" or "replied"  
- ✅ Delete messages
- ✅ Add / delete portfolio projects
- ✅ Add / delete testimonials

⚠️ NOTE: The admin page has no password right now (this is a college project).
If you want to add a password later, ask your instructor about Next.js middleware authentication.

---

## QUICK REFERENCE — All your URLs

| URL | What it does |
|-----|-------------|
| `localhost:3000` | Your site (locally) |
| `localhost:3000/admin` | Admin dashboard |
| `localhost:3000/api/seed` | Seeds sample data |
| `localhost:3000/api/contact` | GET: all messages, POST: new message |
| `localhost:3000/api/portfolio` | GET: all projects, POST: new project |
| `localhost:3000/api/testimonials` | GET: all testimonials |

---

## TROUBLESHOOTING

### "Cannot connect to database"
→ Check your `MONGODB_URI` in `.env.local`. Make sure your IP is whitelisted in MongoDB Atlas (Allow from Anywhere).

### "npm install" fails
→ Make sure Node.js is installed. Run `node --version` to check.

### Vercel build fails
→ Make sure `MONGODB_URI` is set in Vercel Environment Variables.

### Emails not sending
→ Make sure you're using an App Password (not your Gmail login password). 2FA must be enabled on your Google account.

### Site shows blank page
→ Run `npm run build` locally. If it shows errors, copy the error and ask for help.

---

## PROJECT FILE STRUCTURE (for your reference)

```
outpro-india/
├── app/
│   ├── page.tsx              ← Home page
│   ├── about/page.tsx        ← About page
│   ├── services/page.tsx     ← Services page
│   ├── portfolio/page.tsx    ← Portfolio page
│   ├── contact/page.tsx      ← Contact form
│   ├── admin/page.tsx        ← Admin dashboard
│   ├── layout.tsx            ← Common layout (Navbar + Footer)
│   ├── globals.css           ← Global styles
│   └── api/
│       ├── contact/route.ts          ← POST/GET messages
│       ├── contact/[id]/route.ts     ← PATCH/DELETE message
│       ├── portfolio/route.ts        ← POST/GET projects
│       ├── portfolio/[id]/route.ts   ← DELETE project
│       ├── testimonials/route.ts     ← POST/GET testimonials
│       ├── testimonials/[id]/route.ts← DELETE testimonial
│       └── seed/route.ts             ← Seed sample data
├── components/
│   ├── Navbar.tsx            ← Top navigation bar
│   └── Footer.tsx            ← Footer
├── lib/
│   ├── mongodb.ts            ← Database connection
│   └── mailer.ts             ← Email sending
├── models/
│   ├── Contact.ts            ← Contact form DB schema
│   ├── Portfolio.ts          ← Portfolio DB schema
│   └── Testimonial.ts        ← Testimonial DB schema
├── .env.local                ← Your secret keys (NEVER share this)
├── .env.example              ← Template for env variables
├── vercel.json               ← Vercel deployment config
└── SETUP_GUIDE.md            ← This guide
```

---

✅ You're done! Your Outpro.India website is fully functional with:
- Beautiful frontend (Next.js + Tailwind CSS)
- MongoDB database storing contacts, portfolio, testimonials
- Contact form with email notifications
- Admin dashboard to manage everything
- Deployed live on Vercel

Good luck with your college project! 🎓
