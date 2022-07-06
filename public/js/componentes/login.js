export function loginHTML() {
  const loginLayout = `<!-- LOG IN -->
      <div class="container" id="loginScreen">
        <h2>Bienvenido</h2>
        <p>Ingresa tu usuario para acceder</p>
        <form id="formLogin">
          <!-- Datos -->
          <fieldset>
            <label>User: <input type="text" name="name" required /></label>
            <label
              >Password: <input type="password" name="password" required
            /></label>
          </fieldset>

          <input class="btn btn-light" type="submit" value="Log In" id="loginButton"/>
        </form>
      </div>`;
  return loginLayout;
}
