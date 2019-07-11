const express = require('express')
const cors = require('../servidor_literario/node_modules/cors')
const bodyParser = require('../servidor_literario/node_modules/body-parser')
const controller = require('./FilmesController')

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/filmes', (request, response) => {
    controller.getAll()
        .then(filmes => response.send(filmes))
        .catch(error => {
            console.error(error)
            response.sendStatus(500)
        })
})

/*
 - buscar por livros cujo nome contém com o texto pesquisado
 -- exemplo: 
 --- texto: "titanic"
 --- na collection livros: "titanic 1", "titanic 2"
 - com os livros em mãos, usar os _id para buscar por filmes com livro_id = _id
 - retornar os filmes obtidos
 */

 

servidor.get('/filmes/:id', (request, response) => {
    const id = request.params.id
    controller.getById(id)
        .then(filme => {
            if (!filme) {
                response.sendStatus(404)
            } else {
                response.sendStatus(filme)
            }
        })
        .catch(error => {
            if (error.name === "CastError") {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.post('/filmes', (request, response) => {
    controller.add(request.body)
        .then(filme => {
            const _id = filme._id
            response.send(_id)
        })
        .catch(error => {
            if (error.name === "ValidationError") {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.patch('/filmes/:id', (request, response) => {
    const id = request.params.id
    controller.update(id, request.body)
        .then(filme => {
            if (!filme) { response.sendStatus(404) }
            else { response.sendStatus(filme) }
        })
        .catch(error => {
            if (error.name === "MongoError" || error.name === "CastError") {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.delete('/filmes/:id', (request, response) => {
    controller.remove(request.params.id)
        .then(filme => {
            if (filme === null || filme === undefined) {
                response.sendStatus(404)
            } else {
                response.sendStatus(204)
            }
        })
        .catch(error => {
            if (error.name === "CastError") {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.get ('/filmes/busca-por-livro/livro', (request, response) => {
    console.log (request.query.pesquisa)
    controller.busca(request.query.pesquisa)
    .then(livros => {
        if (livros === null || livros === undefined) {
            response.sendStatus(404)
        } else {
            response.send (livros)
        }
    })
    .catch(error => {
        if (error.name === "CastError") {
            response.sendStatus(400)
        } else {
            response.sendStatus(500)
        } 
    })
})

servidor.listen(3000)
console.log('servidor_literario rodando na porta 3000')