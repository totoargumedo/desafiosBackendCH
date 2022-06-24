const socket = io.connect();

// sockets

socket.on(`messages`, function () {
  renderTableChat();
});

socket.on(`products`, function () {
  renderProductList();
});

// fetch para productos
const formProduct = document.getElementById("formProduct");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault;
  const formData = new FormData(formProduct);
  const newProduct = {
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    codigo: formData.get("codigo"),
    foto: formData.get("foto"),
    precio: formData.get("precio"),
    stock: formData.get("stock"),
  };

  fetch(`/api/productos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newProduct),
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      formProduct.reset();
      socket.emit(`update`, `Se agrego producto nuevo`);
    })
    .catch((error) => console.log(error));
});

function renderProductList() {
  fetch(`/api/productos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      let productList = "";
      productos.forEach((element) => {
        productList = productList.concat(
          `<p><strong>${element.nombre}: </strong><em>${element.precio}</em></p>`
        );
      });
      document.getElementById("productList").innerHTML = productList;
    })
    .catch((error) => console.log(error));
}

// socket para mensajes
const chatForm = document.getElementById(`formChat`);

chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const formData = new FormData(chatForm);
  const newMessage = {
    author: {
      id: formData.get("email"),
      nombre: formData.get("firstName"),
      apellido: formData.get("lastName"),
      edad: formData.get("age"),
      alias: formData.get("alias"),
      avatar: formData.get("avatar"),
    },
    message: formData.get("message"),
  };

  fetch(`/api/mensajes`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newMessage),
  })
    .then((respuesta) => respuesta.json())
    .then((mensaje) => {
      document.getElementById(`messageArea`).value = ``;
      document.getElementById(`messageArea`).focus();
      socket.emit(`new-message`, `Se agrego un nuevo mensaje`);
    })
    .catch((error) => console.log(error));
});

function renderTableChat() {
  fetch(`/api/mensajes`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((respuesta) => respuesta.json())
    .then((mensajes) => {
      let chatBox = "";
      mensajes.forEach((element) => {
        chatBox = chatBox.concat(
          `<p><strong>${element.author.id}: </strong><em>${element.message}</em></p>`
        );
      });
      document.getElementById("chatBox").innerHTML = chatBox;
    })
    .catch((error) => console.log(error));
}
