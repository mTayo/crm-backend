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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
// src/modules/auth/auth.controller.ts
const tsoa_1 = require("tsoa");
const AppointmentService = __importStar(require("./appointment.service"));
const appointment_dto_1 = require("./appointment.dto");
const responseManager_1 = require("../../utils/responseManager");
const utils_1 = require("../../utils");
let AppointmentController = class AppointmentController extends tsoa_1.Controller {
    async createAppointment(body, req, badRequest) {
        if (!req.user?.id) {
            throw { status: 401, message: "User not authenticated" };
        }
        try {
            const { valid, errors, data } = await (0, utils_1.validateDto)(appointment_dto_1.CreateAppointmentDto, body);
            if (!valid || !data) {
                return responseManager_1.ResponseManager.validationError((0, utils_1.formatValidationError)(errors));
            }
            const result = await AppointmentService.createAppointment(data, req.user?.id);
            return responseManager_1.ResponseManager.success(result, "Appointment created successfully");
        }
        catch (err) {
            return badRequest(400, { message: err.message });
        }
    }
    async getAllAppointments(req, technicianId) {
        if (!req.user?.id) {
            throw { status: 401, message: "User not authenticated" };
        }
        const result = await AppointmentService.getAllJobs({ technicianId });
        return responseManager_1.ResponseManager.success(result, "Appointments retrieved");
    }
    async getAppointment(appointmentId, req) {
        if (!req.user?.id) {
            throw { status: 401, message: "User not authenticated" };
        }
        const result = await AppointmentService.getAppointment(appointmentId);
        return responseManager_1.ResponseManager.success(result, "Appointment retrieved");
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, tsoa_1.Post)("create"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.CreateAppointmentDto, Object, Function]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "createAppointment", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAllAppointments", null);
__decorate([
    (0, tsoa_1.Get)("/{appointmentId}"),
    (0, tsoa_1.Security)("jwt"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAppointment", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, tsoa_1.Route)("appointment"),
    (0, tsoa_1.Tags)("Appointment")
], AppointmentController);
