"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const responseManager_1 = require("../utils/responseManager");
const notFound = (req, res, next) => {
    return responseManager_1.ResponseManager.error('Route not found');
};
exports.notFound = notFound;
