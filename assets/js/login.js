var nameDOM = document.querySelector("#name");
var passwordDOM = document.querySelector("#password");

// create ceasar cipher encryption function to encrypt password by shifting each character by 5 places

function encryptPassword(password) {
  let encryptedPassword = "";
  for (let i = 0; i < password.length; i++) {
    let ascii = password.charCodeAt(i);
    if (ascii >= 65 && ascii <= 90) {
      ascii = ((ascii - 65 + 5) % 26) + 65;
    } else if (ascii >= 97 && ascii <= 122) {
      ascii = ((ascii - 97 + 5) % 26) + 97;
    }
    encryptedPassword += String.fromCharCode(ascii);
  }
  return encryptedPassword;
}

document.querySelector("#login-btn").addEventListener("click", function () {
  let name = nameDOM.value;
  let password = passwordDOM.value;

  if (name == "" || password == "") {
    alert("You have not filled all the details..!!");
    return;
  }
  let user = checkIfUserExist(name);
  if (user == false) {
    alert("Username does not exist!!");
    return;
  }
  if (!checkIfPasswordMatch(user, name, password)) {
    alert("Password does not match!!");
    return;
  }
});

function checkIfUserExist(name) {
  if (localStorage.getItem("users") == null) {
    return false;
  }
  let users = JSON.parse(localStorage.getItem("users"));

  let filteredUser = users.filter((user) => {
    console.log(user.name);
    return user.name == name;
  });
  if (filteredUser.length > 0) {
    console.log(name);
    return filteredUser[0];
  }
  return false;
}

function checkIfPasswordMatch(user, name, password) {
  if (user.password == encryptPassword(password)) {
    localStorage.setItem("loginedUser", JSON.stringify(user));
    alert("Login Successful!!");
    window.location.href = "dashboard.html";
    return true;
  }
  return false;
}
