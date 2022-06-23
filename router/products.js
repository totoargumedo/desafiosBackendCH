// Librerias y componentes
import express, { json } from "express";
import ApiProductsMock from "../api/productos.js";
import Products from "../contenedor/products.js";

class productsRouter extends express.Router {
  constructor(dbUrl) {
    super();

    const productos = new Products(dbUrl);
    const productosMock = new ApiProductsMock();

    // admin options

    let administrador = true;

    this.use(express.json());
    // requests

    // buscar productos por id o traer todos
    this.get(`/:id?`, (req, res) => {
      if (req.params.id) {
        productos
          .getById(req.params.id)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            throw new Error({ error: err });
          });
      } else {
        productos
          .getAll()
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            throw new Error({ error: err });
          });
      }
    });

    // agregar productos
    this.post(`/`, (req, res) => {
      if (administrador) {
        productos
          .saveProduct(req.body)
          .then((newProduct) => {
            res.status(200).json({
              message: "Producto agregado correctamente",
              producto: newProduct,
            });
          })
          .catch((err) => {
            throw new Error({ error: err });
          });
      } else {
        res.status(401).json({
          error: new Error(`Acceso no autorizado`),
          descripcion: `carga de datos sin permiso`,
          ruta: req.path,
          método: req.method,
        });
      }
    });

    // actualizar productos,  solo actualizar stock
    this.put(`/:id`, (req, res) => {
      if (administrador) {
        if (req.query.stock) {
          productos
            .modifyStock(req.params.id, req.query.stock)
            .then((data) => {
              res.status(200).json({
                message: `Producto con id:${req.params.id} stock actualizado correctamente`,
                newStock: req.query.stock,
              });
            })
            .catch((err) => {
              throw new Error({ error: err });
            });
        } else {
          productos
            .modify(req.params.id, req.body)
            .then((data) => {
              res.status(200).json({
                message: `Producto con id:${req.params.id} actualizado correctamente`,
                oldProduct: data,
                newData: req.body,
              });
            })
            .catch((err) => {
              throw new Error({ error: err });
            });
        }
      } else {
        res.status(401).json({
          error: new Error(`Acceso no autorizado`),
          descripcion: `actualización de datos sin permiso`,
          ruta: `api/productos/${req.params.id}`,
          método: req.method,
        });
      }
    });

    // borrar productos por id
    this.delete(`/:id`, (req, res) => {
      if (administrador) {
        productos
          .deleteById(req.params.id)
          .then((data) => {
            res.status(200).json({
              message: `Producto con id:${req.params.id} eliminado correctamente`,
              product: data,
            });
          })
          .catch((err) => {
            throw new Error({ error: err });
          });
      } else {
        res.status(401).json({
          error: new Error(`Acceso no autorizado`),
          descripcion: `eliminación de datos sin permiso`,
          ruta: `api/productos/${req.params.id}`,
          método: req.method,
        });
      }
    });

    // mostrar productos fakeApi
    this.post(`/test`, async (req, res, next) => {
      if (administrador) {
        try {
          if (!req.query.quantity) {
            req.query.quantity = 5;
          }
          const productsTest = await productosMock.populate(
            Number(req.query.quantity)
          );
          res.status(200).json({
            test: "ok",
            products: productsTest,
          });
        } catch (error) {
          next(error);
        }
      } else {
        res.status(401).json({
          error: new Error(`Acceso no autorizado`),
          descripcion: `No tiene permisos para realizar el test`,
          ruta: `api/productos/test`,
          método: req.method,
        });
      }
    });
  }
}

export default productsRouter;
