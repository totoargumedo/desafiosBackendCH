// librerias
import mongoose from "mongoose";
import * as messageModel from "../models/messages.js";
import { normalize, denormalize, schema } from "normalizr";
import util from "util";

class Messages {
  constructor() {
    this.URL = "ACA VA LA DB ATLAS"; //reemplazar con la URL a la DB
    this.collection = messageModel;
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(this.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Conexion a la DB ${this.URL} establecida`);
    } catch (error) {
      throw new Error(`Hubo un error al conectarse a ${this.URL}: ${error}`);
    }
  }

  disconnect() {
    mongoose.disconnect();
    console.log(`DB ${this.URL} desconectada con exito`);
  }

  async saveMessage(message) {
    try {
      return await this.collection.messages.create({
        ...message,
        timestamp: Date.now(),
      });
    } catch (error) {
      throw new Error(`Error al guardar el documento: ${error}`);
    }
  }

  async getAll() {
    try {
      const messagesFind = await this.collection.messages.find({});
      return messagesFind;
    } catch (error) {
      throw new Error(`Error al buscar los documentos: ${error}`);
    }
  }

  async deleteAll() {
    try {
      const messagesErase = await this.collection.messages.deleteMany({});
      if (messagesErase) {
        return messagesErase;
      } else {
        throw new Error(`No existen elementos`);
      }
    } catch (error) {
      throw new Error(`Error al borrar los documentos: ${error}`);
    }
  }

  // async normalize() {
  //   const authorSchema = new schema.Entity(
  //     "authors",
  //     {},
  //     { idAttribute: "email" }
  //   );

  //   const messagesSchema = new schema.Entity(
  //     "mensajes",
  //     {
  //       author: authorSchema,
  //     },
  //     { idAttribute: "_id" }
  //   );

  //   const chatSchema = new schema.Entity("entradas", {
  //     id: "entradas",
  //     entries: [messagesSchema],
  //   });
  //   const messages = await this.collection.messages.find(
  //     {},
  //     { "author._id": 0, timestamp: 0 }
  //   );
  //   console.log(JSON.stringify(messages));
  //   // const messagesParsed = JSON.parse(messages);
  //   // const normalizedMessages = await normalize(messages, chatSchema);
  //   // console.log(JSON.stringify(normalizedMessages.entities));
  //   // function print(objeto) {
  //   //   console.log(util.inspect(objeto, false, 12, true));
  //   // }

  //   // print(normalizedMessages);
  // }
}

export default Messages;
