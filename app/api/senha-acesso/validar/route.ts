import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import { buscarSenhasAcesso } from "@/models/senhaAcessoModel";

type ValidarBody = {
  tipo: "estudo" | "prova";
  senha: string;
};

// Rota pública: o site e o app perguntam se a senha digitada pelo aluno está certa.
// Só responde verdadeiro/falso, a senha nunca é enviada para o navegador.
export async function POST(request: Request) {
  try {
    const body: ValidarBody = await request.json();
    const { tipo } = body;
    const senha = String(body.senha || "").trim();

    if (tipo !== "estudo" && tipo !== "prova") {
      return NextResponse.json(
        { message: "Tipo de senha inválido" },
        { status: 400 }
      );
    }

    await connectDB();
    const senhas = await buscarSenhasAcesso();

    return NextResponse.json({ valida: senha !== "" && senha === senhas[tipo] });
  } catch {
    return NextResponse.json(
      { message: "Erro ao validar a senha" },
      { status: 500 }
    );
  }
}
