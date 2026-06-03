# Saving Trendz — Production Backend Build

Next.js + Tailwind + Prisma + Neon PostgreSQL + protected admin panel.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

## Required environment variables

```env
DATABASE_URL="your-neon-postgres-url"
AUTH_SECRET="random-long-secret"
ADMIN_EMAIL="admin@savingtrendz.com"
ADMIN_PASSWORD="your-secure-password"
```

## Admin

Open `/admin/login` and login with your configured admin email/password.

## Vercel deployment

1. Push project to GitHub.
2. Import repo in Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Run locally once or from terminal:

```bash
npm run db:push
npm run db:seed
```

5. Deploy.

> Important: do not commit `.env.local` to GitHub.
