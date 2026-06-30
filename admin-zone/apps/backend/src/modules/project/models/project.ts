import { model } from "@medusajs/framework/utils"

const Project = model.define("project", {
  id: model.id().primaryKey(),
  title: model.text(),
  location: model.text().nullable(),
  image_url: model.text().nullable(),
  category: model.text().nullable(),
  year: model.text().nullable(),
  area: model.text().nullable(),
  style: model.text().nullable(),
  description: model.text().nullable(),
})

export default Project
