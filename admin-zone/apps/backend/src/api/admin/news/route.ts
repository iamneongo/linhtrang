import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import NewsModuleService from "../../../modules/news/service"
import { NEWS_MODULE } from "../../../modules/news"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const newsModuleService: NewsModuleService = req.scope.resolve(NEWS_MODULE)

  const news = await newsModuleService.listNews()

  res.json({ news })
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const newsModuleService: NewsModuleService = req.scope.resolve(NEWS_MODULE)

  const news = await newsModuleService.createNews(
    req.body as Record<string, unknown>
  )

  res.json({ news })
}
