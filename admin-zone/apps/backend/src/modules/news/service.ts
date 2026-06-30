import { MedusaService } from "@medusajs/framework/utils"
import News from "./models/news"

class NewsModuleService extends MedusaService({
  News,
}) {}

export default NewsModuleService
