"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.loginUser = void 0;
const utils_1 = require("../../utils");
const AuthRepository = __importStar(require("./auth.repository"));
const loginUser = async (data) => {
    try {
        const findUser = await AuthRepository.findByEmail(data.email);
        if (!findUser || !(await (0, utils_1.comparePassword)(data.password, (findUser.password || '')))) {
            throw new Error('Invalid credentials');
        }
        const token = (0, utils_1.generateToken)(findUser.id, findUser?.role);
        const { password, ...user } = findUser;
        return { user, token };
    }
    catch (err) {
        throw err;
    }
};
exports.loginUser = loginUser;
const userProfile = async (userId) => {
    try {
        const findUser = await AuthRepository.findById(userId);
        if (!findUser) {
            throw new Error('User not found');
        }
        const { password, ...user } = findUser;
        return { user };
    }
    catch (err) {
        throw err;
    }
};
exports.userProfile = userProfile;
