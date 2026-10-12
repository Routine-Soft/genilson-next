import jwt from "jsonwebtoken";

// Confere o token do painel /desenvolvedor (aceita "Bearer <token>" ou só o token)
export function authenticateDesenvolvedor(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Token não fornecido");
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string" || decoded.papel !== "desenvolvedor") {
      throw new Error("Token inválido");
    }

    return decoded;
  } catch {
    throw new Error("Token inválido");
  }
}
