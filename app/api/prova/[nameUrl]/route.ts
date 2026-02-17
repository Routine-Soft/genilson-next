import { NextRequest, NextResponse } from "next/server";
import Treino from "@/models/treinoModel";
import connectDB from "@/database/db";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ nameUrl: string }> }
) {
  try {
    await connectDB();

    const { nameUrl } = await context.params;

    const url = await Treino.findOne({ nameUrl });

    if (!url) {
      return NextResponse.json(
        { message: "nameUrl não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(url, { status: 200 });

  } catch {
    return NextResponse.json(
      { message: "Erro ao buscar nameUrl" },
      { status: 500 }
    );
  }
}
