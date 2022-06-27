export function messagesHTML() {
  const messagesLayout = ` <div class="container">
      <h3>Chat</h3>
      <p>Completa con tus datos antes de enviar el primer mensaje</p>
      <form id="formChat">
        <!-- Datos -->
        <fieldset>
          <label
            >Ingresa tu Correo: <input type="email" name="email" required
          /></label>
          <label
            >Ingresa tu Nombre: <input type="text" name="firstName" required
          /></label>
          <label
            >Ingresa tu Apellido: <input type="text" name="lastName" required
          /></label>
          <label
            >Ingresa Edad: <input type="number" name="age" required
          /></label>
          <label
            >Ingresa un alias: <input type="text" name="alias" required
          /></label>
          <label
            >Ingresa un avatar: <input type="text" name="avatar" required
          /></label>
        </fieldset>
        <!-- Mensaje -->
        <fieldset>
          <label
            >Escribe tu mensaje:
            <textarea
              id="messageArea"
              name="message"
              rows="3"
              cols="30"
              placeholder="Hello There!"
            ></textarea>
          </label>
        </fieldset>
        <input type="submit" value="submit" />
      </form>
      <!-- Chat -->
      <div class="container" id="chatBox"></div>
    </div>`;
  return messagesLayout;
}
