require("dotenv").config();

const express = require("express")
const cors = require("cors")
const path = require("path")


const connectDB = require("./config/db")

const adminRoutes = require("./routes/adminRoutes")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const uploadRoutes = require("./routes/uploadRoutes")

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/upload", uploadRoutes)

app.use("/api/admin", adminRoutes)

app.get("/", (req, res)=> {
    res.send("Blog API is running....")
})

app.listen(5000, ()=> {
    console.log("Server running....")
})