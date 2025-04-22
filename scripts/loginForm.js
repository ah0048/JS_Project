let users = JSON.parse(localStorage.getItem("userList")) || [];
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginBtn = document.getElementById("login-btn");
let invalidLogin = document.getElementById("invalid-feedback-email");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let signedUser = JSON.parse(localStorage.getItem("signedUser")) || {};

  let isSignedUser = users.some((user) => {
    if (user.email === email.value && user.password === password.value) {
      signedUser.username = user.username;
      signedUser.email = user.email;
      signedUser.password = user.password;
      localStorage.setItem("signedUser", JSON.stringify(signedUser));
      return true;
    } else {
      return false;
    }
  });
  if (!isSignedUser) {
    invalidLogin.style.display = "block";
  } else {
    invalidLogin.style.display = "none";
    window.location.href = "../templates/home.html";
  }
});
