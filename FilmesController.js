const { connect } = require('./FilmesRepository')
const filmesModel = require('./FilmesSchema')
const livrosModel = require('./LivrosSchema')

connect()

const getAll = async () => {
    const filmes = await filmesModel.find().exec()
    return filmes
}

const getById = async (id) => {
    const filme = await filmesModel.findById(id).exec()
    return filme
}

const add = (filme) => {
    const novoFilme = new filmesModel(filme)
    return novoFilme.save()
}

const remove = (id) => {
    return filmesModel.findByIdAndUpdate(id)
}

const update = (id, comida) => {
    return filmesModel.findByIdAndUpdate(
        id,
        { $set: filme },
        { new: true },
    )
}

const busca = async (textoPesquisa) => {
    const livros = await livrosModel.find({ nome: new RegExp(textoPesquisa, 'i') });
    const filmes = [];
    for (const livro of livros) {
        const id = livro._id;
        const resultado = await filmesModel.find({ livro_id: id });
        filmes.push(...resultado);
    }
    return filmes;
}

module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
    busca
}