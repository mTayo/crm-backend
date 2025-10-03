"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.findByEmail = exports.updateCustomer = exports.createCustomer = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createCustomer = (data) => {
    return db_1.default.customer.create({
        data,
    });
};
exports.createCustomer = createCustomer;
const updateCustomer = (customerId, data) => {
    return db_1.default.customer.update({
        where: { id: customerId },
        data,
    });
};
exports.updateCustomer = updateCustomer;
const findByEmail = (email) => {
    return db_1.default.user.findUnique({ where: { email } });
};
exports.findByEmail = findByEmail;
const findById = (id) => {
    return db_1.default.customer.findUnique({ where: { id },
        include: {
            jobs: true,
        },
    });
};
exports.findById = findById;
