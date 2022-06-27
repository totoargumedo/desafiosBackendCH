import mongoose from "mongoose";
import { AuthorSchema } from "./messageAuthor.js";

const messagesCollection = "mensajes";

const MessageSchema = new mongoose.Schema({
  author: { type: AuthorSchema },
  text: { type: String, max: 240 },
  timestamp: { type: Date, require: true },
});

export const messages = mongoose.model(messagesCollection, MessageSchema);
