import { MedusaService } from "@medusajs/framework/utils"
import Project from "./models/project"

class ProjectModuleService extends MedusaService({
  Project,
}) {}

export default ProjectModuleService
