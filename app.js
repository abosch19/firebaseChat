(function () {
  var firebase = false;
  var firebase = new Firebase('https://chatfirebaseweb.firebaseio.com/');
  if(firebase) console.log("Firebase connected!");
  else console.error("Failed to connect!");
  var enterCode = 13;
  var loading = true;
  var user = "Roberto";
  var sendButton = document.getElementById('send-button');
  var chat = document.getElementById('chat');
  var room = roomConnect("room1");
  sendButton.addEventListener("click",sendMessage);
  document.addEventListener("keydown", function (ev) {
    if(ev.keyCode == enterCode) sendMessage();
  });

  room.on("child_added", function (snapshot) {
    //if(!newItems) return;
    var messageRecived = snapshot.val();
    //console.log("User:",messageRecived.user);
    //console.log("Message:",messageRecived.message);
    displayMessage(messageRecived.user,messageRecived.message);
  });

  /*firebase.once("value", function (){
    newItems = true;
  })*/

  function displayMessage (user,message) {
    //Creación de los elementos
    if(loading) spinStatus(false);

    var userText = document.createElement('p');
    var messageText = document.createElement('p');
    var chatslide = document.createElement('div');
    var userTextNode = document.createTextNode(user);
    var messageTextNode = document.createTextNode(message);

    //Añadiendo atributos
    userText.setAttribute("class","user");
    messageText.setAttribute("class","message");
    chatslide.setAttribute("class","chat-slide");

    //appendChild
    userText.appendChild(userTextNode);
    messageText.appendChild(messageTextNode);
    chatslide.appendChild(userText);
    chatslide.appendChild(messageText);

    chat.appendChild(chatslide);

    scrollChat(chat);
  }

  function sendMessage (ev){
    var input = document.getElementById('message');
    var inputText = input.value;
    if(inputText != '') {
      room.push({user: user,message: inputText});
      input.value = "";
    }
  }

  function scrollChat(chat) {
    chat.scrollTop = chat.scrollHeight;
  }

  function roomConnect(roomName) {
    var roomLink = 'https://chatfirebaseweb.firebaseio.com/rooms/' + roomName + '/chat/';
    try {
      var newRoom = new Firebase(roomLink);
      console.log("Connected with room " + roomName);
      return newRoom;
    } catch(err){
      console.error("Failed to connect " + roomName, err);
    }
  }

  function spinStatus(status) {
    var spin = document.getElementById('spin-container');
    if(!status) {
      spin.style.display = "none";
      loading = false;
    } else {
      spin.style.display = "yes";
      loading = true;
    }
  }
}())
