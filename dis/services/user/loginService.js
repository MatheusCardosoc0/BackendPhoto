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

// src/services/user/loginService.ts
var loginService_exports = {};
__export(loginService_exports, {
  LoginService: () => LoginService
});
module.exports = __toCommonJS(loginService_exports);
var import_bcryptjs = require("bcryptjs");

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/user/loginService.ts
var import_jsonwebtoken = require("jsonwebtoken");
var LoginService = class {
  async execute({ email, password }) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (!user)
      throw new Error("User not exist");
    const passwordMath = await (0, import_bcryptjs.compare)(password, user.password);
    if (!passwordMath)
      throw new Error("User not exist");
    const token = (0, import_jsonwebtoken.sign)(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d"
      }
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginService
});
