let usernameDisplay = document.getElementById("usernameDisplay");
let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};

if (signedUser) {
  usernameDisplay.innerText = signedUser.username;
}
