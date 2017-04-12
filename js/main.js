var config = {
  apiKey: "AIzaSyAkczjbo4Rw9e-suQtb-4I66ly75m57ld8",
  authDomain: "fire-chat-a7472.firebaseapp.com",
  databaseURL: "https://fire-chat-a7472.firebaseio.com",
  storageBucket: "fire-chat-a7472.appspot.com",
  messagingSenderId: "543361364856"
};
firebase.initializeApp(config);

var db = firebase.database();
var messagesRef = db.ref('messages/');

var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
  $("#login-screen").fadeOut(function(){
    $("#chat-screen").fadeIn();
  });

  messagesRef.on('value', function(snapshot){
    //console.log(snapshot.val());
    $("#messages").html("");
    var values = snapshot.val();
    for (var msgId in values){
      var msg = values[msgId];
      $("#messages").append(`
        <li><strong>${msg.user}</strong>: ${msg.message}</li>
        `);
    }
  });
  document.addEventListener("keydown", function(e){
    if (e.keyCode === 13) sendMessage(user.displayName);
  });

}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode + " - " + errorMessage);
});

function sendMessage(username){
  messagesRef.push({
    user: username,
    message: $("#message-input").val()
  });
}
