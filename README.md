<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://payloadcms.com/images/meta-image.png" />
</div>

# Linh Trang Home

Linh Trang Home now uses `Payload CMS` inside the same Next.js app for the admin experience, with PostgreSQL as the backing database.

## Run locally

Requirements:
- Node.js 22+
- PostgreSQL or Neon

1. Install dependencies:
   `npm install`
2. Copy the environment template:
   `cp .env.example .env.local`
3. Set `DATABASE_URL` in `.env.local`.
   For Neon, use your pooled connection string with SSL enabled.
4. Seed initial Payload data:
   `npm run seed:payload`
5. Start the app:
   `npm run dev`

Payload will auto-sync the schema in development when it connects to PostgreSQL.

## Access

- Website: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`
- Payload REST API: `http://localhost:3000/cms-api`

On the first visit to `/admin`, Payload will let you create the initial admin user if the `users` collection is empty.
