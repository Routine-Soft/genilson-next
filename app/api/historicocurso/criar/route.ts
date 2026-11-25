import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import HistoricoCurso from "@/models/historicoCurso";

type CreateHistoricoCursoBody = {
  tituloCurso: string;
  name: string;
  email?: string;
  whatsapp: string;
  cpf: string;
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const body: CreateHistoricoCursoBody = await request.json();
    const { tituloCurso, name, email, whatsapp, cpf } = body;

    // E-mail é opcional
    if (!tituloCurso || !name || !whatsapp || !cpf) {
      return NextResponse.json(
        { message: "Preencha nome, CPF e WhatsApp" },
        { status: 400 }
      );
    }

    const novoHistoricoCurso = new HistoricoCurso({
      tituloCurso,
      name,
      email: email ? email.trim().toLowerCase() : "",
      whatsapp,
      cpf,
    });

    await novoHistoricoCurso.save();

    return NextResponse.json(novoHistoricoCurso, { status: 201 });

  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro interno ao criar histórico" },
      { status: 500 }
    );
  }
}
