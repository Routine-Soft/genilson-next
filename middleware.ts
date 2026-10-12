import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://app.cestsegtrabalho.com.br",
  "https://www.cestsegtrabalho.com.br",
  "https://cestsegtrabalho.com.br",
  "https://genilson-next.vercel.app",
];

// Rotas públicas chamadas pelas páginas do site (qualquer domínio)
const publicPaths = ["/api/senha-acesso/validar"];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const origemPermitida =
    allowedOrigins.includes(origin) ||
    (origin !== "" && publicPaths.includes(request.nextUrl.pathname));

  if (request.method === "OPTIONS") {
    if (!origemPermitida) {
      return new NextResponse(null, { status: 403 });
    }

    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization",
      },
    });
  }

  const response = NextResponse.next();

  if (origemPermitida) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
