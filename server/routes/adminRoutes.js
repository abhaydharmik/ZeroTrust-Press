const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const admin = require("../middleware/adminMiddleware")

router.get("/dashboard", authMiddleware, admin, (req, res)=> {
    res.status(200).json({
        success: true,
        message: "Welcome Admin",
        admin:  req.user,
    })
})

module.exports = router

