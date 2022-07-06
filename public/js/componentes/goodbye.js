export function goodbyeHTML(data) {
  const goodbyeLayout = `
      <div class="container" id="goodbyeScreen">
        <h2>Hasta luego ${data.name}</h2>
        <div class="container" id="contentContainer"><img src="./js/assets/goodbye.svg" class="img-fluid" alt="hasta luego"></div>
      </div>`;
  return goodbyeLayout;
}
