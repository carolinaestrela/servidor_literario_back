const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LivrosSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    nome: { type: String, required: true }
});

const livrosModel = mongoose.model("livros", LivrosSchema)

module.exports = livrosModel;