"use strict";
// src/utils/pagination.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
const db_1 = __importDefault(require("../config/db"));
async function paginate(options) {
    const { model, page = 1, limit = 10, where, orderBy, select, include, } = options;
    const skip = (page - 1) * limit;
    const prismaModel = db_1.default[model]; // dynamic access to prisma model
    const [items, total] = await Promise.all([
        prismaModel.findMany({
            skip,
            take: limit,
            where,
            orderBy,
            select,
            include,
        }),
        prismaModel.count({ where }),
    ]);
    return {
        data: items,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
        },
    };
}
