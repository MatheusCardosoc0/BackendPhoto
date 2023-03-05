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

// src/controllers/category/allCategoriesController.ts
var allCategoriesController_exports = {};
__export(allCategoriesController_exports, {
  AllCategoriesController: () => AllCategoriesController
});
module.exports = __toCommonJS(allCategoriesController_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/category/allCategoriesService.ts
var AllCategoriesService = class {
  async execute() {
    const allCategories = await prisma.category.findMany();
    return allCategories;
  }
};

// src/controllers/category/allCategoriesController.ts
var AllCategoriesController = class {
  async handle(req, res) {
    const service = new AllCategoriesService();
    const allCategories = await service.execute();
    return res.json(allCategories);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllCategoriesController
});
