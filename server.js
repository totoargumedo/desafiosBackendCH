// Librerias
const express = require(`express`)
const {Router} = express

// Componentes
const Container = require(`./container`)

// APP para usar express
const app = express()

// PUERTO
const PORT = 8080

// SERVER INIT
const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en puerto: ${server.address().port}`)
})

server.on(`error`, error=>console.log(`Error en server: ${error}`))

// RUTAS ESTATICAS
app.use(express.static(`public`))
app.use(`/archivos`, express.static(`persistent`))

// CONFIGURACION ADICIONAL
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ROUTERS
const routerProductos = Router()
app.use(`/api/productos`, routerProductos)


// MIDDLEWARES
app.use((req,res,next)=>{
    // Imprime la hora cada vez que el servidor realiza una accion
    console.log(`Time: `, new Date().toLocaleString())
    next();
})

routerProductos.use((req,res,next)=>{
    // Imprime la hora cada vez que el servidor realiza una accion
    console.log(`Time: `, new Date().toLocaleString())
    next();
})

// REQUESTS
    // GET

const productos = new Container("./persistent/productos.json")
productos.read()//INICIAMOS EL ARCHIVO PERSISTENTE

routerProductos.get(`/`,(req,res)=>{
    console.log(`Solicitud GET de productos.json`)
    res.json(productos.getAll())
})

routerProductos.get(`/:id`,(req,res)=>{
    console.log(`Solicitud GET de producto por ID`)
    res.json(productos.getById(req.params.id))
})

routerProductos.get(`/random`,(req,res)=>{
    console.log(`Solicitud GET de producto Random`)
    res.json(productos.getRandom())
})

    // POST

routerProductos.post(`/`,(req,res)=>{
    console.log(`Solicitud POST para agregar producto a ${productos.fileRoute}`)
    res.json(productos.save(req.body))
})

// PUT
routerProductos.put(`/:id`,(req,res)=>{
    console.log(`Solicitud PUT para modificar producto con id: ${req.params.id}`)
    res.json(productos.modify(req.params.id, req.body))
})

// DELETE

routerProductos.delete(`/:id`,(req,res)=>{
    console.log(`Solicitud DELETE para quitar producto de ${productos.fileRoute}`)
    res.json(productos.deleteById(req.params.id))
})

routerProductos.delete(`/`,(req,res)=>{
    console.log(`Solicitud DELETE para limpiar ${productos.fileRoute}`)
    productos.deleteAll()
    res.json({message: `${productos.fileRoute} cleared`})

})