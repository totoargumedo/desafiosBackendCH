import mongoose from "mongoose";

const productsCollection = "productos";

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true, max: 140 },
  codigo: { type: String, require: true, unique: true },
  foto: { type: String, require: true },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
  timestamp: { type: Date, require: true },
});

export const products = mongoose.model(productsCollection, ProductSchema);
