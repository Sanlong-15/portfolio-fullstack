# Sanlong Huy — Professional Portfolio Website

A full-stack personal portfolio web application built for the Web Development
final assessment at CamTech University.

**Live website:** _add your URL after deployment_
**GitHub repository:** _add your repo URL_

## Project Overview

This portfolio introduces me as a software engineering student. It presents my
skills, education, achievements, and projects, and lets visitors contact me.
Project data is stored in MongoDB and loaded through a custom RESTful API.
An admin dashboard allows full create, read, update, and delete management
of projects.

## Main Features

- Responsive React front end with client-side routing (Home, Projects, Contact, Admin, 404)
- Projects loaded live from MongoDB through a RESTful API
- Project filtering by technology and a details modal
- Contact form with client-side and server-side validation, stored in MongoDB
- Admin dashboard with full CRUD over projects, protected by a server-checked admin key
- Loading and error states for every API request
- Accessible: semantic HTML, form labels, keyboard navigation, visible focus states

## Technologies Used

| Layer | Technology |
| --- | --- |
| Front end | React 19, React Router 7, Vite, HTML5, CSS3, JavaScript (ES6+) |
| Back end | Node.js, Express 4 |
| Database | MongoDB (Mongoose ODM), MongoDB Atlas |
| Deployment | AWS Amplify (front end), Amazon EC2 (back end) |
| Tools | Git, GitHub, VS Code, Figma |

## Application Architecture

```
Browser (React SPA)
   │  fetch() JSON
   ▼
Express REST API  (/api/projects, /api/messages, /api/health)
   │  Mongoose
   ▼
MongoDB Atlas  (projects + messages collections)
```

- `client/` — React application (components, pages, services, hooks, data, styles)
- `server/` — Express API (config, models, controllers, middleware, routes, seed)

## Installation

Requirements: Node.js 18+, npm, a MongoDB Atlas cluster (free M0 is enough).

```bash
git clone <your-repo-url>
cd portfolio-project
```

### Environment variables

Both apps read configuration from `.env` files. Copy the examples and fill them in:

```bash
cp server/.env.example server/.env   # set MONGO_URI, ADMIN_KEY, CLIENT_ORIGIN
cp client/.env.example client/.env   # set VITE_API_URL
```

Never commit `.env` files. They are listed in `.gitignore`.

### Running the backend

```bash
cd server
npm install
npm run seed    # loads the 3 starter projects into MongoDB (run once)
npm run dev     # starts the API on http://localhost:5000
```

### Running the frontend

```bash
cd client
npm install
npm run dev     # starts the site on http://localhost:5173
```

### Running the API tests

```bash
cd server
npm test        # 12 tests: routing, auth, validation, error handling
```

## API Endpoint Summary

| Method | Endpoint | Purpose | Access |
| --- | --- | --- | --- |
| GET | /api/health | Health check | Public |
| GET | /api/projects | All projects | Public |
| GET | /api/projects/:id | One project | Public |
| POST | /api/projects | Create project | Admin key |
| PUT | /api/projects/:id | Update project | Admin key |
| DELETE | /api/projects/:id | Delete project | Admin key |
| POST | /api/messages | Submit contact message | Public |
| GET | /api/messages | Read messages | Admin key |

Protected endpoints require the header `x-admin-key: <ADMIN_KEY>`.
All responses are JSON with `success`, `message`/`data`, and proper HTTP status
codes (200, 201, 400, 401, 404, 500).

## Screenshots

_Add screenshots of Home, Projects, Contact, and Admin pages here before submission._

## Known Limitations

- Admin protection uses a single shared key, not full JWT user accounts.
- Contact messages are readable only through the API, not in the admin UI yet.
- Project images are static files, not uploads.

## Future Improvements

- JWT-based admin login
- Message inbox in the admin dashboard
- Image upload for projects
- Dark/light theme toggle
- Khmer and Chinese language support

## Author

**Sanlong Huy** — Year 2 Software Engineering, CamTech University, Phnom Penh
- GitHub: https://github.com/Sanlong-15
- LinkedIn: https://www.linkedin.com/in/huysanlong-21929b387
- Email: huysanlong1@gmail.com
