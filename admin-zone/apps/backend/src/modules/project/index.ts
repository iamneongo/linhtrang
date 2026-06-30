import ProjectModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const PROJECT_MODULE = "project"

export default Module(PROJECT_MODULE, {
  service: ProjectModuleService,
})
