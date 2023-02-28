import { AddViewRequest } from "../../@types/interfaces/PhotosInterfaces";
import { prisma } from "../../utils/prisma";

class AddViewService{
  async execute({photo_id}: AddViewRequest){

    const valueView = await prisma.photos.findFirst({
      where: {
        id: photo_id
      }
    })

    const addView = await prisma.photos.update({
      where: {
        id: photo_id
      },
      data: {
        views: valueView?.views as number + 1
      }
    })

    return addView
  }
}

export {AddViewService}