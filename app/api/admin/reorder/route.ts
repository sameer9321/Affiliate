import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiError, orderBySort } from "@/lib/admin-utils";

type Entity = "stores" | "coupons" | "categories" | "blogs";

const models: Record<Entity, any> = {
  stores: prisma.store,
  coupons: prisma.coupon,
  categories: prisma.category,
  blogs: prisma.blog,
};

export async function PATCH(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { entity, id, direction, targetPosition, store, orderedIds } = await req.json();
    const model = models[entity as Entity];

    if (!model) {
      return Response.json({ error: "Invalid reorder request." }, { status: 400 });
    }

    if (entity === "coupons" && Array.isArray(orderedIds)) {
      const couponIds = orderedIds.map((itemId) => String(itemId)).filter(Boolean);
      if (!store || couponIds.length === 0) {
        return Response.json({ error: "Please select a store and coupons to reorder." }, { status: 400 });
      }

      const coupons = await prisma.coupon.findMany({
        where: { store: String(store) },
        orderBy: orderBySort(),
      });

      const validIds = new Set(coupons.map((coupon) => coupon.id));
      const hasInvalidId = couponIds.some((couponId) => !validIds.has(couponId));

      if (hasInvalidId || couponIds.length !== coupons.length) {
        return Response.json({ error: "Coupon order does not match the selected store." }, { status: 400 });
      }

      await prisma.$transaction(
        couponIds.map((couponId, itemIndex) =>
          prisma.coupon.update({ where: { id: couponId }, data: { sortOrder: itemIndex + 1 } })
        )
      );

      return Response.json({ ok: true });
    }

    if (!id) {
      return Response.json({ error: "Please select an item to reorder." }, { status: 400 });
    }

    const where = entity === "coupons" && store ? { store: String(store) } : undefined;
    const items = await model.findMany({ where, orderBy: orderBySort() });
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) return Response.json({ error: "Item not found." }, { status: 404 });

    let newIndex = index;

    if (typeof targetPosition === "number") {
      newIndex = Math.max(0, Math.min(items.length - 1, targetPosition - 1));
    } else if (["up", "down"].includes(direction)) {
      newIndex = direction === "up" ? index - 1 : index + 1;
    } else {
      return Response.json({ error: "Please select a valid sorting position." }, { status: 400 });
    }

    if (newIndex < 0 || newIndex >= items.length || newIndex === index) {
      return Response.json({ ok: true });
    }

    const ordered = [...items];
    const [selected] = ordered.splice(index, 1);
    ordered.splice(newIndex, 0, selected);

    await prisma.$transaction(
      ordered.map((item: any, itemIndex: number) =>
        model.update({ where: { id: item.id }, data: { sortOrder: itemIndex + 1 } })
      )
    );

    return Response.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
