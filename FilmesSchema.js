const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FilmesSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    nome: { type: String, required: true },
    ano: { type: Number, required: true },
    genero: { type: String },
    sinopse: { type: String },
    imagem: { type: String, required: true },
    livro_id: { type: Schema.Types.ObjectId }
});

const filmesModel = mongoose.model("filmes", FilmesSchema)

module.exports = filmesModel;
