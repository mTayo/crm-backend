"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidationError = exports.encrypt = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
exports.validateDto = validateDto;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
async function validateDto(dtoClass, body) {
    const dto = (0, class_transformer_1.plainToInstance)(dtoClass, body);
    const errors = await (0, class_validator_1.validate)(dto, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
        return {
            valid: false,
            errors: errors.map(e => ({
                property: e.property,
                constraints: e.constraints,
            })),
        };
    }
    return { valid: true, data: dto };
}
// Hash a password
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
// Compare a plain password with a hashed one
const comparePassword = async (plain, hash) => {
    return bcryptjs_1.default.compare(plain, hash);
};
exports.comparePassword = comparePassword;
// Generate a JWT token
const generateToken = (userId, role, expiresIn = '7d') => {
    const JWT_SECRET = process.env.JWT_SECRET || "49)50(DOEW#R)OXO!";
    // @ts-ignore
    return jsonwebtoken_1.default.sign({ id: userId, role }, JWT_SECRET, {
        expiresIn: expiresIn || '7d',
    });
};
exports.generateToken = generateToken;
const encrypt = (value) => {
    return jsonwebtoken_1.default.sign({ data: value }, process.env.JWT_SECRET || "49)50(DOEW#R)OXO!", { algorithm: "HS256" }) || "";
};
exports.encrypt = encrypt;
//Format validation error
const formatValidationError = (errors) => {
    const formattedErrors = errors.reduce((acc, error) => {
        const key = error.property;
        const messages = Object.values(error.constraints || {});
        acc[key] = messages;
        return acc;
    }, {});
    return formattedErrors;
};
exports.formatValidationError = formatValidationError;
