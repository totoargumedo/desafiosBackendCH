export function menusHTML() {
  let menuLayout = `<nav class="navbar navbar-expand-lg bg-light">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">
            API
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="buttonProducts">
            PRODUCTOS
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="buttonMessages">
            MENSAJES
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="buttonTest">
            TEST
          </a>
        </li>
      </ul>
    </nav>
    <div class="container">
        <h2>Bienvenido: </h2>
        <p>El sitio se encuentra en construcción, usa la barra de navegación</p>
    </div>
    <div class="container" id="contentContainer"><img src="./js/assets/workInProgress.svg" class="img-fluid" alt="Sitio en construcción"></div>
    <div class="container">
        <button type="button" class="btn btn-light" id="logOutButton">
          Log Out
        </button>
      </div>`;
  return menuLayout;
}
