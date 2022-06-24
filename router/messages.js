// Librerias y componentes
import express, { json } from "express";
import Messages from "../contenedor/messages.js";

class messagesRouter extends express.Router {
  constructor() {
    super();

    const mensajes = new Messages();

    // admin options

    let administrador = true;

    this.use(express.urlencoded({ extended: true }));
    this.use(express.json());
    // requests

    // buscar mensajes por id o traer todos
    this.get(`/:id?`, (req, res) => {
      if (req.params.id) {
        mensajes
          .getById(req.params.id)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            throw new Error({ error: err });
          });
      } else {
        mensajes
          .getAll()
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            throw new Error({ error: err });
          });
      }
    });

    // agregar mensajes
    this.post(`/`, (req, res) => {
      if (administrador === true) {
        mensajes
          .saveMessage(req.body)
          .then((newMessage) => {
            res.status(200).json({
              message: "Mensaje agregado correctamente",
              producto: newMessage,
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

    // borrar mensaje por id
    this.delete(`/:id`, (req, res) => {
      if (administrador) {
        mensajes
          .deleteById(req.params.id)
          .then((data) => {
            res.status(200).json({
              message: `Mensaje con id:${req.params.id} eliminado correctamente`,
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
  }
}

export default messagesRouter;
