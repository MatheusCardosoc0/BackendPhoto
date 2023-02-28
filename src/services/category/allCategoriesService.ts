import { prisma } from "../../utils/prisma";

class AllCategoriesService{
  async execute(){
    const allCategories = await prisma.category.findMany()

    return allCategories
  }
}

export {AllCategoriesService}