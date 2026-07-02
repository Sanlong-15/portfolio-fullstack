# Deployment Guide — Step by Step

Follow the parts in order. Part A today (Day 1). Parts B–E on Day 2.

---

## Part A — Accounts (do today, ~30 minutes)

### A1. MongoDB Atlas cluster (you have an account)
1. Go to https://cloud.mongodb.com and log in.
2. Create a project called `portfolio`.
3. Build a Database → **M0 Free** → provider **AWS**, region **Singapore (ap-southeast-1)** (closest to Cambodia).
4. Create a database user: username `portfolio-admin`, click "Autogenerate password" and **save the password somewhere safe**.
5. Network Access → Add IP Address → **Allow access from anywhere (0.0.0.0/0)**.
   (Needed because the EC2 server IP can change. The password still protects you.)
6. Database → Connect → Drivers → copy the connection string. It looks like:
   `mongodb+srv://portfolio-admin:<password>@cluster0.xxxxx.mongodb.net/`
7. Replace `<password>` with your real password and add the database name `portfolio` after `.net/`.
   This full string is your `MONGO_URI`.

### A2. AWS account (start today — activation can take hours)
1. Go to https://aws.amazon.com → Create an AWS Account.
2. You need an email, phone number, and a credit/debit card (ABA cards work).
3. Choose the **Free** support plan.
4. Wait for the activation email before Day 2.

---

## Part B — Run locally first (Day 2, before any deployment)

1. `cp server/.env.example server/.env` and fill in:
   - `MONGO_URI` = your Atlas string
   - `ADMIN_KEY` = a long random secret (example: run `node -e "console.log(crypto.randomUUID())"`)
   - `CLIENT_ORIGIN` = `http://localhost:5173`
2. `cd server && npm install && npm run seed && npm run dev`
3. In a second terminal: `cp client/.env.example client/.env`, then `cd client && npm install && npm run dev`
4. Open http://localhost:5173 — the Projects page must show 3 projects from Atlas.
5. Send a test message from the Contact page, then check Atlas → Collections → messages.

Do NOT continue to deployment until this works.

---

## Part C — GitHub (Day 2)

```bash
cd portfolio-project
git init
git add .gitignore README.md
git commit -m "Add project documentation and gitignore"
git add server/
git commit -m "Add Express REST API with MongoDB models and validation"
git add client/package.json client/package-lock.json client/vite.config.js client/index.html client/.env.example
git commit -m "Set up React client with Vite"
git add client/src/services client/src/hooks
git commit -m "Add API service layer and custom hooks"
git add client/src/components
git commit -m "Create reusable UI components"
git add client/src/pages client/src/data client/src/App.jsx client/src/main.jsx
git commit -m "Add pages with React Router navigation"
git add client/src/styles client/public
git commit -m "Add responsive design system and assets"
git add server/api-test.js docs/
git commit -m "Add API tests and deployment documentation"
```

Then create an empty repo on GitHub named `portfolio-fullstack` (no README) and:

```bash
git remote add origin https://github.com/Sanlong-15/portfolio-fullstack.git
git branch -M main
git push -u origin main
```

Keep committing small changes over the next days — the lecturer checks history.
**Check on GitHub that no `.env` file is visible.**

---

## Part D — Backend on EC2 (Day 2)

### D1. Launch the instance
1. AWS Console → EC2 → Launch instance.
2. Name: `portfolio-api`. AMI: **Ubuntu Server 24.04 LTS**. Type: **t2.micro or t3.micro (free tier)**.
3. Create a key pair (`portfolio-key.pem`) and download it.
4. Security group — allow:
   - SSH (port 22) from **My IP**
   - Custom TCP (port 5000) from **0.0.0.0/0**
5. Launch, then copy the **Public IPv4 address** (call it `EC2_IP`).

### D2. Install and run the API
```bash
ssh -i portfolio-key.pem ubuntu@EC2_IP

# on the server:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
git clone https://github.com/Sanlong-15/portfolio-fullstack.git
cd portfolio-fullstack/server
npm install
nano .env        # paste MONGO_URI, ADMIN_KEY, PORT=5000, CLIENT_ORIGIN (Amplify URL later)
npm run seed     # only if you did not already seed from your laptop
sudo npm install -g pm2
pm2 start server.js --name portfolio-api
pm2 save && pm2 startup   # run the command pm2 prints, so the API survives reboots
```

Test in your browser: `http://EC2_IP:5000/api/health` → `{"success":true,...}`

### D3. HTTPS problem — read this
Amplify serves your site over **https**. A https page cannot call a plain
http API (browsers block "mixed content"). Two options:

- **Option 1 (recommended, simple):** put the API behind CloudFront.
  CloudFront → Create distribution → Origin domain: `EC2_IP` is not allowed,
  so first give the instance a domain: use the EC2 public DNS name
  (`ec2-xx-xx-xx-xx.ap-southeast-1.compute.amazonaws.com`), HTTP only, port 5000.
  CloudFront gives you `https://dxxxx.cloudfront.net` — use that as `VITE_API_URL`.
  Set "Cache policy: CachingDisabled" and "Origin request policy: AllViewer",
  and allow **all HTTP methods** (GET, POST, PUT, DELETE) in distribution behavior settings.
- **Option 2:** install nginx + a free Let's Encrypt certificate on EC2
  (needs your own domain name).

### D4. Wire the CORS
Edit `server/.env` on EC2: set `CLIENT_ORIGIN=https://your-amplify-url.amplifyapp.com`
then `pm2 restart portfolio-api`.

---

## Part E — Frontend on AWS Amplify (Day 2)

1. AWS Console → Amplify → Create new app → GitHub → select `portfolio-fullstack`.
2. Monorepo settings: app root = `client`.
3. Build settings (Amplify usually detects Vite):
   - build command: `npm run build`
   - output directory: `dist`
4. Environment variables → add `VITE_API_URL` = your CloudFront https URL (no trailing slash).
5. Add a rewrite rule so React Router routes work on refresh:
   Rewrites and redirects → add:
   - Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|jpeg|js|png|svg|webp|pdf|txt|woff2?)$)([^.]+$)/>`
   - Target: `/index.html`
   - Type: `200 (Rewrite)`
6. Deploy. Amplify gives you `https://main.xxxx.amplifyapp.com`.
7. Go back to Part D4 and set this URL as CLIENT_ORIGIN on the server.

---

## Final verification checklist

- [ ] Public URL opens on desktop and phone
- [ ] Projects page shows data from MongoDB
- [ ] Contact form submits and the message appears in Atlas
- [ ] Admin page: add, edit, delete a project with your admin key
- [ ] Wrong admin key is rejected
- [ ] No errors in the browser console (F12)
- [ ] `.env` is not on GitHub
