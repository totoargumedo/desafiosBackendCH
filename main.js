// Librerias
const express = require(`express`)

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

// REQUESTS
// GET

app.get(`/`,(req,res)=>{
    res.send(`<h1 style="color:red">Desafio 3 NODE CH</h1>`)
})

const productos = new Container("./persistent/productos.json")
productos.read()//INICIAMOS EL ARCHIVO PERSISTENTE

app.get(`/productos`,(req,res)=>{
    res.json(productos.getAll())
    console.log(`Solicitud GET de productos`)
})

app.get(`/productoRandom`,(req,res)=>{
    res.json(productos.getRandom())
    console.log(`Solicitud GET de producto Random`)
})