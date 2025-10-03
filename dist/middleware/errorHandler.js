"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const tsoa_1 = require("tsoa");
const responseManager_1 = require("../utils/responseManager");
function errorHandler(err, req, res, next) {
    const status = err.status || 400;
    if (err instanceof tsoa_1.ValidateError) {
        res.status(422).json(responseManager_1.ResponseManager.validationError(err?.fields));
        return;
    }
    if (err instanceof Error) {
        const status = err.status || 400;
        return res
            .status(status)
            .json(responseManager_1.ResponseManager.error(err.message));
    }
    if (status === 401) {
        return res
            .status(401)
            .json(responseManager_1.ResponseManager.error("Unauthorized: Invalid or missing token"));
    }
    res.status(500).json(responseManager_1.ResponseManager.rawError("Internal server error"));
}
