// Librerias
const express = require(`express`)

// Router
const routerFiles = require(`express`).Router()

// CONFIGURACION ADICIONAL
routerFiles.use(express.urlencoded({ extended: true }))
routerFiles.use(express.json())

module.exports = routerFiles