// Librerias
const express = require(`express`)

// Componentes
const Container = require(`../models/container`)

const productos = new Container("./database/productos.json")
// Router

const routerProductos = require(`express`).Router()

// CONFIGURACION ADICIONAL
routerProductos.use(express.urlencoded({ extended: true }))
routerProductos.use(express.json())

// REQUESTS
    // GET

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

module.exports = routerProductos