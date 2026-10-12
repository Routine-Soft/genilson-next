import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import { buscarSenhasAcesso } from "@/models/senhaAcessoModel";
import { authenticateDesenvolvedor } from "@/app/middlewares/authenticateDesenvolvedor";

type SenhasBody = {
  estudo?: string;
  prova?: string;
};

function formatarSenhas(senhas: { estudo: string; prova: string; updatedAt: Date }) {
  return {
    estudo: senhas.estudo,
    prova: senhas.prova,
    updatedAt: senhas.updatedAt,
  };
}

/* ===================== VER SENHAS ATUAIS ===================== */
export async function GET(request: Request) {
  try {
    authenticateDesenvolvedor(request);
  } catch {
    return NextResponse.json({ message: "Faça login novamente" }, { status: 401 });
  }

  try {
    await connectDB();
    const senhas = await buscarSenhasAcesso();
    return NextResponse.json(formatarSenhas(senhas));
  } catch {
    return NextResponse.json(
      { message: "Erro ao buscar as senhas" },
      { status: 500 }
    );
  }
}

/* ===================== TROCAR SENHAS ===================== */
export async function PUT(request: Request) {
  try {
    authenticateDesenvolvedor(request);
  } catch {
    return NextResponse.json({ message: "Faça login novamente" }, { status: 401 });
  }

  try {
    await connectDB();

    const body: SenhasBody = await request.json();
    const senhas = await buscarSenhasAcesso();

    for (const tipo of ["estudo", "prova"] as const) {
      if (body[tipo] === undefined) continue;

      const nova = String(body[tipo]).trim();

      // As páginas de prova do site só aceitam números
      if (!/^\d+$/.test(nova)) {
        return NextResponse.json(
          { message: `A senha ${tipo === "estudo" ? "do estudo" : "da prova"} deve ter só números` },
          { status: 400 }
        );
      }

      senhas[tipo] = nova;
    }

    await senhas.save();

    return NextResponse.json(formatarSenhas(senhas));
  } catch {
    return NextResponse.json(
      { message: "Erro ao salvar as senhas" },
      { status: 500 }
    );
  }
}
