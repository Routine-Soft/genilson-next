import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import HistoricoProva from "@/models/historicoProva";

type CreateHistoricoProvaBody = {
  tituloProva: string;
  name: string;
  email?: string;
  whatsapp: string;
  cpf: string;
};

/* ===================== CREATE ===================== */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body: CreateHistoricoProvaBody = await request.json();
    const { tituloProva, name, email, whatsapp, cpf } = body;

    // E-mail é opcional
    if (!tituloProva || !name || !whatsapp || !cpf) {
      return NextResponse.json(
        { message: "Preencha nome, CPF e WhatsApp" },
        { status: 400 }
      );
    }

    const novoHistoricoProva = new HistoricoProva({
      tituloProva,
      name,
      email: email ? email.trim().toLowerCase() : "",
      whatsapp,
      cpf,
    });

    await novoHistoricoProva.save();

    return NextResponse.json(novoHistoricoProva, { status: 201 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro interno ao criar histórico" },
      { status: 500 }
    );
  }
}
