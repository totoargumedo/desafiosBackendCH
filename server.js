// Librerias
const express = require(`express`);
const handlebars = require(`express-handlebars`);
const { Server: IOServer } = require(`socket.io`);

// Componentes y Routers
// const routerProductos = require(`./controllerProducts`)
// const routerFiles = require(`./controllerFiles`)
// Lo simplifique mas abajo

// APP para usar express
const app = express();

// Inicializar Routers
const routerProductos = require(`./controllers/controllerProducts`);

app.use(`/api/productos`, routerProductos);

app.use(`/api/files`, require(`./controllers/controllerFiles`));

// defino y seteo handlebars como motor de plantillas
app.engine(`handlebars`, handlebars.engine({}));

app.set(`view engine`, `handlebars`);

app.set(`views`, `./views`);

// PUERTO
const PORT = 8080;

// SERVER INIT
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en puerto: ${server.address().port}`);
  // productos.read() // Lo inicializo en la misma clase INICIAMOS EL ARCHIVO PERSISTENTE
});

server.on(`error`, (error) => console.log(`Error en server: ${error}`));

// RUTAS ESTATICAS
app.use(express.static(`public`));
app.use(`/database`, express.static(`database`));

// CONFIGURACION ADICIONAL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MIDDLEWARES
app.use((req, res, next) => {
  // Imprime la hora cada vez que el servidor realiza una accion
  console.log(`Time: `, new Date().toLocaleString());
  next();
});

// Requests
// LANDING
app.get(`/`, (req, res) => {
  console.log(`Landing cargado`);
  res.render(`home`);
});

// socket
const io = new IOServer(server);

const ClienteSQL = require(`./models/containerSqlite`);
const Container = require(`./models/container`);
const connectConfig = require(`./db/config/conections`);
const messagesApi = new ClienteSQL(connectConfig.sqlite3, `mensajes`);
const productos = new Container(connectConfig.mariaDB, `articulos`);

io.on(`connection`, async (socket) => {
  console.log(`Socket client connected`);

  socket.emit(`products`, await productos.getAll());

  socket.emit(`messages`, await messagesApi.listContent());

  socket.on(`update`, async (data) => {
    console.log(data);
    io.sockets.emit(`products`, await productos.getAll());
  });

  socket.on(`new-message`, async (data) => {
    await messagesApi.insertIntoTable(data);

    io.sockets.emit(`messages`, await messagesApi.listContent());
  });
});
