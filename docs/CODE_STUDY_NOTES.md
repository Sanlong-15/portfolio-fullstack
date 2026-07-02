# Code Study Notes — Understand Before You Present

Your lecturer can ask about ANY file. Study one section per sitting.
Test yourself: close the file, explain it out loud in your own words.

---

## 1. The big picture

Request flow when a visitor opens the Projects page:

1. React renders `ProjectsPage` → `useFetch` runs → calls `getProjects()` in `services/api.js`
2. `fetch()` sends `GET https://api.../api/projects`
3. Express receives it → `routes/projectRoutes.js` matches `GET /` → runs `getProjects` controller
4. Controller calls `Project.find()` → Mongoose queries MongoDB Atlas
5. Controller sends JSON back → React stores it in state → the page re-renders with real data

If someone asks "where does the data come from?" — this chain is the answer.

## 2. server/ — why it is split into folders

- **models/** = the shape of the data + validation rules (Mongoose schemas)
- **controllers/** = the logic for each endpoint (what to do with a request)
- **routes/** = which URL + HTTP method runs which controller
- **middleware/** = code that runs between request and controller (auth, errors)
- **config/** = database connection
- `app.js` builds the app, `server.js` starts it — split so tests can import `app.js` without starting a real server (that is exactly what `api-test.js` does)

**Why `next(error)` in every catch?** It sends the error to `errorHandler.js`,
so error formatting lives in ONE place instead of being repeated in every controller.

**Why check `isValidId` before querying?** MongoDB ids have a fixed format.
An invalid id would crash the query with a CastError. Checking first lets us
return a clean `400 Bad Request` instead of a `500`.

**Why status codes matter:** 200 = OK, 201 = created something new,
400 = the client sent bad data, 401 = missing/wrong admin key,
404 = not found, 500 = our fault. REST clients rely on these.

**Admin key:** the client sends header `x-admin-key`. The server compares it
with `process.env.ADMIN_KEY`. The key is in `.env`, which is in `.gitignore`,
so it never reaches GitHub. This is why POST/PUT/DELETE are "not left
completely unprotected" (assessment section 8).

## 3. client/ — key decisions

- **services/api.js**: components never call `fetch` directly. One `request()`
  helper adds headers, parses JSON, and throws readable errors. If the API URL
  changes, we edit one line (`VITE_API_URL` in `.env`).
- **hooks/useFetch.js**: every page needs the same three states — `loading`,
  `error`, `data`. A custom hook writes that logic once. `refetch` lets the
  admin page reload the list after saving.
- **ContactForm.jsx**: a *controlled form* — every input's value lives in React
  state (`form`), updated by `handleChange`. `validate()` checks the rules
  BEFORE sending. The server checks them AGAIN (never trust the browser —
  anyone can bypass client-side checks with curl).
- **React Router**: `<Routes>` in `App.jsx` swaps pages without page reloads.
  `NavLink` knows which route is active and styles it.
- **Conditional rendering**: `{loading && <Loading />}`, `{error && <ErrorMessage />}` —
  render different UI for each state.
- **List rendering**: `projects.map(p => <ProjectCard key={p._id} ... />)` —
  `key` helps React track items when the list changes.

## 4. ES6+ features you must be able to point at

| Feature | Where |
| --- | --- |
| let / const | everywhere |
| Arrow functions | all controllers, `api.js` |
| Template literals | `` `${BASE_URL}${path}` `` in api.js |
| Destructuring | `const { title, description } = project` in ProjectCard |
| Spread / rest | `setForm(prev => ({ ...prev, [name]: value }))` in ContactForm |
| map / filter / find | ProjectsPage filter bar, list rendering |
| import / export modules | every file |
| Promises + async/await | all controllers, api.js, useFetch |
| try / catch | all controllers, ContactForm submit |

## 5. Questions your lecturer will probably ask

1. *"What happens if MongoDB is down?"* — `connectDB` logs the error and exits;
   in a running app, queries fail, controllers call `next(error)`, the client
   shows the ErrorMessage component with a retry button.
2. *"Why validation on both sides?"* — client-side = fast feedback for users;
   server-side = security, because attackers can skip the browser entirely.
3. *"How is the admin protected?"* — server-side key comparison on every write
   request; the key lives in environment variables only.
4. *"Why Vite?"* — fast dev server and modern build tool; the standard for new
   React projects (Create React App is deprecated).
5. *"What is CORS?"* — browsers block requests between different origins unless
   the server allows them. Our API only allows our own frontend origin.
6. *"Why is `.env` in `.gitignore`?"* — it holds the database password and admin
   key. Anyone who reads the repo could otherwise control the database.
