// Librerias
const express = require(`express`);

// Componentes
const Container = require(`../models/container`);
const connectConfig = require(`../db/config/conections`);

// const productos = new Container(connectConfig.mariaDB, `articulos`);
// Router

const routerProductos = require(`express`).Router();

// CONFIGURACION ADICIONAL
routerProductos.use(express.urlencoded({ extended: true }));
routerProductos.use(express.json());

// REQUESTS
// GET

routerProductos.get(`/`, (req, res) => {
  const productos = new Container(connectConfig.mariaDB, `articulos`);
  console.log(`Solicitud GET de productos.json`);
  productos
    .getAll()
    .then((data) => {
      const showProducts = data;
      res.render(`productos`, { showProducts: showProducts });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => productos.close());
});

routerProductos.get(`/:id`, (req, res) => {
  const productos = new Container(connectConfig.mariaDB, `articulos`);
  console.log(`Solicitud GET de producto por ID`);
  productos
    .getById(req.params.id)
    .then((data) => {
      const showProducts = data;
      res.render(`productos`, { showProducts: showProducts });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => productos.close());
});

routerProductos.get(`/random`, (req, res) => {
  const productos = new Container(connectConfig.mariaDB, `articulos`);
  console.log(`Solicitud GET de producto Random`);
  productos
    .getRandom()
    .then((data) => {
      const showProducts = data;
      res.render(`productos`, { showProducts: showProducts });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => productos.close());
});

// POST

routerProductos.post(`/`, (req, res) => {
  const productos = new Container(connectConfig.mariaDB, `articulos`);
  console.log(`Solicitud POST para agregar producto a ${productos.tableName}`);
  productos
    .save(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => productos.close());
});

// PUT
routerProductos.put(`/:id`, (req, res) => {
  const productos = new Container(connectConfig.mariaDB, `articulos`);
  console.log(`Solicitud PUT para modificar producto con id: ${req.params.id}`);
  productos
    .modify(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => productos.close());
});

// DELETE

routerProductos.delete(`/:id`, (req, res) => {
  console.log(
    `Solicitud DELETE para quitar producto de ${productos.tableName}`
  );
  productos
    .deleteById(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => productos.close());
});

routerProductos.delete(`/`, (req, res) => {
  console.log(`Solicitud DELETE para limpiar ${productos.fileRoute}`);
  productos.deleteAll();
  res.json({ message: `${productos.fileRoute} cleared` });
});

module.exports = routerProductos;
