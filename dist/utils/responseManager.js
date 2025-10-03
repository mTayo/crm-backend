"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseManager = void 0;
class ResponseManager {
    static success(data, message = "Success") {
        return { success: true, message, data };
    }
    static error(message) {
        return { success: false, message };
    }
    static validationError(errors) {
        return { success: false, validationErrors: errors };
    }
    static rawError(message) {
        // You can return just a string if you want minimal response
        return { success: false, raw: message };
    }
    static acknowledge() {
        return { received: true };
    }
    static redirect(url) {
        return { redirect: url };
    }
}
exports.ResponseManager = ResponseManager;
