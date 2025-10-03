"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const job_controller_1 = require("./../modules/job/job.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const invoice_controller_1 = require("./../modules/invoice/invoice.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const customer_controller_1 = require("./../modules/customer/customer.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../modules/auth/auth.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const appointment_controller_1 = require("./../modules/appointment/appointment.controller");
const expressAuthentication_1 = require("./../middleware/expressAuthentication");
const expressAuthenticationRecasted = expressAuthentication_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "CreateJobDto": {
        "dataType": "refObject",
        "properties": {
            "title": { "dataType": "string", "default": "" },
            "description": { "dataType": "string", "default": "" },
            "customerId": { "dataType": "string", "default": "" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateJobDto": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "string", "default": "" },
            "id": { "dataType": "string", "default": "" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.JobStatus": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["NEW"] }, { "dataType": "enum", "enums": ["SCHEDULED"] }, { "dataType": "enum", "enums": ["DONE"] }, { "dataType": "enum", "enums": ["INVOICED"] }, { "dataType": "enum", "enums": ["PAID"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JobStatus": {
        "dataType": "refAlias",
        "type": { "ref": "_36_Enums.JobStatus", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvoiceLineItemDto": {
        "dataType": "refObject",
        "properties": {
            "description": { "dataType": "string", "required": true },
            "quantity": { "dataType": "double", "required": true },
            "unitPrice": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateInvoiceDto": {
        "dataType": "refObject",
        "properties": {
            "lineItems": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvoiceLineItemDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateInvoicePaymentDto": {
        "dataType": "refObject",
        "properties": {
            "amount": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCustomerDto": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "default": "" },
            "name": { "dataType": "string", "default": "" },
            "phone": { "dataType": "string", "default": "" },
            "address": { "dataType": "string", "default": "" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginDto": {
        "dataType": "refObject",
        "properties": {
            "email": { "dataType": "string", "default": "" },
            "password": { "dataType": "string", "default": "" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAppointmentDto": {
        "dataType": "refObject",
        "properties": {
            "jobId": { "dataType": "string", "required": true },
            "technician": { "dataType": "string", "required": true },
            "startTime": { "dataType": "string", "required": true },
            "endTime": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsJobController_createJob = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateJobDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
    };
    app.post('/api/job/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.createJob)), async function JobController_createJob(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsJobController_createJob, request, response });
            const controller = new job_controller_1.JobController();
            await templateService.apiHandler({
                methodName: 'createJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsJobController_updateJob = {
        body: { "in": "body", "name": "body", "required": true, "ref": "UpdateJobDto" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
    };
    app.put('/api/job', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.updateJob)), async function JobController_updateJob(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsJobController_updateJob, request, response });
            const controller = new job_controller_1.JobController();
            await templateService.apiHandler({
                methodName: 'updateJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsJobController_getAllJob = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        status: { "in": "query", "name": "status", "ref": "JobStatus" },
        customerId: { "in": "query", "name": "customerId", "dataType": "string" },
    };
    app.get('/api/job', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.getAllJob)), async function JobController_getAllJob(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsJobController_getAllJob, request, response });
            const controller = new job_controller_1.JobController();
            await templateService.apiHandler({
                methodName: 'getAllJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsJobController_getJob = {
        jobId: { "in": "path", "name": "jobId", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/api/job/:jobId', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.getJob)), async function JobController_getJob(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsJobController_getJob, request, response });
            const controller = new job_controller_1.JobController();
            await templateService.apiHandler({
                methodName: 'getJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsJobController_createInvoice = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateInvoiceDto" },
        jobId: { "in": "path", "name": "jobId", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        badRequest: { "in": "res", "name": "500", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "success": { "dataType": "boolean", "required": true } } },
    };
    app.post('/api/job/:jobId/invoice', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.createInvoice)), async function JobController_createInvoice(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsJobController_createInvoice, request, response });
            const controller = new job_controller_1.JobController();
            await templateService.apiHandler({
                methodName: 'createInvoice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvoiceController_createInvoicePayment = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateInvoicePaymentDto" },
        invoiceId: { "in": "path", "name": "invoiceId", "required": true, "dataType": "string" },
        badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
    };
    app.post('/api/invoice/:invoiceId/payments', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(invoice_controller_1.InvoiceController)), ...((0, runtime_1.fetchMiddlewares)(invoice_controller_1.InvoiceController.prototype.createInvoicePayment)), async function InvoiceController_createInvoicePayment(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsInvoiceController_createInvoicePayment, request, response });
            const controller = new invoice_controller_1.InvoiceController();
            await templateService.apiHandler({
                methodName: 'createInvoicePayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCustomerController_createCustomer = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateCustomerDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
    };
    app.post('/api/customer/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(customer_controller_1.CustomerController.prototype.createCustomer)), async function CustomerController_createCustomer(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCustomerController_createCustomer, request, response });
            const controller = new customer_controller_1.CustomerController();
            await templateService.apiHandler({
                methodName: 'createCustomer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCustomerController_getCustomer = {
        customerId: { "in": "path", "name": "customerId", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/api/customer/:customerId', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(customer_controller_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(customer_controller_1.CustomerController.prototype.getCustomer)), async function CustomerController_getCustomer(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCustomerController_getCustomer, request, response });
            const controller = new customer_controller_1.CustomerController();
            await templateService.apiHandler({
                methodName: 'getCustomer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_login = {
        body: { "in": "body", "name": "body", "required": true, "ref": "LoginDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
    };
    app.post('/api/auth/login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.login)), async function AuthController_login(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_profile = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/api/auth/user', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.profile)), async function AuthController_profile(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_profile, request, response });
            const controller = new auth_controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'profile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAppointmentController_createAppointment = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CreateAppointmentDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
    };
    app.post('/api/appointment/create', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(appointment_controller_1.AppointmentController)), ...((0, runtime_1.fetchMiddlewares)(appointment_controller_1.AppointmentController.prototype.createAppointment)), async function AppointmentController_createAppointment(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_createAppointment, request, response });
            const controller = new appointment_controller_1.AppointmentController();
            await templateService.apiHandler({
                methodName: 'createAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAppointmentController_getAllAppointments = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        technicianId: { "in": "query", "name": "technicianId", "dataType": "string" },
    };
    app.get('/api/appointment', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(appointment_controller_1.AppointmentController)), ...((0, runtime_1.fetchMiddlewares)(appointment_controller_1.AppointmentController.prototype.getAllAppointments)), async function AppointmentController_getAllAppointments(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_getAllAppointments, request, response });
            const controller = new appointment_controller_1.AppointmentController();
            await templateService.apiHandler({
                methodName: 'getAllAppointments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAppointmentController_getAppointment = {
        appointmentId: { "in": "path", "name": "appointmentId", "required": true, "dataType": "string" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/api/appointment/:appointmentId', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(appointment_controller_1.AppointmentController)), ...((0, runtime_1.fetchMiddlewares)(appointment_controller_1.AppointmentController.prototype.getAppointment)), async function AppointmentController_getAppointment(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_getAppointment, request, response });
            const controller = new appointment_controller_1.AppointmentController();
            await templateService.apiHandler({
                methodName: 'getAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
