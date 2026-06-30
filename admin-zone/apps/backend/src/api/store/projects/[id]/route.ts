import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import ProjectModuleService from "../../../../modules/project/service"
import { PROJECT_MODULE } from "../../../../modules/project"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const projectModuleService: ProjectModuleService = req.scope.resolve(
    PROJECT_MODULE
  )

  const project = await projectModuleService.retrieveProject(req.params.id)

  res.json({ project })
}
