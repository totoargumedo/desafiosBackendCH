export function formProductsHTML() {
  return `<form id="formProduct">
          <!-- Datos -->
          <fieldset>
            <label>Nombre: <input type="text" name="nombre" required /></label>
            <label
              >Descripción: <input type="text" name="descripcion" required
            /></label>
            <label
              >Codigo de Producto: <input type="text" name="codigo" required
            /></label>
            <label>Foto: <input type="url" name="foto" required /></label>
            <label
              >Precio: <input type="number" name="precio" required
            /></label>
            <label>Stock: <input type="number" name="stock" required /></label>
          </fieldset>

          <input type="submit" value="submit" />
        </form>`;
}
