const socket = io.connect();

socket.on(`products`, function () {
  renderProductList();
});

// fetch para productos
const formProduct = document.getElementById("formProduct");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();
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
      socket.emit(`update`);
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
