# TinyURL Portfolio Replica – Full Stack

A clean, beginner-friendly URL shortener website that looks and feels like TinyURL.

- **Frontend** = React + Vite + Tailwind CSS (port 3000)
- **Backend**  = Express + MongoDB + nanoid (port 5050)
- They talk to each other with **Axios** + **CORS**

Everything is heavily commented so even a beginner full-stack developer can understand and change the code later.

---

## Folder Structure (kept very simple)

```
tinyurl-portfolio/
├── backend/                     ← Express server
│   ├── controllers/             ← Business logic
│   │   ├── SaveURL.js           ← creates the short link
│   │   └── RedirectURL.js       ← redirects short → long
│   ├── models/
│   │   └── url.js               ← MongoDB schema
│   ├── routes/
│   │   └── urls.js              ← /api/urls/... endpoints
│   ├── utils/
│   │   ├── keys.js              ← nanoid short-id generator
│   │   └── mongodb.js           ← database connection
│   ├── index.js                 ← main entry point (CORS lives here)
│   ├── .env.example
│   └── package.json
│
├── frontend/                    ← React app
│   ├── src/
│   │   ├── components/          ← UI pieces (UrlShortener, Navbar…)
│   │   ├── pages/               ← Full pages (Home, Plans, Login…)
│   │   ├── config/
│   │   │   ├── api.js           ← Axios instance + createShortUrl()
│   │   │   └── siteConfig.js    ← brand name, domains, copyright
│   │   ├── hooks/
│   │   └── ...
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
└── README.md                    ← you are here
```

---

## How to run (step by step)

### 1. Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and put your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/tinyurl
PORT=5050
BASE_URL=http://localhost:5050
```

Free MongoDB Atlas: https://www.mongodb.com/atlas

Then:

```bash
npm install
npm run dev
```

You should see:

```
✅ MongoDB connected successfully
🚀 TinyURL Backend is running
   Local:   http://localhost:5050
```

Quick test: open http://localhost:5050/api/health in the browser.

### 2. Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

---

## What works (fully functional)

1. Type a long URL → click **Shorten Link**
2. Frontend sends the URL to the backend with **Axios** (`POST /api/urls/save`)
3. Backend creates a short ID with **nanoid**, saves it in **MongoDB**, and returns the short URL
4. Frontend shows the short link + Copy button
5. Opening the short link (`http://localhost:5050/api/urls/xxxx`) redirects to the original long URL
6. QR Code tab also uses the real backend short link
7. **Signup** creates a real user in MongoDB (password is hashed with bcrypt)
8. **Login** checks email + password against the database
9. Recent Links (session) still works
10. All marketing pages (Plans, Features, Domains, Resources) are present and responsive

---

## CORS & Axios – how they are connected

- **Backend** (`backend/index.js`): `cors()` is configured to allow `http://localhost:3000`
- **Frontend** (`src/config/api.js`): Axios is pointed at `http://localhost:5050`
- When you click “Shorten Link”, Axios sends a JSON body → backend answers → React updates the UI

If you later deploy the frontend to another domain, just change the `origin` array in the backend CORS options and set `VITE_API_URL` in the frontend.

---

## Making changes later (beginner guide)

| What you want to change              | Where to look                          |
|--------------------------------------|----------------------------------------|
| Brand name / copyright               | `frontend/src/config/siteConfig.js`    |
| Backend address                      | `frontend/src/config/api.js`           |
| Short ID length                      | `backend/utils/keys.js`                |
| MongoDB connection                   | `backend/.env`                         |
| Allowed frontend domains (CORS)      | `backend/index.js`                     |
| Look of the shortener card           | `frontend/src/components/UrlShortener.jsx` |
| New page                             | create file in `frontend/src/pages/` + add route in `App.jsx` |

---

## Production tips

- Set `BASE_URL` in backend `.env` to your real domain
- Set `VITE_API_URL` in frontend to the real backend URL
- Restrict CORS `origin` to only your real frontend domain
- Use a process manager (PM2) or a platform (Render, Railway, Fly.io) for the backend

---

Made as a clean portfolio piece – fully separated frontend & backend, connected with CORS + Axios, heavily commented, responsive, and easy for beginners to extend.
