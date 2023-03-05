"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/photo/photosByCategoryController.ts
var photosByCategoryController_exports = {};
__export(photosByCategoryController_exports, {
  PhotosByCategoryController: () => PhotosByCategoryController
});
module.exports = __toCommonJS(photosByCategoryController_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/photo/photosByCategoryService.ts
var PhotosByCategoryService = class {
  async execute({ categoryId }) {
    const photos = await prisma.photos.findMany({
      where: {
        categoryId
      },
      orderBy: {
        views: "desc"
      },
      include: {
        Category: true,
        User: true
      }
    });
    return photos;
  }
};

// src/controllers/photo/photosByCategoryController.ts
var PhotosByCategoryController = class {
  async handle(req, res) {
    const categoryId = req.params.categoryId;
    const service = new PhotosByCategoryService();
    const photosByCategory = await service.execute({
      categoryId
    });
    return res.json(photosByCategory);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PhotosByCategoryController
});
