import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Usuário que entra no painel /desenvolvedor do front
const desenvolvedorSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    }
}, {timestamps: true})

const desenvolvedorModel = mongoose.models.desenvolvedor || mongoose.model('desenvolvedor', desenvolvedorSchema)

// Na primeira vez cria o usuário padrão (admin / 123456), com a senha criptografada
export async function garantirDesenvolvedorPadrao() {
    const total = await desenvolvedorModel.countDocuments()
    if (total === 0) {
        const senha = await bcrypt.hash('123456', 10)
        await desenvolvedorModel.create({ usuario: 'admin', senha })
    }
}

export default desenvolvedorModel
