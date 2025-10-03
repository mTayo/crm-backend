"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responseManager_1 = require("../utils/responseManager");
const utils_1 = require("../utils");
const validateDto = (dtoClass) => {
    return async (req, res, next) => {
        const dtoObj = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dtoObj);
        if (errors.length > 0) {
            const formattedErrors = (0, utils_1.formatValidationError)(errors);
            return responseManager_1.ResponseManager.validationError(formattedErrors);
        }
        next();
    };
};
exports.validateDto = validateDto;
