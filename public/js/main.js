import { menusHTML } from "./componentes/menu.js";
import { productsHTML } from "./componentes/productos.js";
import { messagesHTML } from "./componentes/mensajes.js";
import { testHTML } from "./componentes/test.js";
import { loginHTML } from "./componentes/login.js";
import { goodbyeHTML } from "./componentes/goodbye.js";

// login!
document.getElementById("primaryContainer").innerHTML = loginHTML();

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const formLogin = document.getElementById("formLogin");
  const loginData = new FormData(formLogin);
  const loginName = loginData.get("name");

  fetch(`/login/?name=${loginName}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      document.getElementById("loginScreen").remove();
      document.getElementById("primaryContainer").innerHTML = menusHTML(data);

      // products layout
      const buttonProducts = document.getElementById("buttonProducts");
      buttonProducts.addEventListener("click", (e) => {
        const addScript = document.createElement("script");
        addScript.setAttribute("type", "module");
        addScript.setAttribute("src", "./js/products.js");
        document.querySelector("body").append(addScript);
        document.getElementById("contentContainer").innerHTML = productsHTML();
      });

      // messages layout
      const buttonMessages = document.getElementById("buttonMessages");
      buttonMessages.addEventListener("click", (e) => {
        const addScript = document.createElement("script");
        addScript.setAttribute("type", "module");
        addScript.setAttribute("src", "./js/messages.js");
        document.querySelector("body").append(addScript);
        document.getElementById("contentContainer").innerHTML = messagesHTML();
      });

      // products test layout
      const buttonTest = document.getElementById("buttonTest");
      buttonTest.addEventListener("click", (e) => {
        const addScript = document.createElement("script");
        addScript.setAttribute("type", "module");
        addScript.setAttribute("src", "./js/test.js");
        document.querySelector("body").append(addScript);
        document.getElementById("contentContainer").innerHTML = testHTML();
      });

      // LogOut
      const logOutButton = document.getElementById("logOutButton");

      logOutButton.addEventListener("click", (e) => {
        console.log("holi");
        fetch(`/login/destroy`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
          .then((respuesta) => respuesta.json())
          .then((data) => {
            document.getElementById("primaryContainer").innerHTML =
              goodbyeHTML(data);
            setTimeout(() => {
              document.getElementById("primaryContainer").innerHTML =
                loginHTML();
            }, 2000);
          });
      });
      return buttonProducts, buttonMessages, buttonTest, logOutButton;
    })
    .catch((error) => console.log(error));
});
