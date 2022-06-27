const socket = io.connect();

// sockets

socket.on(`messages`, function () {
  renderTableChat();
});

// socket para mensajes
const chatForm = document.getElementById(`formChat`);

chatForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const formData = new FormData(chatForm);
  const newMessage = {
    author: {
      email: formData.get("email"),
      nombre: formData.get("firstName"),
      apellido: formData.get("lastName"),
      edad: formData.get("age"),
      alias: formData.get("alias"),
      avatar: formData.get("avatar"),
    },
    text: formData.get("message"),
  };

  fetch(`/api/mensajes`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newMessage),
  })
    .then((respuesta) => respuesta.json())
    .then((mensaje) => {
      document.getElementById(`messageArea`).value = ``;
      document.getElementById(`messageArea`).focus();
      socket.emit(`new-message`, `Se agrego un nuevo mensaje`);
    })
    .catch((error) => console.log(error));
});

function renderTableChat() {
  fetch(`/api/mensajes`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((respuesta) => respuesta.json())
    .then((mensajes) => {
      let chatBox = "";
      mensajes.forEach((element) => {
        chatBox = chatBox.concat(
          `<p><strong>${element.author.email}: ${element.timestamp} </strong><em>${element.text}</em></p>`
        );
      });
      document.getElementById("chatBox").innerHTML = chatBox;
    })
    .catch((error) => console.log(error));
}
