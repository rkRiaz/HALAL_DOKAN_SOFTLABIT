const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+Date.now()+'-'+file.originalname)
    }
})

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5 * 1024 * 1024
    // },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimeType = types.test(file.mimetype)

        if(extName && mimeType) {
            cb(null, true)
        } else {
            new Error('Only Supports Images')
        }
    } 
})

module.exports = upload