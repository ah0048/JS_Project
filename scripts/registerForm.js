let username = document.getElementById("username");
let registerBtn = document.getElementById("register-btn");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("password_confirm");

function checkFormValidity() {
  if (
    username.classList.contains("is-valid") &&
    email.classList.contains("is-valid") &&
    password.classList.contains("is-valid") &&
    confirmPassword.classList.contains("is-valid")
  ) {
    registerBtn.disabled = false;
  } else {
    registerBtn.disabled = true;
  }
}

username.addEventListener("input", () => {
  let usernameValue = username.value;
  if (usernameValue.length < 8 || usernameValue.includes(" ")) {
    username.classList.add("is-invalid");
  } else {
    username.classList.remove("is-invalid");
    username.classList.add("is-valid");
  }
  checkFormValidity();
});

email.addEventListener("input", () => {
  const users = JSON.parse(localStorage.getItem("userList")) || [];
  if (emailRegex.test(email.value)) {
    const isEmailUsed = users.some((user) => user.email === email.value);

    if (isEmailUsed) {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      document.getElementsByClassName(
        "invalid-feedback-email"
      )[0].style.display = "block";
    } else {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
      document.getElementsByClassName(
        "invalid-feedback-email"
      )[0].style.display = "none";
    }
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    document.getElementsByClassName("invalid-feedback-email")[0].style.display =
      "none";
  }

  checkFormValidity();
});

password.addEventListener("input", () => {
  let passwordValue = password.value;
  if (passwordValue.length < 8 || passwordValue.includes(" ")) {
    password.classList.add("is-invalid");
  } else {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  }
  checkFormValidity();
});

confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value === password.value) {
    confirmPassword.classList.remove("is-invalid");
    confirmPassword.classList.add("is-valid");
  } else {
    confirmPassword.classList.remove("is-valid");
    confirmPassword.classList.add("is-invalid");
  }
  checkFormValidity();
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    username.classList.contains("is-valid") &&
    email.classList.contains("is-valid") &&
    password.classList.contains("is-valid") &&
    confirmPassword.classList.contains("is-valid")
  ) {
    let users = JSON.parse(localStorage.getItem("userList")) || [];
    users.push({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("userList", JSON.stringify(users));
    window.location.href = "../templates/loginForm.html";
  }
});
