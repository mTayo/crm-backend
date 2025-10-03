"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});
exports.default = prisma;
