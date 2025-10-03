"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceDto = exports.InvoiceLineItemDto = exports.UpdateJobDto = exports.CreateJobDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_transformer_2 = require("class-transformer");
class CreateJobDto {
    constructor() {
        this.title = '';
        this.description = '';
        this.customerId = '';
    }
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'Description must be at least 4 characters long' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'Description must be at least 10 characters long' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "customerId", void 0);
class UpdateJobDto {
    constructor() {
        this.status = '';
        this.id = '';
    }
}
exports.UpdateJobDto = UpdateJobDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(['NEW', 'SCHEDULED', 'DONE', 'INVOICED', 'PAID'], {
        message: 'Status must be one of NEW, SCHEDULED, DONE, INVOICED or PAID',
    }),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateJobDto.prototype, "id", void 0);
class InvoiceLineItemDto {
}
exports.InvoiceLineItemDto = InvoiceLineItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: "Description must be at least 2 characters long" }),
    __metadata("design:type", String)
], InvoiceLineItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: "Quantity must be at least 1" }),
    __metadata("design:type", Number)
], InvoiceLineItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: "Unit price must be a positive number" }),
    __metadata("design:type", Number)
], InvoiceLineItemDto.prototype, "unitPrice", void 0);
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_2.Type)(() => InvoiceLineItemDto),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "lineItems", void 0);
