import { formProductsHTML } from "./formProducts.js";

export function productsHTML() {
  const productsLayout = `<!-- PRODUCTOS -->
    <div class="container">
      <h3>Productos</h3>
      <p>Completa los datos del producto a cargar</p>
        ${formProductsHTML()}
        <!-- Listado productos -->
        <div class="container-md" id="productList"></div>
    </div>
    <script src="./js/productos.js"></script>`;
  return productsLayout;
}
