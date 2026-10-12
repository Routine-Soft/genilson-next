import mongoose from 'mongoose'

// Senhas que o aluno digita para estudar (curso) e para fazer a prova.
// Fica um único documento nesta coleção.
const senhaAcessoSchema = new mongoose.Schema({
    estudo: {
        type: String,
        required: true
    },
    prova: {
        type: String,
        required: true
    }
}, {timestamps: true})

const senhaAcessoModel = mongoose.models.senhaacesso || mongoose.model('senhaacesso', senhaAcessoSchema)

// Busca o documento das senhas; na primeira vez cria com as senhas que estavam no código
export async function buscarSenhasAcesso() {
    let senhas = await senhaAcessoModel.findOne()
    if (!senhas) {
        senhas = await senhaAcessoModel.create({ estudo: '123', prova: '456' })
    }
    return senhas
}

export default senhaAcessoModel
