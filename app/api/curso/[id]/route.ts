import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Curso from "@/models/cursoModel";

interface Params {
  params: {
    id: string;
  };
}

// PATCH - Atualizar
export async function PATCH(request: Request, 
  context: { params: Promise<{id: string}> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const updates = await request.json();

    const cursoAtualizado = await Curso.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!cursoAtualizado) {
      return NextResponse.json(
        { message: "Curso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(cursoAtualizado, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro interno";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}

// DELETE - Deletar
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const cursoDeletado = await Curso.findByIdAndDelete(id);

    if (!cursoDeletado) {
      return NextResponse.json(
        { message: "Curso não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Curso deletado com sucesso" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro interno";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
