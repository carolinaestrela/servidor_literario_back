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

/*
 - buscar por livros cujo nome contém com o texto pesquisado
 -- exemplo: 
 --- texto: "titanic"
 --- na collection livros: "titanic 1", "titanic 2"
 - com os livros em mãos, usar os _id para buscar por filmes com livro_id = _id
 - retornar os filmes obtidos
 */

const busca = async (textoPesquisa) => {
    const livros = await livrosModel.find ({ nome: new RegExp(textoPesquisa,'i')})
    return livros
    
}

module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
    busca
}