import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/database/db";
import Desenvolvedor, { garantirDesenvolvedorPadrao } from "@/models/desenvolvedorModel";

type LoginBody = {
  usuario: string;
  senha: string;
};

export async function POST(request: Request) {
  try {
    await connectDB();
    await garantirDesenvolvedorPadrao();

    const body: LoginBody = await request.json();
    const usuario = String(body.usuario || "").trim().toLowerCase();
    const senha = String(body.senha || "");

    if (!usuario || !senha) {
      return NextResponse.json(
        { message: "Informe o usuário e a senha" },
        { status: 400 }
      );
    }

    const desenvolvedor = await Desenvolvedor.findOne({ usuario }).select("+senha");
    const senhaValida = desenvolvedor
      ? await bcrypt.compare(senha, desenvolvedor.senha)
      : false;

    if (!senhaValida) {
      return NextResponse.json(
        { message: "Usuário ou senha incorretos" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { usuario: desenvolvedor.usuario, papel: "desenvolvedor" },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    );

    return NextResponse.json({ token, usuario: desenvolvedor.usuario });
  } catch {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
