const express = require("express")
const {MovieModel} = require("../models/movieModel")
const {auth} = require("../middlewares/movie.middleware")

const movieRouter = express.Router()
movieRouter.use(auth)

// Create Movie
movieRouter.post("/create", async(req, res)=>{
    try {
        const movie = new MovieModel(req.body)
        await movie.save()
        res.status(200).send({"msg":"Movie Added Successfully"})
    } catch (error) {
        res.status(400).send({"Error":error})
    }
})

// Read Movie
movieRouter.get("/", async(req, res)=>{
    try {
        const movie = await MovieModel.find()
        res.send({"Movies":movie})
    } catch (error) {
        res.send({"Error":error})
    }
})

// Update Movie By _id
movieRouter.patch("/update/:movieID", async(req, res)=>{
    const {movieID} = req.params
    try {
        await MovieModel.findByIdAndUpdate({_id:movieID}, req.body)
        res.send({"msg":`movie id ${movieID} has been updated`})
    } catch (error) {
        res.send(error)
    }
})

// Delete Movie By _id
movieRouter.delete("/delete/:movieID", async(req, res)=>{
    const {movieID} = req.params
    try {
        await MovieModel.findByIdAndDelete({_id:movieID}, req.body)
        res.send({"msg":`movie id ${movieID} has been deleted`})
    } catch (error) {
        res.send(error)
    }
})

module.exports = {movieRouter}