// app/api/user/[email]/route.ts

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import db from "@/database/db";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ email: string }> }
) {
  try {
    await db();

    const { email } = await context.params;

    if (!email) {
      return NextResponse.json(
        { message: "E-mail não fornecido" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Login feito com sucesso",
        user,
      },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { message: "Erro no servidor ao fazer login" },
      { status: 500 }
    );
  }
}
