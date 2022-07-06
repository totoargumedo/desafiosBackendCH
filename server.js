// Librerias y componentes
import express from "express";
import productsRouter from "./router/products.js";
import messagesRouter from "./router/messages.js";
import { Server } from "socket.io";
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

app.use(`/api/productos`, new productsRouter());
app.use(`/api/mensajes`, new messagesRouter());

// session store
import session from "express-session";
import sessionConfig from "./models/sessionLogin.js";

app.use(session(sessionConfig));

//login
app.get("/login", (req, res) => {
  if (!req.session.counter) {
    req.session.counter = 1;
    req.session.name = req.query.name;
    req.session.admin = false;
    res
      .status(200)
      .json({ name: req.session.name, counter: req.session.counter });
  } else {
    req.session.counter++;
    res
      .status(200)
      .json({ name: req.session.name, counter: req.session.counter });
  }
});

app.get("/login/destroy", (req, res) => {
  const name = req.session.name;
  req.session.destroy((err) => {
    if (err) {
      res.json({ error: "Olvidar sesion", description: err });
    } else {
      res.status(200).json({ name: name });
    }
  });
});

// static
app.use(express.static("public"));

// middlewares
app.use((req, res, next) => {
  // Imprime la hora cada vez que el servidor realiza una accion
  console.log(`Time: `, new Date().toLocaleString());
  next();
});

// sockets
const io = new Server(server);

io.on(`connection`, (socket) => {
  console.log(`Socket client connected`);

  socket.emit(`messages`);

  socket.emit(`products`);

  socket.on(`new-message`, () => {
    io.sockets.emit(`messages`);
  });

  socket.on(`update`, (data) => {
    io.sockets.emit(`products`);
  });
});
