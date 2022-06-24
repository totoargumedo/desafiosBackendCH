import mongoose from "mongoose";
import { AuthorSchema } from "./messageAuthor.js";

const messagesCollection = "mensajes";

const MessageSchema = new mongoose.Schema({
  author: { type: AuthorSchema },
  message: { type: String, max: 240 },
});

export const messages = mongoose.model(messagesCollection, MessageSchema);
