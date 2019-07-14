const mongoose = require("mongoose");

function connect() {
    mongoose.connect(process.env.MONGODB_URI,
        { useNewUrlParser: true },
        function (error) {
            if (error) {
                console.error("Deu erro: ", error)
            } else {
                console.log("Conectamos no mongodb!")
            }
        });
}

module.exports = { connect };