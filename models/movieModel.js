const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title:{type:String, required:true},
    year:{type:Number, required:true},
    genre:{type:String, required:true}
}, {
    versionKey:false
})

const MovieModel = mongoose.model("2movie", movieSchema)

module.exports = {MovieModel}