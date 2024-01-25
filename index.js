const express = require("express")
const dotenv = require("dotenv").config()
const {connection} = require("./db")
const cors = require("cors")
const {userRouter} = require("./routes/userRoute")
const {movieRouter} = require("./routes/movieRoute")

const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/movie", movieRouter)

app.get("/", (req, res)=>{
    req.header("Content/type", "text/html")
    res.send("<h1>Welcome to Home Page</h1>")
})
app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on Port ${PORT} and db is connected`)
    } catch (error) {
        console.log("error: ", error)
    }
})