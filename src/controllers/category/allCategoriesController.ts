import { Request, Response } from "express";
import { AllCategoriesService } from "../../services/category/allCategoriesService";

class AllCategoriesController{
  async handle(req: Request, res: Response){

    const service = new AllCategoriesService()

    const allCategories = await service.execute()

    return res.json(allCategories)
  }
}

export {AllCategoriesController}