import mongoose from "mongoose";

export const AuthorSchema = new mongoose.Schema({
  email: { type: String, require: true },
  nombre: { type: String, require: true },
  apellido: { type: String, require: true },
  edad: { type: Number, require: true },
  alias: { type: String, require: true },
  avatar: { type: String, require: true },
});
