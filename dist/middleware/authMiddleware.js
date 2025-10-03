"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
exports.authorizeAdmin = authorizeAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseManager_1 = require("../utils/responseManager");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return responseManager_1.ResponseManager.error('Unauthorized: No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (err) {
        return responseManager_1.ResponseManager.error('Unauthorized: Invalid token');
    }
};
exports.authenticate = authenticate;
function authorizeAdmin(req, res, next) {
    if (!req.user) {
        return responseManager_1.ResponseManager.error('Unauthorized');
    }
    // if (!req?.user?.is_admin) {
    //   return ResponseManager.error('Forbidden');
    // }
    next();
}
