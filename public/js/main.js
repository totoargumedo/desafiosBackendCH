import { menusHTML } from "./componentes/menu.js";
import { productsHTML } from "./componentes/productos.js";
import { messagesHTML } from "./componentes/mensajes.js";
import { testHTML } from "./componentes/test.js";
import { loginHTML } from "./componentes/login.js";

// login!
document.getElementById("primaryContainer").innerHTML = loginHTML();

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (e) => {
  document.getElementById("loginScreen").remove();
  document.getElementById("primaryContainer").innerHTML = menusHTML();

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

  // products layout
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
    window.location.reload();
  });

  return buttonProducts, buttonMessages, buttonTest, logOutButton;
});
