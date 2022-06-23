import express from "express";
import productsRouter from "./router/products.js";

// Inicializar server
const app = express();

// options

app.use(express.json());

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(`Error en el server: ${error}`);
});
// routers
app.use(
  `/api/productos`,
  new productsRouter(
    "ACA VA LA URL DEL DBATLAS" //reemplazar con la URL a la DB
  )
);
