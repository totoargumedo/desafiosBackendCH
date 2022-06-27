// librerias
import mongoose from "mongoose";
import * as productsModel from "../models/products.js";

// clase productos
class Products {
  constructor() {
    this.URL = "ACA VA LA DB ATLAS"; //reemplazar con la URL a la DB
    this.collection = productsModel;
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

  async saveProduct(product) {
    try {
      const newProduct = await this.collection.products.create({
        ...product,
        timestamp: Date.now(),
      });
      return newProduct;
    } catch (error) {
      throw new Error(`Error al guardar el documento: ${error}`);
    }
  }

  async modify(id, product) {
    try {
      const productFind = await this.collection.products.findByIdAndUpdate(
        { _id: id },
        product
      );
      if (productFind) {
        return productFind;
      } else {
        throw new Error(`No existe el elemento con id: ${id}`);
      }
    } catch (error) {
      throw new Error(`Error al actualizar el documento: ${error}`);
    }
  }

  async modifyStock(id, stock) {
    try {
      const productFind = await this.collection.products.findByIdAndUpdate(
        { _id: id },
        { $set: { stock: stock } }
      );
      if (productFind) {
        return productFind;
      } else {
        throw new Error(`No existe el elemento con id: ${id}`);
      }
    } catch (error) {
      throw new Error(`Error al actualizar el documento: ${error}`);
    }
  }

  async getAll() {
    try {
      const productsFind = await this.collection.products.find({});
      return productsFind;
    } catch (error) {
      throw new Error(`Error al buscar los documentos: ${error}`);
    }
  }

  async getById(id) {
    try {
      const productFind = await this.collection.products.find({ _id: id });
      if (productFind) {
        return productFind;
      } else {
        throw new Error(`No existe el elemento con id: ${id}`);
      }
    } catch (error) {
      throw new Error(`Error al buscar el documento: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const productFind = await this.collection.products.findByIdAndDelete({
        _id: id,
      });
      if (productFind) {
        return productFind;
      } else {
        throw new Error(`No existe el elemento con id: ${id}`);
      }
    } catch (error) {
      throw new Error(`Error al borrar el archivo: ${error}`);
    }
  }

  async deleteAll() {
    try {
      const productsErase = await this.collection.products.deleteMany({});
      if (productsFind) {
        return productsErase;
      } else {
        throw new Error(`No existen elementos`);
      }
    } catch (error) {
      throw new Error(`Error al borrar los documentos: ${error}`);
    }
  }
}

export default Products;
