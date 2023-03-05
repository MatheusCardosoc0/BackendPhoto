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

// src/services/photo/createPhotoService.ts
var createPhotoService_exports = {};
__export(createPhotoService_exports, {
  CreatePhotoService: () => CreatePhotoService
});
module.exports = __toCommonJS(createPhotoService_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/photo/createPhotoService.ts
var CreatePhotoService = class {
  async execute({
    categoryId,
    description,
    photo,
    title,
    userId
  }) {
    const createPhoto = await prisma.photos.create({
      data: {
        photo,
        title,
        categoryId,
        userId,
        description
      }
    });
    return createPhoto;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePhotoService
});
