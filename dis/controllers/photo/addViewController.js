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

// src/controllers/photo/addViewController.ts
var addViewController_exports = {};
__export(addViewController_exports, {
  AddViewController: () => AddViewController
});
module.exports = __toCommonJS(addViewController_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/photo/addViewService.ts
var AddViewService = class {
  async execute({ photo_id }) {
    const valueView = await prisma.photos.findFirst({
      where: {
        id: photo_id
      }
    });
    const addView = await prisma.photos.update({
      where: {
        id: photo_id
      },
      data: {
        views: valueView?.views + 1
      }
    });
    return addView;
  }
};

// src/controllers/photo/addViewController.ts
var AddViewController = class {
  async handle(req, res) {
    const { photo_id } = req.body;
    const service = new AddViewService();
    const addView = await service.execute({
      photo_id
    });
    return res.json(addView);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddViewController
});
