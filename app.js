(function () {
  var firebase = new Firebase('https://chatfirebaseweb.firebaseio.com/');
  if(firebase) console.log("Firebase connected!");

  var user = "Roberto";
  var sendButton = document.getElementById('send-button');
  sendButton.addEventListener("click",sendMessage);
  document.addEventListener("keydown", function (ev) {
    if(ev.keyIdentifier == "Enter") sendMessage();
  });

  firebase.on("child_added", function (snapshot) {
    var messageRecived = snapshot.val();
    var messageKey = snapshot.key();
    //console.log("User:",messageRecived.user);
    //console.log("Message:",messageRecived.message);
    displayMessage(messageRecived.user,messageRecived.message, messageKey);
  });

  function displayMessage (user,message,key) {
    //Creación de los elementos
    var userText = document.createElement('p');
    var messageText = document.createElement('p');
    var cross = document.createElement('div');
    var chatslide = document.createElement('div');
    var userTextNode = document.createTextNode(user);
    var messageTextNode = document.createTextNode(message);

    //Añadiendo atributos
    userText.setAttribute("class","user");
    messageText.setAttribute("class","message");
    chatslide.setAttribute("class","chat-slide");
    chatslide.setAttribute("fb-key",key);
    cross.setAttribute("class","chat-slide-cross");
    cross.setAttribute("onclick","deleteMessage(this)");

    //appendChild
    cross.innerHTML = "&#88";
    userText.appendChild(userTextNode);
    messageText.appendChild(messageTextNode);
    chatslide.appendChild(userText);
    chatslide.appendChild(messageText);
    chatslide.appendChild(cross);

    var chat = document.getElementById('chat');
    chat.appendChild(chatslide);
  }

  function sendMessage (ev){
    var input = document.getElementById('message');
    var inputText = input.value;
    if(inputText != '') {
      firebase.push({user: user,message: inputText});
      input.value = "";
    }
  }


}())

function deleteMessage(ev){
  var div = ev.parentElement;
  var key = div.getAttribute('fb-key');
  div.style.display = "none";
  var firebase = new Firebase('https://chatfirebaseweb.firebaseio.com/' + key);
  firebase.remove();
}
