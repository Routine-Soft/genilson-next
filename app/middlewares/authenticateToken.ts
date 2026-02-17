import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = "123";

export interface AuthenticatedUser extends JwtPayload {
  id: string;
  email: string;
}

export function authenticateToken(request: Request): AuthenticatedUser {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Token não fornecido");
  }

  try {
    const decoded = jwt.verify(authHeader, secretKey);

    if (typeof decoded === "string") {
      throw new Error("Token inválido");
    }

    return decoded as AuthenticatedUser;
  } catch (error) {
    throw new Error("Token inválido");
  }
}
