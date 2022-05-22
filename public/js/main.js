const socket = io.connect();

// Socket para formularios
const form = document.getElementById(`formProducts`);

// escuchar el formulario y realizar el post a la base de datos
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  //   console.log(e);
  const newProduct = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };
  //   console.log(newProduct);

  fetch(`/api/productos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newProduct),
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      form.reset();
      socket.emit(`update`, `Se agrego producto nuevo`);
    })
    .catch((error) => console.log(error));
});

// devolver al cliente los productos cargador en vivo

function renderTableProductsHBS(showProducts) {
  fetch(`templates/productsTable.handlebars`)
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      let template = Handlebars.compile(plantilla);
      let html = template({ showProducts: showProducts });
      document.getElementById(`table`).innerHTML = html;
    });
}

socket.on(`products`, function (products) {
  renderTableProductsHBS(products);
});

// socket para mensajes
const listenMessage = document.getElementById(`formChat`);

listenMessage.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const message = {
    name: listenMessage[0].value,
    message: listenMessage[1].value,
  };
  socket.emit(`new-message`, message);
  document.getElementById(`chatMessage`).value = ``;
  document.getElementById(`chatMessage`).focus();
});

function renderTableChatHBS(messages, cb) {
  fetch(`templates/chatTable.handlebars`)
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      let template = Handlebars.compile(plantilla);
      let html = template({ messages: messages });
      document.getElementById(`chat`).innerHTML = html;
    });
}

socket.on(`messages`, function (messages) {
  renderTableChatHBS(messages);
});
