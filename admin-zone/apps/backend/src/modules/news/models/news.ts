import { model } from "@medusajs/framework/utils"

const News = model.define("news", {
  id: model.id().primaryKey(),
  title: model.text(),
  image_url: model.text().nullable(),
  date: model.text().nullable(),
  author: model.text().nullable(),
  summary: model.text().nullable(),
  content: model.text().nullable(),
})

export default News
