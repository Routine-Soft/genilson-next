import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/database/db";
import GabaritoModel from "@/models/gabaritoModel";

type JwtPayload = {
  email: string;
  userId: string;
};

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const secretKey = process.env.JWT_SECRET;

  if (!authHeader || !secretKey) return false;

  try {
    jwt.verify(authHeader, secretKey) as JwtPayload;
    return true;
  } catch {
    return false;
  }
}

/* PATCH */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    if (!verifyToken(request)) {
      return NextResponse.json(
        { mensagem: "Token inválido" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const updates = await request.json();

    const atualizado = await GabaritoModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!atualizado) {
      return NextResponse.json(
        { mensagem: "gabarito não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(atualizado, { status: 200 });

  } catch {
    return NextResponse.json(
      { mensagem: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/* DELETE */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    if (!verifyToken(request)) {
      return NextResponse.json(
        { mensagem: "Token inválido" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const deletado = await GabaritoModel.findByIdAndDelete(id);

    if (!deletado) {
      return NextResponse.json(
        { mensagem: "gabarito não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "gabarito deletado com sucesso" },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
