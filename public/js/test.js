function renderProductList() {
  fetch(`/api/productos/test`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
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

renderProductList();
