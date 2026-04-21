# 🚀 HOW TO MAKE OUTPRO.INDIA WORK — Complete Beginner Guide

---

## WHAT YOU'VE BUILT

Your project has:
- **5 website pages**: Home, About, Services, Portfolio, Contact
- **1 Admin dashboard**: `/admin` — see all contact submissions, portfolio items
- **MongoDB database**: stores contact form data, portfolio items, testimonials
- **API routes**: the backend that connects your website to the database

---

## STEP 1 — Install Node.js (if you haven't)

1. Go to https://nodejs.org
2. Download the **LTS version** (green button)
3. Install it (just click Next → Next → Install)
4. Open your terminal / command prompt and type:
   ```
   node --version
   ```
   You should see something like `v20.x.x` ✅

---

## STEP 2 — Set Up MongoDB (Free Database)

This is where all your data will be stored. It's free.

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** and create an account
3. Once logged in, click **"Build a Database"**
4. Choose **FREE (M0 Sandbox)** → pick any region → click **Create**
5. On the **Security** screen:
   - Username: `outpro` (or anything you like)
   - Password: click **Autogenerate** → **Copy** the password (save it!)
   - Click **Create User**
6. On the **Network Access** screen:
   - Click **"Add IP Address"**
   - Click **"Allow Access From Anywhere"** → Confirm
7. Go back to your cluster → click **Connect** → **Connect your application**
8. Copy the connection string. It looks like:
   ```
   mongodb+srv://outpro:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
9. Replace `<password>` with your actual password from step 5
10. Replace the database name: add `outpro` before the `?` like this:
    ```
    mongodb+srv://outpro:yourpassword@cluster0.xxxxx.mongodb.net/outpro?retryWrites=true&w=majority
    ```
    ⬆️ **This full string is your MONGODB_URI. Save it.**

---

## STEP 3 — Run the Project Locally

1. Unzip the project file you downloaded
2. Open the folder in your terminal:
   ```bash
   cd outpro-india-final
   ```
3. Install all packages:
   ```bash
   npm install
   ```
4. Open the file called `.env.local` (it's in the project root folder)
5. Replace the placeholder with your real MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://outpro:yourpassword@cluster0.xxxxx.mongodb.net/outpro?retryWrites=true&w=majority
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
6. Start the project:
   ```bash
   npm run dev
   ```
7. Open your browser and go to: **http://localhost:3000**

🎉 Your website is running!

---

## STEP 4 — Seed the Database (Add Sample Data)

Your database is empty right now. Let's add sample portfolio items and testimonials.

1. While the project is running, open your browser and go to:
   ```
   http://localhost:3000/api/seed
   ```
2. You'll see this message:
   ```json
   { "success": true, "message": "✅ Database seeded successfully!", "seeded": { "portfolio": 6, "testimonials": 3 } }
   ```
3. Now go to http://localhost:3000/portfolio — you'll see real projects from your database!
4. Go to http://localhost:3000 — you'll see real testimonials!

⚠️ **Only run the seed once.** Running it again will clear and re-add the data.

---

## STEP 5 — Test the Contact Form

1. Go to http://localhost:3000/contact
2. Fill in the form and submit
3. Now go to http://localhost:3000/admin
4. You'll see your submission appear in the Admin Dashboard!

---

## STEP 6 — Deploy to Vercel (Make It Live on the Internet!)

### 6a. Push code to GitHub

1. Go to https://github.com and create a free account
2. Click the **+** icon → **New repository**
3. Name it `outpro-india` → click **Create repository**
4. Follow GitHub's instructions to push your code. In your terminal:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/outpro-india.git
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your GitHub username)

### 6b. Deploy on Vercel

1. Go to https://vercel.com and sign up with your GitHub account
2. Click **"Add New Project"**
3. Click **"Import"** next to your `outpro-india` repository
4. On the configuration screen:
   - Framework: **Next.js** (auto-detected ✅)
   - Root Directory: leave as-is
5. Click **"Environment Variables"** and add:
   ```
   Name:  MONGODB_URI
   Value: (paste your full MongoDB connection string)
   
   Name:  NEXT_PUBLIC_SITE_URL
   Value: https://outpro-india.vercel.app  (or whatever Vercel gives you)
   ```
6. Click **Deploy**
7. Wait ~2 minutes → Your site is LIVE! 🎉

### 6c. Seed the live database

After deploying, go to:
```
https://your-vercel-url.vercel.app/api/seed
```
This seeds your production database.

---

## YOUR PAGES

| URL | What it shows |
|-----|--------------|
| `/` | Home page with hero, services, testimonials from DB |
| `/about` | Team, mission, values |
| `/services` | All services with features |
| `/portfolio` | Real projects fetched from MongoDB |
| `/contact` | Form that saves to MongoDB |
| `/admin` | See all submissions + manage data |
| `/api/seed` | Populates the database with sample data |

---

## YOUR API ENDPOINTS

| Endpoint | Method | What it does |
|----------|--------|-------------|
| `/api/contact` | POST | Save contact form submission |
| `/api/contact` | GET | Get all contact submissions |
| `/api/contact/[id]` | PATCH | Mark as read/replied |
| `/api/contact/[id]` | DELETE | Delete a submission |
| `/api/portfolio` | GET | Get all portfolio items |
| `/api/portfolio` | POST | Add a new portfolio item |
| `/api/portfolio/[id]` | PUT | Update a portfolio item |
| `/api/portfolio/[id]` | DELETE | Delete a portfolio item |
| `/api/testimonials` | GET | Get all testimonials |
| `/api/testimonials` | POST | Add a testimonial |
| `/api/seed` | GET | Seed database with sample data |

---

## COMMON PROBLEMS & FIXES

### ❌ "Cannot connect to MongoDB"
- Check your `.env.local` file — is the MONGODB_URI correct?
- Did you add your IP to MongoDB Atlas Network Access?
- Did you replace `<password>` in the connection string?

### ❌ "npm: command not found"
- Install Node.js from nodejs.org (Step 1)

### ❌ "Module not found" errors
- Run `npm install` again in the project folder

### ❌ Portfolio/Testimonials page is empty
- Go to `/api/seed` to populate the database

### ❌ Contact form shows error
- Make sure MONGODB_URI is set in `.env.local`
- Restart the server with `npm run dev`

---

## PROJECT FILE STRUCTURE (for reference)

```
outpro-india/
├── app/
│   ├── page.tsx              ← Home page
│   ├── about/page.tsx        ← About page
│   ├── services/page.tsx     ← Services page
│   ├── portfolio/page.tsx    ← Portfolio (fetches from DB)
│   ├── contact/page.tsx      ← Contact form
│   ├── admin/page.tsx        ← Admin dashboard
│   └── api/
│       ├── contact/route.ts       ← Contact API
│       ├── contact/[id]/route.ts  ← Single contact API
│       ├── portfolio/route.ts     ← Portfolio API
│       ├── portfolio/[id]/route.ts
│       ├── testimonials/route.ts  ← Testimonials API
│       └── seed/route.ts          ← Database seeder
├── components/
│   ├── Navbar.tsx            ← Top navigation
│   └── Footer.tsx            ← Footer
├── lib/
│   └── mongodb.ts            ← Database connection
├── models/
│   ├── Contact.ts            ← Contact data structure
│   ├── Portfolio.ts          ← Portfolio data structure
│   └── Testimonial.ts        ← Testimonial data structure
├── .env.local                ← ⚠️ Your secret config (never share this!)
├── .env.example              ← Template for env variables
└── HOW_TO_RUN.md             ← This guide!
```
