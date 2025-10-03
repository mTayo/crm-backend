"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = expressAuthentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
async function expressAuthentication(request, securityName, scopes) {
    if (securityName === "jwt") {
        const authHeader = request.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return Promise.reject({
                status: 401,
                message: "Unauthorized: No token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET || '');
            // Attach decoded user to request
            request.user = decoded;
            if (scopes && scopes.length > 0) {
                const hasScope = scopes.every((scope) => decoded[scope] === true || decoded.scopes?.includes(scope));
                if (!hasScope) {
                    return Promise.reject({
                        status: 403,
                        message: "Forbidden: insufficient rights",
                    });
                }
            }
            return decoded;
        }
        catch {
            return Promise.reject({
                status: 401,
                message: "Unauthorized: Invalid token",
            });
        }
    }
    return Promise.reject({
        status: 401,
        message: "Unsupported security scheme",
    });
}
