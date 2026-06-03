# Saving Trendz Vercel Deployment

## 1. Environment variables in Vercel
Add these in Vercel Project Settings > Environment Variables:

```env
DATABASE_URL=your_neon_database_url
AUTH_SECRET=your_generated_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_admin_password
```

Generate AUTH_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 2. Push database schema
After adding `.env.local` locally, run:

```bash
npm install
npm run db:push
npm run db:seed
```

## 3. Deploy
Push project to GitHub, import in Vercel, then deploy.

Admin panel:

```txt
/admin/login
```

## Notes
- Do not commit `.env.local`.
- Rotate your Neon password if it was shared anywhere publicly.
- Admin CRUD uses Prisma API routes and saves permanently to Neon PostgreSQL.

## Cloudinary Image Upload Setup for Vercel

Vercel does not permanently save files uploaded to local folders. For admin image upload, create a free Cloudinary account and add these variables in Vercel:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Then redeploy the project and run:

```bash
npx prisma generate
npx prisma db push
```

## Custom Sorting

Admin list pages include Up and Down buttons. Use them to choose your own order for stores, coupons, categories and blogs.
