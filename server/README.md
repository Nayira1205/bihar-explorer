# Bihar Explorer API

Express + MongoDB backend for Bihar Explorer. Covers Phase 2 (content APIs)
and Phase 3 (Authentication) of the project roadmap.

## Setup

```bash
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run seed             # populates destinations, foods, festivals, and one admin user
npm run dev               # starts the API on http://localhost:5000
```

`npm run seed` prints the admin login it created (from `ADMIN_EMAIL` /
`ADMIN_PASSWORD` in `.env`, or defaults if unset) — use that to log in and
test the protected routes below. **Change those two values before deploying
anywhere public.**

Health check: `GET http://localhost:5000/api/health`

## Endpoints

| Resource | Method | Path | Auth | Notes |
|---|---|---|---|---|
| Auth | POST | `/api/auth/register` | — | Body: `name`, `email`, `password`. First account ever created becomes `admin` automatically; every account after that is `user`. |
| | POST | `/api/auth/login` | — | Body: `email`, `password`. Sets an httpOnly `token` cookie. |
| | POST | `/api/auth/logout` | — | Clears the cookie. |
| | GET | `/api/auth/me` | Logged in | Returns the current user. |
| Destinations | GET | `/api/destinations` | — | Query: `category`, `district`, `search`, `sort` (`name`\|`district`) |
| | GET | `/api/destinations/:slug` | — | |
| | POST / PUT / DELETE | `/api/destinations[/:slug]` | **Admin** | |
| Foods | GET | `/api/foods` | — | Query: `category` |
| | POST / PUT / DELETE | `/api/foods[/:slug]` | **Admin** | |
| Festivals | GET | `/api/festivals[/:slug]` | — | |
| | POST / PUT / DELETE | `/api/festivals[/:slug]` | **Admin** | |
| Contact | POST | `/api/contact` | — | Body: `name`, `email`, `message` |
| | GET | `/api/contact` | **Admin** | List submissions |
| Newsletter | POST | `/api/newsletter` | — | Body: `email` — matches the Footer signup form |
| | GET | `/api/newsletter` | **Admin** | List subscribers |
| | DELETE | `/api/newsletter/:email` | **Admin** | |

All responses follow `{ success, data | message }`. Errors return
`{ success: false, message }` with an appropriate status code.

## How auth works

- Passwords are hashed with `bcryptjs` before saving (`User.js` pre-save
  hook) — plaintext passwords are never stored or logged.
- Login/register issue a JWT, sent back as an **httpOnly cookie** (not in
  the JSON body), so frontend JS can't read or leak the token — the
  browser just sends it automatically on future requests.
- `middleware/auth.js` exports `protect` (must be logged in) and
  `adminOnly` (must be logged in **and** an admin), used together on every
  write route above.
- Frontend fetch calls need `credentials: "include"` for the cookie to be
  sent — already wired up in `client/src/lib/api.js`.

## Image strategy

Destination/food/festival documents store an **image filename** (e.g.
`"nalanda.jpg"`), not binary data or a full import — matching the filenames
already used in `client/src/assets/images/`. Two ways to wire this up:

1. **Keep images in the frontend bundle** (current setup) — the frontend
   maps filenames from the API to its own local imports
   (`client/src/utils/destinationImages.js` and similar).
2. **Serve images from the backend** — drop files in
   `server/public/images/` and serve with `express.static`, or upload via
   `multer` (already a dependency) to a provider like Cloudinary.

## What's not built yet

- **Reviews, Wishlist, Travel Plans** — natural next step now that auth
  exists, since all three are tied to a logged-in user.
- **Password reset / email verification** — no email sending is wired up.
- **Rate limiting** on `/api/auth/login` — worth adding
  (`express-rate-limit`) before this is public, to slow down brute-force
  login attempts.
- Input validation is minimal (a few required-field checks). A library
  like `zod` or `express-validator` would be worth adding before this goes
  live.
