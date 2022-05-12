// Librerias
const express = require(`express`)
const handlebars = require(`express-handlebars`)

// Componentes y Routers
// const routerProductos = require(`./controllerProducts`)
// const routerFiles = require(`./controllerFiles`)
// Lo simplifique mas abajo


// APP para usar express
const app = express()

// Inicializar Routers
app.use(`/api/productos`, require(`./controllers/controllerProducts`))

app.use(`/api/files`, require(`./controllers/controllerFiles`))

// defino y seteo pug como motor de plantillas
app.set(`view engine`, `pug`)

// PUERTO
const PORT = 8080

// SERVER INIT
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en puerto: ${server.address().port}`)
    // productos.read() // Lo inicializo en la misma clase INICIAMOS EL ARCHIVO PERSISTENTE
})

server.on(`error`, error=>console.log(`Error en server: ${error}`))

// RUTAS ESTATICAS
app.use(express.static(`public`))
app.use(`/database`, express.static(`database`))

// CONFIGURACION ADICIONAL
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// MIDDLEWARES
app.use((req,res,next)=>{
    // Imprime la hora cada vez que el servidor realiza una accion
    console.log(`Time: `, new Date().toLocaleString())
    next();
})

// Requests
    // LANDING
    app.get(`/`, (req,res)=>{
        console.log(`Landing cargado`)
        res.render(`home`)
    })