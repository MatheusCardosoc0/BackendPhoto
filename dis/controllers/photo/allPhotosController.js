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

// src/controllers/photo/allPhotosController.ts
var allPhotosController_exports = {};
__export(allPhotosController_exports, {
  AllPhotosController: () => AllPhotosController
});
module.exports = __toCommonJS(allPhotosController_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/photo/allPhotosService.ts
var AllPhotosService = class {
  async execute() {
    const allPhotos = await prisma.photos.findMany({
      orderBy: {
        views: "desc"
      },
      include: {
        Category: true,
        User: true
      }
    });
    return allPhotos;
  }
};

// src/controllers/photo/allPhotosController.ts
var AllPhotosController = class {
  async handle(req, res) {
    const service = new AllPhotosService();
    const allPhotos = await service.execute();
    return res.json(allPhotos);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllPhotosController
});
