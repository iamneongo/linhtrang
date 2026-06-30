import { categories, productsByCategoryId } from '@/data';
import { getPayloadClient } from '@/lib/payload';
import { mapCategoryDoc, mapProductDoc } from '@/lib/site-content';

export async function GET() {
  try {
    const payload = await getPayloadClient();

    const [categoryResult, productResult] = await Promise.all([
      payload.find({
        collection: 'categories',
        limit: 100,
        pagination: false,
        sort: 'sortOrder',
      }),
      payload.find({
        collection: 'products',
        depth: 1,
        limit: 500,
        pagination: false,
        sort: 'sortOrder',
      }),
    ]);

    const mappedCategories = categoryResult.docs.map(mapCategoryDoc);
    const mappedProductsByCategoryId: Record<string, ReturnType<typeof mapProductDoc>[]> = {};

    for (const productDoc of productResult.docs) {
      const product = mapProductDoc(productDoc);
      if (!product.categoryId) {
        continue;
      }

      mappedProductsByCategoryId[product.categoryId] ??= [];
      mappedProductsByCategoryId[product.categoryId].push(product);
    }

    return Response.json({
      categories: mappedCategories,
      productsByCategoryId: mappedProductsByCategoryId,
    });
  } catch {
    return Response.json({
      categories,
      productsByCategoryId,
    });
  }
}
