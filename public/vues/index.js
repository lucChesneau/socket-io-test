const socket = io();
const messages = document.getElementById('messages');
const onlineUl = document.getElementById('users-ul');
const form = document.getElementById('form');
const input = document.getElementById('input');



socket.emit('connexion_user', document.cookie);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value, document.cookie);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("connexion_user", function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
  
socket.on("disconnection_message", function(msg) {
  const item = document.createElement('li');
  msg == null ? item.textContent = "An anonyme user has left the chat" : item.textContent = msg + " has left the chat";
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("online_user", function(msgArray) {

  for (let i = 0; i < msgArray.length; i++) {
    const item = document.createElement('li');
    item.textContent = msgArray[i];
    onlineUl.appendChild(item);
  }
  
  window.scrollTo(0, document.body.scrollHeight);
});