

export class ResponseManager {
  static success(data: any, message = "Success") {
    return { success: true, message, data };
  }

  static error(message: string) {
    return { success: false, message };
  }

  static validationError(errors: any) {
    return { success: false, validationErrors: errors };
  }

  static rawError(message: string) {
    // You can return just a string if you want minimal response
    return { success: false, raw: message };
  }

  static acknowledge() {
    return { received: true };
  }

  static redirect(url: string) {
    return { redirect: url };
  }
}

