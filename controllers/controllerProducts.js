// Librerias
const express = require(`express`);

// Componentes
const Container = require(`../models/container`);

const productos = new Container("./database/productos.json");
// Router

const routerProductos = require(`express`).Router();

// CONFIGURACION ADICIONAL
routerProductos.use(express.urlencoded({ extended: true }));
routerProductos.use(express.json());

// REQUESTS
// GET

routerProductos.get(`/`, (req, res) => {
  console.log(`Solicitud GET de productos.json`);
  const showProducts = productos.getAll();
  res.render(`productos`, { showProducts: showProducts });
});

routerProductos.get(`/:id`, (req, res) => {
  console.log(`Solicitud GET de producto por ID`);
  const showProducts = productos.getById(req.params.id);
  res.render(`productos`, { showProducts: showProducts });
});

routerProductos.get(`/random`, (req, res) => {
  console.log(`Solicitud GET de producto Random`);
  res.json(productos.getRandom());
});

// POST

routerProductos.post(`/`, (req, res) => {
  console.log(`Solicitud POST para agregar producto a ${productos.fileRoute}`);
  try {
    const newObject = productos.save(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// PUT
routerProductos.put(`/:id`, (req, res) => {
  console.log(`Solicitud PUT para modificar producto con id: ${req.params.id}`);
  try {
    const modifiedObject = productos.modify(req.params.id, req.body);
    res.json(modifiedObject);
  } catch (err) {
    res.json({ error: err });
  }
});

// DELETE

routerProductos.delete(`/:id`, (req, res) => {
  console.log(
    `Solicitud DELETE para quitar producto de ${productos.fileRoute}`
  );
  res.json(productos.deleteById(req.params.id));
});

routerProductos.delete(`/`, (req, res) => {
  console.log(`Solicitud DELETE para limpiar ${productos.fileRoute}`);
  productos.deleteAll();
  res.json({ message: `${productos.fileRoute} cleared` });
});

module.exports = { routerProductos: routerProductos, productos: productos };
