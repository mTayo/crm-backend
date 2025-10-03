import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Promise.reject({
        status: 401,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET|| '') as unknown as JwtPayload & {
        userId: string;
        scopes?: string[];
      };

      // Attach decoded user to request
      (request as any).user = decoded;


      if (scopes && scopes.length > 0) {
        const hasScope = scopes.every(
          (scope) =>
            decoded[scope] === true || decoded.scopes?.includes(scope)
        );

        if (!hasScope) {
          return Promise.reject({
            status: 403,
            message: "Forbidden: insufficient rights",
          });
        }
      }

      return decoded;
    } catch {
      return Promise.reject({
        status: 401,
        message: "Unauthorized: Invalid token",
      });
    }
  }

  return Promise.reject({
    status: 401,
    message: "Unsupported security scheme",
  });
}
