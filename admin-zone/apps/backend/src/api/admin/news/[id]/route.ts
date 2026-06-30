import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import NewsModuleService from "../../../../modules/news/service"
import { NEWS_MODULE } from "../../../../modules/news"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const newsModuleService: NewsModuleService = req.scope.resolve(NEWS_MODULE)

  const news = await newsModuleService.retrieveNews(req.params.id)

  res.json({ news })
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const newsModuleService: NewsModuleService = req.scope.resolve(NEWS_MODULE)

  const news = await newsModuleService.updateNews({
    id: req.params.id,
    ...(req.body as Record<string, unknown>),
  })

  res.json({ news })
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const newsModuleService: NewsModuleService = req.scope.resolve(NEWS_MODULE)

  await newsModuleService.deleteNews(req.params.id)

  res.json({ id: req.params.id, object: "news", deleted: true })
}
