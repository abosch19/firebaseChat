(function () {

  //Variables declariaton
  var firebase = new Firebase('https://chatfirebaseweb.firebaseio.com/');
  if(firebase) console.log("Firebase connected!");
  else console.error("Failed to connect!");
  var enterCode = 13;
  var loading = true;
  var myUser = "Roberto";
  var sendButton = document.getElementById('send-button');
  var chat = document.getElementById('chat');
  var room = roomConnect("room1");
  var input = document.getElementById('message');


  sendButton.addEventListener("click",sendMessage);
  document.addEventListener("keydown", function (ev) {
    if(ev.keyCode == enterCode) sendMessage();
    input.focus();
      
  });

  room.on("child_added", function (snapshot) {
    //if(!newItems) return;
    var messageRecived = snapshot.val();
    //console.log("User:",messageRecived.user);
    //console.log("Message:",messageRecived.message);
    displayMessage(messageRecived.user,messageRecived.message,messageRecived.date);
  });

  firebase.once("value", function (snapshot){
    if(snapshot.val() == null) spinStatus(false);
  })

  function displayMessage (user,message,time) {
    //Creación de los elementos
    if(loading) spinStatus(false);

    var userText = document.createElement('p');
    var date = document.createElement('i');
    var userIcon = document.createElement('span');
    var messageText = document.createElement('p');
    var chatslide = document.createElement('div');
    var userTextNode = document.createTextNode(user);
    var messageTextNode = document.createTextNode(message);
    var timeString = document.createTextNode(time);


    //Añadiendo atributos
    if(user == myUser)userIcon.setAttribute("class","fa fa-user userIcon chat-slide-top myUser");
    else userIcon.setAttribute("class","fa fa-user userIcon chat-slide-top");
    userText.setAttribute("class","user chat-slide-top");
    date.setAttribute("class","chat-slide-top");
    messageText.setAttribute("class","message");
    chatslide.setAttribute("class","chat-slide");

    //appendChild
    date.appendChild(timeString);
    userText.appendChild(userTextNode);
    messageText.appendChild(messageTextNode);
      
    //Creating chat-slide
    chatslide.appendChild(userIcon);
    chatslide.appendChild(userText);
    chatslide.appendChild(date);
    chatslide.appendChild(messageText);

    chat.appendChild(chatslide);

    scrollChat(chat);
  }

  function sendMessage (ev){
    var inputText = input.value;
    var time = new Date().toLocaleString();
    if(inputText != '') {
      room.push({user: myUser,message: inputText,date: time});
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
