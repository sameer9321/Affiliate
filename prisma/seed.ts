import { PrismaClient } from "@prisma/client";
import { categories, stores, coupons, blogs } from "../data/seed";
const prisma = new PrismaClient();
async function main() {
  for (const c of categories) await prisma.category.upsert({ where:{slug:c.slug}, update:{...c, id: undefined as never}, create:{ name:c.name, slug:c.slug, icon:c.icon, description:c.description, deals:c.deals }} as any);
  for (const s of stores) await prisma.store.upsert({ where:{slug:s.slug}, update:{...s, id: undefined as never}, create:{ name:s.name, slug:s.slug, description:s.description, category:s.category, website:s.website, logoText:s.logoText, rating:s.rating, couponCount:s.couponCount, featured:s.featured }} as any);
  for (const b of blogs) await prisma.blog.upsert({ where:{slug:b.slug}, update:{title:b.title, excerpt:b.excerpt, content:b.excerpt, date:b.date, category:b.category, readTime:b.readTime}, create:{ title:b.title, slug:b.slug, excerpt:b.excerpt, content:b.excerpt, date:b.date, category:b.category, readTime:b.readTime }});
  const existing = await prisma.coupon.count();
  if (!existing) for (const x of coupons) await prisma.coupon.create({ data:{ title:x.title, store:x.store, category:x.category, code:x.code, type:x.type, discount:x.discount, expiry:x.expiry, verified:x.verified, featured:x.featured, clicks:x.clicks }});
}
main().finally(()=>prisma.$disconnect());
