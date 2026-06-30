const express = require("express")
const uploadRoutes = require("./routes/uploadRoutes")
const path = require("path")

const app = express()

app.use(express.json())

app.use("/api", uploadRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", (req, res)=> {
    res.send("Blog API is running....")
})

app.listen(5000, ()=> {
    console.log("Server running....")
})