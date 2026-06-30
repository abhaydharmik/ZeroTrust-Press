const multer = require("multer")
const path = require("path")

// Configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null,  uniqueName)
    }
})

// Allow only image files

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    )

    const mimeType = allowedTypes.test(file.mimetype)

    if(extName && mimeType){
        cb(null, true)
    }else{
        cb(new Error("Only image files are allowed"))
    }
}

const upload = multer({
    storage, fileFilter
})


module.exports = upload