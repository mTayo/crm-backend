"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.findByEmail = exports.updateUser = void 0;
const db_1 = __importDefault(require("../../config/db"));
const updateUser = (userId, data) => {
    return db_1.default.user.update({
        where: { id: userId },
        data,
    });
};
exports.updateUser = updateUser;
const findByEmail = (email) => {
    return db_1.default.user.findUnique({ where: { email } });
};
exports.findByEmail = findByEmail;
const findById = (id) => {
    return db_1.default.user.findUnique({ where: { id },
    });
};
exports.findById = findById;
