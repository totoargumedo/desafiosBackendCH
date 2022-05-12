// Librerias
const express = require(`express`)
const multer = require(`multer`)

// Router
const routerFiles = require(`express`).Router()

// CONFIGURACION ADICIONAL
routerFiles.use(express.urlencoded({ extended: true }))
routerFiles.use(express.json())

// MULTER STORAGE CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `uploads`)},
    filename: function (req, file, cb){
        cb(null, Date.now() + `-` + file.fieldname )
    }
})

const upload = multer({storage: storage})
// REQUEST

    // GET

    routerFiles.get(`/`, (req,res)=>{
        res.render(`archivos`)
    })

    // POST

    routerFiles.post(`/uploadSingle`, upload.single(`myFile`), (req, res, next)=>{
        const file = req.file
        if (!file){
            const error = new Error (`Please upload a file`)
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
        res.redirect('/')
    })

    routerFiles.post(`/uploadMultiple`, upload.array(`myFiles`,12), (req, res,next)=>{
        const files = req.files
        if (!files){
            const error = new Error(`Please upload a file`)
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(files)
        res.redirect('/')
    })

module.exports = routerFiles