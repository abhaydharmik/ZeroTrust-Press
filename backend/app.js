const express = require("express");
const blogRoutes  = require("./routes/blogRoutes")

const app = express();

app.use(express.json())
app.use("/api/blogs", blogRoutes)

app.use("/uploads", express.static("uploads"))

app.get("/", (req, res)=> {
    res.send("Blog API Running....")
})

app.listen(5000, ()=> {
    console.log(`Blog API running....`)
})