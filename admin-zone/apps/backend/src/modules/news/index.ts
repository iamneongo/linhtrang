import NewsModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const NEWS_MODULE = "news"

export default Module(NEWS_MODULE, {
  service: NewsModuleService,
})
